import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  Users,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash,
  Eye,
  UserPlus,
} from "lucide-react";

// نموذج بيانات الموظف
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
  salary: number;
  address: string;
  nationalId: string;
  gender: "male" | "female";
  birthDate: string;
  education: string;
  skills: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
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
    salary: 85000,
    address: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
    nationalId: "1234567890",
    gender: "male",
    birthDate: "1985-05-15",
    education: "بكالوريوس إدارة أعمال",
    skills: ["إدارة المبيعات", "التفاوض", "إدارة الفريق", "تحليل السوق"],
    emergencyContact: {
      name: "سارة أحمد",
      relation: "زوجة",
      phone: "+380 50 987 6543",
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
    salary: 65000,
    address: "شارع التحلية، جدة، المملكة العربية السعودية",
    nationalId: "0987654321",
    gender: "female",
    birthDate: "1990-08-20",
    education: "ماجستير تسويق",
    skills: [
      "التسويق الرقمي",
      "إدارة وسائل التواصل الاجتماعي",
      "تحليل البيانات",
    ],
    emergencyContact: {
      name: "خالد العتيبي",
      relation: "أب",
      phone: "+380 50 876 5432",
    },
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "2021-11-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    email: "mohammed@example.com",
    phone: "+380 50 345 6789",
    status: "active",
    salary: 75000,
    address: "شارع الأمير سلطان، الخبر، المملكة العربية السعودية",
    nationalId: "2345678901",
    gender: "male",
    birthDate: "1988-12-10",
    education: "بكالوريوس علوم حاسب",
    skills: ["JavaScript", "React", "Node.js", "SQL", "AWS"],
    emergencyContact: {
      name: "فاطمة علي",
      relation: "أخت",
      phone: "+380 50 765 4321",
    },
  },
  {
    id: "EMP004",
    name: "فاطمة أحمد",
    position: "محاسب",
    department: "المالية",
    joinDate: "2022-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    email: "fatima@example.com",
    phone: "+380 50 456 7890",
    status: "active",
    salary: 70000,
    address: "شارع الملك عبدالله، الرياض، المملكة العربية السعودية",
    nationalId: "3456789012",
    gender: "female",
    birthDate: "1992-03-25",
    education: "بكالوريوس محاسبة",
    skills: ["المحاسبة المالية", "إعداد التقارير", "التحليل المالي", "الضرائب"],
    emergencyContact: {
      name: "أحمد محمد",
      relation: "زوج",
      phone: "+380 50 654 3210",
    },
  },
  {
    id: "EMP005",
    name: "خالد العتيبي",
    position: "مدير الموارد البشرية",
    department: "الموارد البشرية",
    joinDate: "2021-08-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
    email: "khalid@example.com",
    phone: "+380 50 567 8901",
    status: "active",
    salary: 90000,
    address: "شارع العليا، الرياض، المملكة العربية السعودية",
    nationalId: "4567890123",
    gender: "male",
    birthDate: "1983-07-05",
    education: "ماجستير إدارة موارد بشرية",
    skills: [
      "إدارة الموارد البشرية",
      "التوظيف",
      "تطوير الموظفين",
      "إدارة الأداء",
    ],
    emergencyContact: {
      name: "نورة السالم",
      relation: "زوجة",
      phone: "+380 50 543 2109",
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
    status: "onLeave",
    salary: 60000,
    address: "شارع الأمير محمد، الدمام، المملكة العربية السعودية",
    nationalId: "5678901234",
    gender: "female",
    birthDate: "1995-09-18",
    education: "بكالوريوس تسويق",
    skills: ["مبيعات", "خدمة العملاء", "التفاوض"],
    emergencyContact: {
      name: "سعد السالم",
      relation: "أب",
      phone: "+380 50 432 1098",
    },
  },
  {
    id: "EMP007",
    name: "عبدالله الشمري",
    position: "مندوب مبيعات كبير",
    department: "المبيعات",
    joinDate: "2021-10-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
    email: "abdullah@example.com",
    phone: "+380 50 789 0123",
    status: "active",
    salary: 68000,
    address: "شارع الملك سعود، الرياض، المملكة العربية السعودية",
    nationalId: "6789012345",
    gender: "male",
    birthDate: "1987-11-30",
    education: "بكالوريوس إدارة أعمال",
    skills: ["مبيعات", "إدارة علاقات العملاء", "تطوير الأعمال"],
    emergencyContact: {
      name: "هند الشمري",
      relation: "زوجة",
      phone: "+380 50 321 0987",
    },
  },
  {
    id: "EMP008",
    name: "منى القحطاني",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-04-12",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mona",
    email: "mona@example.com",
    phone: "+380 50 890 1234",
    status: "inactive",
    salary: 58000,
    address: "شارع الستين، جدة، المملكة العربية السعودية",
    nationalId: "7890123456",
    gender: "female",
    birthDate: "1993-02-14",
    education: "دبلوم تسويق",
    skills: ["مبيعات", "خدمة العملاء"],
    emergencyContact: {
      name: "سعيد القحطاني",
      relation: "أخ",
      phone: "+380 50 210 9876",
    },
  },
  {
    id: "EMP009",
    name: "عمر الزهراني",
    position: "مهندس شبكات",
    department: "تقنية المعلومات",
    joinDate: "2021-09-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    email: "omar@example.com",
    phone: "+380 50 901 2345",
    status: "active",
    salary: 72000,
    address: "شارع التخصصي، الرياض، المملكة العربية السعودية",
    nationalId: "8901234567",
    gender: "male",
    birthDate: "1989-06-22",
    education: "بكالوريوس هندسة شبكات",
    skills: ["إدارة الشبكات", "أمن المعلومات", "Cisco", "Microsoft Server"],
    emergencyContact: {
      name: "ليلى الزهراني",
      relation: "زوجة",
      phone: "+380 50 109 8765",
    },
  },
  {
    id: "EMP010",
    name: "ليلى العنزي",
    position: "مصممة جرافيك",
    department: "التسويق",
    joinDate: "2022-06-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    email: "layla@example.com",
    phone: "+380 50 012 3456",
    status: "active",
    salary: 62000,
    address: "شارع الأمير فيصل، الرياض، المملكة العربية السعودية",
    nationalId: "9012345678",
    gender: "female",
    birthDate: "1994-10-08",
    education: "بكالوريوس تصميم جرافيك",
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "UI/UX",
      "تصميم الهوية البصرية",
    ],
    emergencyContact: {
      name: "فهد العنزي",
      relation: "أب",
      phone: "+380 50 098 7654",
    },
  },
];

