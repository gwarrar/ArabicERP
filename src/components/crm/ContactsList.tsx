import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  User,
  Building,
  Calendar,
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash,
  FileText,
  UserPlus,
  MessageSquare,
  Clock,
  Tag,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Briefcase,
  DollarSign,
  Send,
} from "lucide-react";

// نموذج بيانات لجهة اتصال
interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  lastContact: string;
  notes: string;
  tags: string[];
  createdAt: string;
  value?: number;
}

// بيانات تجريبية
const demoContacts: Contact[] = [
  {
    id: "1",
    name: "أحمد محمد",
    company: "شركة الأمل للتجارة",
    email: "ahmed@alamal.com",
    phone: "+966 50 123 4567",
    source: "معرض تجاري",
    status: "lead",
    lastContact: "2024-07-15",
    notes: "مهتم بمنتجات الأقمشة الصناعية",
    tags: ["أقمشة", "صناعي"],
    createdAt: "2024-07-10",
    value: 15000,
  },
  {
    id: "2",
    name: "سارة عبدالله",
    company: "مؤسسة النور",
    email: "sara@alnoor.com",
    phone: "+966 55 987 6543",
    source: "موقع الويب",
    status: "prospect",
    lastContact: "2024-07-18",
    notes: "طلبت عرض أسعار لمجموعة من المنتجات",
    tags: ["عرض سعر", "أولوية عالية"],
    createdAt: "2024-07-05",
    value: 25000,
  },
  {
    id: "3",
    name: "محمد العلي",
    company: "شركة البناء الحديث",
    email: "mohammed@modern-construction.com",
    phone: "+966 54 111 2222",
    source: "إحالة",
    status: "customer",
    lastContact: "2024-07-20",
    notes: "عميل منتظم، يطلب بشكل شهري",
    tags: ["عميل منتظم", "بناء"],
    createdAt: "2024-06-15",
    value: 50000,
  },
  {
    id: "4",
    name: "فاطمة الزهراني",
    company: "مؤسسة الإبداع للديكور",
    email: "fatima@ibda3.com",
    phone: "+966 56 333 4444",
    source: "حملة إعلانية",
    status: "lead",
    lastContact: "2024-07-12",
    notes: "مهتمة بمنتجات الديكور الداخلي",
    tags: ["ديكور", "تصميم داخلي"],
    createdAt: "2024-07-08",
  },
  {
    id: "5",
    name: "خالد السعيد",
    company: "مجموعة السعيد التجارية",
    email: "khalid@alsaeed.com",
    phone: "+966 59 555 6666",
    source: "معرض تجاري",
    status: "inactive",
    lastContact: "2024-06-30",
    notes: "لم يستجب للمتابعة الأخيرة",
    tags: ["متابعة مطلوبة"],
    createdAt: "2024-06-01",
  },
  {
    id: "6",
    name: "نورة القحطاني",
    company: "مؤسسة الأفق للاستشارات",
    email: "noura@alofouq.com",
    phone: "+966 58 777 8888",
    source: "وسائل التواصل الاجتماعي",
    status: "prospect",
    lastContact: "2024-07-19",
    notes: "تحتاج إلى متابعة للتأكد من مناسبة المنتجات لاحتياجاتها",
    tags: ["استشارات", "خدمات"],
    createdAt: "2024-07-03",
    value: 10000,
  },
];

