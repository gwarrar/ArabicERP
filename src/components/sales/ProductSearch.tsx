import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Tag, Package } from "lucide-react";
import { products, productCategories } from "@/data/products";

interface ProductSearchProps {
  onSelect: (product: any) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Filter products based on search term and category
    const filtered = products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.barcode.includes(searchTerm)
        : true;

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث في المنتجات..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <select
            className="bg-transparent border-none text-sm focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">جميع الفئات</option>
            {productCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mb-2 opacity-20" />
          <p>لا توجد منتجات مطابقة للبحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelect(product)}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium truncate">{product.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-primary font-bold">
                    {product.price.toLocaleString()} ₴
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    {product.stock} قطعة
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  {product.barcode} | {product.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
