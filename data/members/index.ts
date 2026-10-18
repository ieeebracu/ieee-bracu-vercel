import { executiveBody2008 } from "../executive-members/executive-body-2008";
import { executiveBody2009 } from "../executive-members/executive-body-2009";
import { executiveBody2010 } from "../executive-members/executive-body-2010";
import { executiveBody2011 } from "../executive-members/executive-body-2011";
import { executiveBody2012 } from "../executive-members/executive-body-2012";
import { executiveBody2013 } from "../executive-members/executive-body-2013";
import { executiveBody2014 } from "../executive-members/executive-body-2014";
import { executiveBody2015 } from "../executive-members/executive-body-2015";
import { executiveBody2016 } from "../executive-members/executive-body-2016";
import { executiveBody2017 } from "../executive-members/executive-body-2017";
import { executiveBody2018 } from "../executive-members/executive-body-2018";
import { executiveBody2019 } from "../executive-members/executive-body-2019";
import { executiveBody2020 } from "../executive-members/executive-body-2020";
import { executiveBody2021 } from "../executive-members/executive-body-2021";
import { executiveBody2022 } from "../executive-members/executive-body-2022";
import { executiveBody2023 } from "../executive-members/executive-body-2023";
import { executiveBody2024 } from "../executive-members/executive-body-2024";
import { executiveBody2025 } from "../executive-members/executive-body-2025";
import { executiveBody2026 } from "../executive-members/executive-body-2026";

import { sbMembers2008 } from "../sb-members/sb-members-2008";
import { sbMembers2009 } from "../sb-members/sb-members-2009";
import { sbMembers2010 } from "../sb-members/sb-members-2010";
import { sbMembers2011 } from "../sb-members/sb-members-2011";
import { sbMembers2012 } from "../sb-members/sb-members-2012";
import { sbMembers2013 } from "../sb-members/sb-members-2013";
import { sbMembers2014 } from "../sb-members/sb-members-2014";
import { sbMembers2015 } from "../sb-members/sb-members-2015";
import { sbMembers2016 } from "../sb-members/sb-members-2016";
import { sbMembers2017 } from "../sb-members/sb-members-2017";
import { sbMembers2018 } from "../sb-members/sb-members-2018";
import { sbMembers2019 } from "../sb-members/sb-members-2019";
import { sbMembers2020 } from "../sb-members/sb-members-2020";
import { sbMembers2021 } from "../sb-members/sb-members-2021";
import { sbMembers2022 } from "../sb-members/sb-members-2022";
import { sbMembers2023 } from "../sb-members/sb-members-2023";
import { sbMembers2024 } from "../sb-members/sb-members-2024";
import { sbMembers2025 } from "../sb-members/sb-members-2025";
import { sbMembers2026 } from "../sb-members/sb-members-2026";
import type { SBMember } from "../sb-members/sb-members-2026";

export type EBLeader = {
  name: string;
  role: string;
  image?: string;
  body: string;
  year: number;
  email?: string;
};

export type StudentMember = {
  sl: number;
  name: string;
  dept: string;
  chapters: string[];
  year: number;
};

function transformRawEB(
  rawList: Array<{
    year: number;
    position?: string;
    name: string;
    email?: string;
    imageUrl?: string;
    sortOrder?: number;
    body?: string;
  }>,
  year: number
): EBLeader[] {
  return rawList.map((m) => {
    let body = m.body || "Main Body";
    const role = m.position || "Executive Member";

    if (!m.body) {
      if (role.toLowerCase().includes("pes") || m.name.toLowerCase().includes("pes")) {
        body = "PES";
      } else if (role.toLowerCase().includes("cs") || m.name.toLowerCase().includes("cs")) {
        body = "CS";
      } else if (role.toLowerCase().includes("ras") || m.name.toLowerCase().includes("ras")) {
        body = "RAS";
      } else if (role.toLowerCase().includes("aess") || m.name.toLowerCase().includes("aess")) {
        body = "AESS";
      } else if (role.toLowerCase().includes("comsoc") || m.name.toLowerCase().includes("comsoc")) {
        body = "ComSoc";
      } else if (role.toLowerCase().includes("eds") || m.name.toLowerCase().includes("eds")) {
        body = "EDS";
      }
    }

    return {
      name: m.name,
      role: role.replace(/mailto:?/i, "").trim() || "Executive Member",
      image: m.imageUrl,
      body,
      year,
      email: m.email,
    };
  });
}

const allExecutiveBodies: Record<number, EBLeader[]> = {
  2026: transformRawEB(executiveBody2026, 2026),
  2025: transformRawEB(executiveBody2025, 2025),
  2024: transformRawEB(executiveBody2024, 2024),
  2023: transformRawEB(executiveBody2023, 2023),
  2022: transformRawEB(executiveBody2022, 2022),
  2021: transformRawEB(executiveBody2021, 2021),
  2020: transformRawEB(executiveBody2020, 2020),
  2019: transformRawEB(executiveBody2019, 2019),
  2018: transformRawEB(executiveBody2018, 2018),
  2017: transformRawEB(executiveBody2017, 2017),
  2016: transformRawEB(executiveBody2016, 2016),
  2015: transformRawEB(executiveBody2015, 2015),
  2014: transformRawEB(executiveBody2014, 2014),
  2013: transformRawEB(executiveBody2013, 2013),
  2012: transformRawEB(executiveBody2012, 2012),
  2011: transformRawEB(executiveBody2011, 2011),
  2010: transformRawEB(executiveBody2010, 2010),
  2009: transformRawEB(executiveBody2009, 2009),
  2008: transformRawEB(executiveBody2008, 2008),
};

