
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateProjectModal = ({ open, onOpenChange }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<'travel' | 'cv' | 'logo' | 'social'>('travel');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المشروع",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await authService.createProject({
        name: projectName,
        type: projectType,
        data: {}
      });

      if (result.success) {
        toast({
          title: "تم إنشاء المشروع",
          description: "تم إنشاء المشروع بنجاح",
        });
        onOpenChange(false);
        setProjectName("");
        setProjectType('travel');
      } else {
        toast({
          title: "خطأ",
          description: result.error || "حدث خطأ أثناء إنشاء المشروع",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء المشروع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إنشاء مشروع جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">اسم المشروع</Label>
            <Input
              id="project-name"
              placeholder="أدخل اسم المشروع"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-type">نوع المشروع</Label>
            <Select value={projectType} onValueChange={(value: any) => setProjectType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع المشروع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">إعلان سفر</SelectItem>
                <SelectItem value="cv">سيرة ذاتية</SelectItem>
                <SelectItem value="logo">شعار</SelectItem>
                <SelectItem value="social">منشور اجتماعي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleCreateProject} disabled={loading} className="flex-1">
              {loading ? "جاري الإنشاء..." : "إنشاء المشروع"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
