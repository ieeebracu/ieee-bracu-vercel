export interface YearCount {
  year: number;
  count: number;
  label?: string;
}

export const memberYearCounts: YearCount[] = [
  { year: 2026, count: 260, label: "Active" },
  { year: 2025, count: 200 },
  { year: 2024, count: 230 },
  { year: 2023, count: 200 },
  { year: 2022, count: 330 },
  { year: 2021, count: 270 },
];
