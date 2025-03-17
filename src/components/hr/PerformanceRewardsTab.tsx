import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmployeeDetailsPopup from "./EmployeeDetailsPopup";
import {
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Settings,
  ArrowUpDown,
  ChevronDown,
  Edit,
  Crown,
  Gift,
  Sparkles,
  User,
  FileText,
  BarChart2,
  ShoppingCart,
  CheckSquare,
  Clock,
  Building,
} from "lucide-react";

// Dummy data for branches
const branchesData = [
  {
    id: 1,
    name: "فرع كييف",
    location: "كييف",
    performance: 92,
    sales: 450000,
    target: 400000,
    achievements: ["تجاوز الهدف بنسبة 12.5%", "15 عميل جديد"],
    image:
      "https://images.unsplash.com/photo-1586012556195-a9e7c0b10333?w=400&q=70",

    rank: 1,
    previousRank: 2,
    trend: "up",
    employeesCount: 12,
  },
  {
    id: 2,
    name: "فرع خاركيف",
    location: "خاركيف",
    performance: 88,
    sales: 380000,
    target: 350000,
    achievements: ["تجاوز الهدف بنسبة 8.5%", "10 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1576109134599-9449a9544778?w=400&q=70",

    rank: 2,
    previousRank: 1,
    trend: "down",
    employeesCount: 8,
  },
  {
    id: 3,
    name: "فرع لفيف",
    location: "لفيف",
    performance: 85,
    sales: 320000,
    target: 300000,
    achievements: ["تجاوز الهدف بنسبة 6.7%", "8 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1555960537-3a713f87bce6?w=400&q=70",

    rank: 3,
    previousRank: 3,
    trend: "stable",
    employeesCount: 7,
  },
  {
    id: 4,
    name: "فرع أوديسا",
    location: "أوديسا",
    performance: 83,
    sales: 310000,
    target: 300000,
    achievements: ["تجاوز الهدف بنسبة 3.3%", "6 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1586184059684-461bc867fa63?w=400&q=70",

    rank: 4,
    previousRank: 4,
    trend: "stable",
    employeesCount: 9,
  },
  {
    id: 5,
    name: "فرع دنيبرو",
    location: "دنيبرو",
    performance: 81,
    sales: 290000,
    target: 280000,
    achievements: ["تجاوز الهدف بنسبة 3.6%", "5 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1512399747269-8fa2e0ce6873?w=400&q=70",

    rank: 5,
    previousRank: 6,
    trend: "up",
    employeesCount: 6,
  },
  {
    id: 6,
    name: "فرع زابوريجيا",
    location: "زابوريجيا",
    performance: 79,
    sales: 275000,
    target: 270000,
    achievements: ["تجاوز الهدف بنسبة 1.9%", "4 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1587138810587-27ae54a92c76?w=400&q=70",

    rank: 6,
    previousRank: 5,
    trend: "down",
    employeesCount: 7,
  },
  {
    id: 7,
    name: "فرع فينيتسيا",
    location: "فينيتسيا",
    performance: 77,
    sales: 265000,
    target: 260000,
    achievements: ["تجاوز الهدف بنسبة 1.9%", "3 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1557060160-9a79d756e0b8?w=400&q=70",

    rank: 7,
    previousRank: 7,
    trend: "stable",
    employeesCount: 5,
  },
  {
    id: 8,
    name: "فرع خيرسون",
    location: "خيرسون",
    performance: 75,
    sales: 255000,
    target: 250000,
    achievements: ["تجاوز الهدف بنسبة 2%", "3 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1588416499018-d8c621e1d2c1?w=400&q=70",

    rank: 8,
    previousRank: 8,
    trend: "stable",
    employeesCount: 6,
  },
  {
    id: 9,
    name: "فرع ميكولايف",
    location: "ميكولايف",
    performance: 73,
    sales: 245000,
    target: 240000,
    achievements: ["تجاوز الهدف بنسبة 2.1%", "2 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1587302186428-d82b726ae885?w=400&q=70",

    rank: 9,
    previousRank: 10,
    trend: "up",
    employeesCount: 4,
  },
  {
    id: 10,
    name: "فرع بولتافا",
    location: "بولتافا",
    performance: 71,
    sales: 235000,
    target: 230000,
    achievements: ["تجاوز الهدف بنسبة 2.2%", "2 عملاء جدد"],
    image:
      "https://images.unsplash.com/photo-1587302183231-0b8c60a6d03f?w=400&q=70",

    rank: 10,
    previousRank: 9,
    trend: "down",
    employeesCount: 5,
  },
];

// Dummy data for employees performance
const employeesData = [
  {
    id: 1,
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    branchId: 1,
    branchName: "فرع كييف",
    performance: 95,
    sales: 125000,
    target: 100000,
    achievements: ["تجاوز الهدف بنسبة 25%", "5 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyiv1",
    rank: 1,
    previousRank: 2,
    trend: "up",
  },
  {
    id: 2,
    name: "سارة أحمد",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 1,
    branchName: "فرع كييف",
    performance: 92,
    sales: 115000,
    target: 100000,
    achievements: ["تجاوز الهدف بنسبة 15%", "3 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyiv2",
    rank: 2,
    previousRank: 1,
    trend: "down",
  },
  {
    id: 3,
    name: "محمد علي",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 2,
    branchName: "فرع خاركيف",
    performance: 88,
    sales: 98000,
    target: 100000,
    achievements: ["تحقيق 98% من الهدف", "4 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kharkiv1",
    rank: 3,
    previousRank: 4,
    trend: "up",
  },
  {
    id: 4,
    name: "فاطمة محمود",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 2,
    branchName: "فرع خاركيف",
    performance: 85,
    sales: 92000,
    target: 100000,
    achievements: ["تحقيق 92% من الهدف", "2 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kharkiv2",
    rank: 4,
    previousRank: 3,
    trend: "down",
  },
  {
    id: 5,
    name: "خالد عبدالله",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 3,
    branchName: "فرع لفيف",
    performance: 82,
    sales: 88000,
    target: 100000,
    achievements: ["تحقيق 88% من الهدف", "1 عميل جديد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lviv1",
    rank: 5,
    previousRank: 6,
    trend: "up",
  },
  {
    id: 6,
    name: "نورا سامي",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 3,
    branchName: "فرع لفيف",
    performance: 80,
    sales: 85000,
    target: 100000,
    achievements: ["تحقيق 85% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lviv2",
    rank: 6,
    previousRank: 5,
    trend: "down",
  },
  {
    id: 7,
    name: "عمر حسن",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 4,
    branchName: "فرع أوديسا",
    performance: 78,
    sales: 82000,
    target: 100000,
    achievements: ["تحقيق 82% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Odesa1",
    rank: 7,
    previousRank: 7,
    trend: "stable",
  },
  {
    id: 8,
    name: "ليلى كريم",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 4,
    branchName: "فرع أوديسا",
    performance: 75,
    sales: 78000,
    target: 100000,
    achievements: ["تحقيق 78% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Odesa2",
    rank: 8,
    previousRank: 8,
    trend: "stable",
  },
  {
    id: 9,
    name: "يوسف أحمد",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 5,
    branchName: "فرع دنيبرو",
    performance: 74,
    sales: 76000,
    target: 100000,
    achievements: ["تحقيق 76% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dnipro1",
    rank: 9,
    previousRank: 9,
    trend: "stable",
  },
  {
    id: 10,
    name: "رنا محمود",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 5,
    branchName: "فرع دنيبرو",
    performance: 72,
    sales: 74000,
    target: 100000,
    achievements: ["تحقيق 74% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dnipro2",
    rank: 10,
    previousRank: 10,
    trend: "stable",
  },
  {
    id: 11,
    name: "كريم سعيد",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 6,
    branchName: "فرع زابوريجيا",
    performance: 71,
    sales: 72000,
    target: 100000,
    achievements: ["تحقيق 72% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zaporizhzhia1",
    rank: 11,
    previousRank: 11,
    trend: "stable",
  },
  {
    id: 12,
    name: "هدى علي",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 7,
    branchName: "فرع فينيتسيا",
    performance: 70,
    sales: 71000,
    target: 100000,
    achievements: ["تحقيق 71% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinnytsia1",
    rank: 12,
    previousRank: 12,
    trend: "stable",
  },
  {
    id: 13,
    name: "سمير حسن",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 8,
    branchName: "فرع خيرسون",
    performance: 69,
    sales: 70000,
    target: 100000,
    achievements: ["تحقيق 70% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kherson1",
    rank: 13,
    previousRank: 13,
    trend: "stable",
  },
  {
    id: 14,
    name: "منى كمال",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    branchId: 9,
    branchName: "فرع ميكولايف",
    performance: 68,
    sales: 69000,
    target: 100000,
    achievements: ["تحقيق 69% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mykolaiv1",
    rank: 14,
    previousRank: 14,
    trend: "stable",
  },
  {
    id: 15,
    name: "طارق محمد",
    position: "مندوب مبيعات",
    department: "المبيعات",
    branchId: 10,
    branchName: "فرع بولتافا",
    performance: 67,
    sales: 68000,
    target: 100000,
    achievements: ["تحقيق 68% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Poltava1",
    rank: 15,
    previousRank: 15,
    trend: "stable",
  },
];

// Reward configuration
const rewardConfig = {
  title: "جائزة أفضل موظف أداءً",
  description: "جائزة شهرية لأفضل ثلاثة موظفين أداءً في المبيعات والإنتاجية",
  rewardType: "employee", // employee or branch
  rewards: [
    { position: 1, amount: 500, currency: "$" },
    { position: 2, amount: 300, currency: "$" },
    { position: 3, amount: 200, currency: "$" },
  ],
  branchRewards: [
    { position: 1, amount: 2000, currency: "$", distributionMethod: "equal" }, // equal, performance, custom
    {
      position: 2,
      amount: 1000,
      currency: "$",
      distributionMethod: "performance",
    },
    {
      position: 3,
      amount: 500,
      currency: "$",
      distributionMethod: "performance",
    },
  ],
  criteria: [
    "تحقيق أو تجاوز أهداف المبيعات الشهرية",
    "جودة خدمة العملاء",
    "الالتزام بمواعيد العمل",
    "روح الفريق والتعاون",
  ],
  branchCriteria: [
    "تحقيق أو تجاوز أهداف المبيعات الشهرية للفرع",
    "متوسط رضا العملاء للفرع",
    "نسبة النمو في المبيعات مقارنة بالشهر السابق",
    "عدد العملاء الجدد",
  ],
  currentMonth: "أغسطس 2024",
  nextAnnouncement: "1 سبتمبر 2024",
};

const PerformanceRewardsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showRewardSettings, setShowRewardSettings] = useState(false);
  const [rewardSettings, setRewardSettings] = useState(rewardConfig);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showBranchDetails, setShowBranchDetails] = useState(false);

  // Sort employees by performance
  const sortedEmployees = [...employeesData].sort(
    (a, b) => b.performance - a.performance,
  );

  // Sort branches by performance
  const sortedBranches = [...branchesData].sort(
    (a, b) => b.performance - a.performance,
  );

  // Get top performers based on reward type
  const topPerformers =
    rewardSettings.rewardType === "employee"
      ? sortedEmployees.slice(0, 3)
      : sortedBranches.slice(0, 3);

  // Filter employees based on search query and department
  const filteredEmployees = sortedEmployees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDepartment;
  });

  // Handle reward settings update
  const handleRewardSettingsUpdate = () => {
    // In a real app, this would save to the database
    setShowRewardSettings(false);
  };

  // Handle employee click to show details popup
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  // Handle branch click to show details popup
  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setShowBranchDetails(true);
  };

  // Get branch employees
  const getBranchEmployees = (branchId) => {
    return employeesData.filter((employee) => employee.branchId === branchId);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">الأداء والمكافآت</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 ml-1" />
            <span>الشهر الحالي: {rewardSettings.currentMonth}</span>
            <span className="mx-2">|</span>
            <Trophy className="h-4 w-4 ml-1" />
            <span>الإعلان عن الفائزين: {rewardSettings.nextAnnouncement}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن موظف..."
              className="w-[250px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-1" />
            تصفية
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRewardSettings(!showRewardSettings)}
          >
            <Settings className="h-4 w-4 ml-1" />
            إعدادات الجوائز
          </Button>

          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
            <div className="text-sm font-medium">نوع المكافأة:</div>
            <div className="flex">
              <Button
                variant={
                  rewardSettings.rewardType === "employee"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="rounded-r-none"
                onClick={() =>
                  setRewardSettings({
                    ...rewardSettings,
                    rewardType: "employee",
                  })
                }
              >
                <User className="h-4 w-4 ml-1" />
                موظفين
              </Button>
              <Button
                variant={
                  rewardSettings.rewardType === "branch" ? "default" : "outline"
                }
                size="sm"
                className="rounded-l-none"
                onClick={() =>
                  setRewardSettings({ ...rewardSettings, rewardType: "branch" })
                }
              >
                <Building className="h-4 w-4 ml-1" />
                فروع
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Settings Panel */}
      {showRewardSettings && (
        <Card className="mb-6 border-2 border-dashed border-amber-300 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 ml-2 text-amber-600" />
              إعدادات الجوائز والمكافآت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reward-title">عنوان الجائزة</Label>
                  <Input
                    id="reward-title"
                    value={rewardSettings.title}
                    onChange={(e) =>
                      setRewardSettings({
                        ...rewardSettings,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="reward-description">وصف الجائزة</Label>
                  <Input
                    id="reward-description"
                    value={rewardSettings.description}
                    onChange={(e) =>
                      setRewardSettings({
                        ...rewardSettings,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="reward-type">نوع المكافأة</Label>
                  <div className="flex mt-1 gap-2">
                    <Button
                      variant={
                        rewardSettings.rewardType === "employee"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        setRewardSettings({
                          ...rewardSettings,
                          rewardType: "employee",
                        })
                      }
                    >
                      <User className="h-4 w-4 ml-1" />
                      مكافأة للموظفين
                    </Button>
                    <Button
                      variant={
                        rewardSettings.rewardType === "branch"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        setRewardSettings({
                          ...rewardSettings,
                          rewardType: "branch",
                        })
                      }
                    >
                      <Building className="h-4 w-4 ml-1" />
                      مكافأة للفروع
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    معايير التقييم{" "}
                    {rewardSettings.rewardType === "branch"
                      ? "للفروع"
                      : "للموظفين"}
                  </Label>
                  {(rewardSettings.rewardType === "employee"
                    ? rewardSettings.criteria
                    : rewardSettings.branchCriteria
                  ).map((criterion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={criterion}
                        onChange={(e) => {
                          if (rewardSettings.rewardType === "employee") {
                            const newCriteria = [...rewardSettings.criteria];
                            newCriteria[index] = e.target.value;
                            setRewardSettings({
                              ...rewardSettings,
                              criteria: newCriteria,
                            });
                          } else {
                            const newCriteria = [
                              ...rewardSettings.branchCriteria,
                            ];
                            newCriteria[index] = e.target.value;
                            setRewardSettings({
                              ...rewardSettings,
                              branchCriteria: newCriteria,
                            });
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => {
                          if (rewardSettings.rewardType === "employee") {
                            const newCriteria = [...rewardSettings.criteria];
                            newCriteria.splice(index, 1);
                            setRewardSettings({
                              ...rewardSettings,
                              criteria: newCriteria,
                            });
                          } else {
                            const newCriteria = [
                              ...rewardSettings.branchCriteria,
                            ];
                            newCriteria.splice(index, 1);
                            setRewardSettings({
                              ...rewardSettings,
                              branchCriteria: newCriteria,
                            });
                          }
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      if (rewardSettings.rewardType === "employee") {
                        setRewardSettings({
                          ...rewardSettings,
                          criteria: [...rewardSettings.criteria, ""],
                        });
                      } else {
                        setRewardSettings({
                          ...rewardSettings,
                          branchCriteria: [
                            ...rewardSettings.branchCriteria,
                            "",
                          ],
                        });
                      }
                    }}
                  >
                    + إضافة معيار جديد
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>
                    قيم الجوائز{" "}
                    {rewardSettings.rewardType === "branch"
                      ? "للفروع"
                      : "للموظفين"}
                  </Label>
                  {(rewardSettings.rewardType === "employee"
                    ? rewardSettings.rewards
                    : rewardSettings.branchRewards
                  ).map((reward, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 mt-2 p-2 border rounded-md"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-800 font-bold">
                        {reward.position}
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`reward-amount-${index}`}>
                          المركز {reward.position}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`reward-amount-${index}`}
                            type="number"
                            value={reward.amount}
                            onChange={(e) => {
                              if (rewardSettings.rewardType === "employee") {
                                const newRewards = [...rewardSettings.rewards];
                                newRewards[index] = {
                                  ...newRewards[index],
                                  amount: parseInt(e.target.value),
                                };
                                setRewardSettings({
                                  ...rewardSettings,
                                  rewards: newRewards,
                                });
                              } else {
                                const newRewards = [
                                  ...rewardSettings.branchRewards,
                                ];
                                newRewards[index] = {
                                  ...newRewards[index],
                                  amount: parseInt(e.target.value),
                                };
                                setRewardSettings({
                                  ...rewardSettings,
                                  branchRewards: newRewards,
                                });
                              }
                            }}
                          />
                          <Input
                            className="w-16"
                            value={reward.currency}
                            onChange={(e) => {
                              if (rewardSettings.rewardType === "employee") {
                                const newRewards = [...rewardSettings.rewards];
                                newRewards[index] = {
                                  ...newRewards[index],
                                  currency: e.target.value,
                                };
                                setRewardSettings({
                                  ...rewardSettings,
                                  rewards: newRewards,
                                });
                              } else {
                                const newRewards = [
                                  ...rewardSettings.branchRewards,
                                ];
                                newRewards[index] = {
                                  ...newRewards[index],
                                  currency: e.target.value,
                                };
                                setRewardSettings({
                                  ...rewardSettings,
                                  branchRewards: newRewards,
                                });
                              }
                            }}
                          />
                        </div>
                        {rewardSettings.rewardType === "branch" && (
                          <div className="mt-2">
                            <Label
                              htmlFor={`distribution-method-${index}`}
                              className="text-xs"
                            >
                              طريقة التوزيع
                            </Label>
                            <select
                              id={`distribution-method-${index}`}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              value={reward.distributionMethod}
                              onChange={(e) => {
                                const newRewards = [
                                  ...rewardSettings.branchRewards,
                                ];
                                newRewards[index] = {
                                  ...newRewards[index],
                                  distributionMethod: e.target.value,
                                };
                                setRewardSettings({
                                  ...rewardSettings,
                                  branchRewards: newRewards,
                                });
                              }}
                            >
                              <option value="equal">
                                بالتساوي بين الموظفين
                              </option>
                              <option value="performance">
                                حسب أداء كل موظف
                              </option>
                              <option value="custom">تخصيص يدوي</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      if (rewardSettings.rewardType === "employee") {
                        const newPosition =
                          rewardSettings.rewards.length > 0
                            ? rewardSettings.rewards[
                                rewardSettings.rewards.length - 1
                              ].position + 1
                            : 1;
                        setRewardSettings({
                          ...rewardSettings,
                          rewards: [
                            ...rewardSettings.rewards,
                            {
                              position: newPosition,
                              amount: 100,
                              currency: "$",
                            },
                          ],
                        });
                      } else {
                        const newPosition =
                          rewardSettings.branchRewards.length > 0
                            ? rewardSettings.branchRewards[
                                rewardSettings.branchRewards.length - 1
                              ].position + 1
                            : 1;
                        setRewardSettings({
                          ...rewardSettings,
                          branchRewards: [
                            ...rewardSettings.branchRewards,
                            {
                              position: newPosition,
                              amount: 500,
                              currency: "$",
                              distributionMethod: "equal",
                            },
                          ],
                        });
                      }
                    }}
                  >
                    + إضافة جائزة جديدة{" "}
                    {rewardSettings.rewardType === "branch"
                      ? "للفرع"
                      : "للموظف"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-month">الشهر الحالي</Label>
                    <Input
                      id="current-month"
                      value={rewardSettings.currentMonth}
                      onChange={(e) =>
                        setRewardSettings({
                          ...rewardSettings,
                          currentMonth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="next-announcement">
                      موعد الإعلان القادم
                    </Label>
                    <Input
                      id="next-announcement"
                      value={rewardSettings.nextAnnouncement}
                      onChange={(e) =>
                        setRewardSettings({
                          ...rewardSettings,
                          nextAnnouncement: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <Button
                variant="outline"
                onClick={() => setShowRewardSettings(false)}
              >
                إلغاء
              </Button>
              <Button onClick={handleRewardSettingsUpdate}>
                حفظ التغييرات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Performers Podium */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl flex items-center justify-center">
            <Trophy className="h-6 w-6 ml-2 text-amber-600" />
            {rewardSettings.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {rewardSettings.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
            {/* Second Place */}
            {topPerformers.length > 1 && (
              <div className="flex flex-col items-center order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Medal className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 mt-4">
                    {rewardSettings.rewardType === "employee" ? (
                      <img
                        src={topPerformers[1].avatar}
                        alt={topPerformers[1].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={topPerformers[1].image}
                        alt={topPerformers[1].name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold">{topPerformers[1].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {rewardSettings.rewardType === "employee"
                      ? topPerformers[1].position
                      : topPerformers[1].location}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-gray-200 text-gray-800">
                      المركز الثاني
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-700">
                    {rewardSettings.rewardType === "employee" ? (
                      <>
                        {rewardSettings.rewards[1].currency}
                        {rewardSettings.rewards[1].amount}
                      </>
                    ) : (
                      <>
                        {rewardSettings.branchRewards[1].currency}
                        {rewardSettings.branchRewards[1].amount}
                      </>
                    )}
                  </p>
                  <div className="mt-1">
                    <Progress
                      value={topPerformers[1].performance}
                      className="h-2"
                    />
                    <span className="text-xs">
                      {topPerformers[1].performance}%
                    </span>
                  </div>
                  {rewardSettings.rewardType === "branch" && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {topPerformers[1].employeesCount} موظف
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* First Place */}
            {topPerformers.length > 0 && (
              <div className="flex flex-col items-center order-1 md:order-2 scale-110 z-10">
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <Crown className="h-10 w-10 text-amber-500" />
                  </div>
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-400 mt-4">
                    {rewardSettings.rewardType === "employee" ? (
                      <img
                        src={topPerformers[0].avatar}
                        alt={topPerformers[0].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={topPerformers[0].image}
                        alt={topPerformers[0].name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold text-lg">{topPerformers[0].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {rewardSettings.rewardType === "employee"
                      ? topPerformers[0].position
                      : topPerformers[0].location}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-amber-200 text-amber-800">
                      المركز الأول
                    </Badge>
                  </div>
                  <p className="mt-2 text-xl font-bold text-amber-700">
                    {rewardSettings.rewardType === "employee" ? (
                      <>
                        {rewardSettings.rewards[0].currency}
                        {rewardSettings.rewards[0].amount}
                      </>
                    ) : (
                      <>
                        {rewardSettings.branchRewards[0].currency}
                        {rewardSettings.branchRewards[0].amount}
                      </>
                    )}
                  </p>
                  <div className="mt-1">
                    <Progress
                      value={topPerformers[0].performance}
                      className="h-2 bg-amber-100"
                    />
                    <span className="text-xs">
                      {topPerformers[0].performance}%
                    </span>
                  </div>
                  {rewardSettings.rewardType === "branch" && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {topPerformers[0].employeesCount} موظف
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Third Place */}
            {topPerformers.length > 2 && (
              <div className="flex flex-col items-center order-3">
                <div className="relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Award className="h-8 w-8 text-amber-700" />
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-700 mt-4">
                    {rewardSettings.rewardType === "employee" ? (
                      <img
                        src={topPerformers[2].avatar}
                        alt={topPerformers[2].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={topPerformers[2].image}
                        alt={topPerformers[2].name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold">{topPerformers[2].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {rewardSettings.rewardType === "employee"
                      ? topPerformers[2].position
                      : topPerformers[2].location}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-amber-700 text-white">
                      المركز الثالث
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-bold text-amber-800">
                    {rewardSettings.rewardType === "employee" ? (
                      <>
                        {rewardSettings.rewards[2].currency}
                        {rewardSettings.rewards[2].amount}
                      </>
                    ) : (
                      <>
                        {rewardSettings.branchRewards[2].currency}
                        {rewardSettings.branchRewards[2].amount}
                      </>
                    )}
                  </p>
                  <div className="mt-1">
                    <Progress
                      value={topPerformers[2].performance}
                      className="h-2"
                    />
                    <span className="text-xs">
                      {topPerformers[2].performance}%
                    </span>
                  </div>
                  {rewardSettings.rewardType === "branch" && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {topPerformers[2].employeesCount} موظف
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2 flex items-center">
              <Sparkles className="h-4 w-4 ml-1 text-amber-500" />
              معايير التقييم{" "}
              {rewardSettings.rewardType === "branch" ? "للفروع" : "للموظفين"}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {(rewardSettings.rewardType === "employee"
                ? rewardSettings.criteria
                : rewardSettings.branchCriteria
              ).map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tabs */}
      <Tabs
        defaultValue={rewardSettings.rewardType}
        className="w-full"
        dir="rtl"
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value="employee"
            onClick={() =>
              setRewardSettings({ ...rewardSettings, rewardType: "employee" })
            }
          >
            <User className="h-4 w-4 ml-2" />
            أداء الموظفين
          </TabsTrigger>
          <TabsTrigger
            value="branch"
            onClick={() =>
              setRewardSettings({ ...rewardSettings, rewardType: "branch" })
            }
          >
            <Building className="h-4 w-4 ml-2" />
            أداء الفروع
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="h-5 w-5 ml-2 text-amber-500" />
                جدول أداء الموظفين والمبيعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-right font-medium">
                        الترتيب
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الموظف
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الفرع
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        <div className="flex items-center justify-end">
                          الأداء
                          <ArrowUpDown className="mr-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        <div className="flex items-center justify-end">
                          المبيعات
                          <ArrowUpDown className="mr-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الهدف
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الإنجازات
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الجائزة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-t hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <div
                              className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${employee.rank === 1 ? "bg-amber-200 text-amber-800" : employee.rank === 2 ? "bg-gray-200 text-gray-800" : employee.rank === 3 ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-600"}`}
                            >
                              {employee.rank}
                            </div>
                            {employee.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : employee.trend === "down" ? (
                              <TrendingUp className="h-3 w-3 text-red-500 transform rotate-180" />
                            ) : null}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={employee.avatar}
                                alt={employee.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {employee.position}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 border-blue-200"
                          >
                            {employee.branchName}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">
                                {employee.performance}%
                              </span>
                            </div>
                            <Progress
                              value={employee.performance}
                              className="h-1.5"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          ₴ {employee.sales.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          ₴ {employee.target.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {employee.achievements.map((achievement, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {employee.rank <= 3 ? (
                            <div className="flex items-center">
                              <Gift className="h-4 w-4 mr-1 text-amber-500" />
                              <span className="font-medium">
                                {
                                  rewardSettings.rewards[employee.rank - 1]
                                    .currency
                                }
                                {
                                  rewardSettings.rewards[employee.rank - 1]
                                    .amount
                                }
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              -
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branch">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building className="h-5 w-5 ml-2 text-amber-500" />
                جدول أداء الفروع والمبيعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-right font-medium">
                        الترتيب
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الفرع
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الموقع
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        <div className="flex items-center justify-end">
                          الأداء
                          <ArrowUpDown className="mr-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        <div className="flex items-center justify-end">
                          المبيعات
                          <ArrowUpDown className="mr-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الهدف
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        عدد الموظفين
                      </th>
                      <th className="py-3 px-4 text-right font-medium">
                        الجائزة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => (
                      <tr
                        key={branch.id}
                        className="border-t hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleBranchClick(branch)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <div
                              className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${branch.rank === 1 ? "bg-amber-200 text-amber-800" : branch.rank === 2 ? "bg-gray-200 text-gray-800" : branch.rank === 3 ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-600"}`}
                            >
                              {branch.rank}
                            </div>
                            {branch.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : branch.trend === "down" ? (
                              <TrendingUp className="h-3 w-3 text-red-500 transform rotate-180" />
                            ) : null}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-md overflow-hidden">
                              <img
                                src={branch.image}
                                alt={branch.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="font-medium">{branch.name}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 border-blue-200"
                          >
                            {branch.location}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">
                                {branch.performance}%
                              </span>
                            </div>
                            <Progress
                              value={branch.performance}
                              className="h-1.5"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          ₴ {branch.sales.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          ₴ {branch.target.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 border-gray-200"
                          >
                            {branch.employeesCount}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {branch.rank <= 3 ? (
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Gift className="h-4 w-4 mr-1 text-amber-500" />
                                <span className="font-medium">
                                  {
                                    rewardSettings.branchRewards[
                                      branch.rank - 1
                                    ].currency
                                  }
                                  {
                                    rewardSettings.branchRewards[
                                      branch.rank - 1
                                    ].amount
                                  }
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {rewardSettings.branchRewards[branch.rank - 1]
                                  .distributionMethod === "equal"
                                  ? "توزيع متساوي"
                                  : rewardSettings.branchRewards[
                                        branch.rank - 1
                                      ].distributionMethod === "performance"
                                    ? "حسب الأداء"
                                    : "تخصيص يدوي"}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              -
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Details Popup */}
      {selectedEmployee && (
        <EmployeeDetailsPopup
          employee={selectedEmployee}
          isOpen={showEmployeeDetails}
          onClose={() => setShowEmployeeDetails(false)}
          rewardSettings={rewardSettings}
        />
      )}

      {/* Branch Details Popup */}
      {selectedBranch && (
        <Dialog open={showBranchDetails} onOpenChange={setShowBranchDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-amber-500" />
                {selectedBranch.name}
              </DialogTitle>
              <DialogDescription>
                {selectedBranch.location} - أداء الفرع وتفاصيل المكافآت
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  <img
                    src={selectedBranch.image}
                    alt={selectedBranch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {selectedBranch.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBranch.location}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={`${selectedBranch.rank <= 3 ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      المركز {selectedBranch.rank}
                    </Badge>
                    {selectedBranch.trend === "up" ? (
                      <Badge className="bg-green-100 text-green-800">
                        تحسن
                      </Badge>
                    ) : selectedBranch.trend === "down" ? (
                      <Badge className="bg-red-100 text-red-800">تراجع</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">ثابت</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-muted p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">الأداء</div>
                  <div className="text-2xl font-bold">
                    {selectedBranch.performance}%
                  </div>
                  <Progress
                    value={selectedBranch.performance}
                    className="h-2 mt-2"
                  />
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">المبيعات</div>
                  <div className="text-2xl font-bold">
                    ₴ {selectedBranch.sales.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    الهدف: ₴ {selectedBranch.target.toLocaleString()}
                  </div>
                </div>
              </div>

              {selectedBranch.rank <= 3 && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mt-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    تفاصيل المكافأة
                  </h4>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        قيمة المكافأة
                      </div>
                      <div className="text-xl font-bold text-amber-700">
                        {
                          rewardSettings.branchRewards[selectedBranch.rank - 1]
                            .currency
                        }
                        {
                          rewardSettings.branchRewards[selectedBranch.rank - 1]
                            .amount
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        طريقة التوزيع
                      </div>
                      <div className="text-md font-medium">
                        {rewardSettings.branchRewards[selectedBranch.rank - 1]
                          .distributionMethod === "equal"
                          ? "توزيع متساوي بين الموظفين"
                          : rewardSettings.branchRewards[
                                selectedBranch.rank - 1
                              ].distributionMethod === "performance"
                            ? "توزيع حسب أداء كل موظف"
                            : "تخصيص يدوي للمكافآت"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-2">
                <h4 className="font-medium mb-2">
                  موظفي الفرع ({getBranchEmployees(selectedBranch.id).length})
                </h4>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-2 px-3 text-right font-medium">
                          الموظف
                        </th>
                        <th className="py-2 px-3 text-right font-medium">
                          المنصب
                        </th>
                        <th className="py-2 px-3 text-right font-medium">
                          الأداء
                        </th>
                        <th className="py-2 px-3 text-right font-medium">
                          المبيعات
                        </th>
                        {selectedBranch.rank <= 3 && (
                          <th className="py-2 px-3 text-right font-medium">
                            المكافأة المقدرة
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {getBranchEmployees(selectedBranch.id).map((employee) => {
                        // Calculate estimated reward based on distribution method
                        let estimatedReward = 0;
                        if (selectedBranch.rank <= 3) {
                          const branchReward =
                            rewardSettings.branchRewards[
                              selectedBranch.rank - 1
                            ];
                          const branchEmployees = getBranchEmployees(
                            selectedBranch.id,
                          );

                          if (branchReward.distributionMethod === "equal") {
                            estimatedReward =
                              branchReward.amount / branchEmployees.length;
                          } else if (
                            branchReward.distributionMethod === "performance"
                          ) {
                            // Calculate total performance points
                            const totalPerformance = branchEmployees.reduce(
                              (sum, emp) => sum + emp.performance,
                              0,
                            );
                            // Calculate employee's share based on performance
                            estimatedReward =
                              branchReward.amount *
                              (employee.performance / totalPerformance);
                          }
                        }

                        return (
                          <tr
                            key={employee.id}
                            className="border-t hover:bg-muted/30"
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                  <img
                                    src={employee.avatar}
                                    alt={employee.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="font-medium">
                                  {employee.name}
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-3">{employee.position}</td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1">
                                <Progress
                                  value={employee.performance}
                                  className="h-1.5 w-16"
                                />
                                <span>{employee.performance}%</span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              ₴ {employee.sales.toLocaleString()}
                            </td>
                            {selectedBranch.rank <= 3 && (
                              <td className="py-2 px-3">
                                <span className="font-medium text-amber-700">
                                  {
                                    rewardSettings.branchRewards[
                                      selectedBranch.rank - 1
                                    ].currency
                                  }
                                  {Math.round(estimatedReward)}
                                </span>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowBranchDetails(false)}
              >
                إغلاق
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PerformanceRewardsTab;
