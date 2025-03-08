import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Briefcase,
  Users,
  Calendar,
  Edit,
  Trash,
  Eye,
  FileText,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
} from "lucide-react";

// نموذج بيانات الوظيفة الشاغرة
interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "fullTime" | "partTime" | "contract" | "remote";
  status: "open" | "closed" | "onHold";
  postedDate: string;
  closingDate: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
  };
  applicantsCount: number;
}

// نموذج بيانات المتقدم للوظيفة
interface JobApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  applyDate: string;
  status:
    | "new"
    | "reviewing"
    | "interviewed"
    | "shortlisted"
    | "rejected"
    | "hired";
  resumeUrl: string;
  coverLetter?: string;
  experience: number;
  education: string;
  skills: string[];
  interviewDate?: string;
  notes?: string;
  rating?: number;
}

// بيانات تجريبية للوظائف الشاغرة
const jobVacanciesData: JobVacancy[] = [
  {
    id: "JOB001",
    title: "مدير مبيعات",
    department: "المبيعات",
    location: "الرياض",
    type: "fullTime",
    status: "open",
    postedDate: "2024-07-01",
    closingDate: "2024-08-15",
    description:
      "نبحث عن مدير مبيعات ذو خبرة لقيادة فريق المبيعات وتطوير استراتيجيات النمو.",
    requirements: [
      "خبرة 5+ سنوات في إدارة المبيعات",
      "مهارات قيادية ممتازة",
      "القدرة على تحقيق الأهداف",
      "مهارات تواصل ممتازة",
    ],
    salary: {
      min: 80000,
      max: 100000,
    },
    applicantsCount: 12,
  },
  {
    id: "JOB002",
    title: "مطور واجهة أمامية",
    department: "تقنية المعلومات",
    location: "جدة",
    type: "fullTime",
    status: "open",
    postedDate: "2024-07-05",
    closingDate: "2024-08-05",
    description:
      "نبحث عن مطور واجهة أمامية ماهر للعمل على تطوير وتحسين منصاتنا الرقمية.",
    requirements: [
      "خبرة 3+ سنوات في تطوير الواجهات الأمامية",
      "إتقان HTML, CSS, JavaScript",
      "خبرة في React أو Angular أو Vue",
      "فهم جيد لمبادئ UX/UI",
    ],
    salary: {
      min: 60000,
      max: 75000,
    },
    applicantsCount: 18,
  },
  {
    id: "JOB003",
    title: "محاسب",
    department: "المالية",
    location: "الدمام",
    type: "fullTime",
    status: "open",
    postedDate: "2024-07-10",
    closingDate: "2024-08-10",
    description:
      "نبحث عن محاسب للانضمام إلى فريق المالية لدينا للمساعدة في إدارة العمليات المالية اليومية.",
    requirements: [
      "بكالوريوس في المحاسبة أو المالية",
      "خبرة 2+ سنوات في المحاسبة",
      "معرفة ببرامج المحاسبة",
      "مهارات تحليلية قوية",
    ],
    salary: {
      min: 50000,
      max: 65000,
    },
    applicantsCount: 8,
  },
  {
    id: "JOB004",
    title: "مسؤول تسويق رقمي",
    department: "التسويق",
    location: "الرياض",
    type: "fullTime",
    status: "open",
    postedDate: "2024-07-15",
    closingDate: "2024-08-15",
    description:
      "نبحث عن مسؤول تسويق رقمي مبدع لتطوير وتنفيذ استراتيجيات التسويق الرقمي.",
    requirements: [
      "خبرة 3+ سنوات في التسويق الرقمي",
      "خبرة في إدارة حملات وسائل التواصل الاجتماعي",
      "معرفة بأدوات التحليل الرقمي",
      "مهارات إبداعية وتحليلية",
    ],
    salary: {
      min: 55000,
      max: 70000,
    },
    applicantsCount: 15,
  },
  {
    id: "JOB005",
    title: "مهندس شبكات",
    department: "تقنية المعلومات",
    location: "الرياض",
    type: "fullTime",
    status: "closed",
    postedDate: "2024-06-01",
    closingDate: "2024-07-01",
    description: "نبحث عن مهندس شبكات لإدارة وصيانة بنية الشبكة لدينا.",
    requirements: [
      "خبرة 4+ سنوات في إدارة الشبكات",
      "شهادات Cisco أو ما يعادلها",
      "خبرة في أمن الشبكات",
      "مهارات حل المشكلات",
    ],
    salary: {
      min: 65000,
      max: 80000,
    },
    applicantsCount: 10,
  },
  {
    id: "JOB006",
    title: "مساعد إداري",
    department: "الإدارة",
    location: "جدة",
    type: "partTime",
    status: "open",
    postedDate: "2024-07-20",
    closingDate: "2024-08-20",
    description: "نبحث عن مساعد إداري لدعم فريق الإدارة في المهام اليومية.",
    requirements: [
      "خبرة سابقة في العمل الإداري",
      "مهارات تنظيمية ممتازة",
      "إتقان برامج Microsoft Office",
      "مهارات تواصل جيدة",
    ],
    salary: {
      min: 30000,
      max: 40000,
    },
    applicantsCount: 22,
  },
  {
    id: "JOB007",
    title: "مندوب مبيعات",
    department: "المبيعات",
    location: "الدمام",
    type: "fullTime",
    status: "onHold",
    postedDate: "2024-07-12",
    closingDate: "2024-08-12",
    description: "نبحث عن مندوب مبيعات نشط للمساعدة في تنمية قاعدة عملائنا.",
    requirements: [
      "خبرة في المبيعات",
      "مهارات تواصل ممتازة",
      "القدرة على العمل ضمن فريق",
      "الدافع لتحقيق الأهداف",
    ],
    salary: {
      min: 45000,
      max: 60000,
    },
    applicantsCount: 5,
  },
];

