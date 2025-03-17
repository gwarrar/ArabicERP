import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Tag, Percent, Settings } from "lucide-react";
import ProductPricingTree from "@/components/inventory/ProductPricingTree";
import PricingTiersManager from "@/components/inventory/PricingTiersManager";
import PromotionsManager from "@/components/inventory/PromotionsManager";
import PricingSettings from "@/components/inventory/PricingSettings";

const PricingPage = () => {
  const [activeTab, setActiveTab] = React.useState("products");

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة الأسعار والعروض</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="products">
              <Tag className="h-4 w-4 ml-2" />
              المنتجات والأسعار
            </TabsTrigger>
            <TabsTrigger value="pricing-tiers">
              <DollarSign className="h-4 w-4 ml-2" />
              مستويات التسعير
            </TabsTrigger>
            <TabsTrigger value="promotions">
              <Percent className="h-4 w-4 ml-2" />
              العروض والتخفيضات
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات التسعير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <ProductPricingTree />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing-tiers" className="mt-0">
            <PricingTiersManager />
          </TabsContent>

          <TabsContent value="promotions" className="mt-0">
            <PromotionsManager />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <PricingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PricingPage;
