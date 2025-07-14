
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Organization = Database['public']['Tables']['organizations']['Row'];
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert'];
type OrganizationUpdate = Database['public']['Tables']['organizations']['Update'];

type UploadedImage = Database['public']['Tables']['uploaded_images']['Row'];
type UploadedImageInsert = Database['public']['Tables']['uploaded_images']['Insert'];

export class OrganizationService {
  
  // Organization methods
  async createOrganization(orgData: Omit<OrganizationInsert, 'user_id'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const newOrg: OrganizationInsert = {
        user_id: user.id,
        ...orgData
      };

      const { data, error } = await supabase
        .from('organizations')
        .insert(newOrg)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم إنشاء المؤسسة بنجاح');
      return { success: true, organization: data };
    } catch (error: any) {
      console.error('Error creating organization:', error);
      toast.error(error.message || 'خطأ في إنشاء المؤسسة');
      return { success: false, error: error.message };
    }
  }

  async getOrganizations() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching organizations:', error);
      toast.error('خطأ في جلب المؤسسات');
      return [];
    }
  }

  async getOrganization(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { success: false, error: 'غير مسجل دخول' };

      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { success: true, organization: data };
    } catch (error: any) {
      console.error('Error fetching organization:', error);
      return { success: false, error: error.message };
    }
  }

  async updateOrganization(id: string, updates: OrganizationUpdate) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم تحديث المؤسسة بنجاح');
      return { success: true, organization: data };
    } catch (error: any) {
      console.error('Error updating organization:', error);
      toast.error(error.message || 'خطأ في تحديث المؤسسة');
      return { success: false, error: error.message };
    }
  }

  async deleteOrganization(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('تم حذف المؤسسة بنجاح');
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting organization:', error);
      toast.error(error.message || 'خطأ في حذف المؤسسة');
      return { success: false, error: error.message };
    }
  }

  // Image methods
  async uploadImage(file: File, category: string = 'general') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      if (!file.type.startsWith('image/')) {
        throw new Error('يجب أن يكون الملف صورة');
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('حجم الصورة يجب أن يكون أقل من 10 ميجابايت');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      const imageData: UploadedImageInsert = {
        user_id: user.id,
        filename: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type,
        category: category
      };

      const { data, error } = await supabase
        .from('uploaded_images')
        .insert(imageData)
        .select()
        .single();

      if (error) throw error;

      toast.success('تم رفع الصورة بنجاح');
      return { success: true, image: data };
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'خطأ في رفع الصورة');
      return { success: false, error: error.message };
    }
  }

  async getImages(category?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase
        .from('uploaded_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  async deleteImage(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      const { error } = await supabase
        .from('uploaded_images')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('تم حذف الصورة بنجاح');
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error(error.message || 'خطأ في حذف الصورة');
      return { success: false, error: error.message };
    }
  }

  // Organization types
  getOrganizationTypes() {
    return [
      { id: 'travel_agency', name: 'مكتب سفر وسياحة', icon: '✈️' },
      { id: 'restaurant', name: 'مطعم', icon: '🍽️' },
      { id: 'office', name: 'مكتب', icon: '🏢' },
      { id: 'retail', name: 'متجر تجزئة', icon: '🛍️' },
      { id: 'service', name: 'خدمات', icon: '🔧' },
      { id: 'healthcare', name: 'رعاية صحية', icon: '🏥' },
      { id: 'education', name: 'تعليم', icon: '🎓' },
      { id: 'other', name: 'أخرى', icon: '📋' }
    ];
  }

  // External API integration support
  async syncWithExternalAPI(organizationId: string, apiEndpoint: string, apiKey?: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يجب تسجيل الدخول أولاً');

      // This method can be extended to sync with external APIs
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`خطأ في الاتصال مع الخدمة الخارجية: ${response.status}`);
      }

      const externalData = await response.json();
      
      // Store external data reference in organization
      const result = await this.updateOrganization(organizationId, {
        external_data: externalData,
        external_api_endpoint: apiEndpoint,
        last_sync: new Date().toISOString()
      });

      return { success: true, data: externalData };
    } catch (error: any) {
      console.error('Error syncing with external API:', error);
      return { success: false, error: error.message };
    }
  }

  // Template auto-fill helper
  fillTemplateWithOrganizationData(templateData: any, organization: Organization) {
    try {
      const filledData = JSON.parse(JSON.stringify(templateData));
      
      // Replace placeholders in template elements
      const replacePlaceholders = (obj: any) => {
        if (typeof obj === 'string') {
          return obj
            .replace(/\{\{organization\.name\}\}/g, organization.name || '')
            .replace(/\{\{organization\.phone\}\}/g, organization.phone || '')
            .replace(/\{\{organization\.email\}\}/g, organization.email || '')
            .replace(/\{\{organization\.address\}\}/g, organization.address || '')
            .replace(/\{\{organization\.website\}\}/g, organization.website || '')
            .replace(/\{\{organization\.city\}\}/g, organization.city || '')
            .replace(/\{\{organization\.country\}\}/g, organization.country || '');
        } else if (Array.isArray(obj)) {
          return obj.map(replacePlaceholders);
        } else if (obj && typeof obj === 'object') {
          const result: any = {};
          for (const key in obj) {
            result[key] = replacePlaceholders(obj[key]);
          }
          return result;
        }
        return obj;
      };

      return replacePlaceholders(filledData);
    } catch (error) {
      console.error('Error filling template with organization data:', error);
      return templateData;
    }
  }
}

export const organizationService = new OrganizationService();
