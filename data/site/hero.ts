export interface Slide {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  desc: string;
  cta: {
    label: string;
    href: string;
  };
}

export const heroSlides: Slide[] = [
  {
    id: "slide-1",
    image: "/assets/home/hero/hero-01.jpg",
    eyebrow: "IEEE ComSoc BRACU SBC",
    title: "The ML Playbook: Foundations & Applications",
    desc: "A hands-on seminar unpacking the machine-learning workflow, from data to deployment.",
    cta: { label: "Read more", href: "/news" },
  },
  {
    id: "slide-2",
    image: "/assets/home/hero/hero-02.jpg",
    eyebrow: "IEEE BRACU Student Branch",
    title: "4th BIRDS International Workshop",
    desc: "Bringing together researchers and students around small-satellite systems and space technology.",
    cta: { label: "News & events", href: "/news" },
  },
  {
    id: "slide-3",
    image: "/assets/home/hero/hero-03.png",
    eyebrow: "AESS BRACU SBC · 2025",
    title: "An Industry Visit by AESS",
    desc: "Members step onto the factory floor to see aerospace and electronic systems at work.",
    cta: { label: "About us", href: "/about/branch" },
  },
  {
    id: "slide-4",
    image: "/assets/home/hero/hero-04.jpg",
    eyebrow: "IEEE PES BRACU SBC · 2025",
    title: "Industrial Tour to the Orion Power Plant",
    desc: "A close look at large-scale power generation and the engineering that keeps the grid running.",
    cta: { label: "Read more", href: "/news" },
  },
];

export const heroStats = [
  { value: "2008", label: "Established" },
  { value: "6", label: "Technical Chapters" },
  { value: "1500+", label: "Members to date" },
  { value: "50+", label: "Events / year" },
];