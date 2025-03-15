import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Check } from "lucide-react";
import { products } from "@/data/products";
import { productCategories } from "@/data/products";
import { Badge } from "@/components/ui/badge";

interface EnhancedProductSearchProps {
  onSelect: (selectedProducts: any[]) => void;
  onCancel: () => void;
}

const EnhancedProductSearch: React.FC<EnhancedProductSearchProps> = ({
  onSelect,
  onCancel,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.barcode.toLowerCase().includes(query),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  // Toggle product selection
  const toggleProductSelection = (product: any) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Select all visible products
  const selectAllVisible = () => {
    const allIds = new Set(filteredProducts.map((p) => p.id));
    const currentSelected = selectedProducts.filter((p) => !allIds.has(p.id));
    setSelectedProducts([...currentSelected, ...filteredProducts]);
  };

  // Deselect all visible products
  const deselectAllVisible = () => {
    const visibleIds = new Set(filteredProducts.map((p) => p.id));
    setSelectedProducts(selectedProducts.filter((p) => !visibleIds.has(p.id)));
  };

  // Add selected products to invoice
  const addSelectedProducts = () => {
    if (selectedProducts.length > 0) {
      onSelect(selectedProducts);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "border-primary" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {productCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.name ? null : category.name,
              )
            }
          >
            {category.name} ({category.count})
          </Badge>
        ))}
      </div>

      {/* Selection Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {selectedProducts.length} منتج محدد
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAllVisible}
            disabled={filteredProducts.length === 0}
          >
            تحديد الكل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={deselectAllVisible}
            disabled={selectedProducts.length === 0}
          >
            إلغاء التحديد
          </Button>
        </div>
      </div>

      {/* Products List */}
      <div
        className="border rounded-lg overflow-auto"
        style={{ maxHeight: "300px" }}
      >
        {filteredProducts.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            لا توجد منتجات مطابقة للبحث
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.some(
                (p) => p.id === product.id,
              );
              return (
                <div
                  key={product.id}
                  className={`border rounded-lg p-2 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors ${isSelected ? "bg-primary/10 border-primary/30" : ""}`}
                  onClick={() => toggleProductSelection(product)}
                >
                  <div className="flex-shrink-0">
                    <Checkbox checked={isSelected} />
                  </div>
                  <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>{product.category}</span>
                      <span className="font-medium">
                        {product.price.toLocaleString()} ₴
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button
          onClick={addSelectedProducts}
          disabled={selectedProducts.length === 0}
        >
          <Check className="ml-2 h-4 w-4" />
          إضافة ({selectedProducts.length})
        </Button>
      </div>
    </div>
  );
};

export default EnhancedProductSearch;
