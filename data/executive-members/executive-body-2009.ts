export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2009: ExecutiveMember[] = [
  {
    "year": 2009,
    "position": "Chair",
    "name": "Nabila Naushin",
    "sortOrder": 0
  },
  {
    "year": 2009,
    "position": "Vice Chair",
    "name": "Rasel Chowdhury",
    "sortOrder": 1
  },
  {
    "year": 2009,
    "position": "Secretary",
    "name": "Shiblee Imtiaz Hasan",
    "sortOrder": 2
  },
  {
    "year": 2009,
    "position": "Treasurer",
    "name": "Md. Eftakhairul Islam",
    "sortOrder": 3
  }
];
