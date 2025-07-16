
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { systemCheckService } from '@/services/systemCheckService';
import { useToast } from '@/hooks/use-toast';

interface SystemCheckResult {
  component: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export const SystemHealthCheck = () => {
  const [results, setResults] = useState<SystemCheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const runSystemCheck = async () => {
    setIsChecking(true);
    try {
      const systemResults = await systemCheckService.performFullSystemCheck();
      const editorResults = await systemCheckService.checkEditorFunctionality();
      
      const allResults = [...systemResults, ...editorResults];
      setResults(allResults);
      
      const report = systemCheckService.generateSystemReport(allResults);
      console.log(report);
      
      const errorCount = allResults.filter(r => r.status === 'error').length;
      const warningCount = allResults.filter(r => r.status === 'warning').length;
      
      if (errorCount === 0 && warningCount === 0) {
        toast({
          title: "فحص النظام مكتمل",
          description: "جميع المكونات تعمل بشكل صحيح ✅",
        });
      } else if (errorCount === 0) {
        toast({
          title: "فحص النظام مكتمل",
          description: `تم اكتشاف ${warningCount} تحذير`,
        });
      } else {
        toast({
          title: "فحص النظام مكتمل",
          description: `تم اكتشاف ${errorCount} خطأ و ${warningCount} تحذير`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('System check failed:', error);
      toast({
        title: "خطأ في فحص النظام",
        description: "حدث خطأ أثناء فحص النظام",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">يعمل</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">تحذير</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير معروف</Badge>;
    }
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 ml-2 text-green-600" />
            فحص حالة النظام
          </CardTitle>
          <Button 
            onClick={runSystemCheck}
            disabled={isChecking}
            className="flex items-center"
          >
            <RefreshCw className={`w-4 h-4 ml-2 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'جاري الفحص...' : 'فحص النظام'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>اضغط على "فحص النظام" لبدء فحص شامل للنظام</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-green-700">يعمل بشكل صحيح</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                <div className="text-sm text-yellow-700">تحذيرات</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-red-700">أخطاء</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-3">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="font-medium text-gray-900">{result.component}</div>
                      <div className="text-sm text-gray-600">{result.message}</div>
                      {result.details && (
                        <div className="text-xs text-gray-500 mt-1">
                          {JSON.stringify(result.details)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