// مكون قائمة الموظفين
const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showNewEmployeeDialog, setShowNewEmployeeDialog] = useState(false);

  // الأقسام المتاحة
  const departments = Array.from(
    new Set(employees.map((employee) => employee.department)),
  );

  // تصفية الموظفين حسب البحث والقسم والحالة
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = searchTerm
      ? employee.name.includes(searchTerm) ||
        employee.position.includes(searchTerm) ||
        employee.id.includes(searchTerm) ||
        employee.email.includes(searchTerm)
      : true;

    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;

    const matchesStatus =
      filterStatus === "all" || employee.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // عرض تفاصيل الموظف
  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  // الحصول على لون حالة الموظف
  const getStatusColor = (status: Employee["status"]): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "onLeave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على اسم حالة الموظف بالعربية
  const getStatusName = (status: Employee["status"]): string => {
    switch (status) {
      case "active":
        return "نشط";
      case "inactive":
        return "غير نشط";
      case "onLeave":
        return "في إجازة";
      default:
        return "";
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA");
  };

  // تنسيق الراتب
  const formatSalary = (salary: number): string => {
    return `${salary.toLocaleString()} ₴`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">قائمة الموظفين</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
          <Button size="sm" variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>
          <Button onClick={() => setShowNewEmployeeDialog(true)}>
            <UserPlus className="ml-1 h-4 w-4" />
            إضافة موظف
          </Button>
        </div>
      </div>

      {/* قسم التصفية */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="بحث باسم الموظف أو الرقم الوظيفي..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent border-none text-sm focus:outline-none"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">جميع الأقسام</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent border-none text-sm focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="onLeave">في إجازة</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول الموظفين */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الرقم الوظيفي</TableHead>
                  <TableHead>الموظف</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>المنصب</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>رقم الهاتف</TableHead>
                  <TableHead>تاريخ التعيين</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا يوجد موظفين مطابقين للبحث</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              employee.avatar ||
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                            }
                            alt={employee.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{employee.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{employee.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(employee.joinDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(employee.status)}
                          variant="outline"
                        >
                          {getStatusName(employee.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewEmployee(employee)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* حوار تفاصيل الموظف */}
      <Dialog open={showEmployeeDetails} onOpenChange={setShowEmployeeDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الموظف</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={
                    selectedEmployee.avatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedEmployee.position} - {selectedEmployee.department}
                  </p>
                  <Badge
                    className={getStatusColor(selectedEmployee.status)}
                    variant="outline"
                  >
                    {getStatusName(selectedEmployee.status)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      المعلومات الشخصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        البريد الإلكتروني
                      </p>
                      <p className="font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        رقم الهاتف
                      </p>
                      <p className="font-medium">{selectedEmployee.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">العنوان</p>
                      <p className="font-medium">{selectedEmployee.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        رقم الهوية
                      </p>
                      <p className="font-medium">
                        {selectedEmployee.nationalId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الجنس</p>
                      <p className="font-medium">
                        {selectedEmployee.gender === "male" ? "ذكر" : "أنثى"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الميلاد
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedEmployee.birthDate)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      المعلومات الوظيفية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        الرقم الوظيفي
                      </p>
                      <p className="font-medium">{selectedEmployee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ التعيين
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedEmployee.joinDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الراتب</p>
                      <p className="font-medium">
                        {formatSalary(selectedEmployee.salary)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المؤهل العلمي
                      </p>
                      <p className="font-medium">
                        {selectedEmployee.education}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المهارات</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedEmployee.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    جهة الاتصال في حالات الطوارئ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">الاسم</p>
                    <p className="font-medium">
                      {selectedEmployee.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">صلة القرابة</p>
                    <p className="font-medium">
                      {selectedEmployee.emergencyContact.relation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                    <p className="font-medium">
                      {selectedEmployee.emergencyContact.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEmployeeDetails(false)}
                >
                  إغلاق
                </Button>
                <Button variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* حوار إضافة موظف جديد */}
      <Dialog
        open={showNewEmployeeDialog}
        onOpenChange={setShowNewEmployeeDialog}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إضافة موظف جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات الموظف الجديد. جميع الحقول المميزة بعلامة * إلزامية.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم الكامل *</label>
              <Input placeholder="الاسم الكامل" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الرقم الوظيفي *</label>
              <Input placeholder="الرقم الوظيفي" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">القسم *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept, index) => (
                    <SelectItem key={index} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المنصب *</label>
              <Input placeholder="المنصب" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني *</label>
              <Input type="email" placeholder="البريد الإلكتروني" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الهاتف *</label>
              <Input placeholder="رقم الهاتف" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ التعيين *</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الراتب *</label>
              <Input type="number" placeholder="الراتب" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الجنس *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الميلاد *</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الهوية *</label>
              <Input placeholder="رقم الهوية" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المؤهل العلمي *</label>
              <Input placeholder="المؤهل العلمي" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">العنوان *</label>
              <Input placeholder="العنوان" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">المهارات</label>
              <Input placeholder="المهارات (مفصولة بفواصل)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                اسم جهة الاتصال في حالات الطوارئ *
              </label>
              <Input placeholder="الاسم" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">صلة القرابة *</label>
              <Input placeholder="صلة القرابة" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">
                رقم هاتف جهة الاتصال *
              </label>
              <Input placeholder="رقم الهاتف" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewEmployeeDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setShowNewEmployeeDialog(false)}>
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
