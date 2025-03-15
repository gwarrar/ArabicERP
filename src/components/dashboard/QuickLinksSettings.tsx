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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Eye,
  EyeOff,
  Move,
  ArrowUp,
  ArrowDown,
  Check,
  RefreshCw,
} from "lucide-react";

interface QuickLink {
  id: string;
  title: string;
  icon: string;
  color: string;
  url: string;
  category: string;
  visible: boolean;
  order: number;
}

const defaultLinks: QuickLink[] = [
  {
    id: "1",
    title: "إنشاء قيد محاسبي",
    icon: "CreditCard",
    color: "blue",
    url: "/accounting",
    category: "محاسبة",
    visible: true,
    order: 1,
  },
  {
    id: "2",
    title: "تسجيل مصروف",
    icon: "Receipt",
    color: "green",
    url: "/accounting",
    category: "محاسبة",
    visible: true,
    order: 2,
  },
  {
    id: "3",
    title: "فاتورة مبيعات",
    icon: "ShoppingCart",
    color: "purple",
    url: "/sales",
    category: "مبيعات",
    visible: true,
    order: 3,
  },
  {
    id: "4",
    title: "فاتورة مشتريات",
    icon: "Truck",
    color: "amber",
    url: "/purchases",
    category: "مشتريات",
    visible: true,
    order: 4,
  },
  {
    id: "5",
    title: "جرد المخزون",
    icon: "Clipboard",
    color: "indigo",
    url: "/inventory",
    category: "مخزون",
    visible: true,
    order: 5,
  },
  {
    id: "6",
    title: "مناقلة مخزون",
    icon: "ArrowRightLeft",
    color: "cyan",
    url: "/inventory/stock-transfer",
    category: "مخزون",
    visible: true,
    order: 6,
  },
  {
    id: "7",
    title: "إضافة عميل",
    icon: "Users",
    color: "pink",
    url: "/crm",
    category: "عملاء",
    visible: true,
    order: 7,
  },
  {
    id: "8",
    title: "طباعة تقرير",
    icon: "Printer",
    color: "gray",
    url: "/reports",
    category: "تقارير",
    visible: true,
    order: 8,
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
      return "bg-blue-100 text-blue-600";
    case "green":
      return "bg-green-100 text-green-600";
    case "purple":
      return "bg-purple-100 text-purple-600";
    case "amber":
      return "bg-amber-100 text-amber-600";
    case "indigo":
      return "bg-indigo-100 text-indigo-600";
    case "cyan":
      return "bg-cyan-100 text-cyan-600";
    case "pink":
      return "bg-pink-100 text-pink-600";
    case "gray":
      return "bg-gray-100 text-gray-600";
    case "red":
      return "bg-red-100 text-red-600";
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const QuickLinksSettings = () => {
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
  const [activeTab, setActiveTab] = useState("all");

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
      visible: true,
      order: links.length + 1,
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

  // تغيير حالة الظهور
  const toggleVisibility = (id: string) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, visible: !link.visible } : link,
    );
    saveLinks(updatedLinks);
  };

  // تحريك الرابط لأعلى
  const moveUp = (id: string) => {
    const index = links.findIndex((link) => link.id === id);
    if (index <= 0) return;

    const updatedLinks = [...links];
    const temp = updatedLinks[index].order;
    updatedLinks[index].order = updatedLinks[index - 1].order;
    updatedLinks[index - 1].order = temp;

    saveLinks(updatedLinks.sort((a, b) => a.order - b.order));
  };

  // تحريك الرابط لأسفل
  const moveDown = (id: string) => {
    const index = links.findIndex((link) => link.id === id);
    if (index >= links.length - 1) return;

    const updatedLinks = [...links];
    const temp = updatedLinks[index].order;
    updatedLinks[index].order = updatedLinks[index + 1].order;
    updatedLinks[index + 1].order = temp;

    saveLinks(updatedLinks.sort((a, b) => a.order - b.order));
  };

  // إعادة ضبط الروابط إلى الإعدادات الافتراضية
  const resetToDefault = () => {
    saveLinks(defaultLinks);
  };

  // تصفية الروابط حسب الفئة
  const filteredLinks =
    activeTab === "all"
      ? links.sort((a, b) => a.order - b.order)
      : links
          .filter((link) => link.category === activeTab)
          .sort((a, b) => a.order - b.order);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          إعدادات الروابط السريعة
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 ml-1" />
            إعادة ضبط
          </Button>
          <Button size="sm" onClick={handleAdd} className="text-xs">
            <Plus className="h-3 w-3 ml-1" />
            إضافة رابط
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">الكل</TabsTrigger>
            {categoryOptions.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">الترتيب</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>الأيقونة</TableHead>
                <TableHead>اللون</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>الرابط</TableHead>
                <TableHead>الظهور</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.order}</TableCell>
                    <TableCell>{link.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1 rounded ${getColorClass(link.color)}`}
                        >
                          {getIconByName(link.icon)}
                        </div>
                        <span>{link.icon}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getColorClass(link.color)}>
                        {colorOptions.find((c) => c.value === link.color)
                          ?.name || link.color}
                      </Badge>
                    </TableCell>
                    <TableCell>{link.category}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {link.url}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={link.visible}
                          onCheckedChange={() => toggleVisibility(link.id)}
                        />
                        <span className="ml-2">
                          {link.visible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-red-600" />
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveUp(link.id)}
                          disabled={links.indexOf(link) === 0}
                          className="h-8 w-8"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveDown(link.id)}
                          disabled={links.indexOf(link) === links.length - 1}
                          className="h-8 w-8"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(link)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(link.id)}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    لا توجد روابط في هذه الفئة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
              <div className="flex items-center gap-2">
                <Label htmlFor="visible" className="flex-1">
                  ظاهر في لوحة التحكم
                </Label>
                <Switch
                  id="visible"
                  checked={currentLink.visible}
                  onCheckedChange={(checked) =>
                    setCurrentLink({ ...currentLink, visible: checked })
                  }
                />
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
              <div className="flex items-center gap-2">
                <Label htmlFor="new-visible" className="flex-1">
                  ظاهر في لوحة التحكم
                </Label>
                <Switch
                  id="new-visible"
                  checked={currentLink.visible}
                  onCheckedChange={(checked) =>
                    setCurrentLink({ ...currentLink, visible: checked })
                  }
                />
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

export default QuickLinksSettings;
