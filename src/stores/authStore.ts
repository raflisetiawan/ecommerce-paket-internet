import {create} from 'zustand';
import { AuthenticatedUser } from '../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: AuthenticatedUser | null; 
  setUser: (user: AuthenticatedUser) => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),

  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
}));
