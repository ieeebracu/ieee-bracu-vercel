export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ChapterNavItem {
  label: string;
  abbr: string;
  slug: string;
  href: string;
  inaugDriveUrl?: string;
  newsletterHref?: string;
  membersHref: string;
}

export const chapterLinks: ChapterNavItem[] = [
  {
    label: "Power & Energy Society",
    abbr: "PES",
    slug: "pes",
    href: "/chapters/pes",
    inaugDriveUrl: "https://drive.google.com/file/d/1LYYKmUMjyZBSsreBjX_Dw6rAXOWfRm_C/view?usp=sharing",
    newsletterHref: "/chapters/pes#newsletters",
    membersHref: "/members?tab=eb&body=PES",
  },
  {
    label: "Computer Society",
    abbr: "CS",
    slug: "cs",
    href: "/chapters/cs",
    inaugDriveUrl: "https://drive.google.com/file/d/1dX3wbqTroqLeBWlgMjq-pys7JDORuTs1/view?usp=sharing",
    newsletterHref: "/chapters/cs#newsletters",
    membersHref: "/members?tab=eb&body=CS",
  },
  {
    label: "Robotics & Automation Society",
    abbr: "RAS",
    slug: "ras",
    href: "/chapters/ras",
    newsletterHref: "/chapters/ras#newsletters",
    membersHref: "/members?tab=eb&body=RAS",
  },
  {
    label: "Aerospace & Electronic Systems",
    abbr: "AESS",
    slug: "aess",
    href: "/chapters/aess",
    newsletterHref: "/chapters/aess#newsletters",
    membersHref: "/members?tab=eb&body=AESS",
  },
  {
    label: "Communications Society",
    abbr: "ComSoc",
    slug: "comsoc",
    href: "/chapters/comsoc",
    inaugDriveUrl: "https://drive.google.com/file/d/1OV0-Zjirf-Cu9VWz0gCMCH7bvAs5czRb/view?usp=sharing",
    newsletterHref: "/chapters/comsoc#newsletters",
    membersHref: "/members?tab=eb&body=ComSoc",
  },
  {
    label: "Electron Devices Society",
    abbr: "EDS",
    slug: "eds",
    href: "/chapters/eds",
    inaugDriveUrl: "https://drive.google.com/file/d/1mwv8ovvOMbS6zyHwETLwEtaw9A6YWXxm/view?usp=sharing",
    membersHref: "/members?tab=eb&body=EDS",
  },
];

export const aboutLinks = [
  { label: "About IEEE", href: "/about/ieee" },
  { label: "Student Branch", href: "/about/branch" },
  { label: "Organogram", href: "/about/organogram" },
  { label: "Resources", href: "/about/resources" },
  { label: "Photo Gallery", href: "/gallery" },
  {
    label: "IEEE Foundation President and IBM Research Director Visit BRACU",
    href: "/about/ieee-foundation-president-ibm-research-director-visits-ieee-brac-university",
  },
];

export const membershipSubLinks = [
  { label: "Why & How Do You Join IEEE?", href: "/members/why-how-do-you-join-ieee" },
  { label: "Membership Benefits", href: "/members/membership-benefits" },
];

export const carcLinks = [
  {
    label: "Control and Applications Research Center",
    href: "http://carc.ieeebracu.com/",
    external: true,
  },
  {
    label: "IEEE CARC SIGHT Bangladesh",
    href: "https://sight.ieee.org/",
    external: true,
  },
];

export const newsletterYears = [
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2010, 2009, 2008,
];

export const routeLabels: Record<string, string> = {
  news: "News & Events",
  members: "Members",
  "membership-benefits": "Membership Benefits",
  "why-how-do-you-join-ieee": "Why & How to Join",
  chapters: "Chapters",
  pes: "Power & Energy Society (PES)",
  cs: "Computer Society (CS)",
  ras: "Robotics & Automation Society (RAS)",
  aess: "Aerospace & Electronic Systems (AESS)",
  comsoc: "Communications Society (ComSoc)",
  eds: "Electron Devices Society (EDS)",
  about: "About",
  branch: "Student Branch",
  ieee: "About IEEE",
  organogram: "Organogram",
  resources: "Resources",
  logos: "Resources",
  "ibm-visit": "IBM Visit",
  "ieee-foundation-president-ibm-research-director-visits-ieee-brac-university": "IEEE Foundation & IBM Visit",
  contact: "Contact",
  join: "Join IEEE",
  "join-ieee-bracu-sb": "Join IEEE BRACU SB",
  gallery: "Gallery",
};

export const utilityBarData = {
  location: "Dhaka, Bangladesh",
  phone: "+88 01819525640",
  email: "ieeebracuds@gmail.com",
  bracuUrl: "https://www.bracu.ac.bd/",
  ieeeUrl: "https://www.ieee.org/",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/ieeebracusb" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/ieee-bracu-sb/" },
    { name: "Instagram", href: "https://www.instagram.com/ieeebracusb/" },
    { name: "YouTube", href: "https://www.youtube.com/@ieeebracustudentbranch" },
  ],
};