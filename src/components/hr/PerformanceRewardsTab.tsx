import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";

// Dummy data for employees performance
const employeesData = [
  {
    id: 1,
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    performance: 95,
    sales: 125000,
    target: 100000,
    achievements: ["تجاوز الهدف بنسبة 25%", "5 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    rank: 1,
    previousRank: 2,
    trend: "up",
  },
  {
    id: 2,
    name: "سارة أحمد",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    performance: 92,
    sales: 115000,
    target: 100000,
    achievements: ["تجاوز الهدف بنسبة 15%", "3 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    rank: 2,
    previousRank: 1,
    trend: "down",
  },
  {
    id: 3,
    name: "محمد علي",
    position: "مندوب مبيعات",
    department: "المبيعات",
    performance: 88,
    sales: 98000,
    target: 100000,
    achievements: ["تحقيق 98% من الهدف", "4 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    rank: 3,
    previousRank: 4,
    trend: "up",
  },
  {
    id: 4,
    name: "فاطمة محمود",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    performance: 85,
    sales: 92000,
    target: 100000,
    achievements: ["تحقيق 92% من الهدف", "2 عملاء جدد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    rank: 4,
    previousRank: 3,
    trend: "down",
  },
  {
    id: 5,
    name: "خالد عبدالله",
    position: "مندوب مبيعات",
    department: "المبيعات",
    performance: 82,
    sales: 88000,
    target: 100000,
    achievements: ["تحقيق 88% من الهدف", "1 عميل جديد"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    rank: 5,
    previousRank: 6,
    trend: "up",
  },
  {
    id: 6,
    name: "نورا سامي",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    performance: 80,
    sales: 85000,
    target: 100000,
    achievements: ["تحقيق 85% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    rank: 6,
    previousRank: 5,
    trend: "down",
  },
  {
    id: 7,
    name: "عمر حسن",
    position: "مندوب مبيعات",
    department: "المبيعات",
    performance: 78,
    sales: 82000,
    target: 100000,
    achievements: ["تحقيق 82% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rank: 7,
    previousRank: 7,
    trend: "stable",
  },
  {
    id: 8,
    name: "ليلى كريم",
    position: "مندوبة مبيعات",
    department: "المبيعات",
    performance: 75,
    sales: 78000,
    target: 100000,
    achievements: ["تحقيق 78% من الهدف"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    rank: 8,
    previousRank: 8,
    trend: "stable",
  },
];

// Reward configuration
const rewardConfig = {
  title: "جائزة أفضل موظف أداءً",
  description: "جائزة شهرية لأفضل ثلاثة موظفين أداءً في المبيعات والإنتاجية",
  rewards: [
    { position: 1, amount: 500, currency: "$" },
    { position: 2, amount: 300, currency: "$" },
    { position: 3, amount: 200, currency: "$" },
  ],
  criteria: [
    "تحقيق أو تجاوز أهداف المبيعات الشهرية",
    "جودة خدمة العملاء",
    "الالتزام بمواعيد العمل",
    "روح الفريق والتعاون",
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
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  // Sort employees by performance
  const sortedEmployees = [...employeesData].sort(
    (a, b) => b.performance - a.performance,
  );

  // Get top 3 performers
  const topPerformers = sortedEmployees.slice(0, 3);

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

  return (
    <div className="space-y-6">
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
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن موظف..."
              className="w-[250px] pr-9"
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

                <div className="space-y-2">
                  <Label>معايير التقييم</Label>
                  {rewardSettings.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={criterion}
                        onChange={(e) => {
                          const newCriteria = [...rewardSettings.criteria];
                          newCriteria[index] = e.target.value;
                          setRewardSettings({
                            ...rewardSettings,
                            criteria: newCriteria,
                          });
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => {
                          const newCriteria = [...rewardSettings.criteria];
                          newCriteria.splice(index, 1);
                          setRewardSettings({
                            ...rewardSettings,
                            criteria: newCriteria,
                          });
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
                      setRewardSettings({
                        ...rewardSettings,
                        criteria: [...rewardSettings.criteria, ""],
                      });
                    }}
                  >
                    + إضافة معيار جديد
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>قيم الجوائز</Label>
                  {rewardSettings.rewards.map((reward, index) => (
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
                              const newRewards = [...rewardSettings.rewards];
                              newRewards[index] = {
                                ...newRewards[index],
                                amount: parseInt(e.target.value),
                              };
                              setRewardSettings({
                                ...rewardSettings,
                                rewards: newRewards,
                              });
                            }}
                          />
                          <Input
                            className="w-16"
                            value={reward.currency}
                            onChange={(e) => {
                              const newRewards = [...rewardSettings.rewards];
                              newRewards[index] = {
                                ...newRewards[index],
                                currency: e.target.value,
                              };
                              setRewardSettings({
                                ...rewardSettings,
                                rewards: newRewards,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
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
                          { position: newPosition, amount: 100, currency: "$" },
                        ],
                      });
                    }}
                  >
                    + إضافة جائزة جديدة
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
                    <img
                      src={topPerformers[1].avatar}
                      alt={topPerformers[1].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold">{topPerformers[1].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topPerformers[1].position}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-gray-200 text-gray-800">
                      المركز الثاني
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-700">
                    {rewardSettings.rewards[1].currency}
                    {rewardSettings.rewards[1].amount}
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
                    <img
                      src={topPerformers[0].avatar}
                      alt={topPerformers[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold text-lg">{topPerformers[0].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topPerformers[0].position}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-amber-200 text-amber-800">
                      المركز الأول
                    </Badge>
                  </div>
                  <p className="mt-2 text-xl font-bold text-amber-700">
                    {rewardSettings.rewards[0].currency}
                    {rewardSettings.rewards[0].amount}
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
                    <img
                      src={topPerformers[2].avatar}
                      alt={topPerformers[2].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-bold">{topPerformers[2].name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topPerformers[2].position}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <Badge className="bg-amber-700 text-white">
                      المركز الثالث
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-bold text-amber-800">
                    {rewardSettings.rewards[2].currency}
                    {rewardSettings.rewards[2].amount}
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
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2 flex items-center">
              <Sparkles className="h-4 w-4 ml-1 text-amber-500" />
              معايير التقييم
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {rewardSettings.criteria.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 ml-2 text-amber-500" />
            جدول الأداء والمبيعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-3 px-4 text-right font-medium">الترتيب</th>
                  <th className="py-3 px-4 text-right font-medium">الموظف</th>
                  <th className="py-3 px-4 text-right font-medium">
                    <div className="flex items-center">
                      الأداء
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right font-medium">
                    <div className="flex items-center">
                      المبيعات
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right font-medium">الهدف</th>
                  <th className="py-3 px-4 text-right font-medium">
                    الإنجازات
                  </th>
                  <th className="py-3 px-4 text-right font-medium">الجائزة</th>
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
                            {rewardSettings.rewards[employee.rank - 1].currency}
                            {rewardSettings.rewards[employee.rank - 1].amount}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee Details Popup */}
      {selectedEmployee && (
        <EmployeeDetailsPopup
          employee={selectedEmployee}
          isOpen={showEmployeeDetails}
          onClose={() => setShowEmployeeDetails(false)}
          rewardSettings={rewardSettings}
        />
      )}
    </div>
  );
};

export default PerformanceRewardsTab;
