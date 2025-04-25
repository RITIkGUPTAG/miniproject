export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: Skill[];
  github?: string;
  linkedin?: string;
  website?: string;
  avatarUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}