import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  DollarSign,
  Percent,
  RefreshCw,
  User,
  Building,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Sample data for agents
const agentsData = [
  {
    id: 1,
    name: "أحمد محمد",
    initialCommission: 10,
    recurringCommission: 5,
  },
  {
    id: 2,
    name: "سارة علي",
    initialCommission: 12,
    recurringCommission: 6,
  },
  {
    id: 3,
    name: "محمود حسن",
    initialCommission: 8,
    recurringCommission: 4,
  },
  {
    id: 4,
    name: "فاطمة أحمد",
    initialCommission: 15,
    recurringCommission: 7,
  },
];

// Sample data for customers
const customersData = [
  {
    id: 101,
    name: "شركة الأمل للتجارة",
    agentId: 1,
    isFirstInvoice: false,
  },
  {
    id: 102,
    name: "مؤسسة النور للأقمشة",
    agentId: 1,
    isFirstInvoice: false,
  },
  {
    id: 103,
    name: "شركة الخليج للملابس",
    agentId: 2,
    isFirstInvoice: false,
  },
  {
    id: 104,
    name: "مصنع الشرق للنسيج",
    agentId: 4,
    isFirstInvoice: false,
  },
  {
    id: 105,
    name: "شركة المستقبل للتصدير",
    agentId: 4,
    isFirstInvoice: true,
  },
];

