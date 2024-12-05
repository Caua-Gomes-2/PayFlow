export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
}

export interface LoginCredentials {
  email: string;
  password: string;
}