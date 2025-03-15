import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, Zap, Webhook, Link, Plus } from "lucide-react";

const WorkflowIntegration = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">تكامل سير العمل</h3>
          <p className="text-muted-foreground">
            ربط سير العمل مع وحدات النظام المختلفة
          </p>
        </div>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إنشاء تكامل جديد
        </Button>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">التكاملات النشطة</TabsTrigger>
          <TabsTrigger value="modules">وحدات النظام</TabsTrigger>
          <TabsTrigger value="api">واجهة برمجة التطبيقات</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>التكاملات النشطة</CardTitle>
              <CardDescription>
                قائمة بجميع التكاملات النشطة بين سير العمل ووحدات النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Link className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2">
                  لا توجد تكاملات نشطة
                </h3>
                <p className="max-w-md">
                  قم بإنشاء تكامل جديد لربط سير العمل مع وحدات النظام المختلفة
                </p>
                <Button className="mt-4">
                  <Plus className="ml-2 h-4 w-4" />
                  إنشاء تكامل جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">المشتريات</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">الأحداث</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>إنشاء طلب شراء</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>الموافقة على طلب شراء</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>استلام بضاعة</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">الإجراءات</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>إنشاء طلب شراء</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>الموافقة على طلب شراء</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">المبيعات</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">الأحداث</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>إنشاء طلب مبيعات</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>إنشاء فاتورة</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>استلام دفعة</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">الإجراءات</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>إنشاء فاتورة</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>إرسال إشعار للعميل</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg">الموارد البشرية</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">الأحداث</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>تقديم طلب إجازة</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Webhook className="h-3 w-3 text-blue-600" />
                        <span>الموافقة على طلب إجازة</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">الإجراءات</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>إنشاء طلب إجازة</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-600" />
                        <span>الموافقة على طلب إجازة</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>واجهة برمجة التطبيقات (API)</CardTitle>
              <CardDescription>
                استخدم واجهة برمجة التطبيقات للتكامل مع سير العمل من خلال
                تطبيقات خارجية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <GitBranch className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2">قريباً</h3>
                <p className="max-w-md">
                  سيتم توفير واجهة برمجة التطبيقات للتكامل مع سير العمل قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowIntegration;
