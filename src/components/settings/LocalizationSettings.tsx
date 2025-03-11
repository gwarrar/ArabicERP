import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Globe,
  Clock,
  DollarSign,
  Check,
  Plus,
  Edit,
  Trash,
  Search,
  RefreshCw,
  Euro,
  PoundSterling,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocalizationSettings = () => {
  const [activeTab, setActiveTab] = useState("timezone");
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("UAH");
  const [defaultLanguage, setDefaultLanguage] = useState("ar");
  const [defaultTimezone, setDefaultTimezone] = useState("Europe/Kiev");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("HH:mm:ss");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("sunday");

  // بيانات تجريبية للعملات
  const currencies = [
    {
      code: "UAH",
      name: "الهريفنيا الأوكرانية",
      symbol: "₴",
      rate: 1,
      isDefault: true,
    },
    {
      code: "USD",
      name: "الدولار الأمريكي",
      symbol: "$",
      rate: 0.027,
      isDefault: false,
    },
    { code: "EUR", name: "اليورو", symbol: "€", rate: 0.024, isDefault: false },
    {
      code: "GBP",
      name: "الجنيه الإسترليني",
      symbol: "£",
      rate: 0.021,
      isDefault: false,
    },
    {
      code: "SAR",
      name: "الريال السعودي",
      symbol: "ر.س",
      rate: 0.1,
      isDefault: false,
    },
    {
      code: "AED",
      name: "الدرهم الإماراتي",
      symbol: "د.إ",
      rate: 0.099,
      isDefault: false,
    },
    {
      code: "EGP",
      name: "الجنيه المصري",
      symbol: "ج.م",
      rate: 0.83,
      isDefault: false,
    },
    {
      code: "JPY",
      name: "الين الياباني",
      symbol: "¥",
      rate: 4.01,
      isDefault: false,
    },
    {
      code: "CNY",
      name: "اليوان الصيني",
      symbol: "¥",
      rate: 0.19,
      isDefault: false,
    },
  ];

  // بيانات تجريبية للغات
  const languages = [
    { code: "ar", name: "العربية", isDefault: true, direction: "rtl" },
    { code: "en", name: "الإنجليزية", isDefault: false, direction: "ltr" },
    { code: "fr", name: "الفرنسية", isDefault: false, direction: "ltr" },
    { code: "uk", name: "الأوكرانية", isDefault: false, direction: "ltr" },
    { code: "ru", name: "الروسية", isDefault: false, direction: "ltr" },
  ];

  // بيانات تجريبية للمناطق الزمنية
  const timezones = [
    {
      code: "Europe/Kiev",
      name: "كييف (توقيت أوروبا الشرقية)",
      offset: "+02:00",
      isDefault: true,
    },
    {
      code: "Europe/London",
      name: "لندن (توقيت غرينتش)",
      offset: "+00:00",
      isDefault: false,
    },
    {
      code: "America/New_York",
      name: "نيويورك (التوقيت الشرقي)",
      offset: "-05:00",
      isDefault: false,
    },
    {
      code: "Asia/Dubai",
      name: "دبي (توقيت الخليج)",
      offset: "+04:00",
      isDefault: false,
    },
    {
      code: "Asia/Riyadh",
      name: "الرياض (توقيت السعودية)",
      offset: "+03:00",
      isDefault: false,
    },
    {
      code: "Asia/Tokyo",
      name: "طوكيو (توقيت اليابان)",
      offset: "+09:00",
      isDefault: false,
    },
  ];

  // تصفية العملات حسب البحث
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.includes(searchQuery) ||
      currency.code.includes(searchQuery.toUpperCase()),
  );

  // تصفية اللغات حسب البحث
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.includes(searchQuery) ||
      language.code.includes(searchQuery.toLowerCase()),
  );

  // تصفية المناطق الزمنية حسب البحث
  const filteredTimezones = timezones.filter(
    (timezone) =>
      timezone.name.includes(searchQuery) ||
      timezone.code.includes(searchQuery),
  );

  // تعيين العملة الافتراضية
  const handleSetDefaultCurrency = (code) => {
    setDefaultCurrency(code);
  };

  // تعيين اللغة الافتراضية
  const handleSetDefaultLanguage = (code) => {
    setDefaultLanguage(code);
  };

  // تعيين المنطقة الزمنية الافتراضية
  const handleSetDefaultTimezone = (code) => {
    setDefaultTimezone(code);
  };

  // الحصول على رمز العملة
  const getCurrencyIcon = (code) => {
    switch (code) {
      case "USD":
        return <DollarSign className="h-4 w-4" />;
      case "EUR":
        return <Euro className="h-4 w-4" />;
      case "GBP":
        return <PoundSterling className="h-4 w-4" />;
      case "JPY":
      case "CNY":
        return <span className="h-4 w-4 font-bold">¥</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">الإعدادات المحلية</h2>
          <p className="text-muted-foreground">
            إعدادات اللغة والعملة والمنطقة الزمنية
          </p>
        </div>
        <Button>
          <Save className="ml-2 h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </div>

      {/* تبويبات الإعدادات المحلية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timezone">
            <Clock className="h-4 w-4 ml-2" />
            المنطقة الزمنية
          </TabsTrigger>
          <TabsTrigger value="currency">
            <DollarSign className="h-4 w-4 ml-2" />
            العملات
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 ml-2" />
            اللغات
          </TabsTrigger>
        </TabsList>

        {/* تبويب المنطقة الزمنية */}
        <TabsContent value="timezone" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المنطقة الزمنية</CardTitle>
              <CardDescription>
                تعيين المنطقة الزمنية وتنسيق التاريخ والوقت
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      المنطقة الزمنية الافتراضية
                    </label>
                    <Select
                      value={defaultTimezone}
                      onValueChange={setDefaultTimezone}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنطقة الزمنية" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((timezone) => (
                          <SelectItem key={timezone.code} value={timezone.code}>
                            {timezone.name} ({timezone.offset})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">تنسيق التاريخ</label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تنسيق التاريخ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">
                          DD/MM/YYYY (31/12/2024)
                        </SelectItem>
                        <SelectItem value="MM/DD/YYYY">
                          MM/DD/YYYY (12/31/2024)
                        </SelectItem>
                        <SelectItem value="YYYY-MM-DD">
                          YYYY-MM-DD (2024-12-31)
                        </SelectItem>
                        <SelectItem value="DD-MM-YYYY">
                          DD-MM-YYYY (31-12-2024)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">تنسيق الوقت</label>
                    <Select value={timeFormat} onValueChange={setTimeFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تنسيق الوقت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HH:mm:ss">
                          24 ساعة (14:30:00)
                        </SelectItem>
                        <SelectItem value="hh:mm:ss a">
                          12 ساعة (02:30:00 م)
                        </SelectItem>
                        <SelectItem value="HH:mm">
                          24 ساعة بدون ثواني (14:30)
                        </SelectItem>
                        <SelectItem value="hh:mm a">
                          12 ساعة بدون ثواني (02:30 م)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      أول يوم في الأسبوع
                    </label>
                    <Select
                      value={firstDayOfWeek}
                      onValueChange={setFirstDayOfWeek}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر أول يوم في الأسبوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">الأحد</SelectItem>
                        <SelectItem value="monday">الاثنين</SelectItem>
                        <SelectItem value="saturday">السبت</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      المناطق الزمنية المتاحة
                    </label>
                    <div className="relative">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث عن منطقة زمنية..."
                        className="pr-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المنطقة الزمنية</TableHead>
                          <TableHead>الفارق</TableHead>
                          <TableHead>الافتراضية</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTimezones.length > 0 ? (
                          filteredTimezones.map((timezone) => (
                            <TableRow key={timezone.code}>
                              <TableCell>{timezone.name}</TableCell>
                              <TableCell>{timezone.offset}</TableCell>
                              <TableCell>
                                <Button
                                  variant={
                                    defaultTimezone === timezone.code
                                      ? "default"
                                      : "ghost"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    handleSetDefaultTimezone(timezone.code)
                                  }
                                >
                                  {defaultTimezone === timezone.code ? (
                                    <Check className="h-4 w-4 ml-1" />
                                  ) : null}
                                  {defaultTimezone === timezone.code
                                    ? "افتراضية"
                                    : "تعيين كافتراضية"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">
                              لا توجد مناطق زمنية مطابقة لبحثك
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معاينة التاريخ والوقت</CardTitle>
              <CardDescription>
                معاينة تنسيق التاريخ والوقت المحدد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">التاريخ الحالي</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {dateFormat === "DD/MM/YYYY" && "31/08/2024"}
                      {dateFormat === "MM/DD/YYYY" && "08/31/2024"}
                      {dateFormat === "YYYY-MM-DD" && "2024-08-31"}
                      {dateFormat === "DD-MM-YYYY" && "31-08-2024"}
                    </span>
                    <Badge>{dateFormat}</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">الوقت الحالي</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {timeFormat === "HH:mm:ss" && "14:30:45"}
                      {timeFormat === "hh:mm:ss a" && "02:30:45 م"}
                      {timeFormat === "HH:mm" && "14:30"}
                      {timeFormat === "hh:mm a" && "02:30 م"}
                    </span>
                    <Badge>{timeFormat}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب العملات */}
        <TabsContent value="currency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات العملة</CardTitle>
              <CardDescription>
                تعيين العملة الافتراضية وإدارة العملات المتاحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      العملة الافتراضية
                    </label>
                    <Select
                      value={defaultCurrency}
                      onValueChange={setDefaultCurrency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة الافتراضية" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      موضع رمز العملة
                    </label>
                    <Select defaultValue="before">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر موضع رمز العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before">
                          قبل المبلغ (₴ 100)
                        </SelectItem>
                        <SelectItem value="after">
                          بعد المبلغ (100 ₴)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">فاصل الآلاف</label>
                    <Select defaultValue="comma">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فاصل الآلاف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comma">فاصلة (1,000)</SelectItem>
                        <SelectItem value="dot">نقطة (1.000)</SelectItem>
                        <SelectItem value="space">مسافة (1 000)</SelectItem>
                        <SelectItem value="none">بدون فاصل (1000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      فاصل الكسور العشرية
                    </label>
                    <Select defaultValue="dot">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فاصل الكسور العشرية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dot">نقطة (100.50)</SelectItem>
                        <SelectItem value="comma">فاصلة (100,50)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      عدد الخانات العشرية
                    </label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر عدد الخانات العشرية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">بدون كسور عشرية (100)</SelectItem>
                        <SelectItem value="1">
                          خانة عشرية واحدة (100.5)
                        </SelectItem>
                        <SelectItem value="2">
                          خانتان عشريتان (100.50)
                        </SelectItem>
                        <SelectItem value="3">
                          ثلاث خانات عشرية (100.500)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        العملات المتاحة
                      </label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 ml-1" />
                        إضافة عملة
                      </Button>
                    </div>
                    <div className="relative">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث عن عملة..."
                        className="pr-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الرمز</TableHead>
                          <TableHead>العملة</TableHead>
                          <TableHead>سعر الصرف</TableHead>
                          <TableHead>الافتراضية</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCurrencies.length > 0 ? (
                          filteredCurrencies.map((currency) => (
                            <TableRow key={currency.code}>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getCurrencyIcon(currency.code)}
                                  <span>{currency.symbol}</span>
                                  <Badge variant="outline">
                                    {currency.code}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>{currency.name}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>{currency.rate}</span>
                                  <Button variant="ghost" size="icon">
                                    <RefreshCw className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant={
                                    defaultCurrency === currency.code
                                      ? "default"
                                      : "ghost"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    handleSetDefaultCurrency(currency.code)
                                  }
                                >
                                  {defaultCurrency === currency.code ? (
                                    <Check className="h-4 w-4 ml-1" />
                                  ) : null}
                                  {defaultCurrency === currency.code
                                    ? "افتراضية"
                                    : "تعيين كافتراضية"}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              لا توجد عملات مطابقة لبحثك
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معاينة تنسيق العملة</CardTitle>
              <CardDescription>معاينة تنسيق العملة المحدد</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">المبلغ الأساسي</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₴ 1,234.56</span>
                    <Badge>أساسي</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">مبلغ كبير</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₴ 1,234,567.89</span>
                    <Badge>كبير</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">مبلغ صغير</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₴ 0.99</span>
                    <Badge>صغير</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب اللغات */}
        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات اللغة</CardTitle>
              <CardDescription>
                تعيين اللغة الافتراضية وإدارة اللغات المتاحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      اللغة الافتراضية
                    </label>
                    <Select
                      value={defaultLanguage}
                      onValueChange={setDefaultLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اللغة الافتراضية" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      اتجاه النص الافتراضي
                    </label>
                    <Select defaultValue="rtl">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اتجاه النص الافتراضي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rtl">
                          من اليمين إلى اليسار (RTL)
                        </SelectItem>
                        <SelectItem value="ltr">
                          من اليسار إلى اليمين (LTR)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">تنسيق الأرقام</label>
                    <Select defaultValue="arabic">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تنسيق الأرقام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arabic">
                          أرقام عربية (1, 2, 3)
                        </SelectItem>
                        <SelectItem value="hindi">
                          أرقام هندية (١, ٢, ٣)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      السماح بتغيير اللغة للمستخدمين
                    </label>
                    <Select defaultValue="yes">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">نعم</SelectItem>
                        <SelectItem value="no">لا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        اللغات المتاحة
                      </label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 ml-1" />
                        إضافة لغة
                      </Button>
                    </div>
                    <div className="relative">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث عن لغة..."
                        className="pr-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الرمز</TableHead>
                          <TableHead>اللغة</TableHead>
                          <TableHead>الاتجاه</TableHead>
                          <TableHead>الافتراضية</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLanguages.length > 0 ? (
                          filteredLanguages.map((language) => (
                            <TableRow key={language.code}>
                              <TableCell>
                                <Badge variant="outline">{language.code}</Badge>
                              </TableCell>
                              <TableCell>{language.name}</TableCell>
                              <TableCell>
                                <Badge>
                                  {language.direction === "rtl" ? "RTL" : "LTR"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant={
                                    defaultLanguage === language.code
                                      ? "default"
                                      : "ghost"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    handleSetDefaultLanguage(language.code)
                                  }
                                >
                                  {defaultLanguage === language.code ? (
                                    <Check className="h-4 w-4 ml-1" />
                                  ) : null}
                                  {defaultLanguage === language.code
                                    ? "افتراضية"
                                    : "تعيين كافتراضية"}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              لا توجد لغات مطابقة لبحثك
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معاينة اللغة</CardTitle>
              <CardDescription>معاينة اللغة المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">
                    نص باللغة العربية
                  </h3>
                  <p className="text-right">
                    هذا نص باللغة العربية يظهر من اليمين إلى اليسار (RTL).
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">
                    نص باللغة الإنجليزية
                  </h3>
                  <p className="text-left">
                    This is an English text displayed from left to right (LTR).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocalizationSettings;
