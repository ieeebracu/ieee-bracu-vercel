export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2012: ExecutiveMember[] = [
  {
    "year": 2012,
    "position": "Chair",
    "name": "Sabbir Ahmed Khan",
    "sortOrder": 0
  },
  {
    "year": 2012,
    "position": "Vice-Chair",
    "name": "Musa Sunny",
    "sortOrder": 1
  },
  {
    "year": 2012,
    "position": "Secretary",
    "name": "Farah Shabnam",
    "sortOrder": 2
  },
  {
    "year": 2012,
    "position": "Treasurer",
    "name": "Ahmed Hosne Zenan",
    "sortOrder": 3
  }
];
