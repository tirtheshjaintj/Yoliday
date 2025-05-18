export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  imageUrl: string;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}