import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  User,
  DollarSign,
  Target,
  AlertCircle,
  Bell,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Opportunity } from "@/types/crm";
import { opportunities } from "@/data/crmData";
import { customers } from "@/data/crmData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OpportunityPipeline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [showOpportunityDetails, setShowOpportunityDetails] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [showNewOpportunityDialog, setShowNewOpportunityDialog] =
    useState(false);
  const [draggingOpportunity, setDraggingOpportunity] = useState<string | null>(
    null,
  );

  // Filter opportunities based on search term, customer, and stage
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch = searchTerm
      ? opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesCustomer =
      selectedCustomer === "all" || opportunity.customerId === selectedCustomer;

    const matchesStage =
      selectedStage === "all" || opportunity.stage === selectedStage;

    return matchesSearch && matchesCustomer && matchesStage;
  });

  // Group opportunities by stage
  const stageGroups = {
    lead: filteredOpportunities.filter((opp) => opp.stage === "lead"),
    qualified: filteredOpportunities.filter((opp) => opp.stage === "qualified"),
    proposal: filteredOpportunities.filter((opp) => opp.stage === "proposal"),
    negotiation: filteredOpportunities.filter(
      (opp) => opp.stage === "negotiation",
    ),
    closed_won: filteredOpportunities.filter(
      (opp) => opp.stage === "closed_won",
    ),
    closed_lost: filteredOpportunities.filter(
      (opp) => opp.stage === "closed_lost",
    ),
  };

  // Stage names in Arabic
  const stageNames = {
    lead: "مؤهل أولي",
    qualified: "مؤهل",
    proposal: "تقديم عرض",
    negotiation: "تفاوض",
    closed_won: "مغلق (ناجح)",
    closed_lost: "مغلق (خاسر)",
  };

  // Stage colors
  const stageColors = {
    lead: "bg-gray-100",
    qualified: "bg-blue-50",
    proposal: "bg-indigo-50",
    negotiation: "bg-purple-50",
    closed_won: "bg-green-50",
    closed_lost: "bg-red-50",
  };

  // Handle opportunity click
  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowOpportunityDetails(true);
  };

  // Handle drag start
  const handleDragStart = (opportunityId: string) => {
    setDraggingOpportunity(opportunityId);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stage: string) => {
    e.preventDefault();
    if (draggingOpportunity) {
      // In a real application, you would update the opportunity stage in the database
      console.log(
        `Moving opportunity ${draggingOpportunity} to stage ${stage}`,
      );
      setDraggingOpportunity(null);
      // For now, we'll just show an alert
      alert(
        `تم نقل الفرصة إلى مرحلة ${stageNames[stage as keyof typeof stageNames]}`,
      );
    }
  };

  // Calculate total value for each stage
  const stageTotals = {
    lead: stageGroups.lead.reduce((sum, opp) => sum + opp.value, 0),
    qualified: stageGroups.qualified.reduce((sum, opp) => sum + opp.value, 0),
    proposal: stageGroups.proposal.reduce((sum, opp) => sum + opp.value, 0),
    negotiation: stageGroups.negotiation.reduce(
      (sum, opp) => sum + opp.value,
      0,
    ),
    closed_won: stageGroups.closed_won.reduce((sum, opp) => sum + opp.value, 0),
    closed_lost: stageGroups.closed_lost.reduce(
      (sum, opp) => sum + opp.value,
      0,
    ),
  };

  // Calculate weighted value (value * probability)
  const calculateWeightedValue = (opportunity: Opportunity) => {
    return opportunity.value * (opportunity.probability / 100);
  };

  // Get upcoming deadlines (opportunities with close dates in the next 7 days)
  const upcomingDeadlines = filteredOpportunities
    .filter((opp) => {
      const closeDate = new Date(opp.expectedCloseDate);
      const today = new Date();
      const diffTime = closeDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return (
        diffDays >= 0 &&
        diffDays <= 7 &&
        opp.stage !== "closed_won" &&
        opp.stage !== "closed_lost"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.expectedCloseDate).getTime() -
        new Date(b.expectedCloseDate).getTime(),
    );

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث عن فرصة بيعية..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="all">جميع العملاء</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              <option value="all">جميع المراحل</option>
              <option value="lead">مؤهل أولي</option>
              <option value="qualified">مؤهل</option>
              <option value="proposal">تقديم عرض</option>
              <option value="negotiation">تفاوض</option>
              <option value="closed_won">مغلق (ناجح)</option>
              <option value="closed_lost">مغلق (خاسر)</option>
            </select>
          </div>

          <Button onClick={() => setShowNewOpportunityDialog(true)}>
            <Plus className="ml-2 h-4 w-4" />
            فرصة جديدة
          </Button>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 overflow-x-auto">
        {/* Lead Stage */}
        <div
          className={`${stageColors.lead} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "lead")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">مؤهل أولي</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.lead.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.lead.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.lead.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        نقل للمرحلة التالية
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${opportunity.probability}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Qualified Stage */}
        <div
          className={`${stageColors.qualified} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "qualified")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">مؤهل</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.qualified.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.qualified.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.qualified.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        نقل للمرحلة التالية
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        نقل للمرحلة السابقة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${opportunity.probability}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Stage */}
        <div
          className={`${stageColors.proposal} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "proposal")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">تقديم عرض</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.proposal.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.proposal.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.proposal.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        نقل للمرحلة التالية
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        نقل للمرحلة السابقة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${opportunity.probability}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiation Stage */}
        <div
          className={`${stageColors.negotiation} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "negotiation")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">تفاوض</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.negotiation.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.negotiation.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.negotiation.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        إغلاق (ناجح)
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        إغلاق (خاسر)
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        نقل للمرحلة السابقة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${opportunity.probability}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closed Won Stage */}
        <div
          className={`${stageColors.closed_won} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "closed_won")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">مغلق (ناجح)</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.closed_won.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.closed_won.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.closed_won.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        إعادة فتح
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-600 h-1.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closed Lost Stage */}
        <div
          className={`${stageColors.closed_lost} p-4 rounded-lg border shadow-sm`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "closed_lost")}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">مغلق (خاسر)</h3>
            <span className="text-sm text-muted-foreground">
              {stageGroups.closed_lost.length}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {stageTotals.closed_lost.toLocaleString()} ₴
          </div>
          <div className="space-y-3">
            {stageGroups.closed_lost.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white p-3 rounded border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpportunityClick(opportunity)}
                draggable
                onDragStart={() => handleDragStart(opportunity.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{opportunity.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        إعادة فتح
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {opportunity.customerName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.value.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs">
                      {opportunity.expectedCloseDate}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-red-600 h-1.5 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    احتمالية الإغلاق
                  </span>
                  <span className="text-xs font-medium">0%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts and Upcoming Deadlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              التنبيهات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">
                    {upcomingDeadlines.length} فرص بيعية تنتهي خلال الأسبوع
                    القادم
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    {stageGroups.proposal.length} عروض تحتاج إلى متابعة
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    {stageGroups.closed_won.length} فرص تم إغلاقها بنجاح هذا
                    الشهر
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              المواعيد القادمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد مواعيد قريبة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingDeadlines.slice(0, 3).map((opportunity) => {
                  const closeDate = new Date(opportunity.expectedCloseDate);
                  const today = new Date();
                  const diffTime = closeDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  return (
                    <div
                      key={opportunity.id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div>
                        <p className="font-medium">{opportunity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {opportunity.customerName}
                          </span>
                          <span className="text-xs">
                            {
                              stageNames[
                                opportunity.stage as keyof typeof stageNames
                              ]
                            }
                          </span>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${diffDays <= 2 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {diffDays === 0
                            ? "اليوم"
                            : diffDays === 1
                              ? "غداً"
                              : `بعد ${diffDays} أيام`}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {upcomingDeadlines.length > 3 && (
                  <Button variant="outline" className="w-full">
                    عرض الكل ({upcomingDeadlines.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Details Dialog */}
      <Dialog
        open={showOpportunityDetails}
        onOpenChange={setShowOpportunityDetails}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الفرصة البيعية</DialogTitle>
          </DialogHeader>
          {selectedOpportunity && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">عنوان الفرصة</p>
                  <p className="font-medium">{selectedOpportunity.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">العميل</p>
                  <p className="font-medium">
                    {selectedOpportunity.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">القيمة</p>
                  <p className="font-medium">
                    {selectedOpportunity.value.toLocaleString()} ₴
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المرحلة</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${selectedOpportunity.stage === "closed_won" ? "bg-green-100 text-green-800" : selectedOpportunity.stage === "closed_lost" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {
                      stageNames[
                        selectedOpportunity.stage as keyof typeof stageNames
                      ]
                    }
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    احتمالية الإغلاق
                  </p>
                  <p className="font-medium">
                    {selectedOpportunity.probability}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الإغلاق المتوقع
                  </p>
                  <p className="font-medium">
                    {selectedOpportunity.expectedCloseDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المسؤول</p>
                  <p className="font-medium">
                    {selectedOpportunity.assignedTo}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    القيمة المرجحة
                  </p>
                  <p className="font-medium">
                    {calculateWeightedValue(
                      selectedOpportunity,
                    ).toLocaleString()}{" "}
                    ₴
                  </p>
                </div>
              </div>

              {selectedOpportunity.description && (
                <div>
                  <p className="text-sm text-muted-foreground">الوصف</p>
                  <p className="mt-1">{selectedOpportunity.description}</p>
                </div>
              )}

              {selectedOpportunity.products &&
                selectedOpportunity.products.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      المنتجات
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.products.map((product, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOpportunityDetails(false)}
                >
                  إغلاق
                </Button>
                <Button>
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Opportunity Dialog */}
      <Dialog
        open={showNewOpportunityDialog}
        onOpenChange={setShowNewOpportunityDialog}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إضافة فرصة بيعية جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان الفرصة</label>
                <Input placeholder="عنوان الفرصة" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">العميل</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر العميل</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">القيمة</label>
                <Input type="number" placeholder="القيمة" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المرحلة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="lead">مؤهل أولي</option>
                  <option value="qualified">مؤهل</option>
                  <option value="proposal">تقديم عرض</option>
                  <option value="negotiation">تفاوض</option>
                  <option value="closed_won">مغلق (ناجح)</option>
                  <option value="closed_lost">مغلق (خاسر)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  احتمالية الإغلاق (%)
                </label>
                <Input
                  type="number"
                  placeholder="احتمالية الإغلاق"
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  تاريخ الإغلاق المتوقع
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المسؤول</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="أحمد محمد">أحمد محمد</option>
                  <option value="سارة أحمد">سارة أحمد</option>
                  <option value="محمد علي">محمد علي</option>
                  <option value="خالد عبدالله">خالد عبدالله</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Textarea placeholder="وصف الفرصة البيعية" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">المنتجات</label>
                <Input placeholder="أدخل المنتجات مفصولة بفواصل" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewOpportunityDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewOpportunityDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunityPipeline;
