import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  FolderTree,
  Grid3X3,
  List,
  Search,
  Filter,
  Plus,
  Edit,
  Trash,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  MoveRight,
  ArrowUpDown,
  Tag,
  Barcode,
  Save,
  X,
  Eye,
  Printer,
} from "lucide-react";
import ProductDetails from "./ProductDetails";

// Sample data for product categories
const initialCategories = [
  {
    id: "cat-1",
    name: "أقمشة",
    description: "جميع أنواع الأقمشة",
    parentId: null,
    level: 0,
  },
  {
    id: "cat-2",
    name: "أقمشة قطنية",
    description: "أقمشة مصنوعة من القطن",
    parentId: "cat-1",
    level: 1,
  },
  {
    id: "cat-3",
    name: "أقمشة صيفية",
    description: "أقمشة خفيفة للصيف",
    parentId: "cat-2",
    level: 2,
  },
  {
    id: "cat-4",
    name: "أقمشة شتوية",
    description: "أقمشة ثقيلة للشتاء",
    parentId: "cat-2",
    level: 2,
  },
  {
    id: "cat-5",
    name: "أقمشة حريرية",
    description: "أقمشة مصنوعة من الحرير",
    parentId: "cat-1",
    level: 1,
  },
  {
    id: "cat-6",
    name: "إكسسوارات",
    description: "إكسسوارات الخياطة",
    parentId: null,
    level: 0,
  },
  {
    id: "cat-7",
    name: "أزرار",
    description: "جميع أنواع الأزرار",
    parentId: "cat-6",
    level: 1,
  },
  {
    id: "cat-8",
    name: "سحابات",
    description: "جميع أنواع السحابات",
    parentId: "cat-6",
    level: 1,
  },
  {
    id: "cat-9",
    name: "خيوط",
    description: "جميع أنواع الخيوط",
    parentId: null,
    level: 0,
  },
  {
    id: "cat-10",
    name: "خيوط قطنية",
    description: "خيوط مصنوعة من القطن",
    parentId: "cat-9",
    level: 1,
  },
  {
    id: "cat-11",
    name: "خيوط صناعية",
    description: "خيوط مصنوعة من مواد صناعية",
    parentId: "cat-9",
    level: 1,
  },
];

