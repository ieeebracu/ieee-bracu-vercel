export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2013: ExecutiveMember[] = [
  {
    "year": 2013,
    "position": "Chair",
    "name": "Ashfaqul Haq Deep",
    "sortOrder": 0
  },
  {
    "year": 2013,
    "position": "Vice-Chair",
    "name": "Sadaf Noor",
    "sortOrder": 1
  },
  {
    "year": 2013,
    "position": "Secretary",
    "name": "Shadman Shabaab Haque",
    "sortOrder": 2
  },
  {
    "year": 2013,
    "position": "Treasurer",
    "name": "Imran Bin Jafar",
    "sortOrder": 3
  }
];
