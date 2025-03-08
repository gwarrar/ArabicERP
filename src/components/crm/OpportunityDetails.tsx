import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileText,
  DollarSign,
  Target,
  Phone,
  Mail,
  User,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  MessageSquare,
  Edit,
  Trash,
  Calendar,
  Upload,
  Paperclip,
  Download,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Opportunity } from "@/types/crm";
import { communications, tasks } from "@/data/crmData";

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  onClose?: () => void;
  onStageChange?: (opportunityId: string, newStage: string) => void;
}

const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({
  opportunity,
  onClose,
  onStageChange,
}) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showAddCommunication, setShowAddCommunication] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [opportunityData, setOpportunityData] = useState(opportunity);

  // Stage names in Arabic
  const stageNames = {
    lead: "مؤهل أولي",
    qualified: "مؤهل",
    proposal: "تقديم عرض",
    negotiation: "تفاوض",
    closed_won: "مغلق (ناجح)",
    closed_lost: "مغلق (خاسر)",
  };

  // Filter communications for this opportunity
  const opportunityCommunications = communications.filter(
    (comm) => comm.customerId === opportunity.customerId,
  );

  // Filter tasks for this opportunity
  const opportunityTasks = tasks.filter(
    (task) =>
      task.relatedTo.type === "opportunity" &&
      task.relatedTo.id === opportunity.id,
  );

  // Sample notes data
  const notes = [
    {
      id: "1",
      date: "2024-07-15",
      author: "أحمد محمد",
      content: "العميل مهتم بالعرض المقدم، طلب بعض التعديلات البسيطة.",
    },
    {
      id: "2",
      date: "2024-07-10",
      author: "سارة أحمد",
      content: "تم إرسال العرض المبدئي، بانتظار رد العميل.",
    },
  ];

  // Sample files data
  const files = [
    {
      id: "1",
      name: "عرض_أسعار_2024.pdf",
      type: "pdf",
      size: "2.5 MB",
      uploadDate: "2024-07-15",
      uploadedBy: "أحمد محمد",
    },
    {
      id: "2",
      name: "مواصفات_المنتج.docx",
      type: "docx",
      size: "1.2 MB",
      uploadDate: "2024-07-10",
      uploadedBy: "سارة أحمد",
    },
  ];

  const handleSaveChanges = () => {
    // Here you would typically save the changes to the backend
    setEditMode(false);
    // For now, we'll just update the local state
    // In a real application, you would make an API call here
  };

  const handleStageChange = (newStage: string) => {
    if (onStageChange) {
      onStageChange(opportunity.id, newStage);
    } else {
      // For demo purposes, just show an alert
      alert(
        `تم تغيير مرحلة الفرصة إلى ${stageNames[newStage as keyof typeof stageNames]}`,
      );
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "zip":
        return <Download className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  // Calculate weighted value (value * probability)
  const calculateWeightedValue = () => {
    return opportunity.value * (opportunity.probability / 100);
  };

  // Get next and previous stages
  const stages = [
    "lead",
    "qualified",
    "proposal",
    "negotiation",
    "closed_won",
    "closed_lost",
  ];
  const currentStageIndex = stages.indexOf(opportunity.stage);
  const nextStage =
    currentStageIndex < stages.length - 3
      ? stages[currentStageIndex + 1]
      : null;
  const prevStage =
    currentStageIndex > 0 ? stages[currentStageIndex - 1] : null;

  return (
    <div className="space-y-6">
      {/* Opportunity Basic Info */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{opportunity.title}</h2>
            <p className="text-muted-foreground">{opportunity.customerName}</p>
          </div>
          <div className="flex gap-2">
            {!editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                {onClose && (
                  <Button variant="outline" onClick={onClose}>
                    إغلاق
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveChanges}>حفظ التغييرات</Button>
              </>
            )}
          </div>
        </div>

        {!editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات الفرصة</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">المرحلة:</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${opportunity.stage === "closed_won" ? "bg-green-100 text-green-800" : opportunity.stage === "closed_lost" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {stageNames[opportunity.stage as keyof typeof stageNames]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">القيمة:</span>
                  <span>{opportunity.value.toLocaleString()} ₴</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    تاريخ الإغلاق المتوقع:
                  </span>
                  <span>{opportunity.expectedCloseDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات إضافية</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">المسؤول:</span>
                  <span>{opportunity.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    احتمالية الإغلاق:
                  </span>
                  <span>{opportunity.probability}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">القيمة المرجحة:</span>
                  <span>{calculateWeightedValue().toLocaleString()} ₴</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">الإجراءات</h3>
              <div className="space-y-3">
                {nextStage && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleStageChange(nextStage)}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                    نقل إلى {stageNames[nextStage as keyof typeof stageNames]}
                  </Button>
                )}
                {prevStage && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleStageChange(prevStage)}
                  >
                    <ChevronLeft className="ml-2 h-4 w-4" />
                    نقل إلى {stageNames[prevStage as keyof typeof stageNames]}
                  </Button>
                )}
                {opportunity.stage !== "closed_won" &&
                  opportunity.stage !== "closed_lost" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-green-600"
                        onClick={() => handleStageChange("closed_won")}
                      >
                        <CheckCircle className="ml-2 h-4 w-4" />
                        إغلاق (ناجح)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600"
                        onClick={() => handleStageChange("closed_lost")}
                      >
                        <XCircle className="ml-2 h-4 w-4" />
                        إغلاق (خاسر)
                      </Button>
                    </>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان الفرصة</label>
              <Input
                value={opportunityData.title}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">العميل</label>
              <Input value={opportunityData.customerName} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">القيمة</label>
              <Input
                type="number"
                value={opportunityData.value}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    value: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المرحلة</label>
              <select
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={opportunityData.stage}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    stage: e.target.value as any,
                  })
                }
              >
                <option value="lead">مؤهل أولي</option>
                <option value="qualified">مؤهل</option>
                <option value="proposal">تقديم عرض</option>
                <option value="negotiation">تفاوض</option>
                <option value="closed_won">مغلق (ناجح)</option>
                <option value="closed_lost">مغلق (خاسر)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                احتمالية الإغلاق (%)
              </label>
              <Input
                type="number"
                value={opportunityData.probability}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    probability: Number(e.target.value),
                  })
                }
                min="0"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                تاريخ الإغلاق المتوقع
              </label>
              <Input
                type="date"
                value={opportunityData.expectedCloseDate}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    expectedCloseDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المسؤول</label>
              <select
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={opportunityData.assignedTo}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    assignedTo: e.target.value,
                  })
                }
              >
                <option value="أحمد محمد">أحمد محمد</option>
                <option value="سارة أحمد">سارة أحمد</option>
                <option value="محمد علي">محمد علي</option>
                <option value="خالد عبدالله">خالد عبدالله</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">الوصف</label>
              <Textarea
                value={opportunityData.description || ""}
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    description: e.target.value,
                  })
                }
                placeholder="وصف الفرصة البيعية"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">المنتجات</label>
              <Input
                value={
                  opportunityData.products
                    ? opportunityData.products.join(", ")
                    : ""
                }
                onChange={(e) =>
                  setOpportunityData({
                    ...opportunityData,
                    products: e.target.value.split(", "),
                  })
                }
                placeholder="أدخل المنتجات مفصولة بفواصل"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="info">المعلومات</TabsTrigger>
          <TabsTrigger value="communications">سجل التواصل</TabsTrigger>
          <TabsTrigger value="notes">الملاحظات</TabsTrigger>
          <TabsTrigger value="files">الملفات</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {opportunity.description && (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">الوصف</h3>
              <p>{opportunity.description}</p>
            </div>
          )}

          {opportunity.products && opportunity.products.length > 0 && (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">المنتجات</h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.products.map((product, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">المهام المرتبطة</h3>
            {opportunityTasks.length === 0 ? (
              <p className="text-muted-foreground">
                لا توجد مهام مرتبطة بهذه الفرصة
              </p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المهمة</TableHead>
                      <TableHead>تاريخ الاستحقاق</TableHead>
                      <TableHead>المسؤول</TableHead>
                      <TableHead>الأولوية</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunityTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>{task.assigneeName}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"} rounded-full`}
                          >
                            {task.priority === "high"
                              ? "عالية"
                              : task.priority === "medium"
                                ? "متوسطة"
                                : "منخفضة"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs ${task.status === "completed" ? "bg-green-100 text-green-800" : task.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"} rounded-full`}
                          >
                            {task.status === "completed"
                              ? "مكتملة"
                              : task.status === "pending"
                                ? "معلقة"
                                : "ملغاة"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <FileText className="ml-2 h-4 w-4" />
              تقرير كامل
            </Button>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مهمة
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">سجل التواصل</h3>
              <Button onClick={() => setShowAddCommunication(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة اتصال
              </Button>
            </div>

            {opportunityCommunications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد اتصالات مسجلة مع هذا العميل</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>نوع الاتصال</TableHead>
                      <TableHead>الموظف المسؤول</TableHead>
                      <TableHead>ملخص المحادثة</TableHead>
                      <TableHead>الإجراء المطلوب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunityCommunications.map((comm) => (
                      <TableRow key={comm.id} className="hover:bg-muted/50">
                        <TableCell>{comm.date}</TableCell>
                        <TableCell>
                          <span
                            className={`flex items-center gap-1 ${comm.type === "phone" ? "text-blue-600" : comm.type === "email" ? "text-green-600" : comm.type === "visit" ? "text-amber-600" : "text-purple-600"}`}
                          >
                            {comm.type === "phone" ? (
                              <Phone className="h-4 w-4" />
                            ) : comm.type === "email" ? (
                              <Mail className="h-4 w-4" />
                            ) : comm.type === "visit" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <MessageSquare className="h-4 w-4" />
                            )}
                            {comm.type === "phone"
                              ? "هاتف"
                              : comm.type === "email"
                                ? "بريد إلكتروني"
                                : comm.type === "visit"
                                  ? "زيارة"
                                  : comm.type === "meeting"
                                    ? "اجتماع"
                                    : "آخر"}
                          </span>
                        </TableCell>
                        <TableCell>{comm.employeeName}</TableCell>
                        <TableCell>{comm.summary}</TableCell>
                        <TableCell>{comm.action || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Phone className="ml-2 h-4 w-4" />
              اتصال هاتفي
            </Button>
            <Button variant="outline">
              <Mail className="ml-2 h-4 w-4" />
              إرسال بريد إلكتروني
            </Button>
            <Button>
              <Calendar className="ml-2 h-4 w-4" />
              جدولة اجتماع
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">الملاحظات</h3>
              <Button onClick={() => setShowAddNote(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة ملاحظة
              </Button>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد ملاحظات مسجلة لهذه الفرصة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{note.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                    </div>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">الملفات المرفقة</h3>
              <Button onClick={() => setShowAddFile(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة ملف
              </Button>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Paperclip className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد ملفات مرفقة لهذه الفرصة</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الملف</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>تاريخ الرفع</TableHead>
                      <TableHead>تم الرفع بواسطة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type.toUpperCase()}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Note Dialog */}
      <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الملاحظة</label>
              <Textarea placeholder="أدخل الملاحظة هنا..." rows={5} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddNote(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddNote(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add File Dialog */}
      <Dialog open={showAddFile} onOpenChange={setShowAddFile}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة ملف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                اسحب الملفات هنا أو انقر للتصفح
              </p>
              <Button variant="outline" size="sm">
                اختيار ملف
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">وصف الملف (اختياري)</label>
              <Input placeholder="وصف مختصر للملف" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddFile(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddFile(false)}>رفع</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Communication Dialog */}
      <Dialog
        open={showAddCommunication}
        onOpenChange={setShowAddCommunication}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تسجيل اتصال جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الاتصال</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="phone">هاتف</option>
                  <option value="email">بريد إلكتروني</option>
                  <option value="visit">زيارة</option>
                  <option value="meeting">اجتماع</option>
                  <option value="other">آخر</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ والوقت</label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الموظف المسؤول</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="ahmed">أحمد محمد</option>
                  <option value="sara">سارة أحمد</option>
                  <option value="mohamed">محمد علي</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">ملخص المحادثة</label>
                <Textarea placeholder="ملخص المحادثة" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الإجراء المطلوب</label>
                <Input placeholder="الإجراء المطلوب" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddCommunication(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowAddCommunication(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunityDetails;
