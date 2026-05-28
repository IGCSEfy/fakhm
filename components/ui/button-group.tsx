"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Static radius lookup. The prompt's template-literal approach (`rounded-${prop}`)
// doesn't work with Tailwind's JIT scanner — these classes wouldn't be detected
// at build time. Listing them as string literals here ensures Tailwind includes them.
const RADIUS_CLASSES = {
  none: { all: "rounded-none", l: "rounded-l-none", r: "rounded-r-none" },
  sm: { all: "rounded-sm", l: "rounded-l-sm", r: "rounded-r-sm" },
  md: { all: "rounded-md", l: "rounded-l-md", r: "rounded-r-md" },
  lg: { all: "rounded-lg", l: "rounded-l-lg", r: "rounded-r-lg" },
  xl: { all: "rounded-xl", l: "rounded-l-xl", r: "rounded-r-xl" },
  "2xl": { all: "rounded-2xl", l: "rounded-l-2xl", r: "rounded-r-2xl" },
  full: { all: "rounded-full", l: "rounded-l-full", r: "rounded-r-full" },
} as const;

type RadiusKey = keyof typeof RADIUS_CLASSES;

const ButtonGroupContext = React.createContext<{
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  hasDivider?: boolean;
  itemClassName?: string;
  dividerClassName?: string;
  itemCount: number;
  itemIndex: number;
}>({
  itemCount: 0,
  itemIndex: 0,
});

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    hasDivider?: boolean;
    itemClassName?: string;
    dividerClassName?: string;
  }
>(
  (
    {
      children,
      variant = "default",
      size = "default",
      hasDivider = true,
      className,
      itemClassName,
      dividerClassName,
      ...props
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children);
    const itemCount = childrenArray.length;
    let index = 0;

    return (
      <div
        ref={ref}
        className={cn("inline-flex relative items-center", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return (
            <ButtonGroupContext.Provider
              value={{
                variant,
                size,
                hasDivider,
                itemClassName,
                dividerClassName,
                itemCount,
                itemIndex: index++,
              }}
            >
              {child}
            </ButtonGroupContext.Provider>
          );
        })}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

const useButtonGroupContext = () => {
  const context = React.useContext(ButtonGroupContext);
  if (!context) {
    throw new Error("ButtonGroupItem must be used within ButtonGroup");
  }
  return context;
};

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    roundedRadius?: RadiusKey;
  }
>(
  (
    { className, variant, size, children, roundedRadius = "md", ...props },
    ref,
  ) => {
    const {
      variant: contextVariant,
      size: contextSize,
      hasDivider,
      itemClassName,
      dividerClassName,
      itemCount,
      itemIndex,
    } = useButtonGroupContext();

    const radius = RADIUS_CLASSES[roundedRadius] ?? RADIUS_CLASSES.md;

    const positionClassName =
      itemCount === 1
        ? radius.all
        : itemIndex === 0
          ? `${radius.l} rounded-r-none`
          : itemIndex === itemCount - 1
            ? `${radius.r} rounded-l-none`
            : "rounded-none";

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            variant: variant || contextVariant,
            size: size || contextSize,
          }),
          positionClassName,
          "relative",
          itemClassName,
          className,
          hasDivider && itemIndex < itemCount - 1 && "border-r-2",
          hasDivider && itemIndex < itemCount - 1 && dividerClassName,
          hasDivider && itemIndex > 0 && "border-l-0",
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
