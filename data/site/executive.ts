import { getMainEB, getChapterEB, CURRENT_YEAR } from "@/data/members";

export interface Member {
  name: string;
  role: string;
  image: string;
}

export interface ChapterEB {
  abbr: string;
  name: string;
  desc: string;
  members: Member[];
}

const chapterMeta = [
  {
    abbr: "PES",
    name: "Power & Energy Society",
    desc: "Smart grids, renewables, and power systems",
  },
  {
    abbr: "CS",
    name: "Computer Society",
    desc: "Software, AI, and competitive programming",
  },
  {
    abbr: "RAS",
    name: "Robotics & Automation Society",
    desc: "Autonomous systems and control engineering",
  },
  {
    abbr: "AESS",
    name: "Aerospace & Electronic Systems",
    desc: "Satellites, radar systems, and space technology",
  },
  {
    abbr: "ComSoc",
    name: "Communications Society",
    desc: "Telecommunications, networks, and signal processing",
  },
  {
    abbr: "EDS",
    name: "Electron Devices Society",
    desc: "Semiconductors, IC design, and microelectronics",
  },
];

export function getMainEBMumbers(year: number = CURRENT_YEAR): Member[] {
  return getMainEB(year).map((m) => ({
    name: m.name,
    role: m.role,
    image: m.image || "",
  }));
}

export function getChapterEBs(year: number = CURRENT_YEAR): ChapterEB[] {
  return chapterMeta.map((c) => ({
    ...c,
    members: getChapterEB(c.abbr, year).map((m) => ({
      name: m.name,
      role: m.role,
      image: m.image || "",
    })),
  }));
}

export const mainEB: Member[] = getMainEBMumbers(CURRENT_YEAR);
export const chapterEBs: ChapterEB[] = getChapterEBs(CURRENT_YEAR);