// Sample data for products
const initialProducts = [
  {
    id: "prod-1",
    name: "قماش قطني أبيض",
    sku: "FAB-COT-WHT-001",
    barcode: "1234567890123",
    categoryId: "cat-3",
    price: 25.5,
    cost: 18.75,
    unit: "متر",
    inStock: 150,
    minStock: 20,
    description: "قماش قطني أبيض ناعم مناسب للصيف",
    tags: ["قطن", "أبيض", "صيفي"],
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
  },
  {
    id: "prod-2",
    name: "قماش قطني أسود",
    sku: "FAB-COT-BLK-001",
    barcode: "1234567890124",
    categoryId: "cat-3",
    price: 25.5,
    cost: 18.75,
    unit: "متر",
    inStock: 120,
    minStock: 20,
    description: "قماش قطني أسود ناعم مناسب للصيف",
    tags: ["قطن", "أسود", "صيفي"],
    imageUrl:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&q=80",
  },
  {
    id: "prod-3",
    name: "قماش صوف رمادي",
    sku: "FAB-WOL-GRY-001",
    barcode: "1234567890125",
    categoryId: "cat-4",
    price: 45.0,
    cost: 32.5,
    unit: "متر",
    inStock: 80,
    minStock: 15,
    description: "قماش صوف رمادي ثقيل مناسب للشتاء",
    tags: ["صوف", "رمادي", "شتوي"],
    imageUrl:
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=500&q=80",
  },
  {
    id: "prod-4",
    name: "حرير طبيعي أحمر",
    sku: "FAB-SLK-RED-001",
    barcode: "1234567890126",
    categoryId: "cat-5",
    price: 75.0,
    cost: 60.0,
    unit: "متر",
    inStock: 50,
    minStock: 10,
    description: "حرير طبيعي أحمر فاخر",
    tags: ["حرير", "أحمر", "فاخر"],
    imageUrl:
      "https://images.unsplash.com/photo-1603251579711-8f0323d9d6a1?w=500&q=80",
  },
  {
    id: "prod-5",
    name: "أزرار بلاستيكية بيضاء",
    sku: "ACC-BTN-WHT-001",
    barcode: "1234567890127",
    categoryId: "cat-7",
    price: 0.5,
    cost: 0.25,
    unit: "قطعة",
    inStock: 1000,
    minStock: 100,
    description: "أزرار بلاستيكية بيضاء متوسطة الحجم",
    tags: ["أزرار", "بلاستيك", "أبيض"],
    imageUrl:
      "https://images.unsplash.com/photo-1613846043727-2e6b2a4b4b1f?w=500&q=80",
  },
  {
    id: "prod-6",
    name: "سحاب معدني فضي",
    sku: "ACC-ZIP-SLV-001",
    barcode: "1234567890128",
    categoryId: "cat-8",
    price: 2.0,
    cost: 1.25,
    unit: "قطعة",
    inStock: 500,
    minStock: 50,
    description: "سحاب معدني فضي بطول 20 سم",
    tags: ["سحاب", "معدني", "فضي"],
    imageUrl:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500&q=80",
  },
  {
    id: "prod-7",
    name: "خيط قطني أبيض",
    sku: "THR-COT-WHT-001",
    barcode: "1234567890129",
    categoryId: "cat-10",
    price: 3.5,
    cost: 2.0,
    unit: "بكرة",
    inStock: 200,
    minStock: 30,
    description: "خيط قطني أبيض للخياطة العامة",
    tags: ["خيط", "قطن", "أبيض"],
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&q=80",
  },
  {
    id: "prod-8",
    name: "خيط بوليستر أسود",
    sku: "THR-PLY-BLK-001",
    barcode: "1234567890130",
    categoryId: "cat-11",
    price: 2.75,
    cost: 1.5,
    unit: "بكرة",
    inStock: 250,
    minStock: 40,
    description: "خيط بوليستر أسود متين للخياطة",
    tags: ["خيط", "بوليستر", "أسود"],
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&q=80",
  },
];

