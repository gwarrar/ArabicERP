import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Receipt,
  PieChart,
  Landmark,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  Settings,
  Plus,
  Edit,
  Trash,
  CreditCard,
  Truck,
  BarChart,
  DollarSign,
  Clipboard,
  ArrowRightLeft,
  Tag,
  Printer,
  Save,
  MoreHorizontal,
  X,
  Factory,
  AlertTriangle,
  Clock,
  Star,
  GraduationCap,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
  UserPlus,
} from "lucide-react";

interface QuickLink {
  id: string;
  title: string;
  icon: string;
  color: string;
  url: string;
  category: string;
  action?: string;
}

interface TabQuickLinksProps {
  tabId: string;
}

// Default links for each tab
const defaultTabLinks: Record<string, QuickLink[]> = {
  sales: [
    {
      id: "sales-1",
      title: "فاتورة مبيعات جديدة",
      icon: "ShoppingCart",
      color: "green",
      url: "/sales",
      category: "مبيعات",
      action: "openSalesPopup",
    },
    {
      id: "sales-2",
      title: "عرض سعر",
      icon: "Tag",
      color: "blue",
      url: "/sales",
      category: "مبيعات",
      action: "openSalesPopup",
    },
    {
      id: "sales-3",
      title: "إضافة عميل",
      icon: "UserPlus",
      color: "purple",
      url: "/crm",
      category: "عملاء",
      action: "openCustomerSupplierPopup",
    },
    {
      id: "sales-4",
      title: "تقارير المبيعات",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
  purchases: [
    {
      id: "purchases-1",
      title: "فاتورة مشتريات جديدة",
      icon: "Truck",
      color: "blue",
      url: "/purchases",
      category: "مشتريات",
      action: "openPurchasesPopup",
    },
    {
      id: "purchases-2",
      title: "طلب شراء",
      icon: "Clipboard",
      color: "green",
      url: "/purchases",
      category: "مشتريات",
      action: "openPurchasesPopup",
    },
    {
      id: "purchases-3",
      title: "إضافة مورد",
      icon: "UserPlus",
      color: "purple",
      url: "/crm",
      category: "موردين",
      action: "openCustomerSupplierPopup",
    },
    {
      id: "purchases-4",
      title: "تقارير المشتريات",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
  inventory: [
    {
      id: "inventory-1",
      title: "جرد المخزون",
      icon: "Clipboard",
      color: "indigo",
      url: "/inventory",
      category: "مخزون",
    },
    {
      id: "inventory-2",
      title: "مناقلة مخزون",
      icon: "ArrowRightLeft",
      color: "cyan",
      url: "/inventory/stock-transfer",
      category: "مخزون",
    },
    {
      id: "inventory-3",
      title: "إضافة منتج",
      icon: "Package",
      color: "green",
      url: "/inventory",
      category: "مخزون",
    },
    {
      id: "inventory-4",
      title: "تقارير المخزون",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
  manufacturing: [
    {
      id: "manufacturing-1",
      title: "أمر إنتاج جديد",
      icon: "Factory",
      color: "purple",
      url: "/manufacturing",
      category: "إنتاج",
    },
    {
      id: "manufacturing-2",
      title: "قائمة المواد",
      icon: "Clipboard",
      color: "blue",
      url: "/manufacturing",
      category: "إنتاج",
    },
    {
      id: "manufacturing-3",
      title: "مراكز العمل",
      icon: "Settings",
      color: "green",
      url: "/manufacturing",
      category: "إنتاج",
    },
    {
      id: "manufacturing-4",
      title: "تقارير الإنتاج",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
  accounting: [
    {
      id: "accounting-1",
      title: "إنشاء قيد محاسبي",
      icon: "CreditCard",
      color: "indigo",
      url: "/accounting",
      category: "محاسبة",
      action: "openJournalEntriesPopup",
    },
    {
      id: "accounting-2",
      title: "تسجيل مصروف",
      icon: "Receipt",
      color: "red",
      url: "/accounting",
      category: "محاسبة",
      action: "openCashJournalPopup",
    },
    {
      id: "accounting-3",
      title: "شجرة الحسابات",
      icon: "FileText",
      color: "blue",
      url: "/accounting",
      category: "محاسبة",
    },
    {
      id: "accounting-4",
      title: "التقارير المالية",
      icon: "BarChart",
      color: "green",
      url: "/reports",
      category: "تقارير",
    },
  ],
  crm: [
    {
      id: "crm-1",
      title: "إضافة عميل",
      icon: "UserPlus",
      color: "cyan",
      url: "/crm",
      category: "عملاء",
      action: "openCustomerSupplierPopup",
    },
    {
      id: "crm-2",
      title: "فرصة بيعية جديدة",
      icon: "TrendingUp",
      color: "green",
      url: "/crm",
      category: "عملاء",
    },
    {
      id: "crm-3",
      title: "حملة تسويقية",
      icon: "Users",
      color: "purple",
      url: "/crm",
      category: "عملاء",
    },
    {
      id: "crm-4",
      title: "تقارير العملاء",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
  hr: [
    {
      id: "hr-1",
      title: "إضافة موظف",
      icon: "UserPlus",
      color: "rose",
      url: "/hr",
      category: "موارد بشرية",
    },
    {
      id: "hr-2",
      title: "تسجيل حضور",
      icon: "Clock",
      color: "blue",
      url: "/hr/attendance",
      category: "موارد بشرية",
    },
    {
      id: "hr-3",
      title: "تقييم أداء",
      icon: "Star",
      color: "green",
      url: "/hr/performance",
      category: "موارد بشرية",
    },
    {
      id: "hr-4",
      title: "تقارير الموظفين",
      icon: "BarChart",
      color: "amber",
      url: "/reports",
      category: "تقارير",
    },
  ],
};

const iconComponents: Record<string, React.ReactNode> = {
  FileText: <FileText />,
  Receipt: <Receipt />,
  PieChart: <PieChart />,
  Landmark: <Landmark />,
  ShoppingCart: <ShoppingCart />,
  Package: <Package />,
  Users: <Users />,
  Calendar: <Calendar />,
  Settings: <Settings />,
  CreditCard: <CreditCard />,
  Truck: <Truck />,
  BarChart: <BarChart />,
  DollarSign: <DollarSign />,
  Clipboard: <Clipboard />,
  ArrowRightLeft: <ArrowRightLeft />,
  Tag: <Tag />,
  Printer: <Printer />,
  Save: <Save />,
  Factory: <Factory />,
  AlertTriangle: <AlertTriangle />,
  Clock: <Clock />,
  Star: <Star />,
  GraduationCap: <GraduationCap />,
  ArrowUpCircle: <ArrowUpCircle />,
  ArrowDownCircle: <ArrowDownCircle />,
  TrendingUp: <TrendingUp />,
  TrendingDown: <TrendingDown />,
  UserPlus: <UserPlus />,
};

const getIconByName = (iconName: string) => {
  return iconComponents[iconName] || <FileText />;
};

const getColorClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-600 hover:bg-blue-200";
    case "green":
      return "bg-green-100 text-green-600 hover:bg-green-200";
    case "purple":
      return "bg-purple-100 text-purple-600 hover:bg-purple-200";
    case "amber":
      return "bg-amber-100 text-amber-600 hover:bg-amber-200";
    case "indigo":
      return "bg-indigo-100 text-indigo-600 hover:bg-indigo-200";
    case "cyan":
      return "bg-cyan-100 text-cyan-600 hover:bg-cyan-200";
    case "pink":
      return "bg-pink-100 text-pink-600 hover:bg-pink-200";
    case "gray":
      return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    case "red":
      return "bg-red-100 text-red-600 hover:bg-red-200";
    case "rose":
      return "bg-rose-100 text-rose-600 hover:bg-rose-200";
    default:
      return "bg-blue-100 text-blue-600 hover:bg-blue-200";
  }
};

const TabQuickLinks: React.FC<TabQuickLinksProps> = ({ tabId }) => {
  // Get default links for this tab or empty array if none exist
  const tabDefaultLinks = defaultTabLinks[tabId] || [];

  // Use localStorage to store customized links
  const [links, setLinks] = useState<QuickLink[]>(() => {
    try {
      const savedLinks = localStorage.getItem(`dashboard_${tabId}_QuickLinks`);
      return savedLinks ? JSON.parse(savedLinks) : tabDefaultLinks;
    } catch (error) {
      console.error(`Error loading quick links for tab ${tabId}:`, error);
      return tabDefaultLinks;
    }
  });

  const [showCustomizeMode, setShowCustomizeMode] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentLink, setCurrentLink] = useState<QuickLink | null>(null);

  // Save changes to localStorage
  const saveLinks = (updatedLinks: QuickLink[]) => {
    try {
      localStorage.setItem(
        `dashboard_${tabId}_QuickLinks`,
        JSON.stringify(updatedLinks),
      );
      setLinks(updatedLinks);
    } catch (error) {
      console.error(`Error saving quick links for tab ${tabId}:`, error);
    }
  };

  // Edit link
  const handleEdit = (link: QuickLink) => {
    setCurrentLink(link);
    setShowEditDialog(true);
  };

  // Delete link
  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    saveLinks(updatedLinks);
  };

  // Add new link
  const handleAdd = () => {
    const newLink: QuickLink = {
      id: Date.now().toString(),
      title: "",
      icon: "FileText",
      color: "blue",
      url: "",
      category: tabId,
    };
    setCurrentLink(newLink);
    setShowAddDialog(true);
  };

  // Save edits
  const saveEdit = () => {
    if (!currentLink) return;

    const updatedLinks = links.map((link) =>
      link.id === currentLink.id ? currentLink : link,
    );
    saveLinks(updatedLinks);
    setShowEditDialog(false);
  };

  // Save new link
  const saveNewLink = () => {
    if (!currentLink || !currentLink.title || !currentLink.url) return;

    saveLinks([...links, currentLink]);
    setShowAddDialog(false);
  };

  // Reset to default
  const resetToDefault = () => {
    saveLinks(tabDefaultLinks);
    setShowCustomizeMode(false);
  };

  // If no links for this tab, show a message
  if (links.length === 0 && !showCustomizeMode) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">روابط سريعة</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomizeMode(true)}
            className="text-xs"
          >
            <Settings className="h-3 w-3 ml-1" />
            إضافة روابط
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            لا توجد روابط سريعة لهذا القسم. انقر على "إضافة روابط" لإضافة روابط
            سريعة.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">روابط سريعة</CardTitle>
        <div className="flex items-center gap-2">
          {showCustomizeMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefault}
                className="text-xs"
              >
                إعادة ضبط
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomizeMode(false)}
                className="text-xs"
              >
                إنهاء التخصيص
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomizeMode(true)}
              className="text-xs"
            >
              <Settings className="h-3 w-3 ml-1" />
              تخصيص
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showCustomizeMode && (
          <div className="mb-4 flex justify-end">
            <Button size="sm" onClick={handleAdd}>
              <Plus className="h-4 w-4 ml-1" />
              إضافة رابط
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link) => (
            <div key={link.id} className="relative">
              {showCustomizeMode && (
                <div className="absolute top-1 left-1 flex gap-1 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    onClick={() => handleEdit(link)}
                  >
                    <Edit className="h-3 w-3 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    onClick={() => handleDelete(link.id)}
                  >
                    <Trash className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              )}
              <a
                href={link.url}
                onClick={(e) => {
                  if (showCustomizeMode) {
                    e.preventDefault();
                    return;
                  }

                  // Prevent default navigation and handle popup opening based on link type
                  e.preventDefault();

                  // Handle different link types to open corresponding popups
                  if (link.action === "openJournalEntriesPopup") {
                    window.dispatchEvent(
                      new CustomEvent("openJournalEntriesPopup", {
                        detail: { tab: "new-entry" },
                      }),
                    );
                  } else if (link.action === "openCashJournalPopup") {
                    window.dispatchEvent(
                      new CustomEvent("openCashJournalPopup"),
                    );
                  } else if (link.action === "openSalesPopup") {
                    window.dispatchEvent(
                      new CustomEvent("openSalesPopup", {
                        detail: { type: "invoice" },
                      }),
                    );
                  } else if (link.action === "openPurchasesPopup") {
                    window.dispatchEvent(
                      new CustomEvent("openPurchasesPopup", {
                        detail: { type: "invoice" },
                      }),
                    );
                  } else if (link.action === "openCustomerSupplierPopup") {
                    window.dispatchEvent(
                      new CustomEvent("openCustomerSupplierPopup", {
                        detail: { type: "customer" },
                      }),
                    );
                  } else {
                    // For links without specific popups, navigate to the URL
                    window.location.href = link.url;
                  }
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${getColorClass(
                  link.color,
                )} ${showCustomizeMode ? "pointer-events-none" : "cursor-pointer"}`}
              >
                <div className="text-2xl mb-2">{getIconByName(link.icon)}</div>
                <span className="text-sm font-medium text-center">
                  {link.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل الرابط السريع</DialogTitle>
          </DialogHeader>
          {currentLink && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">العنوان</Label>
                <Input
                  id="title"
                  value={currentLink.title}
                  onChange={(e) =>
                    setCurrentLink({ ...currentLink, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">الرابط</Label>
                <Input
                  id="url"
                  value={currentLink.url}
                  onChange={(e) =>
                    setCurrentLink({ ...currentLink, url: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="icon">الأيقونة</Label>
                  <Select
                    value={currentLink.icon}
                    onValueChange={(value) =>
                      setCurrentLink({ ...currentLink, icon: value })
                    }
                  >
                    <SelectTrigger id="icon">
                      <SelectValue placeholder="اختر الأيقونة" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(iconComponents).map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            <span className="h-4 w-4">
                              {getIconByName(icon)}
                            </span>
                            <span>{icon}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">اللون</Label>
                  <Select
                    value={currentLink.color}
                    onValueChange={(value) =>
                      setCurrentLink({ ...currentLink, color: value })
                    }
                  >
                    <SelectTrigger id="color">
                      <SelectValue placeholder="اختر اللون" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { name: "أزرق", value: "blue" },
                        { name: "أخضر", value: "green" },
                        { name: "أرجواني", value: "purple" },
                        { name: "كهرماني", value: "amber" },
                        { name: "نيلي", value: "indigo" },
                        { name: "سماوي", value: "cyan" },
                        { name: "وردي", value: "pink" },
                        { name: "رمادي", value: "gray" },
                        { name: "أحمر", value: "red" },
                        { name: "وردي داكن", value: "rose" },
                      ].map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full bg-${color.value}-500`}
                            ></div>
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="action">الإجراء</Label>
                <Select
                  value={currentLink.action || ""}
                  onValueChange={(value) =>
                    setCurrentLink({
                      ...currentLink,
                      action: value || undefined,
                    })
                  }
                >
                  <SelectTrigger id="action">
                    <SelectValue placeholder="اختر الإجراء" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">بدون إجراء (تصفح الرابط)</SelectItem>
                    <SelectItem value="openJournalEntriesPopup">
                      فتح نافذة القيود المحاسبية
                    </SelectItem>
                    <SelectItem value="openCashJournalPopup">
                      فتح نافذة يومية الصندوق
                    </SelectItem>
                    <SelectItem value="openSalesPopup">
                      فتح نافذة المبيعات
                    </SelectItem>
                    <SelectItem value="openPurchasesPopup">
                      فتح نافذة المشتريات
                    </SelectItem>
                    <SelectItem value="openCustomerSupplierPopup">
                      فتح نافذة العملاء/الموردين
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={saveEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة رابط سريع جديد</DialogTitle>
          </DialogHeader>
          {currentLink && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-title">العنوان</Label>
                <Input
                  id="new-title"
                  value={currentLink.title}
                  onChange={(e) =>
                    setCurrentLink({ ...currentLink, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-url">الرابط</Label>
                <Input
                  id="new-url"
                  value={currentLink.url}
                  onChange={(e) =>
                    setCurrentLink({ ...currentLink, url: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-icon">الأيقونة</Label>
                  <Select
                    value={currentLink.icon}
                    onValueChange={(value) =>
                      setCurrentLink({ ...currentLink, icon: value })
                    }
                  >
                    <SelectTrigger id="new-icon">
                      <SelectValue placeholder="اختر الأيقونة" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(iconComponents).map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            <span className="h-4 w-4">
                              {getIconByName(icon)}
                            </span>
                            <span>{icon}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-color">اللون</Label>
                  <Select
                    value={currentLink.color}
                    onValueChange={(value) =>
                      setCurrentLink({ ...currentLink, color: value })
                    }
                  >
                    <SelectTrigger id="new-color">
                      <SelectValue placeholder="اختر اللون" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { name: "أزرق", value: "blue" },
                        { name: "أخضر", value: "green" },
                        { name: "أرجواني", value: "purple" },
                        { name: "كهرماني", value: "amber" },
                        { name: "نيلي", value: "indigo" },
                        { name: "سماوي", value: "cyan" },
                        { name: "وردي", value: "pink" },
                        { name: "رمادي", value: "gray" },
                        { name: "أحمر", value: "red" },
                        { name: "وردي داكن", value: "rose" },
                      ].map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full bg-${color.value}-500`}
                            ></div>
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-action">الإجراء</Label>
                <Select
                  value={currentLink.action || ""}
                  onValueChange={(value) =>
                    setCurrentLink({
                      ...currentLink,
                      action: value || undefined,
                    })
                  }
                >
                  <SelectTrigger id="new-action">
                    <SelectValue placeholder="اختر الإجراء" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">بدون إجراء (تصفح الرابط)</SelectItem>
                    <SelectItem value="openJournalEntriesPopup">
                      فتح نافذة القيود المحاسبية
                    </SelectItem>
                    <SelectItem value="openCashJournalPopup">
                      فتح نافذة يومية الصندوق
                    </SelectItem>
                    <SelectItem value="openSalesPopup">
                      فتح نافذة المبيعات
                    </SelectItem>
                    <SelectItem value="openPurchasesPopup">
                      فتح نافذة المشتريات
                    </SelectItem>
                    <SelectItem value="openCustomerSupplierPopup">
                      فتح نافذة العملاء/الموردين
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={saveNewLink}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TabQuickLinks;
