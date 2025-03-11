import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash,
  Eye,
  Copy,
  FileText,
  GitBranch,
  Check,
  Clock,
  Users,
  ShoppingCart,
  Truck,
  BarChart2,
  Package,
  Calendar,
  Star,
  StarOff,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// نموذج لقالب سير العمل
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: number;
  createdBy: string;
  createdAt: string;
  usageCount: number;
  rating: number;
  isFavorite: boolean;
  tags: string[];
  previewImage?: string;
}

// بيانات تجريبية لقوالب سير العمل
const workflowTemplatesData: WorkflowTemplate[] = [
  {
    id: "TPL-001",
    name: "قالب الموافقة العام",
    description: "قالب عام لعمليات الموافقة متعددة المستويات",
    category: "عام",
    steps: 4,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 35,
    rating: 4.5,
    isFavorite: true,
    tags: ["موافقة", "متعدد المستويات"],
  },
  {
    id: "TPL-002",
    name: "قالب معالجة الطلبات",
    description: "قالب لمعالجة طلبات العملاء والموردين",
    category: "المبيعات",
    steps: 5,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 28,
    rating: 4.2,
    isFavorite: false,
    tags: ["طلبات", "عملاء", "معالجة"],
  },
  {
    id: "TPL-003",
    name: "قالب إصدار المستندات",
    description: "قالب لإصدار ومراجعة المستندات والتقارير",
    category: "المستندات",
    steps: 6,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 15,
    rating: 3.8,
    isFavorite: false,
    tags: ["مستندات", "تقارير", "مراجعة"],
  },
  {
    id: "TPL-004",
    name: "قالب الموافقة على المشتريات",
    description: "قالب مخصص للموافقة على طلبات الشراء وأوامر الشراء",
    category: "المشتريات",
    steps: 5,
    createdBy: "أحمد محمد",
    createdAt: "2024-06-15",
    usageCount: 42,
    rating: 4.7,
    isFavorite: true,
    tags: ["مشتريات", "موافقة", "طلبات شراء"],
  },
  {
    id: "TPL-005",
    name: "قالب الموافقة على الإجازات",
    description: "قالب لإدارة طلبات الإجازات والموافقة عليها",
    category: "الموارد البشرية",
    steps: 3,
    createdBy: "فاطمة حسن",
    createdAt: "2024-07-10",
    usageCount: 18,
    rating: 4.0,
    isFavorite: false,
    tags: ["موارد بشرية", "إجازات", "موافقة"],
  },
  {
    id: "TPL-006",
    name: "قالب إصدار الفواتير",
    description: "قالب لإصدار الفواتير ومتابعة حالة الدفع",
    category: "المالية",
    steps: 4,
    createdBy: "محمد علي",
    createdAt: "2024-07-22",
    usageCount: 12,
    rating: 4.3,
    isFavorite: false,
    tags: ["فواتير", "مالية", "دفع"],
  },
];

// بيانات تجريبية لفئات القوالب
const templateCategories = [
  { id: "general", name: "عام", icon: <FileText className="h-4 w-4" /> },
  { id: "purchases", name: "المشتريات", icon: <Truck className="h-4 w-4" /> },
  { id: "sales", name: "المبيعات", icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "hr", name: "الموارد البشرية", icon: <Users className="h-4 w-4" /> },
  { id: "finance", name: "المالية", icon: <BarChart2 className="h-4 w-4" /> },
  { id: "inventory", name: "المخزون", icon: <Package className="h-4 w-4" /> },
  {
    id: "documents",
    name: "المستندات",
    icon: <FileText className="h-4 w-4" />,
  },
];

const WorkflowTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(
    workflowTemplatesData,
  );

  // تصفية القوالب حسب البحث والفلاتر
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      categoryFilter === "all" || template.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // ترتيب القوالب
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.usageCount - a.usageCount;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // تبديل حالة المفضلة
  const toggleFavorite = (templateId: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === templateId
          ? { ...template, isFavorite: !template.isFavorite }
          : template,
      ),
    );
  };

  // الحصول على أيقونة الفئة
  const getCategoryIcon = (category: string) => {
    const categoryObj = templateCategories.find((cat) => cat.name === category);
    return categoryObj?.icon || <FileText className="h-4 w-4" />;
  };

  // عرض النجوم للتقييم
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="h-3 w-3 text-amber-500 fill-amber-500"
          />
        ))}
        {hasHalfStar && (
          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">قوالب سير العمل</h3>
          <p className="text-muted-foreground">
            استخدم القوالب الجاهزة لإنشاء سير عمل بسرعة
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إنشاء قالب جديد
          </Button>
        </div>
      </div>

      {/* أدوات البحث والتصفية */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن قالب..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {templateCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">الأكثر استخداماً</SelectItem>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="name">الاسم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <GitBranch className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* عرض القوالب */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(template.category)}
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(template.id)}
                  >
                    {template.isFavorite ? (
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Star className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الفئة:</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">عدد الخطوات:</span>
                    <span>{template.steps}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      عدد الاستخدامات:
                    </span>
                    <span>{template.usageCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التقييم:</span>
                    {renderRating(template.rating)}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="ml-2 h-4 w-4" />
                  عرض
                </Button>
                <Button size="sm">
                  <Plus className="ml-2 h-4 w-4" />
                  استخدام
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>القالب</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>الخطوات</TableHead>
                  <TableHead>الاستخدامات</TableHead>
                  <TableHead>التقييم</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleFavorite(template.id)}
                        >
                          {template.isFavorite ? (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <Star className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {template.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(template.category)}
                        <span>{template.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>{template.steps}</TableCell>
                    <TableCell>{template.usageCount}</TableCell>
                    <TableCell>{renderRating(template.rating)}</TableCell>
                    <TableCell>{template.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* قسم القوالب المقترحة */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">قوالب مقترحة لك</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">قالب تعيين موظف جديد</CardTitle>
              </div>
              <CardDescription>
                سير عمل متكامل لإدارة عملية تعيين الموظفين الجدد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الفئة:</span>
                  <Badge variant="outline">الموارد البشرية</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">عدد الخطوات:</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التقييم:</span>
                  {renderRating(4.8)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full">
                <Plus className="ml-2 h-4 w-4" />
                استخدام القالب
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">قالب معالجة المبيعات</CardTitle>
              </div>
              <CardDescription>
                سير عمل شامل لإدارة عملية المبيعات من البداية إلى النهاية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الفئة:</span>
                  <Badge variant="outline">المبيعات</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">عدد الخطوات:</span>
                  <span>7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التقييم:</span>
                  {renderRating(4.6)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full">
                <Plus className="ml-2 h-4 w-4" />
                استخدام القالب
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">قالب إدارة المشاريع</CardTitle>
              </div>
              <CardDescription>
                سير عمل لإدارة المشاريع ومتابعة المهام والمواعيد النهائية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الفئة:</span>
                  <Badge variant="outline">إدارة المشاريع</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">عدد الخطوات:</span>
                  <span>9</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التقييم:</span>
                  {renderRating(4.7)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full">
                <Plus className="ml-2 h-4 w-4" />
                استخدام القالب
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTemplates;