// بيانات تجريبية للمتقدمين للوظائف
const jobApplicantsData: JobApplicant[] = [
  {
    id: "APP001",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+380 50 123 4567",
    jobId: "JOB001",
    jobTitle: "مدير مبيعات",
    applyDate: "2024-07-05",
    status: "interviewed",
    resumeUrl: "#",
    coverLetter: "أنا مهتم بالانضمام إلى فريقكم كمدير مبيعات...",
    experience: 7,
    education: "بكالوريوس إدارة أعمال",
    skills: ["إدارة المبيعات", "القيادة", "التفاوض", "CRM"],
    interviewDate: "2024-07-15",
    notes: "مرشح قوي مع خبرة ممتازة في قيادة فرق المبيعات",
    rating: 4,
  },
  {
    id: "APP002",
    name: "سارة خالد",
    email: "sara@example.com",
    phone: "+380 50 234 5678",
    jobId: "JOB001",
    jobTitle: "مدير مبيعات",
    applyDate: "2024-07-06",
    status: "shortlisted",
    resumeUrl: "#",
    coverLetter: "أتقدم بطلب للحصول على وظيفة مدير المبيعات...",
    experience: 6,
    education: "ماجستير إدارة أعمال",
    skills: ["إدارة المبيعات", "تطوير الأعمال", "إدارة الفريق"],
    interviewDate: "2024-07-18",
    notes: "مرشحة ممتازة مع خلفية قوية في تطوير الأعمال",
    rating: 5,
  },
  {
    id: "APP003",
    name: "محمد علي",
    email: "mohammed@example.com",
    phone: "+380 50 345 6789",
    jobId: "JOB002",
    jobTitle: "مطور واجهة أمامية",
    applyDate: "2024-07-07",
    status: "new",
    resumeUrl: "#",
    experience: 4,
    education: "بكالوريوس علوم حاسب",
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue"],
  },
  {
    id: "APP004",
    name: "فاطمة أحمد",
    email: "fatima@example.com",
    phone: "+380 50 456 7890",
    jobId: "JOB002",
    jobTitle: "مطور واجهة أمامية",
    applyDate: "2024-07-08",
    status: "reviewing",
    resumeUrl: "#",
    coverLetter: "أنا مطورة واجهة أمامية ذات خبرة...",
    experience: 5,
    education: "بكالوريوس هندسة برمجيات",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    notes: "خبرة قوية في React وTypeScript",
  },
  {
    id: "APP005",
    name: "خالد العتيبي",
    email: "khalid@example.com",
    phone: "+380 50 567 8901",
    jobId: "JOB003",
    jobTitle: "محاسب",
    applyDate: "2024-07-12",
    status: "rejected",
    resumeUrl: "#",
    experience: 1,
    education: "بكالوريوس محاسبة",
    skills: ["المحاسبة المالية", "Excel", "برامج المحاسبة"],
    notes: "خبرة غير كافية للمنصب",
  },
  {
    id: "APP006",
    name: "نورة السالم",
    email: "noura@example.com",
    phone: "+380 50 678 9012",
    jobId: "JOB004",
    jobTitle: "مسؤول تسويق رقمي",
    applyDate: "2024-07-16",
    status: "new",
    resumeUrl: "#",
    coverLetter: "أتقدم بطلب للحصول على وظيفة مسؤول التسويق الرقمي...",
    experience: 3,
    education: "بكالوريوس تسويق",
    skills: [
      "التسويق الرقمي",
      "وسائل التواصل الاجتماعي",
      "Google Analytics",
      "SEO",
    ],
  },
  {
    id: "APP007",
    name: "عبدالله الشمري",
    email: "abdullah@example.com",
    phone: "+380 50 789 0123",
    jobId: "JOB001",
    jobTitle: "مدير مبيعات",
    applyDate: "2024-07-10",
    status: "hired",
    resumeUrl: "#",
    coverLetter: "أنا مهتم بالانضمام إلى فريقكم كمدير مبيعات...",
    experience: 8,
    education: "ماجستير إدارة أعمال",
    skills: ["إدارة المبيعات", "القيادة", "التفاوض", "تطوير الأعمال"],
    interviewDate: "2024-07-20",
    notes: "تم تعيينه بعد مقابلة ممتازة وتوصيات قوية",
    rating: 5,
  },
  {
    id: "APP008",
    name: "منى القحطاني",
    email: "mona@example.com",
    phone: "+380 50 890 1234",
    jobId: "JOB006",
    jobTitle: "مساعد إداري",
    applyDate: "2024-07-21",
    status: "new",
    resumeUrl: "#",
    experience: 2,
    education: "دبلوم إدارة أعمال",
    skills: ["Microsoft Office", "إدارة المكاتب", "التنظيم"],
  },
];

