import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Tag, Percent, Info } from "lucide-react";
import ProductPricingTree from "@/components/inventory/ProductPricingTree";
import PricingTiersManager from "@/components/inventory/PricingTiersManager";
import PromotionsManager from "@/components/inventory/PromotionsManager";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PricingInventory = () => {
  const [activeTab, setActiveTab] = React.useState("products");

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>إدارة الأسعار والعروض</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p className="text-sm">
                  يمكنك إدارة أسعار المنتجات ومستويات التسعير والعروض من هنا
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[calc(100%-60px)]">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full"
        >
          <TabsList className="mb-4 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
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
          </TabsList>

          <TabsContent value="products" className="mt-0 h-[calc(100%-48px)]">
            <Card className="border-0 shadow-sm h-full">
              <CardContent className="p-0 h-full">
                <ProductPricingTree />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="pricing-tiers"
            className="mt-0 h-[calc(100%-48px)] overflow-auto"
          >
            <PricingTiersManager />
          </TabsContent>

          <TabsContent
            value="promotions"
            className="mt-0 h-[calc(100%-48px)] overflow-auto"
          >
            <PromotionsManager />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PricingInventory;
