import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Send,
  Bot,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  MessageSquare,
  FileSpreadsheet,
  BarChart3,
  Lightbulb,
  Clock,
  Loader2,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "pending" | "success" | "error";
  action?: {
    type: "invoice" | "journal" | "report";
    data: any;
    approved?: boolean;
  };
}

interface AIAssistantProps {
  onCreateInvoice?: (data: any) => void;
  onCreateJournalEntry?: (data: any) => void;
  onGenerateReport?: (data: any) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  onCreateInvoice,
  onCreateJournalEntry,
  onGenerateReport,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "مرحباً بك في مساعد الذكاء الاصطناعي للنظام المحاسبي. كيف يمكنني مساعدتك اليوم؟ يمكنني إنشاء فواتير، تسجيل قيود محاسبية، أو إعداد تقارير بناءً على طلبك.",
      timestamp: new Date(),
      status: "success",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample data for demonstration
  const sampleInvoiceData = {
    customer: "شركة الأمل للتجارة",
    date: new Date().toISOString().split("T")[0],
    items: [
      { name: "خدمات استشارية", quantity: 1, price: 5000, total: 5000 },
      { name: "تطوير برمجيات", quantity: 2, price: 2500, total: 5000 },
    ],
    subtotal: 10000,
    tax: 1500,
    total: 11500,
  };

  const sampleJournalEntryData = {
    date: new Date().toISOString().split("T")[0],
    reference: "JE-" + Math.floor(Math.random() * 10000),
    description: "تسجيل إيرادات خدمات استشارية",
    entries: [
      { account: "الصندوق", debit: 11500, credit: 0 },
      { account: "إيرادات الخدمات", debit: 0, credit: 10000 },
      { account: "ضريبة القيمة المضافة", debit: 0, credit: 1500 },
    ],
    total: 11500,
  };

