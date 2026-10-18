export interface ExecutiveMember {
  year: number;
  position?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export const executiveBody2008: ExecutiveMember[] = [
  {
    "year": 2008,
    "position": "Chair",
    "name": "Mahdin Mahboob",
    "sortOrder": 0
  },
  {
    "year": 2008,
    "position": "Vice Chair",
    "name": "Sunjib Kumer Singha",
    "sortOrder": 1
  },
  {
    "year": 2008,
    "position": "Secretary",
    "name": "Nabila Naushin",
    "sortOrder": 2
  },
  {
    "year": 2008,
    "position": "Treasurer",
    "name": "Annajiat Alim Rasel",
    "sortOrder": 3
  }
];
