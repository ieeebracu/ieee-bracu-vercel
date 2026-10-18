export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2010: ExecutiveMember[] = [
  {
    "year": 2010,
    "position": "Chair",
    "name": "Shiblee Imtiaz Hasan",
    "sortOrder": 0
  },
  {
    "year": 2010,
    "position": "Vice Chair",
    "name": "Md. Eftakhairul Islam",
    "sortOrder": 1
  },
  {
    "year": 2010,
    "position": "Secretary",
    "name": "SK. Adnan Rabbi",
    "sortOrder": 2
  },
  {
    "year": 2010,
    "position": "Treasurer",
    "name": "Md. Adnan Al Moshi",
    "sortOrder": 3
  }
];
