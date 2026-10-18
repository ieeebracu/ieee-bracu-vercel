export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2016: ExecutiveMember[] = [
  {
    year: 2016,
    position: "Chair",
    name: "Fatin Farhan Haque",
    sortOrder: 0,
  },
  {
    year: 2016,
    position: "Vice Chair",
    name: "Fairooz Zafar",
    sortOrder: 1,
  },
  {
    year: 2016,
    position: "Secretary",
    name: "Mohammad Nasimuzzaman Mishuk",
    sortOrder: 2,
  },
  {
    year: 2016,
    position: "Treasurer",
    name: "Mehdi Ahsan",
    sortOrder: 3,
  },
  {
    year: 2016,
    position: "Editor",
    name: "Anika Iqbal",
    sortOrder: 4,
  },
  {
    year: 2016,
    position: "Web Developer",
    name: "Apurba Nath",
    sortOrder: 5,
  },
];
