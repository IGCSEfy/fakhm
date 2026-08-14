"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Shams is my winter signature now. Warm, spicy, and it stays on my thobe all day. It has a rich trail without ever feeling too heavy, even after a long evening out.",
    by: "Muhammad Farooq, Al Barsha",
  },
  {
    tempId: 1,
    testimonial:
      "Qamr is the one everyone asks about. The rose and cardamom together are unreal. It feels polished and soft from the first application right through to the dry down.",
    by: "Ayesha Siddiqui, Al Majaz",
  },
  {
    tempId: 2,
    testimonial:
      "Falaq smells like a fresh morning - citrus and florals over oud. It is bright, clean, and easy to wear, which is exactly why it has become my daily choice.",
    by: "Zain Qureshi, Mirdif",
  },
  {
    tempId: 3,
    testimonial:
      "Musk Rijali is so clean and easy. My go-to when I don't want to think about it. It sits close to the skin beautifully and still feels fresh many hours later.",
    by: "Maryam Khan, Al Nahda",
  },
  {
    tempId: 4,
    testimonial:
      "The Iraqi bakhoor fills the whole majlis. Guests always ask what's burning. A small amount is enough to make the room feel warm, welcoming, and properly scented.",
    by: "Ibrahim Ansari, Al Taawun",
  },
  {
    tempId: 5,
    testimonial:
      "Wore Shams to a wedding. Three people followed me to ask what it was. The scent stayed noticeable throughout the night and worked perfectly with formal wear.",
    by: "Sana Rizvi, Jumeirah",
  },
  {
    tempId: 6,
    testimonial:
      "Gifted Qamr to my mother and immediately had to order another for myself. It feels elegant and comforting, and the bottle makes the whole experience feel special.",
    by: "Abdul Rehman, Muweilah",
  },
  {
    tempId: 7,
    testimonial:
      "Didn't expect this quality at the price. It lasts longer than bottles triple the cost and develops into something warmer and smoother as the day goes on.",
    by: "Hiba Sheikh, Business Bay",
  },
  {
    tempId: 8,
    testimonial:
      "My wife stole my Musk Rijali, so I had to buy two more. It is the kind of clean scent that works for anyone and gets complimented every time it is worn.",
    by: "Faisal Malik, Al Khan",
  },
  {
    tempId: 9,
    testimonial:
      "Still smelled Falaq on my collar the next morning. Exactly what I want from an oud: fresh at first, warm later, and present without being overpowering.",
    by: "Nida Mahmood, Deira",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out bg-background text-foreground",
        isCenter
          ? "z-10 border-white/60"
          : "z-0 border-white/10 hover:border-white/30",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(255,255,255,0.1)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <h3 className="text-base sm:text-xl font-medium text-foreground">
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className="absolute bottom-8 left-8 right-8 mt-2 text-sm italic text-muted-foreground">
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-background"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-white/20 text-white hover:border-white/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-white/20 text-white hover:border-white/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
