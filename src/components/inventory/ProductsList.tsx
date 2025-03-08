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
  Package,
  AlertTriangle,
} from "lucide-react";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showNewProductDialog, setShowNewProductDialog] = useState(false);

  // Sample products data
  const products = [
    {
      id: "P-001",
      name: "قطن مصري فاخر",
      category: "قماش قطني",
      sku: "RM-001",
      unit: "متر",
      currentStock: 150,
      minStock: 20,
      warehouse: "مستودع المواد الخام",
      description: "قطن مصري عالي الجودة للأقمشة الفاخرة",
      status: "active",
    },
    {
      id: "P-002",
      name: "قطن أمريكي متوسط",
      category: "قماش قطني",
      sku: "RM-002",
      unit: "متر",
      currentStock: 80,
      minStock: 15,
      warehouse: "مستودع المواد الخام",
      description: "قطن أمريكي متوسط الجودة للاستخدامات العامة",
      status: "active",
    },
    {
      id: "P-003",
      name: "حرير طبيعي",
      category: "قماش حريري",
      sku: "RM-003",
      unit: "متر",
      currentStock: 50,
      minStock: 10,
      warehouse: "مستودع المواد الخام",
      description: "حرير طبيعي فاخر للأقمشة الراقية",
      status: "active",
    },
    {
      id: "P-004",
      name: "خيط قطني أبيض",
      category: "خيوط قطنية",
      sku: "TH-001",
      unit: "بكرة",
      currentStock: 200,
      minStock: 30,
      warehouse: "مستودع المواد الخام",
      description: "خيط قطني أبيض للخياطة العامة",
      status: "active",
    },
    {
      id: "P-005",
      name: "خيط نايلون متين",
      category: "خيوط صناعية",
      sku: "TH-002",
      unit: "بكرة",
      currentStock: 8,
      minStock: 10,
      warehouse: "مستودع المواد الخام",
      description: "خيط نايلون متين للخياطة الصناعية",
      status: "active",
    },
    {
      id: "P-006",
      name: "أزرار بلاستيكية",
      category: "أزرار",
      sku: "AC-001",
      unit: "علبة",
      currentStock: 5,
      minStock: 15,
      warehouse: "المستودع الرئيسي",
      description: "أزرار بلاستيكية متنوعة الألوان والأحجام",
      status: "inactive",
    },
  ];

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">المنتجات</h2>
        <Button onClick={() => setShowNewProductDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          منتج جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث باسم المنتج أو الرمز..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">جميع الفئات</option>
              {categories.slice(1).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رمز المنتج</TableHead>
              <TableHead>اسم المنتج</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead>الوحدة</TableHead>
              <TableHead className="text-center">المخزون الحالي</TableHead>
              <TableHead className="text-center">الحد الأدنى</TableHead>
              <TableHead>المستودع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد منتجات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleProductClick(product)}
                >
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`${product.currentStock < product.minStock ? "text-red-600 font-medium" : ""}`}
                    >
                      {product.currentStock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.minStock}
                  </TableCell>
                  <TableCell>{product.warehouse}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {product.status === "active" ? "نشط" : "غير نشط"}
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={showProductDetails} onOpenChange={setShowProductDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل المنتج</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">رمز المنتج</p>
                  <p className="font-medium">{selectedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">اسم المنتج</p>
                  <p className="font-medium">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الفئة</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">وحدة القياس</p>
                  <p className="font-medium">{selectedProduct.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    المخزون الحالي
                  </p>
                  <p
                    className={`font-medium ${selectedProduct.currentStock < selectedProduct.minStock ? "text-red-600" : ""}`}
                  >
                    {selectedProduct.currentStock}
                    {selectedProduct.currentStock <
                      selectedProduct.minStock && (
                      <span className="text-xs text-red-600 mr-2">
                        (أقل من الحد الأدنى)
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    الحد الأدنى للمخزون
                  </p>
                  <p className="font-medium">{selectedProduct.minStock}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المستودع</p>
                  <p className="font-medium">{selectedProduct.warehouse}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <span
                    className={`px-2 py-1 text-xs ${selectedProduct.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                  >
                    {selectedProduct.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">الوصف</p>
                <p className="font-medium">{selectedProduct.description}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowProductDetails(false)}
                >
                  إغلاق
                </Button>
                <Button variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Product Dialog */}
      <Dialog
        open={showNewProductDialog}
        onOpenChange={setShowNewProductDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة منتج جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المنتج</label>
                <Input placeholder="اسم المنتج" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">رمز المنتج (SKU)</label>
                <Input placeholder="رمز المنتج" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الفئة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الفئة</option>
                  {categories.slice(1).map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">وحدة القياس</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الوحدة</option>
                  <option value="كغ">كغ</option>
                  <option value="لتر">لتر</option>
                  <option value="قطعة">قطعة</option>
                  <option value="علبة">علبة</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المخزون الحالي</label>
                <Input type="number" placeholder="المخزون الحالي" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  الحد الأدنى للمخزون
                </label>
                <Input type="number" placeholder="الحد الأدنى للمخزون" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المستودع</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر المستودع</option>
                  <option value="المستودع الرئيسي">المستودع الرئيسي</option>
                  <option value="مستودع المواد الخام">
                    مستودع المواد الخام
                  </option>
                  <option value="مستودع المنتجات النهائية">
                    مستودع المنتجات النهائية
                  </option>
                  <option value="مستودع قطع الغيار">مستودع قطع الغيار</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Input placeholder="وصف المنتج" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewProductDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewProductDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductsList;