  const sampleReportData = {
    title: "تقرير المبيعات الشهري",
    period: "يوليو 2024",
    summary: {
      totalSales: 145000,
      totalExpenses: 87500,
      netProfit: 57500,
      taxAmount: 21750,
    },
    topCustomers: [
      { name: "شركة الأمل للتجارة", amount: 45000 },
      { name: "مؤسسة النور", amount: 32000 },
      { name: "شركة البناء الحديث", amount: 28000 },
    ],
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      processUserMessage(newUserMessage);
      setIsProcessing(false);
    }, 1500);
  };

  const processUserMessage = (userMessage: Message) => {
    const content = userMessage.content.toLowerCase();
    let responseMessage: Message;

    // Check for invoice creation request
    if (
      content.includes("فاتورة") ||
      content.includes("انشاء فاتورة") ||
      content.includes("إنشاء فاتورة")
    ) {
      responseMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "لقد قمت بتحليل طلبك وإعداد فاتورة بناءً على المعلومات المتوفرة. يرجى مراجعة تفاصيل الفاتورة والموافقة عليها لإتمام العملية.",
        timestamp: new Date(),
        status: "success",
        action: {
          type: "invoice",
          data: sampleInvoiceData,
        },
      };
    }
    // Check for journal entry request
    else if (
      content.includes("قيد") ||
      content.includes("قيد محاسبي") ||
      content.includes("تسجيل قيد")
    ) {
      responseMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "لقد قمت بإعداد قيد محاسبي بناءً على طلبك. يرجى مراجعة تفاصيل القيد والموافقة عليه لإتمام عملية التسجيل.",
        timestamp: new Date(),
        status: "success",
        action: {
          type: "journal",
          data: sampleJournalEntryData,
        },
      };
    }
    // Check for report request
    else if (
      content.includes("تقرير") ||
      content.includes("تقارير") ||
      content.includes("احصائيات")
    ) {
      responseMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "لقد قمت بإعداد التقرير المطلوب. يمكنك الاطلاع على ملخص التقرير أدناه أو تحميل النسخة الكاملة.",
        timestamp: new Date(),
        status: "success",
        action: {
          type: "report",
          data: sampleReportData,
        },
      };
    }
    // General response
    else {
      responseMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "شكراً لتواصلك معي. يمكنني مساعدتك في إنشاء الفواتير، تسجيل القيود المحاسبية، أو إعداد التقارير. يرجى توضيح ما تحتاجه بالتحديد.",
        timestamp: new Date(),
        status: "success",
      };
    }

    setMessages((prev) => [...prev, responseMessage]);

    // If there's an action, show approval dialog
    if (responseMessage.action) {
      setCurrentAction(responseMessage.action);
      setShowApprovalDialog(true);
    }
  };

  const handleApproveAction = () => {
    if (!currentAction) return;

    // Update the message to show it's approved
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.action && msg.action.type === currentAction.type) {
          return {
            ...msg,
            action: { ...msg.action, approved: true },
          };
        }
        return msg;
      }),
    );

    // Call the appropriate handler based on action type
    switch (currentAction.type) {
      case "invoice":
        onCreateInvoice && onCreateInvoice(currentAction.data);
        break;
      case "journal":
        onCreateJournalEntry && onCreateJournalEntry(currentAction.data);
        break;
      case "report":
        onGenerateReport && onGenerateReport(currentAction.data);
        break;
    }

    // Add confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        currentAction.type === "invoice"
          ? "تمت الموافقة على الفاتورة وإضافتها إلى النظام بنجاح."
          : currentAction.type === "journal"
            ? "تم تسجيل القيد المحاسبي بنجاح في دفتر اليومية."
            : "تم إنشاء التقرير بنجاح ويمكنك الوصول إليه من قسم التقارير.",
      timestamp: new Date(),
      status: "success",
    };

    setMessages((prev) => [...prev, confirmationMessage]);
    setShowApprovalDialog(false);
    setCurrentAction(null);
  };

  const handleRejectAction = () => {
    if (!currentAction) return;

    // Add rejection message
    const rejectionMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "تم رفض الإجراء. هل يمكنك توضيح التغييرات المطلوبة حتى أتمكن من تعديل البيانات وفقاً لاحتياجاتك؟",
      timestamp: new Date(),
      status: "success",
    };

    setMessages((prev) => [...prev, rejectionMessage]);
    setShowApprovalDialog(false);
    setCurrentAction(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderActionContent = (action: any) => {
    switch (action.type) {
      case "invoice":
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-blue-800 flex items-center">
                <FileText className="h-4 w-4 ml-1" />
                فاتورة مبيعات
              </h4>
              {action.approved && (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> تمت الموافقة
                </Badge>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">العميل:</span>
                <span className="font-medium">{action.data.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">التاريخ:</span>
                <span>{action.data.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع:</span>
                <span className="font-medium">
                  {action.data.total.toLocaleString()} ₴
                </span>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                انقر للاطلاع على التفاصيل الكاملة
              </div>
            </div>
          </div>
        );

      case "journal":
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-md p-3 mt-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-purple-800 flex items-center">
                <FileSpreadsheet className="h-4 w-4 ml-1" />
                قيد محاسبي
              </h4>
              {action.approved && (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> تم التسجيل
                </Badge>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المرجع:</span>
                <span className="font-medium">{action.data.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">التاريخ:</span>
                <span>{action.data.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">البيان:</span>
                <span className="font-medium truncate max-w-[200px]">
                  {action.data.description}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المبلغ:</span>
                <span className="font-medium">
                  {action.data.total.toLocaleString()} ₴
                </span>
              </div>
              <div className="mt-2 text-xs text-purple-600">
                انقر للاطلاع على تفاصيل القيد
              </div>
            </div>
          </div>
        );

      case "report":
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-amber-800 flex items-center">
                <BarChart3 className="h-4 w-4 ml-1" />
                {action.data.title}
              </h4>
              {action.approved && (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> تم الإنشاء
                </Badge>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفترة:</span>
                <span className="font-medium">{action.data.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المبيعات:</span>
                <span className="font-medium">
                  {action.data.summary.totalSales.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">صافي الربح:</span>
                <span className="font-medium">
                  {action.data.summary.netProfit.toLocaleString()} ₴
                </span>
              </div>
              <div className="mt-2 text-xs text-amber-600">
                انقر لعرض التقرير الكامل
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === "user";

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${isUser ? "mr-2 bg-primary text-primary-foreground" : "ml-2 bg-muted"}`}
          >
            {isUser ? (
              <User className="h-5 w-5" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </div>
          <div>
            <div
              className={`rounded-lg px-4 py-2 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              <div className="text-sm">{message.content}</div>
            </div>
            {message.action && renderActionContent(message.action)}
            <div
              className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-left" : "text-right"}`}
            >
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSuggestions = () => {
    const suggestions = [
      "أنشئ فاتورة مبيعات لشركة الأمل بقيمة 10000 ₴",
      "سجل قيد محاسبي لمصروفات الإيجار الشهرية",
      "أعطني تقرير المبيعات للشهر الحالي",
      "ما هو إجمالي الإيرادات لهذا الربع؟",
      "قم بإنشاء قيد تسوية لحساب البنك",
    ];

    return (
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">اقتراحات:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderChatTab = () => (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(renderMessage)}
          {isProcessing && (
            <div className="flex justify-start mb-4">
              <div className="flex">
                <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ml-2 bg-muted">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin ml-2" />
                      <span className="text-sm">جاري التحليل...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        {messages.length <= 2 && renderSuggestions()}
        <div className="flex items-center mt-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="ml-2"
            disabled={isProcessing || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCapabilitiesTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">قدرات المساعد الذكي</h3>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <FileText className="h-5 w-5 ml-2 text-blue-600" />
              إنشاء الفواتير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              يمكن للمساعد إنشاء فواتير المبيعات والمشتريات تلقائياً بناءً على
              وصفك. ما عليك سوى وصف تفاصيل الفاتورة وسيقوم بإعدادها لمراجعتك
              والموافقة عليها.
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                مثال: أنشئ فاتورة مبيعات لشركة الأمل بقيمة 5000 ₴
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <FileSpreadsheet className="h-5 w-5 ml-2 text-purple-600" />
              تسجيل القيود المحاسبية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              يمكن للمساعد إنشاء قيود محاسبية متوازنة بناءً على وصف العملية
              المالية. سيقوم بتحديد الحسابات المناسبة وإعداد القيد لمراجعتك قبل
              التسجيل النهائي.
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                مثال: سجل قيد محاسبي لدفع إيجار المكتب بمبلغ 3000 ₴
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BarChart3 className="h-5 w-5 ml-2 text-amber-600" />
              إعداد التقارير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              يمكن للمساعد إنشاء تقارير مالية وإحصائية مختلفة بناءً على بيانات
              النظام. يمكنك طلب تقارير المبيعات، الأرباح، المصروفات، أو أي
              معلومات مالية أخرى.
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                مثال: أعطني تقرير المبيعات للربع الأول
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Lightbulb className="h-5 w-5 ml-2 text-green-600" />
              تقديم النصائح والتحليلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              يمكن للمساعد تحليل البيانات المالية وتقديم نصائح لتحسين الأداء
              المالي للشركة، مثل تحديد فرص خفض التكاليف أو زيادة الإيرادات.
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                مثال: قدم لي نصائح لتحسين التدفق النقدي
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHistoryTab = () => {
    // Group messages by date
    const groupedMessages: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const date = message.timestamp.toISOString().split("T")[0];
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">سجل المحادثات</h3>

        <div className="space-y-6">
          {Object.entries(groupedMessages)
            .sort(
              ([dateA], [dateB]) =>
                new Date(dateB).getTime() - new Date(dateA).getTime(),
            )
            .map(([date, msgs]) => {
              // Format the date in Arabic
              const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div key={date} className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex-grow h-px bg-muted"></div>
                    <span className="px-2 text-sm text-muted-foreground">
                      {formattedDate}
                    </span>
                    <div className="flex-grow h-px bg-muted"></div>
                  </div>

                  {msgs
                    .filter((msg) => msg.action)
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className="border rounded-md p-3 hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {msg.action?.type === "invoice" && (
                              <FileText className="h-4 w-4 ml-2 text-blue-600" />
                            )}
                            {msg.action?.type === "journal" && (
                              <FileSpreadsheet className="h-4 w-4 ml-2 text-purple-600" />
                            )}
                            {msg.action?.type === "report" && (
                              <BarChart3 className="h-4 w-4 ml-2 text-amber-600" />
                            )}
                            <span className="font-medium">
                              {msg.action?.type === "invoice"
                                ? "فاتورة مبيعات"
                                : msg.action?.type === "journal"
                                  ? "قيد محاسبي"
                                  : "تقرير"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {msg.action?.approved ? (
                              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> تمت الموافقة
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> معلق
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {msg.action?.type === "invoice" && (
                            <span>
                              فاتورة للعميل: {msg.action.data.customer} بقيمة{" "}
                              {msg.action.data.total.toLocaleString()} ₴
                            </span>
                          )}
                          {msg.action?.type === "journal" && (
                            <span>
                              {msg.action.data.description} - المرجع:{" "}
                              {msg.action.data.reference}
                            </span>
                          )}
                          {msg.action?.type === "report" && (
                            <span>
                              {msg.action.data.title} - الفترة:{" "}
                              {msg.action.data.period}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const renderApprovalDialog = () => {
    if (!currentAction) return null;

    let title = "";
    let description = "";
    let content = null;

    switch (currentAction.type) {
      case "invoice":
        title = "مراجعة وموافقة على الفاتورة";
        description = "يرجى مراجعة تفاصيل الفاتورة التالية قبل الموافقة عليها";
        content = (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">فاتورة مبيعات</h4>
                <p className="text-sm text-muted-foreground">
                  {currentAction.data.date}
                </p>
              </div>
              <div className="text-xl font-bold">
                {currentAction.data.total.toLocaleString()} ₴
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted p-3">
                <div className="flex justify-between">
                  <span className="font-medium">العميل:</span>
                  <span>{currentAction.data.customer}</span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="font-medium mb-2">البنود</h5>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-right pb-2">البند</th>
                      <th className="text-center pb-2">الكمية</th>
                      <th className="text-center pb-2">السعر</th>
                      <th className="text-left pb-2">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAction.data.items.map(
                      (item: any, index: number) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="py-2 text-center">
                            {item.price.toLocaleString()} ₴
                          </td>
                          <td className="py-2 text-left">
                            {item.total.toLocaleString()} ₴
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-muted/50">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{currentAction.data.subtotal.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة:</span>
                  <span>{currentAction.data.tax.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>الإجمالي:</span>
                  <span>{currentAction.data.total.toLocaleString()} ₴</span>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case "journal":
        title = "مراجعة وموافقة على القيد المحاسبي";
        description = "يرجى مراجعة تفاصيل القيد المحاسبي التالي قبل تسجيله";
        content = (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">قيد محاسبي</h4>
                <p className="text-sm text-muted-foreground">
                  المرجع: {currentAction.data.reference}
                </p>
              </div>
              <div className="text-xl font-bold">
                {currentAction.data.total.toLocaleString()} ₴
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted p-3">
                <div className="flex justify-between">
                  <span className="font-medium">التاريخ:</span>
                  <span>{currentAction.data.date}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-medium">البيان:</span>
                  <span>{currentAction.data.description}</span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="font-medium mb-2">تفاصيل القيد</h5>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-right pb-2">الحساب</th>
                      <th className="text-center pb-2">مدين</th>
                      <th className="text-center pb-2">دائن</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAction.data.entries.map(
                      (entry: any, index: number) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-2">{entry.account}</td>
                          <td className="py-2 text-center">
                            {entry.debit > 0
                              ? entry.debit.toLocaleString()
                              : "-"}
                          </td>
                          <td className="py-2 text-center">
                            {entry.credit > 0
                              ? entry.credit.toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <th className="text-right pt-2">الإجمالي</th>
                      <th className="pt-2 text-center">
                        {currentAction.data.total.toLocaleString()} ₴
                      </th>
                      <th className="pt-2 text-center">
                        {currentAction.data.total.toLocaleString()} ₴
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        );
        break;

      case "report":
        title = "مراجعة وموافقة على التقرير";
        description = "يرجى مراجعة ملخص التقرير التالي قبل إنشائه";
        content = (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{currentAction.data.title}</h4>
                <p className="text-sm text-muted-foreground">
                  الفترة: {currentAction.data.period}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <h5 className="font-medium mb-2">ملخص</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي المبيعات:
                    </span>
                    <span className="font-medium">
                      {currentAction.data.summary.totalSales.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي المصروفات:
                    </span>
                    <span className="font-medium">
                      {currentAction.data.summary.totalExpenses.toLocaleString()}{" "}
                      ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">مبلغ الضريبة:</span>
                    <span className="font-medium">
                      {currentAction.data.summary.taxAmount.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-medium">صافي الربح:</span>
                    <span className="font-bold">
                      {currentAction.data.summary.netProfit.toLocaleString()} ₴
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <h5 className="font-medium mb-2">أفضل العملاء</h5>
                <div className="space-y-2 text-sm">
                  {currentAction.data.topCustomers.map(
                    (customer: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{customer.name}</span>
                        <span className="font-medium">
                          {customer.amount.toLocaleString()} ₴
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        break;
    }

    return (
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {content}

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleRejectAction}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              رفض
            </Button>
            <Button onClick={handleApproveAction} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              موافقة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-0 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 ml-2 text-primary" />
            المساعد الذكي للنظام المحاسبي
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1"
              onClick={() => {
                const text = messages
                  .map(
                    (msg) =>
                      `${msg.role === "user" ? "أنت" : "المساعد"}: ${msg.content}`,
                  )
                  .join("\n\n");
                navigator.clipboard.writeText(text);
              }}
            >
              <Clipboard className="h-4 w-4" />
              <span className="hidden md:inline">نسخ المحادثة</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <TabsList className="mx-4 mt-2 justify-end">
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              السجل
            </TabsTrigger>
            <TabsTrigger
              value="capabilities"
              className="flex items-center gap-1"
            >
              <Lightbulb className="h-4 w-4" />
              القدرات
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              المحادثة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 overflow-hidden">
            {renderChatTab()}
          </TabsContent>

          <TabsContent value="capabilities" className="flex-1 overflow-auto">
            {renderCapabilitiesTab()}
          </TabsContent>

          <TabsContent value="history" className="flex-1 overflow-auto">
            {renderHistoryTab()}
          </TabsContent>
        </Tabs>
      </CardContent>

      {renderApprovalDialog()}
    </Card>
  );
};

export default AIAssistant;