const ProductManager = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("tree"); // tree, table, cards
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStock, setFilterStock] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [filterFabric, setFilterFabric] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  // Category dialog states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryFormMode, setCategoryFormMode] = useState<"add" | "edit">(
    "add",
  );
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    description: "",
    parentId: "",
  });

  // Product dialog states
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [productFormMode, setProductFormMode] = useState<"add" | "edit">("add");
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    sku: "",
    barcode: "",
    categoryId: "",
    price: 0,
    cost: 0,
    unit: "",
    inStock: 0,
    minStock: 0,
    description: "",
    tags: [] as string[],
    imageUrl: "",
  });

  // Move dialog states
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [moveType, setMoveType] = useState<"category" | "product">("category");
  const [moveItemId, setMoveItemId] = useState("");
  const [moveTargetId, setMoveTargetId] = useState("");

  // Product details dialog states
  const [showProductDetailsDialog, setShowProductDetailsDialog] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Open product details dialog
  const openProductDetailsDialog = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetailsDialog(true);
  };

  // Handle save pricing
  const handleSavePricing = () => {
    // Here you would update the product pricing in your database
    // For now we just close the dialog
    console.log("Pricing saved");
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // Get child categories
  const getChildCategories = (parentId: string | null) => {
    return categories.filter((category) => category.parentId === parentId);
  };

  // Get category products
  const getCategoryProducts = (categoryId: string) => {
    return products.filter((product) => product.categoryId === categoryId);
  };

  // Get all descendant category IDs
  const getAllDescendantCategoryIds = (categoryId: string): string[] => {
    const directChildren = categories.filter(
      (category) => category.parentId === categoryId,
    );
    const childrenIds = directChildren.map((child) => child.id);
    const descendantIds = directChildren.flatMap((child) =>
      getAllDescendantCategoryIds(child.id),
    );
    return [...childrenIds, ...descendantIds];
  };

  // Get all products in a category and its descendants
  const getAllCategoryProducts = (categoryId: string) => {
    const descendantCategoryIds = getAllDescendantCategoryIds(categoryId);
    const allCategoryIds = [categoryId, ...descendantCategoryIds];
    return products.filter((product) =>
      allCategoryIds.includes(product.categoryId),
    );
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilterCategory(categoryId);
  };

  // Open category form for adding
  const openAddCategoryForm = (parentId: string | null = null) => {
    setCategoryFormMode("add");
    setCategoryForm({
      id: "",
      name: "",
      description: "",
      parentId: parentId || "",
    });
    setShowCategoryDialog(true);
  };

  // Open category form for editing
  const openEditCategoryForm = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setCategoryFormMode("edit");
      setCategoryForm({
        id: category.id,
        name: category.name,
        description: category.description,
        parentId: category.parentId || "",
      });
      setShowCategoryDialog(true);
    }
  };

  // Save category
  const saveCategory = () => {
    if (!categoryForm.name.trim()) {
      alert("يرجى إدخال اسم المجموعة");
      return;
    }

    if (categoryFormMode === "add") {
      // Add new category
      const newCategory = {
        id: `cat-${Date.now()}`,
        name: categoryForm.name,
        description: categoryForm.description,
        parentId:
          categoryForm.parentId === "root"
            ? null
            : categoryForm.parentId || null,
        level:
          categoryForm.parentId && categoryForm.parentId !== "root"
            ? (categories.find((cat) => cat.id === categoryForm.parentId)
                ?.level || 0) + 1
            : 0,
      };
      setCategories([...categories, newCategory]);
    } else {
      // Update existing category
      const updatedCategories = categories.map((category) =>
        category.id === categoryForm.id
          ? {
              ...category,
              name: categoryForm.name,
              description: categoryForm.description,
              parentId:
                categoryForm.parentId === "root"
                  ? null
                  : categoryForm.parentId || null,
              level:
                categoryForm.parentId && categoryForm.parentId !== "root"
                  ? (categories.find((cat) => cat.id === categoryForm.parentId)
                      ?.level || 0) + 1
                  : 0,
            }
          : category,
      );
      setCategories(updatedCategories);
    }

    setShowCategoryDialog(false);
  };

  // Delete category
  const deleteCategory = (categoryId: string) => {
    // Check if category has children
    const hasChildren = categories.some(
      (category) => category.parentId === categoryId,
    );

    // Check if category has products
    const hasProducts = products.some(
      (product) => product.categoryId === categoryId,
    );

    if (hasChildren || hasProducts) {
      alert(
        "لا يمكن حذف هذه المجموعة لأنها تحتوي على مجموعات فرعية أو منتجات. قم بنقلها أو حذفها أولاً.",
      );
      return;
    }

    // Delete the category
    setCategories(categories.filter((category) => category.id !== categoryId));

    // If the deleted category was selected, clear the selection
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    }
  };

  // Open product form for adding
  const openAddProductForm = (categoryId: string | null = null) => {
    setProductFormMode("add");
    setProductForm({
      id: "",
      name: "",
      sku: "",
      barcode: "",
      categoryId: categoryId || "",
      price: 0,
      cost: 0,
      unit: "",
      inStock: 0,
      minStock: 0,
      description: "",
      tags: [],
      imageUrl: "",
    });
    setShowProductDialog(true);
  };

  // Open product form for editing
  const openEditProductForm = (productId: string) => {
    const product = products.find((prod) => prod.id === productId);
    if (product) {
      setProductFormMode("edit");
      setProductForm({
        ...product,
        tags: [...product.tags],
      });
      setShowProductDialog(true);
    }
  };

  // Save product
  const saveProduct = () => {
    if (!productForm.name.trim()) {
      alert("يرجى إدخال اسم المنتج");
      return;
    }

    if (!productForm.categoryId) {
      alert("يرجى اختيار مجموعة للمنتج");
      return;
    }

    if (productFormMode === "add") {
      // Add new product
      const newProduct = {
        ...productForm,
        id: `prod-${Date.now()}`,
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === productForm.id ? { ...productForm } : product,
      );
      setProducts(updatedProducts);
    }

    setShowProductDialog(false);
  };

  // Delete product
  const deleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  // Open move dialog
  const openMoveDialog = (type: "category" | "product", itemId: string) => {
    setMoveType(type);
    setMoveItemId(itemId);
    setMoveTargetId("");
    setShowMoveDialog(true);
  };

  // Move item (category or product)
  const moveItem = () => {
    if (!moveTargetId) {
      alert("يرجى اختيار وجهة النقل");
      return;
    }

    if (moveType === "category") {
      // Check if target is a descendant of the category being moved
      const descendantIds = getAllDescendantCategoryIds(moveItemId);
      if (moveTargetId === moveItemId || descendantIds.includes(moveTargetId)) {
        alert("لا يمكن نقل المجموعة إلى نفسها أو إلى مجموعة فرعية منها");
        return;
      }

      // Move category
      const updatedCategories = categories.map((category) => {
        if (category.id === moveItemId) {
          const newParentLevel =
            moveTargetId === "root"
              ? -1
              : categories.find((cat) => cat.id === moveTargetId)?.level || 0;
          return {
            ...category,
            parentId: moveTargetId === "root" ? null : moveTargetId,
            level: newParentLevel + 1,
          };
        }
        return category;
      });

      // Update levels of all descendant categories
      const updateDescendantLevels = (
        categoryId: string,
        levelDiff: number,
      ) => {
        const directChildren = updatedCategories.filter(
          (cat) => cat.parentId === categoryId,
        );
        directChildren.forEach((child) => {
          const childIndex = updatedCategories.findIndex(
            (cat) => cat.id === child.id,
          );
          if (childIndex !== -1) {
            updatedCategories[childIndex].level += levelDiff;
            updateDescendantLevels(child.id, levelDiff);
          }
        });
      };

      const movedCategory = updatedCategories.find(
        (cat) => cat.id === moveItemId,
      );
      const oldLevel =
        categories.find((cat) => cat.id === moveItemId)?.level || 0;
      const levelDiff = movedCategory ? movedCategory.level - oldLevel : 0;

      updateDescendantLevels(moveItemId, levelDiff);

      setCategories(updatedCategories);
    } else {
      // Move product
      const updatedProducts = products.map((product) =>
        product.id === moveItemId
          ? { ...product, categoryId: moveTargetId }
          : product,
      );
      setProducts(updatedProducts);
    }

    setShowMoveDialog(false);
  };

  // Filter products based on search term, category, stock status, city, warehouse, fabric, and color
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      filterCategory === "all" ||
      (filterCategory &&
        (product.categoryId === filterCategory ||
          getAllDescendantCategoryIds(filterCategory).includes(
            product.categoryId,
          )));

    const matchesStock =
      filterStock === "all" ||
      (filterStock === "low" && product.inStock <= product.minStock) ||
      (filterStock === "out" && product.inStock === 0) ||
      (filterStock === "in" && product.inStock > 0);

    // Match city filter
    const matchesCity =
      filterCity === "all" ||
      (product.city &&
        product.city.toLowerCase() === filterCity.toLowerCase()) ||
      (product.tags &&
        product.tags.some(
          (tag) => tag.toLowerCase() === filterCity.toLowerCase(),
        ));

    // Match warehouse filter
    const matchesWarehouse =
      filterWarehouse === "all" ||
      (product.warehouseId && product.warehouseId === filterWarehouse) ||
      (product.tags &&
        product.tags.some((tag) =>
          tag.toLowerCase().includes(filterWarehouse.toLowerCase()),
        ));

    // Match fabric filter
    const matchesFabric =
      filterFabric === "all" ||
      (product.fabric &&
        product.fabric.toLowerCase() === filterFabric.toLowerCase()) ||
      (product.tags &&
        product.tags.some(
          (tag) => tag.toLowerCase() === filterFabric.toLowerCase(),
        ));

    // Match color filter
    const matchesColor =
      filterColor === "all" ||
      (product.color &&
        product.color.toLowerCase() === filterColor.toLowerCase()) ||
      (product.tags &&
        product.tags.some(
          (tag) => tag.toLowerCase() === filterColor.toLowerCase(),
        ));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStock &&
      matchesCity &&
      matchesWarehouse &&
      matchesFabric &&
      matchesColor
    );
  });

  // Render category tree
  const renderCategoryTree = (parentId: string | null = null, level = 0) => {
    const childCategories = getChildCategories(parentId);

    if (childCategories.length === 0) {
      return null;
    }

    return (
      <div className="space-y-1">
        {childCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const isSelected = selectedCategory === category.id;
          const hasChildren = getChildCategories(category.id).length > 0;
          const categoryProducts = getCategoryProducts(category.id);

          return (
            <div key={category.id} className="space-y-1">
              <div
                className={`flex items-center py-1 px-2 rounded-md ${isSelected ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}`}
              >
                <div
                  className="flex items-center flex-1 cursor-pointer"
                  style={{ paddingRight: `${level * 12}px` }}
                  dir="rtl"
                >
                  {hasChildren ? (
                    <button
                      className="p-1 hover:bg-gray-200 rounded-md ml-1"
                      onClick={() => toggleCategoryExpansion(category.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <div className="w-6"></div>
                  )}
                  <div
                    className="flex-1 flex items-center"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <FolderTree className="h-4 w-4 ml-2 text-amber-500" />
                    <span>{category.name}</span>
                    {categoryProducts.length > 0 && (
                      <Badge
                        variant="outline"
                        className="mr-1 ml-2 text-xs bg-gray-100"
                      >
                        {categoryProducts.length}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1 hover:bg-gray-200 rounded-md"
                    onClick={() => openAddCategoryForm(category.id)}
                    title="إضافة مجموعة فرعية"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded-md"
                    onClick={() => openEditCategoryForm(category.id)}
                    title="تعديل المجموعة"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded-md"
                    onClick={() => openMoveDialog("category", category.id)}
                    title="نقل المجموعة"
                  >
                    <MoveRight className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded-md text-red-500"
                    onClick={() => deleteCategory(category.id)}
                    title="حذف المجموعة"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mr-6" dir="rtl">
                  {renderCategoryTree(category.id, level + 1)}

                  {/* Products in this category */}
                  {categoryProducts.length > 0 && (
                    <div className="space-y-1 mt-1">
                      {categoryProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          style={{ paddingRight: `${(level + 1) * 12}px` }}
                          dir="rtl"
                          onClick={() => openProductDetailsDialog(product)}
                        >
                          <div className="flex-1 flex items-center">
                            <Package className="h-4 w-4 ml-2 text-blue-500" />
                            <span>{product.name}</span>
                            <Badge
                              variant="outline"
                              className="mr-1 ml-2 text-xs bg-gray-100"
                            >
                              {product.inStock} {product.unit}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              className="p-1 hover:bg-gray-200 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditProductForm(product.id);
                              }}
                              title="تعديل المنتج"
                            >
                              <Edit className="h-3 w-3" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-200 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                openMoveDialog("product", product.id);
                              }}
                              title="نقل المنتج"
                            >
                              <MoveRight className="h-3 w-3" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-200 rounded-md text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProduct(product.id);
                              }}
                              title="حذف المنتج"
                            >
                              <Trash className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render category table
  const renderCategoryTable = () => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المجموعة</TableHead>
              <TableHead>المجموعة الأم</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead>عدد المنتجات</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => {
              const parentCategory = categories.find(
                (cat) => cat.id === category.parentId,
              );
              const categoryProducts = getCategoryProducts(category.id);

              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FolderTree className="h-4 w-4 ml-2 text-amber-500" />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {parentCategory ? parentCategory.name : "مجموعة رئيسية"}
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{categoryProducts.length}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openAddCategoryForm(category.id)}
                      >
                        <Plus className="h-4 w-4 ml-1" />
                        فرعية
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditCategoryForm(category.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openMoveDialog("category", category.id)}
                      >
                        <MoveRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render category cards
  const renderCategoryCards = () => {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        dir="rtl"
      >
        {categories.map((category) => {
          const parentCategory = categories.find(
            (cat) => cat.id === category.parentId,
          );
          const childCategories = getChildCategories(category.id);
          const categoryProducts = getCategoryProducts(category.id);

          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <FolderTree className="h-5 w-5 ml-2 text-amber-500" />
                    {category.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1 hover:bg-gray-200 rounded-md"
                      onClick={() => openEditCategoryForm(category.id)}
                      title="تعديل المجموعة"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-200 rounded-md"
                      onClick={() => openMoveDialog("category", category.id)}
                      title="نقل المجموعة"
                    >
                      <MoveRight className="h-3 w-3" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-200 rounded-md text-red-500"
                      onClick={() => deleteCategory(category.id)}
                      title="حذف المجموعة"
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parentCategory && (
                      <Badge variant="outline" className="bg-blue-50">
                        المجموعة الأم: {parentCategory.name}
                      </Badge>
                    )}
                    {childCategories.length > 0 && (
                      <Badge variant="outline" className="bg-amber-50">
                        {childCategories.length} مجموعة فرعية
                      </Badge>
                    )}
                    {categoryProducts.length > 0 && (
                      <Badge variant="outline" className="bg-green-50">
                        {categoryProducts.length} منتج
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddCategoryForm(category.id)}
                    >
                      <Plus className="h-4 w-4 ml-1" />
                      مجموعة فرعية
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddProductForm(category.id)}
                    >
                      <Plus className="h-4 w-4 ml-1" />
                      منتج جديد
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Render product table
  const renderProductTable = () => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المنتج</TableHead>
              <TableHead>الرمز</TableHead>
              <TableHead>المجموعة</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>المخزون</TableHead>
              <TableHead>الوحدة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const category = categories.find(
                  (cat) => cat.id === product.categoryId,
                );

                return (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openProductDetailsDialog(product)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 ml-2 text-blue-500" />
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      {category ? category.name : "غير مصنف"}
                    </TableCell>
                    <TableCell>{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.inStock <= 0
                            ? "bg-red-100 text-red-800"
                            : product.inStock <= product.minStock
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {product.inStock}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditProductForm(product.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openMoveDialog("product", product.id);
                          }}
                        >
                          <MoveRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد منتجات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render product cards
  const renderProductCards = () => {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        dir="rtl"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const category = categories.find(
              (cat) => cat.id === product.categoryId,
            );

            return (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openProductDetailsDialog(product)}
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <Badge
                      className={
                        product.inStock <= 0
                          ? "bg-red-100 text-red-800"
                          : product.inStock <= product.minStock
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      المخزون: {product.inStock} {product.unit}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <span>{product.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1 hover:bg-gray-200 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditProductForm(product.id);
                        }}
                        title="تعديل المنتج"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMoveDialog("product", product.id);
                        }}
                        title="نقل المنتج"
                      >
                        <MoveRight className="h-3 w-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded-md text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                        title="حذف المنتج"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        السعر:
                      </span>
                      <span className="font-medium">
                        {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        الرمز:
                      </span>
                      <span>{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        المجموعة:
                      </span>
                      <span>{category ? category.name : "غير مصنف"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Package className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg">لا توجد منتجات مطابقة للبحث</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة المنتجات والمجموعات</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAddCategoryForm()}
          >
            <Plus className="ml-1 h-4 w-4" />
            مجموعة جديدة
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAddProductForm(selectedCategory || null)}
          >
            <Plus className="ml-1 h-4 w-4" />
            منتج جديد
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} dir="rtl">
        <TabsList className="flex-row-reverse">
          <TabsTrigger value="cards">
            <Grid3X3 className="h-4 w-4 ml-2" />
            عرض بطاقات
          </TabsTrigger>
          <TabsTrigger value="table">
            <List className="h-4 w-4 ml-2" />
            عرض جدولي
          </TabsTrigger>
          <TabsTrigger value="tree">
            <FolderTree className="h-4 w-4 ml-2" />
            عرض شجري
          </TabsTrigger>
        </TabsList>

        <div
          className="flex flex-col md:flex-row-reverse justify-between gap-4 mt-4"
          dir="rtl"
        >
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="w-[200px] pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="المجموعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المجموعات</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="حالة المخزون" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المنتجات</SelectItem>
                <SelectItem value="in">متوفر في المخزون</SelectItem>
                <SelectItem value="low">مخزون منخفض</SelectItem>
                <SelectItem value="out">نفذ من المخزون</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المدن</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الدمام">الدمام</SelectItem>
                <SelectItem value="مكة">مكة</SelectItem>
                <SelectItem value="المدينة">المدينة</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterWarehouse} onValueChange={setFilterWarehouse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="المستودع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستودعات</SelectItem>
                <SelectItem value="المستودع الرئيسي">
                  المستودع الرئيسي
                </SelectItem>
                <SelectItem value="مستودع المواد الخام">
                  مستودع المواد الخام
                </SelectItem>
                <SelectItem value="مستودع الإكسسوارات">
                  مستودع الإكسسوارات
                </SelectItem>
                <SelectItem value="مستودع المنتجات النهائية">
                  مستودع المنتجات النهائية
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterFabric} onValueChange={setFilterFabric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نوع القماش" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقمشة</SelectItem>
                <SelectItem value="قطن">قطن</SelectItem>
                <SelectItem value="صوف">صوف</SelectItem>
                <SelectItem value="حرير">حرير</SelectItem>
                <SelectItem value="بوليستر">بوليستر</SelectItem>
                <SelectItem value="كتان">كتان</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterColor} onValueChange={setFilterColor}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اللون" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الألوان</SelectItem>
                <SelectItem value="أبيض">أبيض</SelectItem>
                <SelectItem value="أسود">أسود</SelectItem>
                <SelectItem value="أحمر">أحمر</SelectItem>
                <SelectItem value="أزرق">أزرق</SelectItem>
                <SelectItem value="أخضر">أخضر</SelectItem>
                <SelectItem value="رمادي">رمادي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="tree" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
            <Card className="md:col-span-1 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>مجموعات المنتجات</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCategory(null);
                      setFilterCategory("all");
                    }}
                  >
                    <FolderTree className="h-4 w-4 ml-2 text-amber-500" />
                    جميع المجموعات
                  </Button>

                  {renderCategoryTree()}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start mt-4"
                    onClick={() => openAddCategoryForm()}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مجموعة رئيسية
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>
                  {selectedCategory
                    ? `منتجات ${categories.find((cat) => cat.id === selectedCategory)?.name || ""}`
                    : "جميع المنتجات"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderProductTable()}

                {selectedCategory && (
                  <Button
                    className="mt-4"
                    onClick={() => openAddProductForm(selectedCategory)}
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة منتج جديد
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <Tabs defaultValue="categories" dir="rtl">
            <TabsList className="flex-row-reverse">
              <TabsTrigger value="products">
                <Package className="h-4 w-4 ml-2" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="categories">
                <FolderTree className="h-4 w-4 ml-2" />
                المجموعات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-4">
              {renderCategoryTable()}
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              {renderProductTable()}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          <Tabs defaultValue="categories" dir="rtl">
            <TabsList className="flex-row-reverse">
              <TabsTrigger value="products">
                <Package className="h-4 w-4 ml-2" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="categories">
                <FolderTree className="h-4 w-4 ml-2" />
                المجموعات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-4">
              {renderCategoryCards()}
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              {renderProductCards()}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {categoryFormMode === "add"
                ? "إضافة مجموعة جديدة"
                : "تعديل المجموعة"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="category-name">اسم المجموعة</label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
                placeholder="أدخل اسم المجموعة"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category-description">وصف المجموعة</label>
              <Input
                id="category-description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
                placeholder="أدخل وصف المجموعة"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category-parent">المجموعة الأم</label>
              <Select
                value={categoryForm.parentId}
                onValueChange={(value) =>
                  setCategoryForm({ ...categoryForm, parentId: value })
                }
              >
                <SelectTrigger id="category-parent">
                  <SelectValue placeholder="اختر المجموعة الأم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">مجموعة رئيسية</SelectItem>
                  {categories
                    .filter(
                      (cat) =>
                        cat.id !== categoryForm.id &&
                        !getAllDescendantCategoryIds(categoryForm.id).includes(
                          cat.id,
                        ),
                    )
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCategoryDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={saveCategory}>
              {categoryFormMode === "add" ? "إضافة" : "حفظ التغييرات"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {productFormMode === "add" ? "إضافة منتج جديد" : "تعديل المنتج"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="product-name">اسم المنتج</label>
                <Input
                  id="product-name"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-category">المجموعة</label>
                <Select
                  value={productForm.categoryId}
                  onValueChange={(value) =>
                    setProductForm({ ...productForm, categoryId: value })
                  }
                >
                  <SelectTrigger id="product-category">
                    <SelectValue placeholder="اختر المجموعة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="product-sku">رمز المنتج (SKU)</label>
                <Input
                  id="product-sku"
                  value={productForm.sku}
                  onChange={(e) =>
                    setProductForm({ ...productForm, sku: e.target.value })
                  }
                  placeholder="أدخل رمز المنتج"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-barcode">الباركود</label>
                <div className="flex gap-2">
                  <Input
                    id="product-barcode"
                    value={productForm.barcode}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        barcode: e.target.value,
                      })
                    }
                    placeholder="أدخل الباركود"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    title="توليد باركود"
                    onClick={() =>
                      setProductForm({
                        ...productForm,
                        barcode: Math.floor(
                          Math.random() * 9000000000000 + 1000000000000,
                        ).toString(),
                      })
                    }
                  >
                    <Barcode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label htmlFor="product-price">سعر البيع</label>
                <Input
                  id="product-price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="أدخل سعر البيع"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-cost">تكلفة الشراء</label>
                <Input
                  id="product-cost"
                  type="number"
                  value={productForm.cost}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="أدخل تكلفة الشراء"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-unit">وحدة القياس</label>
                <Input
                  id="product-unit"
                  value={productForm.unit}
                  onChange={(e) =>
                    setProductForm({ ...productForm, unit: e.target.value })
                  }
                  placeholder="مثل: قطعة، متر، كيلوغرام"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="product-stock">الكمية في المخزون</label>
                <Input
                  id="product-stock"
                  type="number"
                  value={productForm.inStock}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      inStock: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="أدخل الكمية في المخزون"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="product-min-stock">الحد الأدنى للمخزون</label>
                <Input
                  id="product-min-stock"
                  type="number"
                  value={productForm.minStock}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      minStock: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="أدخل الحد الأدنى للمخزون"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="product-description">وصف المنتج</label>
              <Input
                id="product-description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                placeholder="أدخل وصف المنتج"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="product-tags">الوسوم (مفصولة بفواصل)</label>
              <Input
                id="product-tags"
                value={productForm.tags.join(", ")}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag),
                  })
                }
                placeholder="مثل: قطن، أبيض، صيفي"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="product-image">رابط الصورة</label>
              <Input
                id="product-image"
                value={productForm.imageUrl}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    imageUrl: e.target.value,
                  })
                }
                placeholder="أدخل رابط صورة المنتج"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowProductDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={saveProduct}>
              {productFormMode === "add" ? "إضافة" : "حفظ التغييرات"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {moveType === "category" ? "نقل المجموعة" : "نقل المنتج"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="move-target">
                {moveType === "category"
                  ? "اختر المجموعة الأم الجديدة"
                  : "اختر المجموعة الجديدة"}
              </label>
              <Select value={moveTargetId} onValueChange={setMoveTargetId}>
                <SelectTrigger id="move-target">
                  <SelectValue placeholder="اختر الوجهة" />
                </SelectTrigger>
                <SelectContent>
                  {moveType === "category" && (
                    <SelectItem value="root">مجموعة رئيسية</SelectItem>
                  )}
                  {categories
                    .filter((cat) => {
                      if (moveType === "category") {
                        // Exclude the category itself and its descendants
                        return (
                          cat.id !== moveItemId &&
                          !getAllDescendantCategoryIds(moveItemId).includes(
                            cat.id,
                          )
                        );
                      }
                      return true; // Include all categories for product move
                    })
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={moveItem}>نقل</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <ProductDetails
          open={showProductDetailsDialog}
          onClose={() => setShowProductDetailsDialog(false)}
          product={selectedProduct}
          onSavePricing={handleSavePricing}
        />
      )}
    </div>
  );
};

export default ProductManager;
