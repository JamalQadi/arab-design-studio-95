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
  private baseUrl = 'http://localhost:3001/api';
  private currentUser: User | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  private loadUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        this.saveUserToStorage(data.user);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = savedUsers.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      this.saveUserToStorage(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  }

  async register(userData: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        this.saveUserToStorage(data.user);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUsers.find((u: any) => u.email === userData.email)) {
      return { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString(),
    };

    savedUsers.push({ ...newUser, password: userData.password });
    localStorage.setItem('users', JSON.stringify(savedUsers));
    this.saveUserToStorage(newUser);

    return { success: true, user: newUser };
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // إدارة المشاريع
  async createProject(projectData: {
    name: string;
    type: 'travel' | 'cv' | 'logo' | 'social';
    data?: any;
  }): Promise<{ success: boolean; project?: Project; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.currentUser.id,
          ...projectData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, project: data.project };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      type: projectData.type,
      status: 'مسودة',
      data: projectData.data || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloads: 0,
    };

    const userProjects = JSON.parse(localStorage.getItem(`projects_${this.currentUser.id}`) || '[]');
    userProjects.push(newProject);
    localStorage.setItem(`projects_${this.currentUser.id}`, JSON.stringify(userProjects));

    return { success: true, project: newProject };
  }

  async getProjects(): Promise<Project[]> {
    if (!this.currentUser) return [];

    try {
      const response = await fetch(`${this.baseUrl}/projects/user/${this.currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        return data.projects || [];
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    return JSON.parse(localStorage.getItem(`projects_${this.currentUser.id}`) || '[]');
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        return { success: true };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const userProjects = JSON.parse(localStorage.getItem(`projects_${this.currentUser.id}`) || '[]');
    const projectIndex = userProjects.findIndex((p: Project) => p.id === projectId);
    
    if (projectIndex !== -1) {
      userProjects[projectIndex] = { 
        ...userProjects[projectIndex], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem(`projects_${this.currentUser.id}`, JSON.stringify(userProjects));
      return { success: true };
    }

    return { success: false, error: 'المشروع غير موجود' };
  }

  async deleteProject(projectId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return { success: true };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const userProjects = JSON.parse(localStorage.getItem(`projects_${this.currentUser.id}`) || '[]');
    const filteredProjects = userProjects.filter((p: Project) => p.id !== projectId);
    localStorage.setItem(`projects_${this.currentUser.id}`, JSON.stringify(filteredProjects));
    
    return { success: true };
  }

  // إدارة القوالب
  async saveTemplate(templateData: {
    name: string;
    type: string;
    category: string;
    data: any;
  }): Promise<{ success: boolean; template?: Template; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً' };
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: templateData.name,
      type: templateData.type,
      category: templateData.category,
      data: templateData.data,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    const userTemplates = JSON.parse(localStorage.getItem(`templates_${this.currentUser.id}`) || '[]');
    userTemplates.push(newTemplate);
    localStorage.setItem(`templates_${this.currentUser.id}`, JSON.stringify(userTemplates));

    return { success: true, template: newTemplate };
  }

  async getTemplates(): Promise<Template[]> {
    if (!this.currentUser) return [];
    return JSON.parse(localStorage.getItem(`templates_${this.currentUser.id}`) || '[]');
  }

  // إحصائيات المستخدم
  async getUserStats(): Promise<{
    totalProjects: number;
    completedProjects: number;
    totalDownloads: number;
    averageRating: number;
    workingHours: number;
  }> {
    if (!this.currentUser) {
      return {
        totalProjects: 0,
        completedProjects: 0,
        totalDownloads: 0,
        averageRating: 0,
        workingHours: 0,
      };
    }

    const projects = await this.getProjects();
    const completedProjects = projects.filter(p => p.status === 'مكتمل').length;
    const totalDownloads = projects.reduce((sum, p) => sum + p.downloads, 0);

    return {
      totalProjects: projects.length,
      completedProjects,
      totalDownloads,
      averageRating: 4.8, // قيمة افتراضية
      workingHours: projects.length * 3, // تقدير 3 ساعات لكل مشروع
    };
  }

  async saveCVData(cvData: any): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/cv/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.currentUser.id,
          cvData: cvData,
        }),
      });

      if (response.ok) {
        return { success: true };
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    const userCVs = JSON.parse(localStorage.getItem(`cv_${this.currentUser.id}`) || '[]');
    userCVs.push({
      id: Date.now().toString(),
      data: cvData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(`cv_${this.currentUser.id}`, JSON.stringify(userCVs));

    return { success: true };
  }

  async getCVData(): Promise<any[]> {
    if (!this.currentUser) {
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/cv/user/${this.currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        return data.cvs || [];
      }
    } catch (error) {
      console.log('API غير متاح، سيتم استخدام التخزين المحلي:', error);
    }

    return JSON.parse(localStorage.getItem(`cv_${this.currentUser.id}`) || '[]');
  }
}

export const authService = new AuthService();
export type { User, LoginCredentials, RegisterData, Project, Template };
