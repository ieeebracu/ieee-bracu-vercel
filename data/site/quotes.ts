export interface Quote {
  text: string;
  author: string;
  title: string;
}

export const dailyQuotes: Quote[] = [
  {
    text: "If your hate could be turned into electricity, it would light up the whole world.",
    author: "Nikola Tesla",
    title: "Inventor & Electrical Engineer",
  },
  {
    text: "The scientist discovers a new type of material or energy and the engineer discovers a new use for it.",
    author: "Gordon Lindsay Glegg",
    title: "Engineer & Author",
  },
  {
    text: "Science can amuse and fascinate us all, but it is engineering that changes the world.",
    author: "Isaac Asimov",
    title: "Author & Biochemist",
  },
  {
    text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    author: "Albert Einstein",
    title: "Theoretical Physicist",
  },
  {
    text: "Engineering is the closest thing to magic that exists in the world.",
    author: "Elon Musk",
    title: "Engineer & Entrepreneur",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    title: "Computer Scientist",
  },
  {
    text: "Technology is nothing. What's important is that you have faith in people, that they're basically good and smart.",
    author: "Steve Jobs",
    title: "Co-founder, Apple Inc.",
  },
  {
    text: "The advance of technology is based on making it fit in so that you don't really even notice it.",
    author: "Bill Gates",
    title: "Co-founder, Microsoft",
  },
  {
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
    title: "Author & Futurist",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    title: "Software Engineer",
  },
  {
    text: "What we usually consider as impossible are simply engineering problems — there's no law of physics preventing them.",
    author: "Michio Kaku",
    title: "Theoretical Physicist",
  },
  {
    text: "Strive for perfection in everything you do. Take the best that exists and make it better.",
    author: "Henry Royce",
    title: "Engineer & Co-founder, Rolls-Royce",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    title: "Co-founder, Apple Inc.",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    title: "Inventor & Businessman",
  },
  {
    text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    author: "Albert Einstein",
    title: "Theoretical Physicist",
  },
  {
    text: "The goal of engineering is not merely to know things, but to make things happen.",
    author: "Henry Petroski",
    title: "Civil Engineer & Author",
  },
];

export function getDailyQuoteIndex(): number {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % dailyQuotes.length;
}
