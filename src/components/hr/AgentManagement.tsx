import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Edit,
  Trash,
  Eye,
  DollarSign,
  Percent,
  MapPin,
  User,
  Building,
  BarChart2,
  Calendar,
  ChevronDown,
  ArrowUpDown,
  Plus,
  FileText,
  Clock,
} from "lucide-react";

// Sample data for agents
const agentsData = [
  {
    id: 1,
    name: "أحمد محمد",
    customerType: "agent",
    phone: "+380 50 123 4567",
    email: "ahmed@example.com",
    city: "كييف",
    initialCommission: 10,
    recurringCommission: 5,
    responsibleEmployee: "سارة أحمد",
    status: "active",
    totalCustomers: 12,
    totalInvoices: 45,
    totalInvoiceValue: 125000,
    totalCommission: 8750,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    cities: ["كييف", "خاركيف"],
    lastActivity: "2024-08-10",
  },
  {
    id: 2,
    name: "سارة علي",
    customerType: "agent",
    phone: "+380 50 234 5678",
    email: "sara@example.com",
    city: "خاركيف",
    initialCommission: 12,
    recurringCommission: 6,
    responsibleEmployee: "محمد علي",
    status: "active",
    totalCustomers: 8,
    totalInvoices: 32,
    totalInvoiceValue: 98000,
    totalCommission: 6860,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    cities: ["خاركيف"],
    lastActivity: "2024-08-12",
  },
  {
    id: 3,
    name: "محمود حسن",
    customerType: "both",
    phone: "+380 50 345 6789",
    email: "mahmoud@example.com",
    city: "لفيف",
    initialCommission: 8,
    recurringCommission: 4,
    responsibleEmployee: "خالد عبدالله",
    status: "inactive",
    totalCustomers: 5,
    totalInvoices: 18,
    totalInvoiceValue: 45000,
    totalCommission: 2250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahmoud",
    cities: ["لفيف", "أوديسا"],
    lastActivity: "2024-07-25",
  },
  {
    id: 4,
    name: "فاطمة أحمد",
    customerType: "agent",
    phone: "+380 50 456 7890",
    email: "fatima@example.com",
    city: "أوديسا",
    initialCommission: 15,
    recurringCommission: 7,
    responsibleEmployee: "نورا سامي",
    status: "active",
    totalCustomers: 15,
    totalInvoices: 53,
    totalInvoiceValue: 145000,
    totalCommission: 12250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    cities: ["أوديسا"],
    lastActivity: "2024-08-15",
  },
  {
    id: 5,
    name: "خالد محمود",
    customerType: "both",
    phone: "+380 50 567 8901",
    email: "khaled@example.com",
    city: "دنيبرو",
    initialCommission: 10,
    recurringCommission: 5,
    responsibleEmployee: "عمر حسن",
    status: "active",
    totalCustomers: 7,
    totalInvoices: 25,
    totalInvoiceValue: 78000,
    totalCommission: 4680,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    cities: ["دنيبرو"],
    lastActivity: "2024-08-08",
  },
];

// Sample data for customers referred by agents
const referredCustomersData = [
  {
    id: 101,
    name: "شركة الأمل للتجارة",
    agentId: 1,
    agentName: "أحمد محمد",
    phone: "+380 50 111 2222",
    email: "info@alamal.com",
    city: "كييف",
    status: "active",
    totalInvoices: 8,
    totalValue: 35000,
    commissionPaid: 2450,
    lastInvoice: "2024-08-10",
    referralDate: "2024-01-15",
  },
  {
    id: 102,
    name: "مؤسسة النور للأقمشة",
    agentId: 1,
    agentName: "أحمد محمد",
    phone: "+380 50 222 3333",
    email: "info@alnoor.com",
    city: "كييف",
    status: "active",
    totalInvoices: 12,
    totalValue: 48000,
    commissionPaid: 3360,
    lastInvoice: "2024-08-12",
    referralDate: "2024-02-20",
  },
  {
    id: 103,
    name: "شركة الخليج للملابس",
    agentId: 2,
    agentName: "سارة علي",
    phone: "+380 50 333 4444",
    email: "info@gulf.com",
    city: "خاركيف",
    status: "active",
    totalInvoices: 15,
    totalValue: 52000,
    commissionPaid: 3640,
    lastInvoice: "2024-08-15",
    referralDate: "2024-01-10",
  },
  {
    id: 104,
    name: "مصنع الشرق للنسيج",
    agentId: 4,
    agentName: "فاطمة أحمد",
    phone: "+380 50 444 5555",
    email: "info@east.com",
    city: "أوديسا",
    status: "active",
    totalInvoices: 18,
    totalValue: 65000,
    commissionPaid: 5525,
    lastInvoice: "2024-08-08",
    referralDate: "2024-03-05",
  },
  {
    id: 105,
    name: "شركة المستقبل للتصدير",
    agentId: 4,
    agentName: "فاطمة أحمد",
    phone: "+380 50 555 6666",
    email: "info@future.com",
    city: "أوديسا",
    status: "inactive",
    totalInvoices: 5,
    totalValue: 18000,
    commissionPaid: 1530,
    lastInvoice: "2024-07-20",
    referralDate: "2024-04-12",
  },
];

