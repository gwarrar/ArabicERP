import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash,
  FolderTree,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { ProductCategory } from "@/types/inventory";

const ProductCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [parentCategoryId, setParentCategoryId] = useState<string | undefined>(
    undefined,
  );

  // Sample categories data with hierarchical structure
  const categories: ProductCategory[] = [
    {
      id: "CAT-001",
      name: "أقمشة",
      description: "جميع أنواع الأقمشة",
      status: "active",
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15",
      children: [
        {
          id: "CAT-001-001",
          name: "قماش قطني",
          description: "أقمشة قطنية بأنواعها",
          parentId: "CAT-001",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
          children: [
            {
              id: "CAT-001-001-001",
              name: "قطن مصري",
              description: "قطن مصري عالي الجودة",
              parentId: "CAT-001-001",
              status: "active",
              createdAt: "2023-06-15",
              updatedAt: "2023-06-15",
            },
            {
              id: "CAT-001-001-002",
              name: "قطن أمريكي",
              description: "قطن أمريكي متوسط الجودة",
              parentId: "CAT-001-001",
              status: "active",
              createdAt: "2023-06-15",
              updatedAt: "2023-06-15",
            },
          ],
        },
        {
          id: "CAT-001-002",
          name: "قماش حريري",
          description: "أقمشة حريرية فاخرة",
          parentId: "CAT-001",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
        },
      ],
    },
    {
      id: "CAT-002",
      name: "خيوط",
      description: "جميع أنواع الخيوط",
      status: "active",
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15",
      children: [
        {
          id: "CAT-002-001",
          name: "خيوط قطنية",
          description: "خيوط قطنية للخياطة",
          parentId: "CAT-002",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
        },
        {
          id: "CAT-002-002",
          name: "خيوط صناعية",
          description: "خيوط صناعية متينة",
          parentId: "CAT-002",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
        },
      ],
    },
    {
      id: "CAT-003",
      name: "إكسسوارات",
      description: "إكسسوارات الخياطة",
      status: "active",
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15",
      children: [
        {
          id: "CAT-003-001",
          name: "أزرار",
          description: "أزرار بأنواعها",
          parentId: "CAT-003",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
        },
        {
          id: "CAT-003-002",
          name: "سحابات",
          description: "سحابات بأنواعها",
          parentId: "CAT-003",
          status: "active",
          createdAt: "2023-06-15",
          updatedAt: "2023-06-15",
        },
      ],
    },
  ];

  // Function to flatten categories for search
  const flattenCategories = (
    categories: ProductCategory[],
  ): ProductCategory[] => {
    let result: ProductCategory[] = [];
    categories.forEach((category) => {
      result.push(category);
      if (category.children && category.children.length > 0) {
        result = [...result, ...flattenCategories(category.children)];
      }
    });
    return result;
  };

  // Filter categories based on search term
  const filteredCategories = searchTerm
    ? flattenCategories(categories).filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (category.description &&
            category.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      )
    : categories;

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setShowCategoryDetails(true);
  };

  const toggleExpand = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleNewSubcategory = (parentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setParentCategoryId(parentId);
    setShowNewCategoryDialog(true);
  };

  // Recursive function to render category tree
  const renderCategoryTree = (categories: ProductCategory[], level = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <TableRow
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => handleCategoryClick(category)}
        >
          <TableCell>
            <div
              className="flex items-center"
              style={{ paddingRight: `${level * 20}px` }}
            >
              {category.children && category.children.length > 0 ? (
                <button
                  className="mr-1 p-1 rounded-sm hover:bg-muted"
                  onClick={(e) => toggleExpand(category.id, e)}
                >
                  {expandedCategories[category.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-6"></span>
              )}
              <span className="font-medium">{category.name}</span>
            </div>
          </TableCell>
          <TableCell>{category.description}</TableCell>
          <TableCell>
            <span
              className={`px-2 py-1 text-xs ${category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
            >
              {category.status === "active" ? "نشط" : "غير نشط"}
            </span>
          </TableCell>
          <TableCell>
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleNewSubcategory(category.id, e)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {category.children &&
          category.children.length > 0 &&
          expandedCategories[category.id] &&
          renderCategoryTree(category.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">مجموعات المنتجات</h2>
        <Button
          onClick={() => {
            setParentCategoryId(undefined);
            setShowNewCategoryDialog(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" />
          مجموعة جديدة
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث باسم المجموعة أو الوصف..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المجموعة</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FolderTree className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد مجموعات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : searchTerm ? (
              // Flat list for search results
              filteredCategories.map((category) => (
                <TableRow
                  key={category.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCategoryClick(category)}
                >
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {category.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleNewSubcategory(category.id, e)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Tree view for normal display
              renderCategoryTree(filteredCategories)
            )}
          </TableBody>
        </Table>
      </div>

      {/* Category Details Dialog */}
      <Dialog open={showCategoryDetails} onOpenChange={setShowCategoryDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل المجموعة</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">اسم المجموعة</p>
                  <p className="font-medium">{selectedCategory.name}</p>
                </div>
                {selectedCategory.parentId && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      المجموعة الأم
                    </p>
                    <p className="font-medium">
                      {flattenCategories(categories).find(
                        (c) => c.id === selectedCategory.parentId,
                      )?.name || ""}
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">الوصف</p>
                  <p className="font-medium">{selectedCategory.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <span
                    className={`px-2 py-1 text-xs ${selectedCategory.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                  >
                    {selectedCategory.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ الإنشاء</p>
                  <p className="font-medium">{selectedCategory.createdAt}</p>
                </div>
              </div>

              {selectedCategory.children &&
                selectedCategory.children.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold mb-2">
                      المجموعات الفرعية
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>اسم المجموعة</TableHead>
                            <TableHead>الوصف</TableHead>
                            <TableHead>الحالة</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCategory.children.map((subCategory) => (
                            <TableRow key={subCategory.id}>
                              <TableCell className="font-medium">
                                {subCategory.name}
                              </TableCell>
                              <TableCell>{subCategory.description}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 text-xs ${subCategory.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                                >
                                  {subCategory.status === "active"
                                    ? "نشط"
                                    : "غير نشط"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCategoryDetails(false)}
                >
                  إغلاق
                </Button>
                <Button variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                <Button
                  onClick={(e) => {
                    setParentCategoryId(selectedCategory.id);
                    setShowCategoryDetails(false);
                    setShowNewCategoryDialog(true);
                  }}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مجموعة فرعية
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      <Dialog
        open={showNewCategoryDialog}
        onOpenChange={setShowNewCategoryDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {parentCategoryId ? "إضافة مجموعة فرعية" : "إضافة مجموعة جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المجموعة</label>
                <Input placeholder="اسم المجموعة" />
              </div>
              {parentCategoryId && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">المجموعة الأم</label>
                  <Input
                    value={
                      flattenCategories(categories).find(
                        (c) => c.id === parentCategoryId,
                      )?.name || ""
                    }
                    disabled
                  />
                </div>
              )}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Input placeholder="وصف المجموعة" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewCategoryDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewCategoryDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductCategories;
