export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProjectInput {
  title: string;
  description: string;
  category: string;
  author: string;
  image_url: string;
}

export interface CartItem {
  id: number;
  project_id: number;
  user_id: number;
  created_at: Date;
}
