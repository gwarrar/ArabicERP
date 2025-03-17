import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Calendar,
  Users,
  DollarSign,
  Clock,
  BarChart2,
  AlertTriangle,
} from "lucide-react";
import {
  projects,
  projectTasks,
  projectMilestones,
  projectRisks,
} from "@/data/projectsData";
import {
  ProjectStatus,
  ProjectPriority,
  TaskStatus,
  MilestoneStatus,
  RiskStatus,
} from "@/types/projects";

const statusColors = {
  [ProjectStatus.PLANNING]: "bg-blue-100 text-blue-800",
  [ProjectStatus.IN_PROGRESS]: "bg-amber-100 text-amber-800",
  [ProjectStatus.ON_HOLD]: "bg-purple-100 text-purple-800",
  [ProjectStatus.COMPLETED]: "bg-green-100 text-green-800",
  [ProjectStatus.CANCELLED]: "bg-red-100 text-red-800",
};

const priorityColors = {
  [ProjectPriority.LOW]: "bg-blue-100 text-blue-800",
  [ProjectPriority.MEDIUM]: "bg-amber-100 text-amber-800",
  [ProjectPriority.HIGH]: "bg-orange-100 text-orange-800",
  [ProjectPriority.URGENT]: "bg-red-100 text-red-800",
};

const taskStatusColors = {
  [TaskStatus.TODO]: "bg-gray-100 text-gray-800",
  [TaskStatus.IN_PROGRESS]: "bg-amber-100 text-amber-800",
  [TaskStatus.REVIEW]: "bg-purple-100 text-purple-800",
  [TaskStatus.DONE]: "bg-green-100 text-green-800",
  [TaskStatus.CANCELLED]: "bg-red-100 text-red-800",
};

const milestoneStatusColors = {
  [MilestoneStatus.PENDING]: "bg-blue-100 text-blue-800",
  [MilestoneStatus.COMPLETED]: "bg-green-100 text-green-800",
  [MilestoneStatus.DELAYED]: "bg-amber-100 text-amber-800",
  [MilestoneStatus.CANCELLED]: "bg-red-100 text-red-800",
};

const riskStatusColors = {
  [RiskStatus.IDENTIFIED]: "bg-blue-100 text-blue-800",
  [RiskStatus.MONITORED]: "bg-amber-100 text-amber-800",
  [RiskStatus.MITIGATED]: "bg-green-100 text-green-800",
  [RiskStatus.OCCURRED]: "bg-red-100 text-red-800",
  [RiskStatus.CLOSED]: "bg-gray-100 text-gray-800",
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ar-SA");
};

const ProjectDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate summary statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(
    (p) => p.status === ProjectStatus.IN_PROGRESS,
  ).length;
  const completedProjects = projects.filter(
    (p) => p.status === ProjectStatus.COMPLETED,
  ).length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalActualCost = projects.reduce((sum, p) => sum + p.actualCost, 0);

  // Get upcoming milestones
  const upcomingMilestones = projectMilestones
    .filter((m) => m.status === MilestoneStatus.PENDING)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  // Get active tasks
  const activeTasks = projectTasks
    .filter((t) => t.status === TaskStatus.IN_PROGRESS)
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    )
    .slice(0, 5);

  // Get high priority risks
  const highPriorityRisks = projectRisks
    .filter(
      (r) =>
        r.status !== RiskStatus.CLOSED && r.status !== RiskStatus.MITIGATED,
    )
    .sort((a, b) => {
      const riskScoreA = getRiskScore(a.probability, a.impact);
      const riskScoreB = getRiskScore(b.probability, b.impact);
      return riskScoreB - riskScoreA;
    })
    .slice(0, 5);

  function getRiskScore(probability: string, impact: string) {
    const probabilityScore = {
      low: 1,
      medium: 2,
      high: 3,
      very_high: 4,
    };

    const impactScore = {
      low: 1,
      medium: 2,
      high: 3,
      severe: 4,
    };

    return (
      (probabilityScore[probability as keyof typeof probabilityScore] || 0) *
      (impactScore[impact as keyof typeof impactScore] || 0)
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المشاريع</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 ml-2" />
          مشروع جديد
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="p-2 rounded-full bg-blue-100 ml-4">
              <BarChart2 className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">إجمالي المشاريع</p>
              <h3 className="text-2xl font-bold">{totalProjects}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="p-2 rounded-full bg-amber-100 ml-4">
              <Clock className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">المشاريع النشطة</p>
              <h3 className="text-2xl font-bold">{activeProjects}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="p-2 rounded-full bg-green-100 ml-4">
              <DollarSign className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">إجمالي الميزانية</p>
              <h3 className="text-xl font-bold">
                {formatCurrency(totalBudget)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="p-2 rounded-full bg-purple-100 ml-4">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">المشاريع المكتملة</p>
              <h3 className="text-2xl font-bold">{completedProjects}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="active-projects">المشاريع النشطة</TabsTrigger>
          <TabsTrigger value="milestones">المعالم</TabsTrigger>
          <TabsTrigger value="tasks">المهام</TabsTrigger>
          <TabsTrigger value="risks">المخاطر</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Project Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقدم المشاريع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <Badge className={statusColors[project.status]}>
                        {project.status === ProjectStatus.PLANNING
                          ? "التخطيط"
                          : project.status === ProjectStatus.IN_PROGRESS
                            ? "قيد التنفيذ"
                            : project.status === ProjectStatus.ON_HOLD
                              ? "معلق"
                              : project.status === ProjectStatus.COMPLETED
                                ? "مكتمل"
                                : "ملغي"}
                      </Badge>
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">المعالم القادمة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMilestones.map((milestone) => {
                  const project = projects.find(
                    (p) => p.id === milestone.projectId,
                  );
                  return (
                    <div key={milestone.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{milestone.name}</h4>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge
                          className={milestoneStatusColors[milestone.status]}
                        >
                          {milestone.status === MilestoneStatus.PENDING
                            ? "قيد الانتظار"
                            : milestone.status === MilestoneStatus.COMPLETED
                              ? "مكتمل"
                              : milestone.status === MilestoneStatus.DELAYED
                                ? "متأخر"
                                : "ملغي"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 ml-1" />
                        <span>
                          تاريخ الاستحقاق: {formatDate(milestone.dueDate)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Active Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">المهام النشطة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.projectId);
                  return (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{task.name}</h4>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge className={taskStatusColors[task.status]}>
                          {task.status === TaskStatus.TODO
                            ? "للتنفيذ"
                            : task.status === TaskStatus.IN_PROGRESS
                              ? "قيد التنفيذ"
                              : task.status === TaskStatus.REVIEW
                                ? "قيد المراجعة"
                                : task.status === TaskStatus.DONE
                                  ? "منجز"
                                  : "ملغي"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>{formatDate(task.endDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm ml-2">{task.progress}%</span>
                          <Progress
                            value={task.progress}
                            className="h-2 w-20"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* High Priority Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  المخاطر ذات الأولوية العالية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {highPriorityRisks.map((risk) => {
                  const project = projects.find((p) => p.id === risk.projectId);
                  return (
                    <div key={risk.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{risk.name}</h4>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge className={riskStatusColors[risk.status]}>
                          {risk.status === RiskStatus.IDENTIFIED
                            ? "محدد"
                            : risk.status === RiskStatus.MONITORED
                              ? "قيد المراقبة"
                              : risk.status === RiskStatus.MITIGATED
                                ? "تم التخفيف"
                                : risk.status === RiskStatus.OCCURRED
                                  ? "حدث"
                                  : "مغلق"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
                        <span>
                          الاحتمالية:{" "}
                          {risk.probability === "low"
                            ? "منخفضة"
                            : risk.probability === "medium"
                              ? "متوسطة"
                              : risk.probability === "high"
                                ? "عالية"
                                : "عالية جداً"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                          التأثير:{" "}
                          {risk.impact === "low"
                            ? "منخفض"
                            : risk.impact === "medium"
                              ? "متوسط"
                              : risk.impact === "high"
                                ? "عالي"
                                : "شديد"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Active Projects Tab */}
        <TabsContent value="active-projects">
          <Card>
            <CardHeader>
              <CardTitle>المشاريع النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects
                  .filter((p) => p.status === ProjectStatus.IN_PROGRESS)
                  .map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {project.code}
                          </p>
                        </div>
                        <Badge className={priorityColors[project.priority]}>
                          {project.priority === ProjectPriority.LOW
                            ? "منخفضة"
                            : project.priority === ProjectPriority.MEDIUM
                              ? "متوسطة"
                              : project.priority === ProjectPriority.HIGH
                                ? "عالية"
                                : "عاجلة"}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{project.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">تاريخ البدء</p>
                          <p className="text-sm font-medium">
                            {formatDate(project.startDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            تاريخ الانتهاء
                          </p>
                          <p className="text-sm font-medium">
                            {formatDate(project.endDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">الميزانية</p>
                          <p className="text-sm font-medium">
                            {formatCurrency(project.budget)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            التكلفة الفعلية
                          </p>
                          <p className="text-sm font-medium">
                            {formatCurrency(project.actualCost)}
                          </p>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">التقدم</span>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2 space-x-reverse">
                          {project.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>معالم المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectMilestones.map((milestone) => {
                  const project = projects.find(
                    (p) => p.id === milestone.projectId,
                  );
                  return (
                    <div key={milestone.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium">
                            {milestone.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge
                          className={milestoneStatusColors[milestone.status]}
                        >
                          {milestone.status === MilestoneStatus.PENDING
                            ? "قيد الانتظار"
                            : milestone.status === MilestoneStatus.COMPLETED
                              ? "مكتمل"
                              : milestone.status === MilestoneStatus.DELAYED
                                ? "متأخر"
                                : "ملغي"}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{milestone.description}</p>

                      <div className="mb-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>
                            تاريخ الاستحقاق: {formatDate(milestone.dueDate)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2">المخرجات:</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mr-4">
                          {milestone.deliverables.map((deliverable, index) => (
                            <li key={index}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>مهام المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectTasks.map((task) => {
                  const project = projects.find((p) => p.id === task.projectId);
                  return (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium">{task.name}</h3>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge className={taskStatusColors[task.status]}>
                          {task.status === TaskStatus.TODO
                            ? "للتنفيذ"
                            : task.status === TaskStatus.IN_PROGRESS
                              ? "قيد التنفيذ"
                              : task.status === TaskStatus.REVIEW
                                ? "قيد المراجعة"
                                : task.status === TaskStatus.DONE
                                  ? "منجز"
                                  : "ملغي"}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{task.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">تاريخ البدء</p>
                          <p className="text-sm font-medium">
                            {formatDate(task.startDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            تاريخ الانتهاء
                          </p>
                          <p className="text-sm font-medium">
                            {formatDate(task.endDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            الساعات المقدرة
                          </p>
                          <p className="text-sm font-medium">
                            {task.estimatedHours}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            الساعات الفعلية
                          </p>
                          <p className="text-sm font-medium">
                            {task.actualHours}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">التقدم</span>
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">المكلفين:</p>
                        <div className="flex flex-wrap gap-2">
                          {task.assignedToNames.map((name, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2 space-x-reverse">
                          {task.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>مخاطر المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectRisks.map((risk) => {
                  const project = projects.find((p) => p.id === risk.projectId);
                  return (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium">{risk.name}</h3>
                          <p className="text-sm text-gray-500">
                            {project?.name}
                          </p>
                        </div>
                        <Badge className={riskStatusColors[risk.status]}>
                          {risk.status === RiskStatus.IDENTIFIED
                            ? "محدد"
                            : risk.status === RiskStatus.MONITORED
                              ? "قيد المراقبة"
                              : risk.status === RiskStatus.MITIGATED
                                ? "تم التخفيف"
                                : risk.status === RiskStatus.OCCURRED
                                  ? "حدث"
                                  : "مغلق"}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{risk.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">الاحتمالية</p>
                          <p className="text-sm font-medium">
                            {risk.probability === "low"
                              ? "منخفضة"
                              : risk.probability === "medium"
                                ? "متوسطة"
                                : risk.probability === "high"
                                  ? "عالية"
                                  : "عالية جداً"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">التأثير</p>
                          <p className="text-sm font-medium">
                            {risk.impact === "low"
                              ? "منخفض"
                              : risk.impact === "medium"
                                ? "متوسط"
                                : risk.impact === "high"
                                  ? "عالي"
                                  : "شديد"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-gray-500">
                          استراتيجية التخفيف
                        </p>
                        <p className="text-sm">{risk.mitigation}</p>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-gray-500">المسؤول</p>
                        <p className="text-sm">{risk.ownerName}</p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDashboard;
