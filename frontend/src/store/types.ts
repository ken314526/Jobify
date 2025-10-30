export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  jwtToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface Job {
  _id?: string;
  title: string;
  description: string;
  companyName: string;
  lastDate: string;
  postedDate: string;
  status: 'active' | 'closed';
  userId?: string;
}

export interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}