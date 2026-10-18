export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2014: ExecutiveMember[] = [
  {
    "year": 2014,
    "position": "Chair",
    "name": "MD NAVEED AHMED",
    "sortOrder": 0
  },
  {
    "year": 2014,
    "position": "Vice-Chair",
    "name": "TANVEER MD FAISAL ALAM",
    "sortOrder": 1
  },
  {
    "year": 2014,
    "position": "Secretary",
    "name": "SADITA AHMED",
    "sortOrder": 2
  },
  {
    "year": 2014,
    "position": "Treasurer",
    "name": "CHOWDHURY FARSAD AURANGZEB",
    "sortOrder": 3
  }
];
