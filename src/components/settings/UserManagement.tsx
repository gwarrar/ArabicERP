import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash,
  UserPlus,
  Users,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: {
    module: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  }[];
}

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showPasswordVisible, setShowPasswordVisible] = useState(false);

  // Sample users data
  const users: User[] = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "مدير النظام",
      department: "تكنولوجيا المعلومات",
      status: "active",
      lastLogin: "2024-07-15 10:30",
    },
    {
      id: "2",
      name: "سارة أحمد",
      email: "sara@example.com",
      role: "مدير المبيعات",
      department: "المبيعات",
      status: "active",
      lastLogin: "2024-07-14 14:15",
    },
    {
      id: "3",
      name: "محمد علي",
      email: "mohamed@example.com",
      role: "محاسب",
      department: "المالية",
      status: "active",
      lastLogin: "2024-07-12 11:00",
    },
    {
      id: "4",
      name: "خالد عبدالله",
      email: "khaled@example.com",
      role: "مدير المخزون",
      department: "المخزون",
      status: "inactive",
      lastLogin: "2024-07-01 09:45",
    },
  ];

  // Sample roles data
  const roles: Role[] = [
    {
      id: "1",
      name: "مدير النظام",
      description: "صلاحيات كاملة على جميع أجزاء النظام",
      usersCount: 1,
      permissions: [
        {
          module: "المبيعات",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        {
          module: "المشتريات",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        {
          module: "المخزون",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        {
          module: "المحاسبة",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        {
          module: "إدارة العملاء",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
      ],
    },
    {
      id: "2",
      name: "مدير المبيعات",
      description: "إدارة المبيعات والعملاء",
      usersCount: 1,
      permissions: [
        {
          module: "المبيعات",
          view: true,
          create: true,
          edit: true,
          delete: false,
        },
        {
          module: "المشتريات",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المخزون",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المحاسبة",
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "إدارة العملاء",
          view: true,
          create: true,
          edit: true,
          delete: false,
        },
      ],
    },
    {
      id: "3",
      name: "محاسب",
      description: "إدارة الحسابات والتقارير المالية",
      usersCount: 1,
      permissions: [
        {
          module: "المبيعات",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المشتريات",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المخزون",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المحاسبة",
          view: true,
          create: true,
          edit: true,
          delete: false,
        },
        {
          module: "إدارة العملاء",
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      ],
    },
    {
      id: "4",
      name: "مدير المخزون",
      description: "إدارة المخزون والمنتجات",
      usersCount: 1,
      permissions: [
        {
          module: "المبيعات",
          view: true,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "المشتريات",
          view: true,
          create: true,
          edit: false,
          delete: false,
        },
        {
          module: "المخزون",
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
        {
          module: "المحاسبة",
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
        {
          module: "إدارة العملاء",
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      ],
    },
  ];

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 ml-2" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="roles">
              <Shield className="h-4 w-4 ml-2" />
              الأدوار والصلاحيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن مستخدم..." className="pr-9" />
              </div>
              <Button onClick={() => setShowAddUser(true)}>
                <UserPlus className="ml-2 h-4 w-4" />
                إضافة مستخدم
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر تسجيل دخول</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {user.status === "active" ? "نشط" : "غير نشط"}
                        </span>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Lock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن دور..." className="pr-9" />
              </div>
              <Button onClick={() => setShowAddRole(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة دور جديد
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الدور</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>عدد المستخدمين</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.usersCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
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
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">تفاصيل الصلاحيات</h3>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الوحدة</TableHead>
                      <TableHead className="text-center">عرض</TableHead>
                      <TableHead className="text-center">إنشاء</TableHead>
                      <TableHead className="text-center">تعديل</TableHead>
                      <TableHead className="text-center">حذف</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles[0].permissions.map((permission, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {permission.module}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.view ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.create ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.edit ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.delete ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add User Dialog */}
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">الاسم</Label>
                <Input id="user-name" placeholder="الاسم الكامل" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">البريد الإلكتروني</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="example@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="user-password"
                    type={showPasswordVisible ? "text" : "password"}
                    placeholder="كلمة المرور"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-2.5"
                    onClick={() => setShowPasswordVisible(!showPasswordVisible)}
                  >
                    {showPasswordVisible ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">الدور</Label>
                <Select>
                  <SelectTrigger id="user-role">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-department">القسم</Label>
                <Select>
                  <SelectTrigger id="user-department">
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">تكنولوجيا المعلومات</SelectItem>
                    <SelectItem value="sales">المبيعات</SelectItem>
                    <SelectItem value="finance">المالية</SelectItem>
                    <SelectItem value="inventory">المخزون</SelectItem>
                    <SelectItem value="hr">الموارد البشرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-status">الحالة</Label>
                <div className="flex items-center gap-2">
                  <Switch id="user-status" defaultChecked />
                  <span>نشط</span>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddUser(false)}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Role Dialog */}
        <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة دور جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">اسم الدور</Label>
                <Input id="role-name" placeholder="اسم الدور" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">الوصف</Label>
                <Input id="role-description" placeholder="وصف الدور" />
              </div>

              <div className="space-y-2">
                <Label>الصلاحيات</Label>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الوحدة</TableHead>
                        <TableHead className="text-center">عرض</TableHead>
                        <TableHead className="text-center">إنشاء</TableHead>
                        <TableHead className="text-center">تعديل</TableHead>
                        <TableHead className="text-center">حذف</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        "المبيعات",
                        "المشتريات",
                        "المخزون",
                        "المحاسبة",
                        "إدارة العملاء",
                      ].map((module, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {module}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch id={`view-${index}`} defaultChecked />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch id={`create-${index}`} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch id={`edit-${index}`} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch id={`delete-${index}`} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowAddRole(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddRole(false)}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