const AgentCommissionCalculator = () => {
  const [calculationType, setCalculationType] = useState("simple");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [isFirstInvoice, setIsFirstInvoice] = useState(false);
  const [commissionRate, setCommissionRate] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Get agent by ID
  const getAgentById = (id) => {
    return agentsData.find((agent) => agent.id === parseInt(id));
  };

  // Get customer by ID
  const getCustomerById = (id) => {
    return customersData.find((customer) => customer.id === parseInt(id));
  };

  // Handle customer selection
  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    const customer = getCustomerById(parseInt(customerId));
    if (customer) {
      setSelectedAgent(customer.agentId.toString());
      setIsFirstInvoice(customer.isFirstInvoice);
    }
  };

  // Handle agent selection
  const handleAgentSelect = (agentId) => {
    setSelectedAgent(agentId);
    const agent = getAgentById(parseInt(agentId));
    if (agent) {
      setCommissionRate(
        isFirstInvoice
          ? agent.initialCommission.toString()
          : agent.recurringCommission.toString(),
      );
    }
  };

  // Handle invoice type change
  const handleInvoiceTypeChange = (isFirst) => {
    setIsFirstInvoice(isFirst);
    if (selectedAgent) {
      const agent = getAgentById(parseInt(selectedAgent));
      if (agent) {
        setCommissionRate(
          isFirst
            ? agent.initialCommission.toString()
            : agent.recurringCommission.toString(),
        );
      }
    }
  };

  // Calculate commission
  const calculateCommission = () => {
    if (!invoiceAmount || !commissionRate) return;

    const amount = parseFloat(invoiceAmount);
    const rate = parseFloat(commissionRate);
    const commission = (amount * rate) / 100;

    const agent = selectedAgent ? getAgentById(parseInt(selectedAgent)) : null;
    const customer = selectedCustomer
      ? getCustomerById(parseInt(selectedCustomer))
      : null;

    const result = {
      invoiceAmount: amount,
      commissionRate: rate,
      commissionAmount: commission,
      isFirstInvoice,
      agent,
      customer,
      date: new Date(),
    };

    setCalculationResult(result);
    setCalculationHistory([result, ...calculationHistory]);
  };

  // Reset calculator
  const resetCalculator = () => {
    setSelectedAgent("");
    setSelectedCustomer("");
    setInvoiceAmount("");
    setIsFirstInvoice(false);
    setCommissionRate("");
    setCalculationResult(null);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₴ ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">حاسبة عمولات الوكلاء</h3>
      </div>

      <Tabs value={calculationType} onValueChange={setCalculationType}>
        <TabsList className="mb-4">
          <TabsTrigger value="simple">
            <Calculator className="ml-2 h-4 w-4" />
            حاسبة بسيطة
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="ml-2 h-4 w-4" />
            سجل الحسابات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-md">
                  بيانات الفاتورة والعمولة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">العميل</Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={handleCustomerSelect}
                  >
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="اختر العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      {customersData.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id.toString()}
                        >
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agent">الوكيل</Label>
                  <Select
                    value={selectedAgent}
                    onValueChange={handleAgentSelect}
                  >
                    <SelectTrigger id="agent">
                      <SelectValue placeholder="اختر الوكيل" />
                    </SelectTrigger>
                    <SelectContent>
                      {agentsData.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceAmount">قيمة الفاتورة</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invoiceAmount"
                      type="number"
                      className="pl-9"
                      placeholder="أدخل قيمة الفاتورة"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>نوع الفاتورة</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="firstInvoice"
                        name="invoiceType"
                        className="ml-2"
                        checked={isFirstInvoice}
                        onChange={() => handleInvoiceTypeChange(true)}
                      />
                      <Label htmlFor="firstInvoice" className="cursor-pointer">
                        فاتورة أولى (عمولة أولية)
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="recurringInvoice"
                        name="invoiceType"
                        className="ml-2"
                        checked={!isFirstInvoice}
                        onChange={() => handleInvoiceTypeChange(false)}
                      />
                      <Label
                        htmlFor="recurringInvoice"
                        className="cursor-pointer"
                      >
                        فاتورة متكررة
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commissionRate">نسبة العمولة (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="commissionRate"
                      type="number"
                      className="pl-9"
                      placeholder="أدخل نسبة العمولة"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={calculateCommission} className="flex-1">
                    <Calculator className="ml-2 h-4 w-4" />
                    حساب العمولة
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="flex-1"
                  >
                    <RefreshCw className="ml-2 h-4 w-4" />
                    إعادة ضبط
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-md">نتيجة الحساب</CardTitle>
              </CardHeader>
              <CardContent>
                {calculationResult ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 text-center">
                      <div className="bg-muted p-4 rounded-md flex-1">
                        <div className="text-sm text-muted-foreground">
                          قيمة الفاتورة
                        </div>
                        <div className="text-2xl font-bold">
                          {formatCurrency(calculationResult.invoiceAmount)}
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                      <div className="bg-muted p-4 rounded-md flex-1">
                        <div className="text-sm text-muted-foreground">
                          قيمة العمولة
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(calculationResult.commissionAmount)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-md">
                        <div className="text-sm text-muted-foreground">
                          نسبة العمولة
                        </div>
                        <div className="text-xl font-bold">
                          {calculationResult.commissionRate}%
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            calculationResult.isFirstInvoice
                              ? "bg-purple-50 text-purple-700 border-purple-200 mt-1"
                              : "bg-green-50 text-green-700 border-green-200 mt-1"
                          }
                        >
                          {calculationResult.isFirstInvoice
                            ? "عمولة أولية"
                            : "عمولة متكررة"}
                        </Badge>
                      </div>

                      <div className="bg-muted p-3 rounded-md">
                        <div className="text-sm text-muted-foreground">
                          النسبة من الفاتورة
                        </div>
                        <div className="text-xl font-bold">
                          {(
                            (calculationResult.commissionAmount /
                              calculationResult.invoiceAmount) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                      </div>
                    </div>

                    {calculationResult.agent && (
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-muted-foreground">
                              الوكيل
                            </div>
                            <div className="font-medium">
                              {calculationResult.agent.name}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">
                              نسب العمولة
                            </div>
                            <div className="flex gap-2">
                              <Badge
                                variant="outline"
                                className="bg-purple-50 text-purple-700 border-purple-200"
                              >
                                أولية:{" "}
                                {calculationResult.agent.initialCommission}%
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                متكررة:{" "}
                                {calculationResult.agent.recurringCommission}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {calculationResult.customer && (
                      <div className="bg-muted p-3 rounded-md">
                        <div className="text-sm text-muted-foreground">
                          العميل
                        </div>
                        <div className="font-medium">
                          {calculationResult.customer.name}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button>
                        <DollarSign className="ml-2 h-4 w-4" />
                        تسجيل العمولة
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>أدخل بيانات الفاتورة لحساب العمولة</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">سجل حسابات العمولات</CardTitle>
            </CardHeader>
            <CardContent>
              {calculationHistory.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوكيل</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>قيمة الفاتورة</TableHead>
                        <TableHead>نسبة العمولة</TableHead>
                        <TableHead>قيمة العمولة</TableHead>
                        <TableHead>النوع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculationHistory.map((calc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {calc.date.toLocaleDateString("ar-EG")}
                          </TableCell>
                          <TableCell>
                            {calc.agent ? calc.agent.name : "-"}
                          </TableCell>
                          <TableCell>
                            {calc.customer ? calc.customer.name : "-"}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(calc.invoiceAmount)}
                          </TableCell>
                          <TableCell>{calc.commissionRate}%</TableCell>
                          <TableCell>
                            {formatCurrency(calc.commissionAmount)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                calc.isFirstInvoice
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {calc.isFirstInvoice ? "أولية" : "متكررة"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>لا توجد عمليات حساب سابقة</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentCommissionCalculator;