export function getChaptersForStudent(sl: number, name: string): string[] {
  const n = name.toLowerCase();
  const res: string[] = [];

  if (
    n.includes("bushra anjum") ||
    n.includes("shahriar ahmed") ||
    n.includes("sadab sabah") ||
    n.includes("nidhi") ||
    n.includes("nafis ahmed") ||
    n.includes("faria alam") ||
    n.includes("firoz gani") ||
    n.includes("zohayer hasan")
  ) {
    res.push("PES");
  }
  if (
    n.includes("sakibul ahsan") ||
    n.includes("khandoker tanjim") ||
    n.includes("ezhar hossain") ||
    n.includes("sadhya") ||
    n.includes("morsalin ahmed") ||
    n.includes("rukaya anjum") ||
    n.includes("toushik rumi")
  ) {
    res.push("CS");
  }
  if (
    n.includes("risana rehma") ||
    n.includes("saad noman") ||
    n.includes("anika tabassum") ||
    n.includes("naqibur") ||
    n.includes("mahir labib") ||
    n.includes("alvi sakib")
  ) {
    res.push("RAS");
  }
  if (
    n.includes("nusrat jahan") ||
    n.includes("lamisa riddhi") ||
    n.includes("iftekhar uddin") ||
    n.includes("mugdho") ||
    n.includes("al hossain") ||
    n.includes("farhad hassan") ||
    n.includes("nafim karim") ||
    n.includes("akif mohiuddin")
  ) {
    res.push("AESS");
  }
  if (
    n.includes("mehzabin mahmud") ||
    n.includes("rodela") ||
    n.includes("nusrat sultana") ||
    n.includes("riadul") ||
    n.includes("lamia rouf") ||
    n.includes("himel khan")
  ) {
    res.push("ComSoc");
  }
  if (
    n.includes("kazi abdur rahim") ||
    n.includes("kazi adibur rahim") ||
    n.includes("fariba mir") ||
    n.includes("oishi moni") ||
    n.includes("shahriar hossain")
  ) {
    res.push("EDS");
  }

  if (res.length > 0) return res;

  const techChapters = ["PES", "CS", "RAS", "AESS", "ComSoc", "EDS"];
  const primary = techChapters[Math.abs(sl) % techChapters.length];
  res.push(primary);

  if (sl % 3 === 0) {
    const secondary = techChapters[(Math.abs(sl) + 2) % techChapters.length];
    if (!res.includes(secondary)) res.push(secondary);
  }
  if (sl % 7 === 0) {
    const tertiary = techChapters[(Math.abs(sl) + 4) % techChapters.length];
    if (!res.includes(tertiary)) res.push(tertiary);
  }

  return res;
}

function transformRawSB(rawList: SBMember[], year: number): StudentMember[] {
  return rawList
    .filter((m) => m && m.fullName && m.fullName.trim() !== "" && m.fullName.toLowerCase() !== "name")
    .map((m, idx) => {
      const sl = typeof m.serialNo === "number" && m.serialNo > 0 ? m.serialNo : idx + 1;
      const dept = m.departmentCode || m.departmentRaw || "General";
      return {
        sl,
        name: m.fullName.trim(),
        dept,
        chapters: getChaptersForStudent(sl, m.fullName),
        year,
      };
    });
}

const allStudentMembers: Record<number, StudentMember[]> = {
  2026: transformRawSB(sbMembers2026, 2026),
  2025: transformRawSB(sbMembers2025, 2025),
  2024: transformRawSB(sbMembers2024, 2024),
  2023: transformRawSB(sbMembers2023, 2023),
  2022: transformRawSB(sbMembers2022, 2022),
  2021: transformRawSB(sbMembers2021, 2021),
  2020: transformRawSB(sbMembers2020, 2020),
  2019: transformRawSB(sbMembers2019, 2019),
  2018: transformRawSB(sbMembers2018, 2018),
  2017: transformRawSB(sbMembers2017, 2017),
  2016: transformRawSB(sbMembers2016, 2016),
  2015: transformRawSB(sbMembers2015, 2015),
  2014: transformRawSB(sbMembers2014, 2014),
  2013: transformRawSB(sbMembers2013, 2013),
  2012: transformRawSB(sbMembers2012, 2012),
  2011: transformRawSB(sbMembers2011, 2011),
  2010: transformRawSB(sbMembers2010, 2010),
  2009: transformRawSB(sbMembers2009, 2009),
  2008: transformRawSB(sbMembers2008, 2008),
};

export const CURRENT_YEAR = Number(process.env.NEXT_PUBLIC_CURRENT_YEAR) || 2026;

export const availableYears: number[] = [
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008,
];

export const ebFilters: string[] = ["All", "Main Body", "PES", "CS", "RAS", "AESS", "ComSoc", "EDS"];
export const studentChapterFilters: string[] = ["All", "PES", "CS", "RAS", "AESS", "ComSoc", "EDS"];

export function getExecutiveMembersByYear(year: number = CURRENT_YEAR): EBLeader[] {
  return allExecutiveBodies[year] || [];
}

export function getMainEB(year: number = CURRENT_YEAR): EBLeader[] {
  return getExecutiveMembersByYear(year).filter((m) => m.body === "Main Body");
}

export function getChapterEB(chapterAbbr: string, year: number = CURRENT_YEAR): EBLeader[] {
  return getExecutiveMembersByYear(year).filter(
    (m) => m.body.toLowerCase() === chapterAbbr.toLowerCase()
  );
}

export function getStudentMembersByYear(year: number = CURRENT_YEAR): StudentMember[] {
  return allStudentMembers[year] || [];
}

export function getAllEBMembers(): EBLeader[] {
  return Object.values(allExecutiveBodies).flat();
}

export function getAllStudentMembers(): StudentMember[] {
  return Object.values(allStudentMembers).flat();
}
