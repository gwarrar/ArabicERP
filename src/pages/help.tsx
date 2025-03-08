import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Book, MessageSquare, Video } from "lucide-react";

const Help = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">المساعدة</h1>

        <Tabs defaultValue="guide" className="w-full" dir="rtl">
          <TabsList className="mb-4">
            <TabsTrigger value="guide">
              <Book className="h-4 w-4 ml-2" />
              دليل المستخدم
            </TabsTrigger>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 ml-2" />
              الأسئلة الشائعة
            </TabsTrigger>
            <TabsTrigger value="support">
              <MessageSquare className="h-4 w-4 ml-2" />
              الدعم الفني
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <Video className="h-4 w-4 ml-2" />
              الفيديوهات التعليمية
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>دليل المستخدم</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  هنا سيتم عرض دليل المستخدم الشامل للنظام
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  هنا سيتم عرض الأسئلة الشائعة وإجاباتها
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>الدعم الفني</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  هنا سيتم عرض نموذج التواصل مع الدعم الفني
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials">
            <Card>
              <CardHeader>
                <CardTitle>الفيديوهات التعليمية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  هنا سيتم عرض الفيديوهات التعليمية للنظام
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Help;
