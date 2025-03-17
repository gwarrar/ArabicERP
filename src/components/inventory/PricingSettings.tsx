import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  RefreshCw,
  DollarSign,
  Percent,
  Calculator,
  Settings,
} from "lucide-react";

interface PricingSettingsProps {
  onSave?: () => void;
}

const PricingSettings: React.FC<PricingSettingsProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    defaultCurrency: "UAH",
    currencySymbol: "₴",
    taxRate: 15,
    applyTaxAfterDiscount: true,
    roundPrices: true,
    roundingMethod: "nearest",
    decimalPlaces: 0,
    showDiscountedPriceFirst: true,
    enableBulkPricing: true,
    enableCustomerSpecificPricing: true,
    enablePromotionCombination: false,
    enableAutomaticPromotions: true,
    priceCalculationMethod: "markup",
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    if (onSave) onSave();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">إعدادات التسعير</h3>
        <Button onClick={handleSave}>
          <Save className="ml-2 h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 ml-2" />
            إعدادات عامة
          </TabsTrigger>
          <TabsTrigger value="tax">
            <Percent className="h-4 w-4 ml-2" />
            الضرائب
          </TabsTrigger>
          <TabsTrigger value="calculation">
            <Calculator className="h-4 w-4 ml-2" />
            حساب الأسعار
          </TabsTrigger>
          <TabsTrigger value="currency">
            <DollarSign className="h-4 w-4 ml-2" />
            العملات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">الإعدادات العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showDiscountedPriceFirst">
                      عرض السعر المخفض أولاً
                    </Label>
                    <Switch
                      id="showDiscountedPriceFirst"
                      checked={settings.showDiscountedPriceFirst}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          showDiscountedPriceFirst: checked,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    عرض السعر بعد الخصم بشكل بارز وإظهار السعر الأصلي بجانبه
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableBulkPricing">
                      تفعيل أسعار الكميات
                    </Label>
                    <Switch
                      id="enableBulkPricing"
                      checked={settings.enableBulkPricing}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, enableBulkPricing: checked })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تطبيق أسعار خاصة للكميات الكبيرة
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableCustomerSpecificPricing">
                      تفعيل أسعار خاصة للعملاء
                    </Label>
                    <Switch
                      id="enableCustomerSpecificPricing"
                      checked={settings.enableCustomerSpecificPricing}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          enableCustomerSpecificPricing: checked,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تطبيق أسعار خاصة لأنواع العملاء المختلفة
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enablePromotionCombination">
                      السماح بدمج العروض
                    </Label>
                    <Switch
                      id="enablePromotionCombination"
                      checked={settings.enablePromotionCombination}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          enablePromotionCombination: checked,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    السماح بتطبيق أكثر من عرض على نفس المنتج
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableAutomaticPromotions">
                      تفعيل العروض التلقائية
                    </Label>
                    <Switch
                      id="enableAutomaticPromotions"
                      checked={settings.enableAutomaticPromotions}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          enableAutomaticPromotions: checked,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تطبيق العروض تلقائياً عند استيفاء الشروط
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">إعدادات الضرائب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">نسبة الضريبة الافتراضية (%)</Label>
                  <div className="relative">
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.taxRate}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          taxRate: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="applyTaxAfterDiscount">
                      تطبيق الضريبة بعد الخصم
                    </Label>
                    <Switch
                      id="applyTaxAfterDiscount"
                      checked={settings.applyTaxAfterDiscount}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          applyTaxAfterDiscount: checked,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    حساب الضريبة على السعر بعد تطبيق الخصومات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">إعدادات حساب الأسعار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceCalculationMethod">
                    طريقة حساب الأسعار
                  </Label>
                  <Select
                    value={settings.priceCalculationMethod}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        priceCalculationMethod: value,
                      })
                    }
                  >
                    <SelectTrigger id="priceCalculationMethod">
                      <SelectValue placeholder="اختر طريقة الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markup">
                        هامش ربح (نسبة من التكلفة)
                      </SelectItem>
                      <SelectItem value="margin">
                        نسبة ربح (من سعر البيع)
                      </SelectItem>
                      <SelectItem value="fixed">سعر ثابت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="roundPrices">تقريب الأسعار</Label>
                    <Switch
                      id="roundPrices"
                      checked={settings.roundPrices}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, roundPrices: checked })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تقريب الأسعار بعد الحساب
                  </p>
                </div>

                {settings.roundPrices && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="roundingMethod">طريقة التقريب</Label>
                      <Select
                        value={settings.roundingMethod}
                        onValueChange={(value) =>
                          setSettings({ ...settings, roundingMethod: value })
                        }
                      >
                        <SelectTrigger id="roundingMethod">
                          <SelectValue placeholder="اختر طريقة التقريب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nearest">لأقرب رقم</SelectItem>
                          <SelectItem value="up">للأعلى</SelectItem>
                          <SelectItem value="down">للأسفل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="decimalPlaces">عدد الأرقام العشرية</Label>
                      <Input
                        id="decimalPlaces"
                        type="number"
                        min="0"
                        max="4"
                        value={settings.decimalPlaces}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            decimalPlaces: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">إعدادات العملات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">العملة الافتراضية</Label>
                  <Select
                    value={settings.defaultCurrency}
                    onValueChange={(value) =>
                      setSettings({ ...settings, defaultCurrency: value })
                    }
                  >
                    <SelectTrigger id="defaultCurrency">
                      <SelectValue placeholder="اختر العملة الافتراضية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UAH">
                        الهريفنيا الأوكرانية (UAH)
                      </SelectItem>
                      <SelectItem value="USD">
                        الدولار الأمريكي (USD)
                      </SelectItem>
                      <SelectItem value="EUR">اليورو (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">رمز العملة</Label>
                  <Input
                    id="currencySymbol"
                    value={settings.currencySymbol}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        currencySymbol: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="ml-2 h-4 w-4" />
                  تحديث أسعار الصرف
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingSettings;