// مكون لعرض قائمة جهات الاتصال
const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>(demoContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isConvertFormOpen, setIsConvertFormOpen] = useState(false);

  // تصفية جهات الاتصال حسب التبويب النشط
  const filteredContacts = contacts.filter((contact) => {
    // تصفية حسب البحث
    const matchesSearch =
      contact.name.includes(searchQuery) ||
      contact.company.includes(searchQuery) ||
      contact.email.includes(searchQuery) ||
      contact.phone.includes(searchQuery);

    // تصفية حسب التبويب
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "leads")
      return contact.status === "lead" && matchesSearch;
    if (activeTab === "prospects")
      return contact.status === "prospect" && matchesSearch;
    if (activeTab === "customers")
      return contact.status === "customer" && matchesSearch;
    if (activeTab === "inactive")
      return contact.status === "inactive" && matchesSearch;

    return matchesSearch;
  });

  // فتح تفاصيل جهة الاتصال
  const handleOpenContactDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactDetailsOpen(true);
  };

  // فتح نموذج عرض السعر
  const handleOpenQuoteForm = () => {
    setIsQuoteFormOpen(true);
  };

  // فتح نموذج تحويل جهة الاتصال إلى عميل
  const handleOpenConvertForm = () => {
    setIsConvertFormOpen(true);
  };

  // تحويل جهة الاتصال إلى عميل
  const handleConvertToCustomer = () => {
    if (selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id
          ? { ...contact, status: "customer" as const }
          : contact,
      );
      setContacts(updatedContacts);
      setSelectedContact({ ...selectedContact, status: "customer" });
      setIsConvertFormOpen(false);
    }
  };

  // تغيير حالة جهة الاتصال
  const handleChangeStatus = (
    newStatus: "lead" | "prospect" | "customer" | "inactive",
  ) => {
    if (selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id
          ? { ...contact, status: newStatus }
          : contact,
      );
      setContacts(updatedContacts);
      setSelectedContact({ ...selectedContact, status: newStatus });
    }
  };

  // عرض حالة جهة الاتصال
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "lead":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            جهة اتصال جديدة
          </Badge>
        );
      case "prospect":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            عميل محتمل
          </Badge>
        );
      case "customer":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            عميل
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            غير نشط
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* رأس الصفحة مع البحث والإضافة */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في جهات الاتصال..."
              className="pr-9 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 ml-2" />
            إضافة جهة اتصال
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* تبويبات لتصفية جهات الاتصال */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="leads">جهات اتصال جديدة</TabsTrigger>
          <TabsTrigger value="prospects">عملاء محتملين</TabsTrigger>
          <TabsTrigger value="customers">عملاء</TabsTrigger>
          <TabsTrigger value="inactive">غير نشط</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* جدول جهات الاتصال */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-right font-medium">الاسم</th>
                  <th className="py-3 px-4 text-right font-medium">الشركة</th>
                  <th className="py-3 px-4 text-right font-medium">
                    البريد الإلكتروني
                  </th>
                  <th className="py-3 px-4 text-right font-medium">الهاتف</th>
                  <th className="py-3 px-4 text-right font-medium">المصدر</th>
                  <th className="py-3 px-4 text-right font-medium">الحالة</th>
                  <th className="py-3 px-4 text-right font-medium">
                    آخر تواصل
                  </th>
                  <th className="py-3 px-4 text-right font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleOpenContactDetails(contact)}
                  >
                    <td className="py-3 px-4">{contact.name}</td>
                    <td className="py-3 px-4">{contact.company}</td>
                    <td className="py-3 px-4">{contact.email}</td>
                    <td className="py-3 px-4">{contact.phone}</td>
                    <td className="py-3 px-4">{contact.source}</td>
                    <td className="py-3 px-4">
                      {renderStatusBadge(contact.status)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(contact.lastContact).toLocaleDateString(
                        "ar-SA",
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenContactDetails(contact);
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* نافذة منبثقة لعرض تفاصيل جهة الاتصال */}
      <Dialog
        open={isContactDetailsOpen}
        onOpenChange={setIsContactDetailsOpen}
      >
        <DialogContent className="max-w-3xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {selectedContact.name}
                  <div className="mr-2">
                    {renderStatusBadge(selectedContact.status)}
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* العمود الأول: المعلومات الأساسية */}
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">معلومات الاتصال</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedContact.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedContact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedContact.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">معلومات إضافية</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>المصدر: {selectedContact.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          تاريخ الإضافة:{" "}
                          {new Date(
                            selectedContact.createdAt,
                          ).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          آخر تواصل:{" "}
                          {new Date(
                            selectedContact.lastContact,
                          ).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      {selectedContact.value && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>
                            القيمة المتوقعة:{" "}
                            {selectedContact.value.toLocaleString()} ₴
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">تغيير الحالة</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          selectedContact.status === "lead"
                            ? "default"
                            : "outline"
                        }
                        className="justify-center"
                        onClick={() => handleChangeStatus("lead")}
                      >
                        جهة اتصال جديدة
                      </Button>
                      <Button
                        variant={
                          selectedContact.status === "prospect"
                            ? "default"
                            : "outline"
                        }
                        className="justify-center"
                        onClick={() => handleChangeStatus("prospect")}
                      >
                        عميل محتمل
                      </Button>
                      <Button
                        variant={
                          selectedContact.status === "customer"
                            ? "default"
                            : "outline"
                        }
                        className="justify-center"
                        onClick={() => handleChangeStatus("customer")}
                      >
                        عميل
                      </Button>
                      <Button
                        variant={
                          selectedContact.status === "inactive"
                            ? "default"
                            : "outline"
                        }
                        className="justify-center"
                        onClick={() => handleChangeStatus("inactive")}
                      >
                        غير نشط
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">الوسوم</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedContact.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* العمود الثاني والثالث: الملاحظات والإجراءات */}
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg h-[200px] overflow-y-auto">
                    <h3 className="font-medium mb-3">الملاحظات</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.notes}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">الإجراءات السريعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button
                        className="justify-start"
                        onClick={handleOpenQuoteForm}
                      >
                        <FileText className="h-4 w-4 ml-2" />
                        إنشاء عرض سعر
                      </Button>

                      {selectedContact.status !== "customer" && (
                        <Button
                          className="justify-start"
                          onClick={handleOpenConvertForm}
                        >
                          <UserPlus className="h-4 w-4 ml-2" />
                          تحويل إلى عميل
                        </Button>
                      )}

                      <Button className="justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 ml-2" />
                        إرسال رسالة
                      </Button>

                      <Button className="justify-start" variant="outline">
                        <Calendar className="h-4 w-4 ml-2" />
                        جدولة اجتماع
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">سجل النشاطات</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-2 border rounded-md">
                        <Calendar className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">
                            تم إضافة جهة الاتصال
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              selectedContact.createdAt,
                            ).toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 border rounded-md">
                        <MessageSquare className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">
                            تم التواصل عبر البريد الإلكتروني
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              selectedContact.lastContact,
                            ).toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </div>
                <Button onClick={() => setIsContactDetailsOpen(false)}>
                  إغلاق
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* نافذة منبثقة لإنشاء عرض سعر */}
      <Dialog open={isQuoteFormOpen} onOpenChange={setIsQuoteFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إنشاء عرض سعر</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote-title">عنوان العرض</Label>
              <Input id="quote-title" placeholder="عرض سعر لمنتجات..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-products">المنتجات</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنتجات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product1">منتج 1</SelectItem>
                  <SelectItem value="product2">منتج 2</SelectItem>
                  <SelectItem value="product3">منتج 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-notes">ملاحظات إضافية</Label>
              <Textarea
                id="quote-notes"
                placeholder="أي ملاحظات إضافية حول العرض..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuoteFormOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setIsQuoteFormOpen(false)}>
              <Send className="h-4 w-4 ml-2" />
              إرسال العرض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة منبثقة لتحويل جهة الاتصال إلى عميل */}
      <Dialog open={isConvertFormOpen} onOpenChange={setIsConvertFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تحويل إلى عميل</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedContact && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  سيتم تحويل{" "}
                  <span className="font-bold">{selectedContact.name}</span> من{" "}
                  {selectedContact.status === "lead"
                    ? "جهة اتصال جديدة"
                    : "عميل محتمل"}{" "}
                  إلى عميل.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="customer-category">فئة العميل</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر فئة العميل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">تجزئة</SelectItem>
                  <SelectItem value="wholesale">جملة</SelectItem>
                  <SelectItem value="distributor">موزع</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-rep">مندوب المبيعات المسؤول</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر مندوب المبيعات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rep1">أحمد محمد</SelectItem>
                  <SelectItem value="rep2">سارة خالد</SelectItem>
                  <SelectItem value="rep3">محمد علي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="convert-notes">ملاحظات</Label>
              <Textarea id="convert-notes" placeholder="أي ملاحظات إضافية..." />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConvertFormOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleConvertToCustomer}>
              <UserPlus className="h-4 w-4 ml-2" />
              تحويل إلى عميل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsList;
