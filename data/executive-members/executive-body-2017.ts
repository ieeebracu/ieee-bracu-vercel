export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2017: ExecutiveMember[] = [
  {
    year: 2017,
    position: "Chair",
    name: "Mohi Reza",
    sortOrder: 0,
  },
  {
    year: 2017,
    position: "Vice-Chair",
    name: "Nahian Shafiq",
    sortOrder: 1,
  },
  {
    year: 2017,
    position: "General Secretary",
    name: "Md. Sajid Akbar Sium",
    sortOrder: 2,
  },
  {
    year: 2017,
    position: "Treasurer",
    name: "Hanan Ashrafi Anushka",
    sortOrder: 3,
  },
  {
    year: 2017,
    position: "Editor",
    name: "Nafisa Nowshin Ahmed",
    sortOrder: 4,
  },
  {
    year: 2017,
    position: "Web Designer",
    name: "Sk. Sajidul Kadir",
    sortOrder: 5,
  },
];
