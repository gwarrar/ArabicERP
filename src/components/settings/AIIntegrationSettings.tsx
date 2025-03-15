import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Bot,
  Brain,
  Zap,
  Key,
  Lock,
  Info,
  Check,
} from "lucide-react";

const AIIntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState("openai");
  const [openAIKey, setOpenAIKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [mistralKey, setMistralKey] = useState("");
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({
    openai: false,
    gemini: false,
    claude: false,
    mistral: false,
  });

  const handleSaveKey = (provider: string) => {
    setSavedKeys((prev) => ({ ...prev, [provider]: true }));
    // Here you would actually save the key to your backend
  };

  const renderOpenAISettings = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-green-100 to-blue-100 p-3 rounded-md">
          <Bot className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">OpenAI (ChatGPT)</h3>
          <p className="text-sm text-muted-foreground">
            تكامل مع نماذج OpenAI مثل GPT-4 وGPT-3.5 لتحسين قدرات المساعد الذكي
          </p>
          {savedKeys.openai && (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
              <Check className="h-3 w-3" /> متصل
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-key">مفتاح API الخاص بـ OpenAI</Label>
          <div className="flex gap-2">
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
            />
            <Button
              onClick={() => handleSaveKey("openai")}
              disabled={!openAIKey.trim().startsWith("sk-")}
            >
              حفظ
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            يمكنك الحصول على مفتاح API من{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              لوحة تحكم OpenAI
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label>النموذج الافتراضي</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>GPT-4o</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>GPT-3.5 Turbo</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="openai-system">تمكين المساعد الذكي</Label>
            <Switch id="openai-system" defaultChecked />
          </div>
          <p className="text-xs text-muted-foreground">
            تمكين استخدام نماذج OpenAI في المساعد الذكي للنظام
          </p>
        </div>
      </div>
    </div>
  );

  const renderGeminiSettings = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-md">
          <Brain className="h-8 w-8 text-blue-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Google Gemini</h3>
          <p className="text-sm text-muted-foreground">
            تكامل مع نماذج Google Gemini لتحسين قدرات المساعد الذكي
          </p>
          {savedKeys.gemini && (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
              <Check className="h-3 w-3" /> متصل
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gemini-key">مفتاح API الخاص بـ Google Gemini</Label>
          <div className="flex gap-2">
            <Input
              id="gemini-key"
              type="password"
              placeholder="AIza..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />
            <Button
              onClick={() => handleSaveKey("gemini")}
              disabled={!geminiKey.trim().startsWith("AIza")}
            >
              حفظ
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            يمكنك الحصول على مفتاح API من{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label>النموذج الافتراضي</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Gemini Pro</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-500" />
                <span>Gemini Ultra</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="gemini-system">تمكين المساعد الذكي</Label>
            <Switch id="gemini-system" />
          </div>
          <p className="text-xs text-muted-foreground">
            تمكين استخدام نماذج Google Gemini في المساعد الذكي للنظام
          </p>
        </div>
      </div>
    </div>
  );

  const renderClaudeSettings = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-md">
          <Bot className="h-8 w-8 text-purple-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Anthropic Claude</h3>
          <p className="text-sm text-muted-foreground">
            تكامل مع نماذج Anthropic Claude لتحسين قدرات المساعد الذكي
          </p>
          {savedKeys.claude && (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
              <Check className="h-3 w-3" /> متصل
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="claude-key">مفتاح API الخاص بـ Anthropic</Label>
          <div className="flex gap-2">
            <Input
              id="claude-key"
              type="password"
              placeholder="sk-ant-..."
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
            />
            <Button
              onClick={() => handleSaveKey("claude")}
              disabled={!claudeKey.trim().startsWith("sk-ant")}
            >
              حفظ
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            يمكنك الحصول على مفتاح API من{" "}
            <a
              href="https://console.anthropic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              لوحة تحكم Anthropic
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label>النموذج الافتراضي</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>Claude 3 Opus</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-500" />
                <span>Claude 3 Sonnet</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="claude-system">تمكين المساعد الذكي</Label>
            <Switch id="claude-system" />
          </div>
          <p className="text-xs text-muted-foreground">
            تمكين استخدام نماذج Claude في المساعد الذكي للنظام
          </p>
        </div>
      </div>
    </div>
  );

  const renderMistralSettings = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-3 rounded-md">
          <Bot className="h-8 w-8 text-cyan-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Mistral AI</h3>
          <p className="text-sm text-muted-foreground">
            تكامل مع نماذج Mistral AI لتحسين قدرات المساعد الذكي
          </p>
          {savedKeys.mistral && (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
              <Check className="h-3 w-3" /> متصل
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mistral-key">مفتاح API الخاص بـ Mistral AI</Label>
          <div className="flex gap-2">
            <Input
              id="mistral-key"
              type="password"
              placeholder="..."
              value={mistralKey}
              onChange={(e) => setMistralKey(e.target.value)}
            />
            <Button
              onClick={() => handleSaveKey("mistral")}
              disabled={!mistralKey.trim()}
            >
              حفظ
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            يمكنك الحصول على مفتاح API من{" "}
            <a
              href="https://console.mistral.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              لوحة تحكم Mistral AI
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label>النموذج الافتراضي</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-500" />
                <span>Mistral Large</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Mistral Medium</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="mistral-system">تمكين المساعد الذكي</Label>
            <Switch id="mistral-system" />
          </div>
          <p className="text-xs text-muted-foreground">
            تمكين استخدام نماذج Mistral AI في المساعد الذكي للنظام
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          إعدادات تكامل الذكاء الاصطناعي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-blue-800">معلومات هامة</h4>
                <p className="text-sm text-blue-700">
                  يتطلب استخدام خدمات الذكاء الاصطناعي مفاتيح API صالحة من مزودي
                  الخدمة. يرجى التأكد من أن لديك حسابات نشطة مع المزودين
                  المختارين وأن لديك رصيد كافٍ لاستخدام خدماتهم.
                </p>
                <p className="text-sm text-blue-700">
                  مفاتيح API الخاصة بك محمية ومشفرة ولا يتم مشاركتها مع أي طرف
                  ثالث.
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-md">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
              dir="rtl"
            >
              <TabsList className="w-full justify-start border-b rounded-none p-0">
                <TabsTrigger
                  value="openai"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex-1 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span>OpenAI</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="gemini"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex-1 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>Google Gemini</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="claude"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex-1 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span>Claude</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="mistral"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex-1 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span>Mistral AI</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="openai" className="m-0">
                  {renderOpenAISettings()}
                </TabsContent>
                <TabsContent value="gemini" className="m-0">
                  {renderGeminiSettings()}
                </TabsContent>
                <TabsContent value="claude" className="m-0">
                  {renderClaudeSettings()}
                </TabsContent>
                <TabsContent value="mistral" className="m-0">
                  {renderMistralSettings()}
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              إعدادات عامة للذكاء الاصطناعي
            </h3>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-assistant">تمكين المساعد الذكي</Label>
                  <p className="text-xs text-muted-foreground">
                    تمكين استخدام المساعد الذكي في جميع أنحاء النظام
                  </p>
                </div>
                <Switch id="ai-assistant" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-suggestions">اقتراحات ذكية</Label>
                  <p className="text-xs text-muted-foreground">
                    تمكين الاقتراحات الذكية أثناء إدخال البيانات
                  </p>
                </div>
                <Switch id="ai-suggestions" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-analytics">تحليلات ذكية</Label>
                  <p className="text-xs text-muted-foreground">
                    تمكين التحليلات الذكية للبيانات والتقارير
                  </p>
                </div>
                <Switch id="ai-analytics" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-privacy">وضع الخصوصية المحسن</Label>
                  <p className="text-xs text-muted-foreground">
                    تقييد مشاركة البيانات الحساسة مع نماذج الذكاء الاصطناعي
                  </p>
                </div>
                <Switch id="ai-privacy" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIntegrationSettings;
