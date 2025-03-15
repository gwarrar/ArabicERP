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
} from "lucide-react";

interface QuickLink {
  id: string;
  title: string;
  icon: string;
  color: string;
  url: string;
  category: string;
}

const defaultLinks: QuickLink[] = [
  {
    id: "1",
    title: "إنشاء قيد محاسبي",
    icon: "CreditCard",
    color: "blue",
    url: "/accounting",
    category: "محاسبة",
  },
  {
    id: "2",
    title: "تسجيل مصروف",
    icon: "Receipt",
    color: "green",
    url: "/accounting",
    category: "محاسبة",
  },
  {
    id: "3",
    title: "فاتورة مبيعات",
    icon: "ShoppingCart",
    color: "purple",
    url: "/sales",
    category: "مبيعات",
  },
  {
    id: "4",
    title: "فاتورة مشتريات",
    icon: "Truck",
    color: "amber",
    url: "/purchases",
    category: "مشتريات",
  },
  {
    id: "5",
    title: "جرد المخزون",
    icon: "Clipboard",
    color: "indigo",
    url: "/inventory",
    category: "مخزون",
  },
  {
    id: "6",
    title: "مناقلة مخزون",
    icon: "ArrowRightLeft",
    color: "cyan",
    url: "/inventory/stock-transfer",
    category: "مخزون",
  },
  {
    id: "7",
    title: "إضافة عميل",
    icon: "Users",
    color: "pink",
    url: "/crm",
    category: "عملاء",
  },
  {
    id: "8",
    title: "طباعة تقرير",
    icon: "Printer",
    color: "gray",
    url: "/reports",
    category: "تقارير",
  },
];

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
};

const colorOptions = [
  { name: "أزرق", value: "blue" },
  { name: "أخضر", value: "green" },
  { name: "أرجواني", value: "purple" },
  { name: "كهرماني", value: "amber" },
  { name: "نيلي", value: "indigo" },
  { name: "سماوي", value: "cyan" },
  { name: "وردي", value: "pink" },
  { name: "رمادي", value: "gray" },
  { name: "أحمر", value: "red" },
];

const categoryOptions = [
  { name: "محاسبة", value: "محاسبة" },
  { name: "مبيعات", value: "مبيعات" },
  { name: "مشتريات", value: "مشتريات" },
  { name: "مخزون", value: "مخزون" },
  { name: "عملاء", value: "عملاء" },
  { name: "تقارير", value: "تقارير" },
  { name: "إنتاج", value: "إنتاج" },
  { name: "موارد بشرية", value: "موارد بشرية" },
];

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
    default:
      return "bg-blue-100 text-blue-600 hover:bg-blue-200";
  }
};

const QuickLinks = () => {
  // استخدام localStorage لتخزين الروابط المخصصة (في تطبيق حقيقي، يمكن استخدام API)
  const [links, setLinks] = useState<QuickLink[]>(defaultLinks);

  // تحميل الروابط من localStorage بعد تحميل المكون
  React.useEffect(() => {
    try {
      const savedLinks = localStorage.getItem("dashboardQuickLinks");
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (error) {
      console.error("Error loading quick links:", error);
    }
  }, []);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentLink, setCurrentLink] = useState<QuickLink | null>(null);
  const [showCustomizeMode, setShowCustomizeMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  // حفظ التغييرات في localStorage
  const saveLinks = (updatedLinks: QuickLink[]) => {
    try {
      localStorage.setItem("dashboardQuickLinks", JSON.stringify(updatedLinks));
      setLinks(updatedLinks);
    } catch (error) {
      console.error("Error saving quick links:", error);
    }
  };

  // فتح نافذة التعديل
  const handleEdit = (link: QuickLink) => {
    setCurrentLink(link);
    setShowEditDialog(true);
  };

  // حذف رابط
  const handleDelete = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    saveLinks(updatedLinks);
  };

  // إضافة رابط جديد
  const handleAdd = () => {
    const newLink: QuickLink = {
      id: Date.now().toString(),
      title: "",
      icon: "FileText",
      color: "blue",
      url: "",
      category: "محاسبة",
    };
    setCurrentLink(newLink);
    setShowAddDialog(true);
  };

  // حفظ التعديلات
  const saveEdit = () => {
    if (!currentLink) return;

    const updatedLinks = links.map((link) =>
      link.id === currentLink.id ? currentLink : link,
    );
    saveLinks(updatedLinks);
    setShowEditDialog(false);
  };

  // حفظ الرابط الجديد
  const saveNewLink = () => {
    if (!currentLink || !currentLink.title || !currentLink.url) return;

    saveLinks([...links, currentLink]);
    setShowAddDialog(false);
  };

  // إعادة ضبط الروابط إلى الإعدادات الافتراضية
  const resetToDefault = () => {
    saveLinks(defaultLinks);
    setShowCustomizeMode(false);
  };

  // تصفية الروابط حسب الفئة
  const filteredLinks =
    selectedCategory === "الكل"
      ? links
      : links.filter((link) => link.category === selectedCategory);

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
          <div className="mb-4 flex flex-wrap gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الفئات</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleAdd}>
              <Plus className="h-4 w-4 ml-1" />
              إضافة رابط
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredLinks.map((link) => (
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
                  if (link.title === "إنشاء قيد محاسبي") {
                    window.dispatchEvent(
                      new CustomEvent("openJournalEntriesPopup", {
                        detail: { tab: "new-entry" },
                      }),
                    );
                  } else if (link.title === "تسجيل مصروف") {
                    window.dispatchEvent(
                      new CustomEvent("openCashJournalPopup"),
                    );
                  } else if (link.title === "فاتورة مبيعات") {
                    window.dispatchEvent(
                      new CustomEvent("openSalesPopup", {
                        detail: { type: "invoice" },
                      }),
                    );
                  } else if (link.title === "فاتورة مشتريات") {
                    window.dispatchEvent(
                      new CustomEvent("openPurchasesPopup", {
                        detail: { type: "invoice" },
                      }),
                    );
                  } else if (link.title === "إضافة عميل") {
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
                {showCustomizeMode && (
                  <Badge variant="outline" className="mt-2 text-xs bg-white/50">
                    {link.category}
                  </Badge>
                )}
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
                      {colorOptions.map((color) => (
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
                <Label htmlFor="category">الفئة</Label>
                <Select
                  value={currentLink.category}
                  onValueChange={(value) =>
                    setCurrentLink({ ...currentLink, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.name}
                      </SelectItem>
                    ))}
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
                      {colorOptions.map((color) => (
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
                <Label htmlFor="new-category">الفئة</Label>
                <Select
                  value={currentLink.category}
                  onValueChange={(value) =>
                    setCurrentLink({ ...currentLink, category: value })
                  }
                >
                  <SelectTrigger id="new-category">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.name}
                      </SelectItem>
                    ))}
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

export default QuickLinks;