// مكون إدارة التوظيف
const RecruitmentManagement: React.FC = () => {
  const [jobVacancies, setJobVacancies] =
    useState<JobVacancy[]>(jobVacanciesData);
  const [jobApplicants, setJobApplicants] =
    useState<JobApplicant[]>(jobApplicantsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);
  const [selectedApplicant, setSelectedApplicant] =
    useState<JobApplicant | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicantDetails, setShowApplicantDetails] = useState(false);
  const [showNewJobDialog, setShowNewJobDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies");

  // الأقسام المتاحة
  const departments = Array.from(
    new Set(jobVacancies.map((job) => job.department)),
  );

  // تصفية الوظائف الشاغرة
  const filteredJobs = jobVacancies.filter((job) => {
    const matchesSearch = searchTerm
      ? job.title.includes(searchTerm) ||
        job.id.includes(searchTerm) ||
        job.department.includes(searchTerm)
      : true;

    const matchesDepartment =
      filterDepartment === "all" || job.department === filterDepartment;

    const matchesStatus = filterStatus === "all" || job.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // تصفية المتقدمين للوظائف
  const filteredApplicants = jobApplicants.filter((applicant) => {
    const matchesSearch = searchTerm
      ? applicant.name.includes(searchTerm) ||
        applicant.jobTitle.includes(searchTerm) ||
        applicant.email.includes(searchTerm)
      : true;

    const matchesStatus =
      filterStatus === "all" || applicant.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // عرض تفاصيل الوظيفة
  const handleViewJob = (job: JobVacancy) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  // عرض تفاصيل المتقدم
  const handleViewApplicant = (applicant: JobApplicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantDetails(true);
  };

  // الحصول على لون حالة الوظيفة
  const getJobStatusColor = (status: JobVacancy["status"]): string => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "onHold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على اسم حالة الوظيفة بالعربية
  const getJobStatusName = (status: JobVacancy["status"]): string => {
    switch (status) {
      case "open":
        return "مفتوحة";
      case "closed":
        return "مغلقة";
      case "onHold":
        return "معلقة";
      default:
        return "";
    }
  };

  // الحصول على لون حالة المتقدم
  const getApplicantStatusColor = (status: JobApplicant["status"]): string => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-purple-100 text-purple-800";
      case "interviewed":
        return "bg-yellow-100 text-yellow-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على اسم حالة المتقدم بالعربية
  const getApplicantStatusName = (status: JobApplicant["status"]): string => {
    switch (status) {
      case "new":
        return "جديد";
      case "reviewing":
        return "قيد المراجعة";
      case "interviewed":
        return "تمت المقابلة";
      case "shortlisted":
        return "في القائمة المختصرة";
      case "rejected":
        return "مرفوض";
      case "hired":
        return "تم التعيين";
      default:
        return "";
    }
  };

  // الحصول على اسم نوع الوظيفة بالعربية
  const getJobTypeName = (type: JobVacancy["type"]): string => {
    switch (type) {
      case "fullTime":
        return "دوام كامل";
      case "partTime":
        return "دوام جزئي";
      case "contract":
        return "عقد";
      case "remote":
        return "عن بعد";
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
  const formatSalary = (min: number, max: number): string => {
    return `${min.toLocaleString()} - ${max.toLocaleString()} ₴`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">نظام إدارة التوظيف</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
          <Button size="sm" variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vacancies">الوظائف الشاغرة</TabsTrigger>
          <TabsTrigger value="applicants">المتقدمين للوظائف</TabsTrigger>
        </TabsList>

        {/* قسم الوظائف الشاغرة */}
        <TabsContent value="vacancies" className="space-y-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="بحث عن وظيفة..."
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
                      <option value="open">مفتوحة</option>
                      <option value="closed">مغلقة</option>
                      <option value="onHold">معلقة</option>
                    </select>
                  </div>

                  <Button onClick={() => setShowNewJobDialog(true)}>
                    <Plus className="ml-1 h-4 w-4" />
                    إضافة وظيفة
                  </Button>
                </div>
              </div>

              {/* جدول الوظائف الشاغرة */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رمز الوظيفة</TableHead>
                      <TableHead>المسمى الوظيفي</TableHead>
                      <TableHead>القسم</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>نوع الوظيفة</TableHead>
                      <TableHead>الراتب</TableHead>
                      <TableHead>تاريخ النشر</TableHead>
                      <TableHead>تاريخ الإغلاق</TableHead>
                      <TableHead>المتقدمين</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Briefcase className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا توجد وظائف شاغرة مطابقة للبحث</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">
                            {job.id}
                          </TableCell>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.department}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{getJobTypeName(job.type)}</TableCell>
                          <TableCell>
                            {formatSalary(job.salary.min, job.salary.max)}
                          </TableCell>
                          <TableCell>{formatDate(job.postedDate)}</TableCell>
                          <TableCell>{formatDate(job.closingDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span>{job.applicantsCount}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getJobStatusColor(job.status)}
                              variant="outline"
                            >
                              {getJobStatusName(job.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewJob(job)}
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

          {/* إحصائيات الوظائف */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الوظائف
                    </p>
                    <p className="text-2xl font-bold">{jobVacancies.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الوظائف المفتوحة
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        jobVacancies.filter((job) => job.status === "open")
                          .length
                      }
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الوظائف المغلقة
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        jobVacancies.filter((job) => job.status === "closed")
                          .length
                      }
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المتقدمين
                    </p>
                    <p className="text-2xl font-bold">{jobApplicants.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* قسم المتقدمين للوظائف */}
        <TabsContent value="applicants" className="space-y-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="بحث عن متقدم..."
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
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="new">جديد</option>
                      <option value="reviewing">قيد المراجعة</option>
                      <option value="interviewed">تمت المقابلة</option>
                      <option value="shortlisted">في القائمة المختصرة</option>
                      <option value="rejected">مرفوض</option>
                      <option value="hired">تم التعيين</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* جدول المتقدمين للوظائف */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>الوظيفة</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>رقم الهاتف</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplicants.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Users className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا يوجد متقدمين مطابقين للبحث</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredApplicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell className="font-medium">
                            {applicant.id}
                          </TableCell>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.jobTitle}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>{applicant.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{applicant.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{formatDate(applicant.applyDate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{applicant.experience} سنوات</TableCell>
                          <TableCell>
                            <Badge
                              className={getApplicantStatusColor(
                                applicant.status,
                              )}
                              variant="outline"
                            >
                              {getApplicantStatusName(applicant.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewApplicant(applicant)}
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

          {/* إحصائيات المتقدمين */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">جديد</p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter((app) => app.status === "new")
                          .length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      قيد المراجعة
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter(
                          (app) => app.status === "reviewing",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      تمت المقابلة
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter(
                          (app) => app.status === "interviewed",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      القائمة المختصرة
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter(
                          (app) => app.status === "shortlisted",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">مرفوض</p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter((app) => app.status === "rejected")
                          .length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">تم التعيين</p>
                    <p className="text-2xl font-bold">
                      {
                        jobApplicants.filter((app) => app.status === "hired")
                          .length
                      }
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* حوار تفاصيل الوظيفة */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الوظيفة</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                  <p className="text-muted-foreground">
                    {selectedJob.department} - {selectedJob.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">
                      {getJobTypeName(selectedJob.type)}
                    </Badge>
                    <Badge
                      className={getJobStatusColor(selectedJob.status)}
                      variant="outline"
                    >
                      {getJobStatusName(selectedJob.status)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">الراتب</p>
                  <p className="font-medium">
                    {formatSalary(
                      selectedJob.salary.min,
                      selectedJob.salary.max,
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ النشر</p>
                  <p className="font-medium">
                    {formatDate(selectedJob.postedDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ الإغلاق</p>
                  <p className="font-medium">
                    {formatDate(selectedJob.closingDate)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">الوصف الوظيفي</p>
                <p className="text-sm">{selectedJob.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">المتطلبات</p>
                <ul className="list-disc list-inside space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-sm">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">المتقدمين</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedJob.applicantsCount} متقدم</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowJobDetails(false)}
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

      {/* حوار تفاصيل المتقدم */}
      <Dialog
        open={showApplicantDetails}
        onOpenChange={setShowApplicantDetails}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>تفاصيل المتقدم</DialogTitle>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedApplicant.name}
                  </h3>
                  <p className="text-muted-foreground">
                    متقدم لوظيفة: {selectedApplicant.jobTitle}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      className={getApplicantStatusColor(
                        selectedApplicant.status,
                      )}
                      variant="outline"
                    >
                      {getApplicantStatusName(selectedApplicant.status)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                  <p className="font-medium">
                    {formatDate(selectedApplicant.applyDate)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    البريد الإلكتروني
                  </p>
                  <p className="font-medium">{selectedApplicant.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  <p className="font-medium">{selectedApplicant.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الخبرة</p>
                  <p className="font-medium">
                    {selectedApplicant.experience} سنوات
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المؤهل العلمي</p>
                  <p className="font-medium">{selectedApplicant.education}</p>
                </div>
              </div>

              {selectedApplicant.coverLetter && (
                <div>
                  <p className="text-sm font-medium mb-2">خطاب التقديم</p>
                  <p className="text-sm">{selectedApplicant.coverLetter}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">المهارات</p>
                <div className="flex flex-wrap gap-1">
                  {selectedApplicant.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedApplicant.interviewDate && (
                <div>
                  <p className="text-sm font-medium mb-2">تاريخ المقابلة</p>
                  <p className="font-medium">
                    {formatDate(selectedApplicant.interviewDate)}
                  </p>
                </div>
              )}

              {selectedApplicant.notes && (
                <div>
                  <p className="text-sm font-medium mb-2">ملاحظات</p>
                  <p className="text-sm">{selectedApplicant.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowApplicantDetails(false)}
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

      {/* حوار إضافة وظيفة جديدة */}
      <Dialog open={showNewJobDialog} onOpenChange={setShowNewJobDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إضافة وظيفة جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل الوظيفة الجديدة. جميع الحقول المميزة بعلامة * إلزامية.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">المسمى الوظيفي *</label>
              <Input placeholder="المسمى الوظيفي" />
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
              <label className="text-sm font-medium">الموقع *</label>
              <Input placeholder="الموقع" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الوظيفة *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الوظيفة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullTime">دوام كامل</SelectItem>
                  <SelectItem value="partTime">دوام جزئي</SelectItem>
                  <SelectItem value="contract">عقد</SelectItem>
                  <SelectItem value="remote">عن بعد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                الحد الأدنى للراتب *
              </label>
              <Input type="number" placeholder="الحد الأدنى للراتب" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                الحد الأعلى للراتب *
              </label>
              <Input type="number" placeholder="الحد الأعلى للراتب" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ النشر *</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الإغلاق *</label>
              <Input type="date" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">الوصف الوظيفي *</label>
              <Input placeholder="الوصف الوظيفي" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">المتطلبات *</label>
              <Input placeholder="المتطلبات (مفصولة بفواصل)" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewJobDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setShowNewJobDialog(false)}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruitmentManagement;
