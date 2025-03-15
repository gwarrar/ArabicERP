import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManager from "./ProductManager";

const EnhancedProductCategories = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>إدارة مجموعات المنتجات</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductManager />
      </CardContent>
    </Card>
  );
};

export default EnhancedProductCategories;
