
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

type Template = Database['public']['Tables']['templates']['Row'];
type TemplateInsert = Database['public']['Tables']['templates']['Insert'];

type CV = Database['public']['Tables']['cvs']['Row'];
type CVInsert = Database['public']['Tables']['cvs']['Insert'];

export class SupabaseService {
  
  // Authentication methods
  async signUp(email: string, password: string, fullName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      
      toast.success('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني');
      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error(error.message || 'خطأ في إنشاء الحساب');
      return { success: false, error: error.message };
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('تم تسجيل الدخول بنجاح');
      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'خطأ في تسجيل الدخول');
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('تم تسجيل الخروج بنجاح');
      return { success: true };
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('خطأ في تسجيل الخروج');
      return { success: false, error: error.message };
    }
  }

  getCurrentUser() {
    return supabase.auth.getUser();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Projects methods
  async createProject(projectData: {
    name: string;
    type: 'travel' | 'cv' | 'logo' | 'social';
    data?: any;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const newProject: ProjectInsert = {
        user_id: user.id,
        name: projectData.name,
        type: projectData.type,
        data: projectData.data || {},
        status: 'مسودة'
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم إنشاء المشروع بنجاح');
      return { success: true, project: data };
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast.error(error.message || 'خطأ في إنشاء المشروع');
      return { success: false, error: error.message };
    }
  }

  async getProjects() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast.error('خطأ في جلب المشاريع');
      return [];
    }
  }

  async updateProject(projectId: string, updates: ProjectUpdate) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم تحديث المشروع بنجاح');
      return { success: true, project: data };
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast.error(error.message || 'خطأ في تحديث المشروع');
      return { success: false, error: error.message };
    }
  }

  async deleteProject(projectId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('تم حذف المشروع بنجاح');
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error(error.message || 'خطأ في حذف المشروع');
      return { success: false, error: error.message };
    }
  }

  // Templates methods
  async saveTemplate(templateData: {
    name: string;
    type: string;
    category: string;
    data: any;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const newTemplate: TemplateInsert = {
        user_id: user.id,
        name: templateData.name,
        type: templateData.type,
        category: templateData.category,
        data: templateData.data,
        is_custom: true
      };

      const { data, error } = await supabase
        .from('templates')
        .insert(newTemplate)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم حفظ القالب بنجاح');
      return { success: true, template: data };
    } catch (error: any) {
      console.error('Error saving template:', error);
      toast.error(error.message || 'خطأ في حفظ القالب');
      return { success: false, error: error.message };
    }
  }

  async getTemplates() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      toast.error('خطأ في جلب القوالب');
      return [];
    }
  }

  // CV methods
  async saveCVData(cvData: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const newCV: CVInsert = {
        user_id: user.id,
        data: cvData
      };

      const { data, error } = await supabase
        .from('cvs')
        .insert(newCV)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم حفظ السيرة الذاتية بنجاح');
      return { success: true, cv: data };
    } catch (error: any) {
      console.error('Error saving CV:', error);
      toast.error(error.message || 'خطأ في حفظ السيرة الذاتية');
      return { success: false, error: error.message };
    }
  }

  async getCVData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching CVs:', error);
      toast.error('خطأ في جلب السير الذاتية');
      return [];
    }
  }

  // User stats
  async getUserStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return {
          totalProjects: 0,
          completedProjects: 0,
          totalDownloads: 0,
          averageRating: 0,
          workingHours: 0,
        };
      }

      const { data: projects, error } = await supabase
        .from('projects')
        .select('status, downloads')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalProjects = projects?.length || 0;
      const completedProjects = projects?.filter(p => p.status === 'مكتمل').length || 0;
      const totalDownloads = projects?.reduce((sum, p) => sum + (p.downloads || 0), 0) || 0;

      return {
        totalProjects,
        completedProjects,
        totalDownloads,
        averageRating: 4.8, // قيمة افتراضية
        workingHours: totalProjects * 3, // تقدير 3 ساعات لكل مشروع
      };
    } catch (error: any) {
      console.error('Error fetching user stats:', error);
      return {
        totalProjects: 0,
        completedProjects: 0,
        totalDownloads: 0,
        averageRating: 0,
        workingHours: 0,
      };
    }
  }
}

export const supabaseService = new SupabaseService();