// Sample data for commission transactions
const commissionTransactionsData = [
  {
    id: 1001,
    agentId: 1,
    agentName: "أحمد محمد",
    customerId: 101,
    customerName: "شركة الأمل للتجارة",
    invoiceId: "INV-2024-0042",
    invoiceDate: "2024-08-10",
    invoiceAmount: 12500,
    commissionRate: 5,
    commissionAmount: 625,
    status: "paid",
    paymentDate: "2024-08-15",
    isInitial: false,
  },
  {
    id: 1002,
    agentId: 1,
    agentName: "أحمد محمد",
    customerId: 102,
    customerName: "مؤسسة النور للأقمشة",
    invoiceId: "INV-2024-0045",
    invoiceDate: "2024-08-12",
    invoiceAmount: 8750,
    commissionRate: 5,
    commissionAmount: 437.5,
    status: "pending",
    paymentDate: null,
    isInitial: false,
  },
  {
    id: 1003,
    agentId: 2,
    agentName: "سارة علي",
    customerId: 103,
    customerName: "شركة الخليج للملابس",
    invoiceId: "INV-2024-0048",
    invoiceDate: "2024-08-15",
    invoiceAmount: 15200,
    commissionRate: 6,
    commissionAmount: 912,
    status: "pending",
    paymentDate: null,
    isInitial: false,
  },
  {
    id: 1004,
    agentId: 4,
    agentName: "فاطمة أحمد",
    customerId: 104,
    customerName: "مصنع الشرق للنسيج",
    invoiceId: "INV-2024-0040",
    invoiceDate: "2024-08-08",
    invoiceAmount: 9500,
    commissionRate: 7,
    commissionAmount: 665,
    status: "paid",
    paymentDate: "2024-08-12",
    isInitial: false,
  },
  {
    id: 1005,
    agentId: 4,
    agentName: "فاطمة أحمد",
    customerId: 105,
    customerName: "شركة المستقبل للتصدير",
    invoiceId: "INV-2024-0035",
    invoiceDate: "2024-07-20",
    invoiceAmount: 6200,
    commissionRate: 7,
    commissionAmount: 434,
    status: "paid",
    paymentDate: "2024-07-25",
    isInitial: false,
  },
  {
    id: 1006,
    agentId: 5,
    agentName: "خالد محمود",
    customerId: 106,
    customerName: "شركة الإبداع للتصميم",
    invoiceId: "INV-2024-0050",
    invoiceDate: "2024-08-16",
    invoiceAmount: 18500,
    commissionRate: 10,
    commissionAmount: 1850,
    status: "pending",
    paymentDate: null,
    isInitial: true,
  },
];

// Sample data for employees
const employeesData = [
  { id: 1, name: "سارة أحمد", department: "المبيعات" },
  { id: 2, name: "محمد علي", department: "المبيعات" },
  { id: 3, name: "خالد عبدالله", department: "المبيعات" },
  { id: 4, name: "نورا سامي", department: "المبيعات" },
  { id: 5, name: "عمر حسن", department: "المبيعات" },
];

// Sample data for cities
const citiesData = [
  { id: 1, name: "كييف" },
  { id: 2, name: "خاركيف" },
  { id: 3, name: "لفيف" },
  { id: 4, name: "أوديسا" },
  { id: 5, name: "دنيبرو" },
  { id: 6, name: "زابوريجيا" },
  { id: 7, name: "فينيتسيا" },
];

const AgentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState("agents");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // New agent form state
  const [newAgent, setNewAgent] = useState({
    name: "",
    customerType: "agent",
    phone: "",
    email: "",
    city: "",
    initialCommission: 10,
    recurringCommission: 5,
    responsibleEmployee: "",
    status: "active",
    cities: [],
  });

  // Filter agents based on search and filters
  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || agent.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter customers based on search and selected agent
  const filteredCustomers = referredCustomersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    return matchesSearch;
  });

  // Filter transactions based on search and selected agent
  const filteredTransactions = commissionTransactionsData.filter(
    (transaction) => {
      const matchesSearch =
        transaction.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    },
  );

  // Handle agent selection
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setShowAgentDetails(true);
  };

  // Handle customer selection
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Handle adding a new agent
  const handleAddAgent = () => {
    // In a real app, this would add the agent to the database
    console.log("Adding new agent:", newAgent);
    setShowAgentDialog(false);
    // Reset form
    setNewAgent({
      name: "",
      customerType: "agent",
      phone: "",
      email: "",
      city: "",
      initialCommission: 10,
      recurringCommission: 5,
      responsibleEmployee: "",
      status: "active",
      cities: [],
    });
  };

  // Get agent's customers
  const getAgentCustomers = (agentId) => {
    return referredCustomersData.filter(
      (customer) => customer.agentId === agentId,
    );
  };

  // Get agent's transactions
  const getAgentTransactions = (agentId) => {
    return commissionTransactionsData.filter(
      (transaction) => transaction.agentId === agentId,
    );
  };

  // Get customer's transactions
  const getCustomerTransactions = (customerId) => {
    return commissionTransactionsData.filter(
      (transaction) => transaction.customerId === customerId,
    );
  };

  // Calculate total commission for an agent
  const calculateTotalCommission = (agentId) => {
    return commissionTransactionsData
      .filter((transaction) => transaction.agentId === agentId)
      .reduce((total, transaction) => total + transaction.commissionAmount, 0);
  };

  // Calculate pending commission for an agent
  const calculatePendingCommission = (agentId) => {
    return commissionTransactionsData
      .filter(
        (transaction) =>
          transaction.agentId === agentId && transaction.status === "pending",
      )
      .reduce((total, transaction) => total + transaction.commissionAmount, 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₴ ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">إدارة الوكلاء والعمولات</h3>
        <div className="flex gap-2">
          <Button onClick={() => setShowAgentDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            إضافة وكيل جديد
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن وكيل أو عميل..."
                  className="pr-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} dir="rtl">
        <TabsList className="mb-4 flex-row-reverse">
          <TabsTrigger value="reports">
            <BarChart2 className="mr-2 h-4 w-4" />
            تقارير الأداء
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <DollarSign className="mr-2 h-4 w-4" />
            معاملات العمولات
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Building className="mr-2 h-4 w-4" />
            العملاء المحولين
          </TabsTrigger>
          <TabsTrigger value="agents">
            <Users className="mr-2 h-4 w-4" />
            الوكلاء
          </TabsTrigger>
        </TabsList>

        {/* Agents Tab */}
        <TabsContent value="agents">
          <Card>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>الوكيل</TableHead>
                    <TableHead>المدينة</TableHead>
                    <TableHead>العمولة الأولية</TableHead>
                    <TableHead>العمولة المتكررة</TableHead>
                    <TableHead>العملاء</TableHead>
                    <TableHead>إجمالي الفواتير</TableHead>
                    <TableHead>إجمالي العمولات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={agent.avatar}
                              alt={agent.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {agent.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{agent.city}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50">
                          {agent.initialCommission}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50">
                          {agent.recurringCommission}%
                        </Badge>
                      </TableCell>
                      <TableCell>{agent.totalCustomers}</TableCell>
                      <TableCell>
                        {formatCurrency(agent.totalInvoiceValue)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(agent.totalCommission)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            agent.status === "active" ? "default" : "secondary"
                          }
                        >
                          {agent.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAgentSelect(agent)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAgents.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-6 text-muted-foreground"
                      >
                        لا توجد نتائج مطابقة للبحث
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>الوكيل</TableHead>
                    <TableHead>المدينة</TableHead>
                    <TableHead>تاريخ التحويل</TableHead>
                    <TableHead>عدد الفواتير</TableHead>
                    <TableHead>إجمالي القيمة</TableHead>
                    <TableHead>العمولات المدفوعة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.agentName}</TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell>
                        {new Date(customer.referralDate).toLocaleDateString(
                          "ar-EG",
                        )}
                      </TableCell>
                      <TableCell>{customer.totalInvoices}</TableCell>
                      <TableCell>
                        {formatCurrency(customer.totalValue)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(customer.commissionPaid)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {customer.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCustomerSelect(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-6 text-muted-foreground"
                      >
                        لا توجد نتائج مطابقة للبحث
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>الوكيل</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>تاريخ الفاتورة</TableHead>
                    <TableHead>قيمة الفاتورة</TableHead>
                    <TableHead>نسبة العمولة</TableHead>
                    <TableHead>قيمة العمولة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.invoiceId}</TableCell>
                      <TableCell>{transaction.agentName}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>
                        {new Date(transaction.invoiceDate).toLocaleDateString(
                          "ar-EG",
                        )}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(transaction.invoiceAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50">
                          {transaction.commissionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(transaction.commissionAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.isInitial
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {transaction.isInitial ? "أولية" : "متكررة"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transaction.status === "paid"
                            ? "مدفوعة"
                            : "قيد الانتظار"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center py-6 text-muted-foreground"
                      >
                        لا توجد نتائج مطابقة للبحث
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
            {/* Top Agents by Commission */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">
                  أفضل الوكلاء حسب العمولة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentsData
                    .sort((a, b) => b.totalCommission - a.totalCommission)
                    .slice(0, 5)
                    .map((agent, index) => (
                      <div key={agent.id} className="space-y-1">
                        <div
                          className="flex justify-between items-center"
                          dir="rtl"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{agent.name}</span>
                          </div>
                          <span className="font-bold">
                            {formatCurrency(agent.totalCommission)}
                          </span>
                        </div>
                        <Progress
                          value={
                            (agent.totalCommission /
                              agentsData[0].totalCommission) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Agents by Customers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">
                  أفضل الوكلاء حسب عدد العملاء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentsData
                    .sort((a, b) => b.totalCustomers - a.totalCustomers)
                    .slice(0, 5)
                    .map((agent, index) => (
                      <div key={agent.id} className="space-y-1">
                        <div
                          className="flex justify-between items-center"
                          dir="rtl"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{agent.name}</span>
                          </div>
                          <span className="font-bold">
                            {agent.totalCustomers} عميل
                          </span>
                        </div>
                        <Progress
                          value={
                            (agent.totalCustomers /
                              agentsData.sort(
                                (a, b) => b.totalCustomers - a.totalCustomers,
                              )[0].totalCustomers) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Commission Trend */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">
                  اتجاه العمولات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>سيتم عرض رسم بياني للعمولات الشهرية هنا</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Agent Dialog */}
      <Dialog open={showAgentDialog} onOpenChange={setShowAgentDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة وكيل جديد</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم الوكيل</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, name: e.target.value })
                  }
                  placeholder="أدخل اسم الوكيل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerType">نوع العميل</Label>
                <Select
                  value={newAgent.customerType}
                  onValueChange={(value) =>
                    setNewAgent({ ...newAgent, customerType: value })
                  }
                >
                  <SelectTrigger id="customerType">
                    <SelectValue placeholder="اختر نوع العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">وكيل فقط</SelectItem>
                    <SelectItem value="both">عميل ووكيل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={newAgent.phone}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, phone: e.target.value })
                  }
                  placeholder="+380 XX XXX XXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                  placeholder="example@domain.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">المدينة الرئيسية</Label>
                <Select
                  value={newAgent.city}
                  onValueChange={(value) =>
                    setNewAgent({ ...newAgent, city: value })
                  }
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {citiesData.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsibleEmployee">الموظف المسؤول</Label>
                <Select
                  value={newAgent.responsibleEmployee}
                  onValueChange={(value) =>
                    setNewAgent({ ...newAgent, responsibleEmployee: value })
                  }
                >
                  <SelectTrigger id="responsibleEmployee">
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeesData.map((employee) => (
                      <SelectItem key={employee.id} value={employee.name}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialCommission">
                  نسبة العمولة الأولية (%)
                </Label>
                <Input
                  id="initialCommission"
                  type="number"
                  min="0"
                  max="100"
                  value={newAgent.initialCommission}
                  onChange={(e) =>
                    setNewAgent({
                      ...newAgent,
                      initialCommission: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recurringCommission">
                  نسبة العمولة المتكررة (%)
                </Label>
                <Input
                  id="recurringCommission"
                  type="number"
                  min="0"
                  max="100"
                  value={newAgent.recurringCommission}
                  onChange={(e) =>
                    setNewAgent({
                      ...newAgent,
                      recurringCommission: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>مناطق العمل</Label>
              <div className="flex flex-wrap gap-2 border rounded-md p-2">
                {citiesData.map((city) => (
                  <Badge
                    key={city.id}
                    variant={
                      newAgent.cities.includes(city.name)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      if (newAgent.cities.includes(city.name)) {
                        setNewAgent({
                          ...newAgent,
                          cities: newAgent.cities.filter(
                            (c) => c !== city.name,
                          ),
                        });
                      } else {
                        setNewAgent({
                          ...newAgent,
                          cities: [...newAgent.cities, city.name],
                        });
                      }
                    }}
                  >
                    {city.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={newAgent.status}
                onValueChange={(value) =>
                  setNewAgent({ ...newAgent, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAgentDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddAgent}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agent Details Dialog */}
      {selectedAgent && (
        <Dialog open={showAgentDetails} onOpenChange={setShowAgentDetails}>
          <DialogContent className="sm:max-w-[800px]" dir="rtl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={selectedAgent.avatar}
                    alt={selectedAgent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedAgent.name}
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details" dir="rtl">
              <TabsList className="mb-4 flex-row-reverse">
                <TabsTrigger value="transactions">
                  <DollarSign className="mr-2 h-4 w-4" />
                  معاملات العمولات
                </TabsTrigger>
                <TabsTrigger value="customers">
                  <Building className="mr-2 h-4 w-4" />
                  العملاء المحولين
                </TabsTrigger>
                <TabsTrigger value="details">
                  <User className="mr-2 h-4 w-4" />
                  تفاصيل الوكيل
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-6" dir="rtl">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label>معلومات الاتصال</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              البريد الإلكتروني
                            </span>
                            <p>{selectedAgent.email}</p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              رقم الهاتف
                            </span>
                            <p>{selectedAgent.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>نسب العمولات</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              العمولة الأولية
                            </span>
                            <p className="font-bold">
                              {selectedAgent.initialCommission}%
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              العمولة المتكررة
                            </span>
                            <p className="font-bold">
                              {selectedAgent.recurringCommission}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>مناطق العمل</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex flex-wrap gap-2">
                          {selectedAgent.cities.map((city, index) => (
                            <Badge key={index} variant="outline">
                              <MapPin className="h-3 w-3 mr-1" />
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label>ملخص الأداء</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            إجمالي العملاء
                          </span>
                          <p className="text-xl font-bold">
                            {selectedAgent.totalCustomers}
                          </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            إجمالي الفواتير
                          </span>
                          <p className="text-xl font-bold">
                            {selectedAgent.totalInvoices}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>العمولات</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            إجمالي العمولات
                          </span>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(selectedAgent.totalCommission)}
                          </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            العمولات المعلقة
                          </span>
                          <p className="text-xl font-bold text-amber-600">
                            {formatCurrency(
                              calculatePendingCommission(selectedAgent.id),
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>معلومات إضافية</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              الموظف المسؤول
                            </span>
                            <p>{selectedAgent.responsibleEmployee}</p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              آخر نشاط
                            </span>
                            <p>
                              {new Date(
                                selectedAgent.lastActivity,
                              ).toLocaleDateString("ar-EG")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customers">
                <div className="rounded-md border overflow-hidden">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead>العميل</TableHead>
                        <TableHead>تاريخ التحويل</TableHead>
                        <TableHead>عدد الفواتير</TableHead>
                        <TableHead>إجمالي القيمة</TableHead>
                        <TableHead>العمولات المدفوعة</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAgentCustomers(selectedAgent.id).map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(customer.referralDate).toLocaleDateString(
                              "ar-EG",
                            )}
                          </TableCell>
                          <TableCell>{customer.totalInvoices}</TableCell>
                          <TableCell>
                            {formatCurrency(customer.totalValue)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(customer.commissionPaid)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                customer.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {customer.status === "active" ? "نشط" : "غير نشط"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {getAgentCustomers(selectedAgent.id).length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-6 text-muted-foreground"
                          >
                            لا يوجد عملاء محولين لهذا الوكيل
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <div className="rounded-md border overflow-hidden">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>تاريخ الفاتورة</TableHead>
                        <TableHead>قيمة الفاتورة</TableHead>
                        <TableHead>نسبة العمولة</TableHead>
                        <TableHead>قيمة العمولة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAgentTransactions(selectedAgent.id).map(
                        (transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.invoiceId}</TableCell>
                            <TableCell>{transaction.customerName}</TableCell>
                            <TableCell>
                              {new Date(
                                transaction.invoiceDate,
                              ).toLocaleDateString("ar-EG")}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(transaction.invoiceAmount)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50">
                                {transaction.commissionRate}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatCurrency(transaction.commissionAmount)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  transaction.isInitial
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                }
                              >
                                {transaction.isInitial ? "أولية" : "متكررة"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  transaction.status === "paid"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {transaction.status === "paid"
                                  ? "مدفوعة"
                                  : "قيد الانتظار"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                      {getAgentTransactions(selectedAgent.id).length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-6 text-muted-foreground"
                          >
                            لا توجد معاملات عمولات لهذا الوكيل
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAgentDetails(false)}
              >
                إغلاق
              </Button>
              <Button variant="default">
                <Edit className="mr-2 h-4 w-4" />
                تعديل
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog
          open={showCustomerDetails}
          onOpenChange={setShowCustomerDetails}
        >
          <DialogContent className="sm:max-w-[800px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>{selectedCustomer.name}</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details" dir="rtl">
              <TabsList className="mb-4 flex-row-reverse">
                <TabsTrigger value="transactions">
                  <DollarSign className="mr-2 h-4 w-4" />
                  معاملات العمولات
                </TabsTrigger>
                <TabsTrigger value="details">
                  <User className="mr-2 h-4 w-4" />
                  تفاصيل العميل
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-6" dir="rtl">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label>معلومات الاتصال</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              البريد الإلكتروني
                            </span>
                            <p>{selectedCustomer.email}</p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              رقم الهاتف
                            </span>
                            <p>{selectedCustomer.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>معلومات الوكيل</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              اسم الوكيل
                            </span>
                            <p className="font-medium">
                              {selectedCustomer.agentName}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              تاريخ التحويل
                            </span>
                            <p>
                              {new Date(
                                selectedCustomer.referralDate,
                              ).toLocaleDateString("ar-EG")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label>ملخص المعاملات</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            عدد الفواتير
                          </span>
                          <p className="text-xl font-bold">
                            {selectedCustomer.totalInvoices}
                          </p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <span className="text-xs text-muted-foreground">
                            إجمالي القيمة
                          </span>
                          <p className="text-xl font-bold">
                            {formatCurrency(selectedCustomer.totalValue)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label>العمولات</Label>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              العمولات المدفوعة
                            </span>
                            <p className="text-xl font-bold text-green-600">
                              {formatCurrency(selectedCustomer.commissionPaid)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              آخر فاتورة
                            </span>
                            <p>
                              {new Date(
                                selectedCustomer.lastInvoice,
                              ).toLocaleDateString("ar-EG")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <div className="rounded-md border overflow-hidden">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>تاريخ الفاتورة</TableHead>
                        <TableHead>قيمة الفاتورة</TableHead>
                        <TableHead>نسبة العمولة</TableHead>
                        <TableHead>قيمة العمولة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCustomerTransactions(selectedCustomer.id).map(
                        (transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.invoiceId}</TableCell>
                            <TableCell>
                              {new Date(
                                transaction.invoiceDate,
                              ).toLocaleDateString("ar-EG")}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(transaction.invoiceAmount)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50">
                                {transaction.commissionRate}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatCurrency(transaction.commissionAmount)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  transaction.isInitial
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                }
                              >
                                {transaction.isInitial ? "أولية" : "متكررة"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  transaction.status === "paid"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {transaction.status === "paid"
                                  ? "مدفوعة"
                                  : "قيد الانتظار"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                      {getCustomerTransactions(selectedCustomer.id).length ===
                        0 && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-6 text-muted-foreground"
                          >
                            لا توجد معاملات عمولات لهذا العميل
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCustomerDetails(false)}
              >
                إغلاق
              </Button>
              <Button variant="default">
                <Edit className="mr-2 h-4 w-4" />
                تعديل
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AgentManagement;
