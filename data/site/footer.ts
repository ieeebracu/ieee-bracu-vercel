import { newsletterArchiveList } from "./newsletters";

export const footerCTA = {
  title: "Ready to join the community?",
  description: "Become a member of IEEE BRACU Student Branch and unlock a world of opportunity.",
  joinHref: "/join",
  contactHref: "/contact",
};

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "News & Events", href: "/news" },
  { label: "Members", href: "/members" },
  { label: "About Branch", href: "/about/branch" },
  { label: "Resources", href: "/about/resources" },
  { label: "Photo Gallery", href: "/gallery" },
];

export const footerChapters = [
  { name: "Power & Energy (PES)", slug: "pes", href: "/chapters/pes" },
  { name: "Computer Society (CS)", slug: "cs", href: "/chapters/cs" },
  { name: "Robotics & Automation (RAS)", slug: "ras", href: "/chapters/ras" },
  { name: "Aerospace & Electronic (AESS)", slug: "aess", href: "/chapters/aess" },
  { name: "Communications (ComSoc)", slug: "comsoc", href: "/chapters/comsoc" },
  { name: "Electron Devices (EDS)", slug: "eds", href: "/chapters/eds" },
];

export const footerNewsletters = newsletterArchiveList.slice(0, 5).map((n) => ({
  year: n.year.toString(),
  href: n.driveUrl,
}));

export const footerSocials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ieeebracusb",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ieeebracustudentbranch",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-bracu-sb/",
  },
];

export const footerContact = {
  address: "BRAC University, Kha 224, Bir Uttam Rafiqul Islam Ave, Dhaka 1212",
  email: "chair@ieeebracu.com",
};

export const footerLegalPolicies = [
  { label: "IEEE.org", href: "https://www.ieee.org/" },
  { label: "BRAC University", href: "https://www.bracu.ac.bd/" },
  { label: "Privacy Policy", href: "https://www.ieee.org/security-privacy.html" },
  { label: "Terms", href: "https://www.ieee.org/about/help/site-terms-conditions.html" },
  { label: "Nondiscrimination", href: "https://www.ieee.org/about/ieee-nondiscrimination-policy.html" },
  { label: "Ethics", href: "https://www.ieee.org/about/ethics-reporting.html" },
];