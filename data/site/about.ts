export interface FactItem {
  value: string;
  label: string;
}

export interface MilestoneItem {
  year: string;
  event: string;
}

export interface ColorItem {
  name: string;
  hex: string;
  text: string;
}

export interface LogoItem {
  name: string;
  type: string;
  src: string;
  driveZipUrl?: string;
}

export const ieeeQuickFacts: FactItem[] = [
  { value: "420,000+", label: "Members worldwide" },
  { value: "160+", label: "Countries represented" },
  { value: "120,000+", label: "Student members" },
  { value: "340+", label: "Sections globally" },
  { value: "2,000+", label: "Technical chapters" },
  { value: "3,000+", label: "Student branches" },
  { value: "45", label: "Societies & councils" },
  { value: "1,900+", label: "Annual conferences" },
  { value: "200+", label: "Top-cited journals" },
];

export const branchMilestones: MilestoneItem[] = [
  { year: "2008", event: "Branch inaugurated at BRAC University with founding Executive Body on July 6, 2008." },
  { year: "2009", event: "Received \"Most Vibrant Student Section\" Award at IEEE 125th Anniversary Congress; hosted IEEE Foundation President & IBM Research Director." },
  { year: "2018", event: "Power & Energy Society (PES) Chapter established (approved Oct 7, 2018) — the first technical chapter of the branch." },
  { year: "2019", event: "IEEE Computer Society (CS) Chapter established (commenced April 9, 2019)." },
  { year: "2020", event: "Robotics & Automation Society (RAS) and Aerospace & Electronic Systems (AESS) Chapters established; Won IEEE Regional Exemplary Student Branch Award 2020." },
  { year: "2021", event: "Won the prestigious IEEE Regional Exemplary Student Branch Award 2021 (Region 10) for the second consecutive year." },
  { year: "2022", event: "Won IEEE Regional Exemplary Student Branch Award 2022 (third consecutive year); Communications Society (ComSoc) Chapter established." },
  { year: "2026", event: "Electron Devices Society (EDS) Chapter established — expanding the branch to six specialized technical society chapters." },
];

export const branchAtAGlance = [
  { label: "Established", value: "July 6, 2008" },
  { label: "Host Institution", value: "BRAC University, Dhaka" },
  { label: "Active Chapters", value: "6 Technical Chapters" },
  { label: "Affiliation", value: "IEEE Region 10 (Asia-Pacific)" },
  { label: "Local Section", value: "IEEE Bangladesh Section" },
  { label: "Location", value: "Merul Badda, Dhaka 1212" },
];

export const branchCounselor = {
  name: "Prof. AKM Abdul Malek Azad, PhD",
  title: "Branch Counselor & Founder",
  email: "a.azad@bracu.ac.bd",
  image: "/assets/people/branch-counselor.jpg",
};

export const branchFoundingEB = [
  { role: "Faculty Advisor", name: "Prof. Dr. AKM Abdul Malek Azad" },
  { role: "President", name: "Mahdin Mahboob" },
  { role: "Vice-President", name: "Sunjib Kumar Singha" },
  { role: "Treasurer", name: "Annajiat Alim Rasel" },
  { role: "Secretary", name: "Nabila Naushin" },
];

export const organogramTiers = [
  {
    step: "01",
    title: "Counselor & Advisors",
    desc: "Senior faculty leadership providing academic guidance, strategic oversight, and section liaison.",
    accent: "bg-[#EAF1F6] text-[#00629B]",
  },
  {
    step: "02",
    title: "Main Executive Body",
    desc: "Chair, Vice Chair, Secretary, Treasurer, Webmaster, Designers, Editors, and Coordinators.",
    accent: "bg-[#00629B] text-white",
  },
  {
    step: "03",
    title: "Chapter Executive Bodies",
    desc: "Dedicated leadership teams steering the 6 technical society chapters (PES, CS, RAS, AESS, ComSoc, EDS).",
    accent: "bg-[#0A2540] text-white",
  },
  {
    step: "04",
    title: "Members & Volunteers",
    desc: "Active student engineers and passionate volunteer taskforces powering flagship initiatives and events.",
    accent: "bg-[#EAF1F6] text-[#00629B]",
  },
];

export const brandColors: ColorItem[] = [
  { name: "IEEE Navy", hex: "#0A2540", text: "Primary dark header, text & card elements" },
  { name: "IEEE Blue", hex: "#00629B", text: "Core brand color, accents & primary actions" },
  { name: "Light Blue", hex: "#7FB4DA", text: "Subtle highlights, pill tags & secondary borders" },
  { name: "Off-White", hex: "#F5F3EE", text: "Clean background canvas & muted surfaces" },
];

export const brandLogos: LogoItem[] = [
  {
    name: "IEEE BRACU Student Branch",
    type: "Main Branch",
    src: "/assets/branding/main-branch-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1iYVCACpD34tvD1-hL7DnO8YwinJTasY_/view?usp=sharing",
  },
  {
    name: "Power & Energy Society",
    type: "Technical Chapter",
    src: "/assets/branding/pes-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1pnVxik-rUb5MughxYtpinvOxYNwTVMiv/view?usp=sharing",
  },
  {
    name: "Computer Society",
    type: "Technical Chapter",
    src: "/assets/branding/cs-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1a9VAnIUeGIt3wOP6_aT-7eB7cyFOSkd6/view?usp=sharing",
  },
  {
    name: "Robotics & Automation Society",
    type: "Technical Chapter",
    src: "/assets/branding/ras-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1X0cIA5CuDtLWmWuYBycG3VjLdX-S0Gem/view?usp=sharing",
  },
  {
    name: "Aerospace & Electronic Systems",
    type: "Technical Chapter",
    src: "/assets/branding/aess-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/11UE07RjXPOVQcjSw9iaTG5lToHid5_k2/view?usp=sharing",
  },
  {
    name: "Communications Society",
    type: "Technical Chapter",
    src: "/assets/branding/comsoc-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1UuIXEaSc5VRbm4bJLs9AOuuJOgRKWw2x/view?usp=sharing",
  },
  {
    name: "Electron Devices Society",
    type: "Technical Chapter",
    src: "/assets/branding/eds-logo.png",
    driveZipUrl: "https://drive.google.com/file/d/1_CQ-F56WI55yzu3ssoGanVB8JFYbxU6W/view?usp=sharing",
  },
];

export const ibmVisitPhotos = [
  {
    src: "/assets/events/rs5-300x107.jpg",
    alt: "Vice Chancellor Prof. Jamilur Reza Choudhury, Dr. Richard J. Gowen, Dr. Kris Srikrishnan at the head table",
    caption: "Vice Chancellor Prof. Jamilur Reza Choudhury, Dr. Richard J. Gowen, Dr. Kris Srikrishnan, and department chairs at the session.",
  },
  {
    src: "/assets/events/mc1.jpg",
    alt: "Dr. Mumit Khan presenting CRBLP activities",
    caption: "Dr. Mumit Khan presenting Centre for Research on Bangla Language Processing (CRBLP) activities.",
  },
];

export const ibmVisitSnapshot = [
  { label: "Date", value: "August 31, 2009" },
  { label: "Visiting Dignitaries", value: "Dr. Richard J. Gowen & Dr. Kris Srikrishnan" },
  { label: "Session Chair", value: "Prof. Jamilur Reza Choudhury, VC BRACU" },
  { label: "Organized by", value: "IEEE BRAC University Student Branch" },
  { label: "Venue", value: "BRAC University, Dhaka" },
  { label: "Reported by", value: "Md. Shamsul Kaonain" },
];
