import { supabaseService } from './supabaseService';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  type: 'travel' | 'cv' | 'logo' | 'social';
  status: string;
  data: any;
  downloads: number;
  created_at: string;
  updated_at: string;
}

class AuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginCredentials) {
    try {
      const result = await supabaseService.signIn(credentials.email, credentials.password);
      
      if (result.success && result.user) {
        this.currentUser = {
          id: result.user.id,
          email: result.user.email || '',
          name: result.user.user_metadata?.full_name || result.user.email || '',
        };
        
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        
        return { success: true, user: this.currentUser };
      }
      
      return { success: false, error: result.error };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'حدث خطأ أثناء تسجيل الدخول' };
    }
  }

  async register(credentials: RegisterCredentials) {
    try {
      const result = await supabaseService.signUp(
        credentials.email, 
        credentials.password, 
        credentials.name
      );
      
      if (result.success && result.user) {
        this.currentUser = {
          id: result.user.id,
          email: result.user.email || '',
          name: result.user.user_metadata?.full_name || credentials.name,
        };
        
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        
        return { success: true, user: this.currentUser };
      }
      
      return { success: result.success, error: result.error };
    } catch (error: any) {
      console.error('Register error:', error);
      return { success: false, error: error.message || 'حدث خطأ أثناء إنشاء الحساب' };
    }
  }

  async logout() {
    try {
      await supabaseService.signOut();
      this.currentUser = null;
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    // Try to get user from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
    }
    
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Project management methods using supabaseService
  async createProject(project: { 
    name: string; 
    type: 'travel' | 'cv' | 'logo' | 'social'; 
    data?: any; 
  }) {
    return await supabaseService.createProject(project);
  }

  async getProjects() {
    return await supabaseService.getProjects();
  }

  async updateProject(projectId: string, updates: any) {
    return await supabaseService.updateProject(projectId, updates);
  }

  async deleteProject(projectId: string) {
    return await supabaseService.deleteProject(projectId);
  }

  async getUserStats() {
    return await supabaseService.getUserStats();
  }

  // CV methods
  async saveCVData(cvData: any) {
    return await supabaseService.saveCVData(cvData);
  }

  async getCVData() {
    return await supabaseService.getCVData();
  }

  // Templates methods
  async getTemplates() {
    return await supabaseService.getTemplates();
  }

  async saveTemplate(templateData: {
    name: string;
    type: string;
    category: string;
    data: any;
  }) {
    return await supabaseService.saveTemplate(templateData);
  }
}

export const authService = new AuthService();
