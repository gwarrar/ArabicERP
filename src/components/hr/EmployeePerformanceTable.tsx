import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Printer,
  BarChart2,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Star,
} from "lucide-react";

// نموذج بيانات الموظف الموسع
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  avatar?: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "onLeave";
  performanceScore: number;
  // بيانات المبيعات
  sales: {
    totalSales: number; // إجمالي المبيعات
    targetSales: number; // المستهدف
    salesAchievement: number; // نسبة تحقيق المستهدف
    deals: {
      total: number; // إجمالي الصفقات
      won: number; // الصفقات الناجحة
      lost: number; // الصفقات الخاسرة
      pending: number; // الصفقات المعلقة
    };
    averageDealSize: number; // متوسط حجم الصفقة
    conversionRate: number; // معدل التحويل
  };
  // بيانات العمل
  work: {
    tasksCompleted: number; // المهام المكتملة
    totalTasks: number; // إجمالي المهام
    projectsInvolved: number; // المشاريع المشارك فيها
    attendanceRate: number; // نسبة الحضور
    overtimeHours: number; // ساعات العمل الإضافية
  };
  // بيانات العملاء
  customers: {
    total: number; // إجمالي العملاء
    new: number; // العملاء الجدد
    retained: number; // العملاء المحتفظ بهم
    satisfactionRate: number; // معدل رضا العملاء
  };
}

// بيانات تجريبية للموظفين
const employeesData: Employee[] = [
  {
    id: "EMP001",
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "2022-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    email: "ahmed@example.com",
    phone: "+380 50 123 4567",
    status: "active",
    performanceScore: 92,
    sales: {
      totalSales: 1250000,
      targetSales: 1000000,
      salesAchievement: 125,
      deals: {
        total: 45,
        won: 38,
        lost: 5,
        pending: 2,
      },
      averageDealSize: 32895,
      conversionRate: 84.4,
    },
    work: {
      tasksCompleted: 78,
      totalTasks: 85,
      projectsInvolved: 12,
      attendanceRate: 98.5,
      overtimeHours: 15,
    },
    customers: {
      total: 42,
      new: 12,
      retained: 30,
      satisfactionRate: 95,
    },
  },
  {
    id: "EMP002",
    name: "سارة خالد",
    position: "أخصائي تسويق",
    department: "التسويق",
    joinDate: "2022-03-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    email: "sara@example.com",
    phone: "+380 50 234 5678",
    status: "active",
    performanceScore: 88,
    sales: {
      totalSales: 850000,
      targetSales: 800000,
      salesAchievement: 106.25,
      deals: {
        total: 32,
        won: 25,
        lost: 4,
        pending: 3,
      },
      averageDealSize: 34000,
      conversionRate: 78.1,
    },
    work: {
      tasksCompleted: 65,
      totalTasks: 72,
      projectsInvolved: 8,
      attendanceRate: 96.2,
      overtimeHours: 8,
    },
    customers: {
      total: 28,
      new: 8,
      retained: 20,
      satisfactionRate: 92,
    },
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2021-11-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    email: "mohammed@example.com",
    phone: "+380 50 345 6789",
    status: "active",
    performanceScore: 85,
    sales: {
      totalSales: 720000,
      targetSales: 700000,
      salesAchievement: 102.86,
      deals: {
        total: 28,
        won: 22,
        lost: 6,
        pending: 0,
      },
      averageDealSize: 32727,
      conversionRate: 78.6,
    },
    work: {
      tasksCompleted: 58,
      totalTasks: 65,
      projectsInvolved: 6,
      attendanceRate: 94.8,
      overtimeHours: 12,
    },
    customers: {
      total: 25,
      new: 5,
      retained: 20,
      satisfactionRate: 88,
    },
  },
  {
    id: "EMP004",
    name: "فاطمة أحمد",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    email: "fatima@example.com",
    phone: "+380 50 456 7890",
    status: "active",
    performanceScore: 95,
    sales: {
      totalSales: 1350000,
      targetSales: 1200000,
      salesAchievement: 112.5,
      deals: {
        total: 48,
        won: 42,
        lost: 4,
        pending: 2,
      },
      averageDealSize: 32143,
      conversionRate: 87.5,
    },
    work: {
      tasksCompleted: 82,
      totalTasks: 85,
      projectsInvolved: 10,
      attendanceRate: 99.2,
      overtimeHours: 18,
    },
    customers: {
      total: 45,
      new: 15,
      retained: 30,
      satisfactionRate: 96,
    },
  },
  {
    id: "EMP005",
    name: "خالد العتيبي",
    position: "مدير فريق المبيعات",
    department: "المبيعات",
    joinDate: "2021-08-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
    email: "khalid@example.com",
    phone: "+380 50 567 8901",
    status: "active",
    performanceScore: 90,
    sales: {
      totalSales: 1150000,
      targetSales: 1100000,
      salesAchievement: 104.55,
      deals: {
        total: 40,
        won: 35,
        lost: 3,
        pending: 2,
      },
      averageDealSize: 32857,
      conversionRate: 87.5,
    },
    work: {
      tasksCompleted: 75,
      totalTasks: 80,
      projectsInvolved: 15,
      attendanceRate: 97.5,
      overtimeHours: 20,
    },
    customers: {
      total: 38,
      new: 10,
      retained: 28,
      satisfactionRate: 93,
    },
  },
  {
    id: "EMP006",
    name: "نورة السالم",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-02-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    email: "noura@example.com",
    phone: "+380 50 678 9012",
    status: "active",
    performanceScore: 82,
    sales: {
      totalSales: 680000,
      targetSales: 700000,
      salesAchievement: 97.14,
      deals: {
        total: 25,
        won: 20,
        lost: 5,
        pending: 0,
      },
      averageDealSize: 34000,
      conversionRate: 80,
    },
    work: {
      tasksCompleted: 55,
      totalTasks: 65,
      projectsInvolved: 5,
      attendanceRate: 92.5,
      overtimeHours: 6,
    },
    customers: {
      total: 22,
      new: 5,
      retained: 17,
      satisfactionRate: 85,
    },
  },
];

const EmployeePerformanceTable = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>جدول أداء الموظفين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الموظف</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>الأداء</TableHead>
                  <TableHead>المبيعات</TableHead>
                  <TableHead>المستهدف</TableHead>
                  <TableHead>نسبة التحقيق</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {employee.avatar && (
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-8 w-8 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.position}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={employee.performanceScore}
                          className="w-24"
                        />
                        <span>{employee.performanceScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      ₴ {employee.sales.totalSales.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ₴ {employee.sales.targetSales.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          employee.sales.salesAchievement >= 100
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {employee.sales.salesAchievement}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePerformanceTable;
