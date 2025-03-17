import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, Calendar, Users, DollarSign, Filter, ArrowUpDown } from "lucide-react";
import { projects } from "@/data/projectsData";
import { ProjectStatus, ProjectPriority } from "@/types/projects";

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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ar-SA");
};

const ProjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewType, setViewType] = useState<string>("grid");

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "startDate":
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case "endDate":
          comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
        case "budget":
          comparison = a.budget - b.budget;
          break;
        case "progress":
          comparison = a.progress - b.progress;
          break;
        case "priority":
          const priorityOrder = { [ProjectPriority.LOW]: 1, [ProjectPriority.MEDIUM]: 2, [ProjectPriority.HIGH]: 3, [ProjectPriority.URGENT]: 4 };
          comparison = (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6 bg-white rounded-lg" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">المشاريع</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4 ml-2" />
          مشروع جديد
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="بحث عن مشروع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value={ProjectStatus.PLANNING}>التخطيط</SelectItem>
                <SelectItem value={ProjectStatus.IN_PROGRESS}>قيد التنفيذ</SelectItem>
                <SelectItem value={ProjectStatus.ON_HOLD}>معلق</SelectItem>
                <SelectItem value={ProjectStatus.COMPLETED}>مكتمل</SelectItem>
                <SelectItem value={ProjectStatus.CANCELLED}>ملغي</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value={ProjectPriority.LOW}>منخفضة</SelectItem>
                <SelectItem value={ProjectPriority.MEDIUM}>متوسطة</SelectItem>
                <SelectItem value={ProjectPriority.HIGH}>عالية</SelectItem>
                <SelectItem value={ProjectPriority.URGENT}>عاجلة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {filteredProjects.length} مشروع
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">ترتيب حسب:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">الاسم</SelectItem>
                  <SelectItem value="startDate">تاريخ البدء</SelectItem>
                  <SelectItem value="endDate">تاريخ الانتهاء</SelectItem>
                  <SelectItem value="budget">الميزانية</SelectItem>
                  <SelectItem value="progress">التقدم</SelectItem>
                  <SelectItem value="priority">الأولوية</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
                <ArrowUpDown className={`h-4 w-4 ${sortOrder === "asc" ? "" : "transform rotate-180"}`} />
              </Button>
            </div>
            
            <Tabs value={viewType} onValueChange={setViewType} className="w-auto">
              <TabsList className="h-8">
                <TabsTrigger value="grid" className="px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="list" className="px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      <TabsContent value="grid" className="p-0 mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={statusColors[project.status]}>
                    {project.status === ProjectStatus.PLANNING ? "التخطيط" :
                     project.status === ProjectStatus.IN_PROGRESS ? "قيد التنفيذ" :
                     project.status === ProjectStatus.ON_HOLD ? "معلق" :
                     project.status === ProjectStatus.COMPLETED ? "مكتمل" : "ملغي"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{project.code}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm line-clamp-2">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">تاريخ الانتهاء</p>
                      <p>{formatDate(project.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 ml-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">المدير</p>
                      <p>{project.managerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 ml-2 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">الميزانية</p>
                      <p>{formatCurrency(project.budget)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">الأولو