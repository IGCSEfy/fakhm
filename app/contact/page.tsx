import { Contact2 } from "@/components/ui/contact-2";

export default function ContactPage() {
  return (
    <Contact2
      title="Get in Touch"
      description="Questions about a scent, a special order, or a private appointment — we'd love to hear from you."
      phone="+971 00 000 0000"
      email="hello@fakhmoud.com"
      web={{ label: "fakhmoud.com", url: "https://fakhmoud.com" }}
    />
  );
}
