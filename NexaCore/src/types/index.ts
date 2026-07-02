export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  short_bio: string;
  full_bio: string;
  email: string;
  linkedin: string;
  twitter: string;
  github: string;
  skills: string[];
  experience: string;
  education: string;
  achievements: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  company: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
