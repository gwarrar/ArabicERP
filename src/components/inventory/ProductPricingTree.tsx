import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  ChevronDown,
  Search,
  Tag,
  Percent,
  DollarSign,
  Filter,
  Edit,
  Trash,
  Plus,
  RefreshCw,
} from "lucide-react";
import ProductPricingDetails from "./ProductPricingDetails";

import {
  priceTiers,
  customerTypes,
  productPrices,
  promotions,
} from "@/data/pricingData";
import { products, productCategories as categories } from "@/data/products";

interface ProductPricingTreeProps {
  onSelectProduct?: (productId: string) => void;
}

const ProductPricingTree: React.FC<ProductPricingTreeProps> = ({
  onSelectProduct,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [filterByPricing, setFilterByPricing] = useState(false);

  // Expand root categories by default
  useEffect(() => {
    const rootCategories = categories
      .filter((cat) => !cat.parentId)
      .map((cat) => cat.id);
    setExpandedCategories(rootCategories);
  }, []);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    if (onSelectProduct) {
      onSelectProduct(productId);
    }
  };

  // Filter products based on search term and pricing filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterByPricing) {
      // Only show products that have custom pricing
      const hasPricing = productPrices.some(
        (price) => price.productId === product.id,
      );
      return hasPricing;
    }

    return true;
  });

  // Render category with its products
  const renderCategory = (categoryId: string, level = 0) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return null;

    const isExpanded = expandedCategories.includes(categoryId);
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId,
    );

    // Apply pricing filter if needed
    const filteredCategoryProducts = filterByPricing
      ? categoryProducts.filter((product) =>
          productPrices.some((price) => price.productId === product.id),
        )
      : categoryProducts;

    const hasProducts = filteredCategoryProducts.length > 0;
    const hasSubcategories = categories.some(
      (cat) => cat.parentId === categoryId,
    );

    // Skip rendering if no products match search and no subcategories match search
    if (
      searchTerm &&
      !filteredCategoryProducts.some(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.barcode?.toLowerCase().includes(searchTerm.toLowerCase()),
      ) &&
      !categories
        .filter((cat) => cat.parentId === categoryId)
        .some((subCat) => {
          const subProducts = filterByPricing
            ? products.filter(
                (product) =>
                  product.categoryId === subCat.id &&
                  productPrices.some((price) => price.productId === product.id),
              )
            : products.filter((product) => product.categoryId === subCat.id);

          return subProducts.some(
            (product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.barcode?.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        })
    ) {
      return null;
    }

    return (
      <div key={categoryId} className="mb-1">
        <div
          className={`flex items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer ${level > 0 ? "mr-" + level * 4 : ""}`}
          onClick={() => toggleCategory(categoryId)}
        >
          <div className="ml-2">
            {hasSubcategories || hasProducts ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <span className="w-4" />
            )}
          </div>
          <span className="font-medium">{category.name}</span>
          <span className="text-muted-foreground text-sm ml-2">
            ({filteredCategoryProducts.length})
          </span>
        </div>

        {isExpanded && (
          <div className="mr-2">
            {/* Render subcategories */}
            {categories
              .filter((cat) => cat.parentId === categoryId)
              .map((subCategory) => renderCategory(subCategory.id, level + 1))}

            {/* Render products */}
            {!searchTerm ||
            filteredCategoryProducts.some(
              (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.barcode
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()),
            )
              ? filteredCategoryProducts.map((product) => {
                  // Skip if doesn't match search
                  if (
                    searchTerm &&
                    !product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    !(product.barcode
                      ? product.barcode
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : false)
                  ) {
                    return null;
                  }

                  // Count prices for this product
                  const priceCount = productPrices.filter(
                    (price) => price.productId === product.id,
                  ).length;

                  // Count promotions for this product
                  const promoCount = promotions.filter((promo) =>
                    promo.productIds?.includes(product.id),
                  ).length;

                  return (
                    <div
                      key={product.id}
                      className={`flex items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer mr-${level * 4 + 6} ${selectedProduct === product.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                      onClick={() => handleProductSelect(product.id)}
                    >
                      <span className="ml-6">{product.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {product.barcode}
                      </span>
                      <div className="ml-auto flex items-center gap-2">
                        {priceCount > 0 && (
                          <Badge
                            variant="outline"
                            className="flex items-center"
                          >
                            <DollarSign className="h-3 w-3 ml-1" />
                            {priceCount}
                          </Badge>
                        )}
                        {promoCount > 0 && (
                          <Badge
                            variant="outline"
                            className="flex items-center text-green-600 border-green-200"
                          >
                            <Percent className="h-3 w-3 ml-1" />
                            {promoCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-4 pt-4">
        <div className="flex items-center">
          <Button
            variant={filterByPricing ? "default" : "outline"}
            size="sm"
            className="ml-2"
            onClick={() => setFilterByPricing(!filterByPricing)}
          >
            <DollarSign className="h-4 w-4 ml-1" />
            {filterByPricing ? "عرض الكل" : "منتجات مسعرة فقط"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setFilterByPricing(false);
            }}
          >
            <RefreshCw className="h-4 w-4 ml-1" />
            إعادة ضبط
          </Button>
        </div>

        <div className="relative w-64">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم أو الباركود..."
            className="w-full pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex h-[calc(100%-60px)]">
        <Card className="w-1/3 ml-4 h-full">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-md">شجرة المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[calc(100vh-350px)]">
              {/* Root categories */}
              {categories
                .filter((category) => !category.parentId)
                .map((category) => renderCategory(category.id))}

              {/* Show filtered products that don't match the tree view */}
              {searchTerm && (
                <div className="mt-4 border-t pt-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    نتائج البحث
                  </div>
                  {filteredProducts
                    .filter(
                      (product) =>
                        !expandedCategories.includes(product.categoryId),
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className={`flex items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer ${selectedProduct === product.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                        onClick={() => handleProductSelect(product.id)}
                      >
                        <span>{product.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {product.barcode}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="w-2/3 h-full">
          {selectedProduct ? (
            <ProductPricingDetails productId={selectedProduct} />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900 rounded-md">
              <div className="text-center text-muted-foreground">
                <Tag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">اختر منتجاً لعرض تفاصيل التسعير</p>
                <p className="text-sm mt-2">
                  يمكنك البحث عن منتج أو تصفح شجرة المنتجات
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPricingTree;
