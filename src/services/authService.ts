
import { supabaseService } from './supabaseService';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface Project {
  id: string;
  name: string;
  type: 'travel' | 'cv' | 'logo' | 'social';
  status: 'مكتمل' | 'مسودة' | 'قيد التطوير';
  data: any;
  createdAt: string;
  updatedAt: string;
  downloads: number;
}

interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  data: any;
  createdAt: string;
  isCustom: boolean;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    this.initializeAuthState();
  }

  private async initializeAuthState() {
    try {
      const { data: { user } } = await supabaseService.getCurrentUser();
      if (user) {
        this.currentUser = {
          id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'مستخدم',
          email: user.email || '',
          createdAt: user.created_at
        };
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
    }

    // Listen for auth state changes
    supabaseService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        this.currentUser = {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'مستخدم',
          email: session.user.email || '',
          createdAt: session.user.created_at
        };
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
      }
    });
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await supabaseService.signIn(credentials.email, credentials.password);
    
    if (result.success && result.user) {
      this.currentUser = {
        id: result.user.id,
        name: result.user.user_metadata?.full_name || result.user.email?.split('@')[0] || 'مستخدم',
        email: result.user.email || '',
        createdAt: result.user.created_at
      };
      return { success: true, user: this.currentUser };
    }

    return { success: false, error: result.error || 'خطأ في تسجيل الدخول' };
  }

  async register(userData: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await supabaseService.signUp(userData.email, userData.password, userData.name);
    
    if (result.success && result.user) {
      // Note: user will be null until email verification
      return { success: true };
    }

    return { success: false, error: result.error || 'خطأ في إنشاء الحساب' };
  }

  async logout() {
    const result = await supabaseService.signOut();
    if (result.success) {
      this.currentUser = null;
    }
    return result;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Projects methods - now using Supabase
  async createProject(projectData: {
    name: string;
    type: 'travel' | 'cv' | 'logo' | 'social';
    data?: any;
  }) {
    return await supabaseService.createProject(projectData);
  }

  async getProjects(): Promise<Project[]> {
    const supabaseProjects = await supabaseService.getProjects();
    return supabaseProjects.map(project => ({
      id: project.id,
      name: project.name,
      type: project.type,
      status: project.status,
      data: project.data,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
      downloads: project.downloads
    }));
  }

  async updateProject(projectId: string, updates: Partial<Project>) {
    const supabaseUpdates: any = {};
    if (updates.name) supabaseUpdates.name = updates.name;
    if (updates.status) supabaseUpdates.status = updates.status;
    if (updates.data) supabaseUpdates.data = updates.data;
    if (updates.downloads !== undefined) supabaseUpdates.downloads = updates.downloads;

    return await supabaseService.updateProject(projectId, supabaseUpdates);
  }

  async deleteProject(projectId: string) {
    return await supabaseService.deleteProject(projectId);
  }

  // Templates methods
  async saveTemplate(templateData: {
    name: string;
    type: string;
    category: string;
    data: any;
  }) {
    return await supabaseService.saveTemplate(templateData);
  }

  async getTemplates(): Promise<Template[]> {
    const supabaseTemplates = await supabaseService.getTemplates();
    return supabaseTemplates.map(template => ({
      id: template.id,
      name: template.name,
      type: template.type,
      category: template.category,
      data: template.data,
      createdAt: template.created_at,
      isCustom: template.is_custom
    }));
  }

  // CV methods
  async saveCVData(cvData: any) {
    return await supabaseService.saveCVData(cvData);
  }

  async getCVData(): Promise<any[]> {
    const supabaseCVs = await supabaseService.getCVData();
    return supabaseCVs.map(cv => ({
      id: cv.id,
      data: cv.data,
      createdAt: cv.created_at,
      updatedAt: cv.updated_at
    }));
  }

  // User stats
  async getUserStats() {
    return await supabaseService.getUserStats();
  }
}

export const authService = new AuthService();
export type { User, LoginCredentials, RegisterData, Project, Template };
