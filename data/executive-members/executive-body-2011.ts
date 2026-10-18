export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2011: ExecutiveMember[] = [
  {
    "year": 2011,
    "position": "Chair",
    "name": "Tasneem Rumman Huq",
    "sortOrder": 0
  },
  {
    "year": 2011,
    "position": "Vice Chair",
    "name": "Jonayet hossain",
    "sortOrder": 1
  },
  {
    "year": 2011,
    "position": "Secretary",
    "name": "Mahmudul Hasan Oyon",
    "sortOrder": 2
  },
  {
    "year": 2011,
    "position": "Treasurer",
    "name": "Syedur Rahman Sakir",
    "sortOrder": 3
  }
];
