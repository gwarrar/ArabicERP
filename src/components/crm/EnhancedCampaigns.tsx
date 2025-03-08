import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  Edit,
  Trash,
  Calendar,
  BarChart,
  Users,
  Target,
  Mail,
  MessageSquare,
  Share2,
  FileText,
  Download,
  Filter,
  ChevronDown,
  Check,
  Clock,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Radio,
  Tv,
  Newspaper,
  Megaphone,
  Smartphone,
  Globe,
  DollarSign,
  Percent,
  Copy,
  ExternalLink,
  Printer,
  RefreshCw,
  Zap,
  Award,
  Layers,
  PieChart,
  TrendingUp,
  Clipboard,
  Briefcase,
  UserPlus,
  Bookmark,
  Tag,
  Flag,
  Repeat,
  AlertTriangle,
  Info,
  HelpCircle,
  Settings,
  Save,
  Upload,
  Eye,
  EyeOff,
  Paperclip,
  Image,
  Link,
  Send,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays, addMonths, isBefore, isAfter, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

// Enhanced campaign data with more fields
const campaignsData = [
  {
    id: "1",
    name: "حملة العودة إلى المدارس",
    type: "email",
    status: "active",
    startDate: "2024-08-15",
    endDate: "2024-09-15",
    budget: 5000,
    spent: 2100,
    expectedRevenue: 25000,
    targetAudience: "أولياء الأمور والطلاب",
    description: "حملة ترويجية للمستلزمات المكتبية والأثاث المدرسي",
    channels: ["email", "facebook", "instagram"],
    goals: {
      impressions: 50000,
      clicks: 5000,
      conversions: 500,
      roi: 400
    },
    performance: {
      impressions: 32500,
      clicks: 3200,
      conversions: 320,
      roi: 380
    },
    tags: ["تعليم", "طلاب", "مستلزمات مدرسية"],
    owner: "أحمد محمد",
    createdAt: "2024-07-20",
    updatedAt: "2024-08-01",
    activities: [
      { date: "2024-08-15", type: "email", name: "رسالة الترحيب", status: "completed" },
      { date: "2024-08-22", type: "email", name: "تذكير بالعروض", status: "scheduled" },
      { date: "2024-08-29", type: "email", name: "آخر فرصة", status: "scheduled" }
    ]
  },
  {
    id: "2",
    name: "عروض نهاية العام",
    type: "social",
    status: "scheduled",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    budget: 8000,
    spent: 0,
    expectedRevenue: 40000,
    targetAudience: "جميع العملاء",
    description: "تخفيضات وعروض خاصة بمناسبة نهاية العام",
    channels: ["facebook", "instagram", "twitter", "email"],
    goals: {
      impressions: 100000,
      clicks: 10000,
      conversions: 1000,
      roi: 400
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    },
    tags: ["تخفيضات", "نهاية العام", "هدايا"],
    owner: "سارة أحمد",
    createdAt: "2024-07-15",
    updatedAt: "2024-07-25",
    activities: [
      { date: "2024-12-01", type: "social", name: "إطلاق الحملة", status: "scheduled" },
      { date: "2024-12-10", type: "email", name: "تذكير بالعروض", status: "scheduled" },
      { date: "2024-12-20", type: "social", name: "العد التنازلي", status: "scheduled" }
    ]
  },
  {
    id: "3",
    name: "حملة الشركات الصغيرة",
    type: "email",
    status: "completed",
    startDate: "2024-05-01",
    endDate: "2024-06-15",
    budget: 3500,
    spent: 3500,
    expectedRevenue: 18000,
    actualRevenue: 22000,
    targetAudience: "الشركات الصغيرة والمتوسطة",
    description: "عروض خاصة للشركات الصغيرة والمتوسطة",
    channels: ["email", "linkedin"],
    goals: {
      impressions: 20000,
      clicks: 2000,
      conversions: 200,
      roi: 400
    },
    performance: {
      impressions: 25000,
      clicks: 2800,
      conversions: 310,
      roi: 528
    },
    tags: ["أعمال", "شركات صغيرة", "B2B"],
    owner: "محمد علي",
    createdAt: "2024-04-10",
    updatedAt: "2024-06-20",
    activities: [
      { date: "2024-05-01", type: "email", name: "رسالة الترحيب", status: "completed" },
      { date: "2024-05-15", type: "email", name: "عروض خاصة", status: "completed" },
      { date: "2024-06-01", type: "email", name: "آخر فرصة", status: "completed" }
    ]
  },
  {
    id: "4",
    name: "إطلاق المنتج الجديد",
    type: "event",
    status: "draft",
    startDate: "2024-10-15",
    endDate: "2024-10-15",
    budget: 12000,
    spent: 0,
    expectedRevenue: 60000,
    targetAudience: "العملاء الحاليين والمحتملين",
    description: "حدث إطلاق المنتج الجديد في فندق الريتز",
    channels: ["event", "email", "social", "press"],
    goals: {
      impressions: 80000,
      clicks: 0,
      conversions: 300,
      roi: 400
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    },
    tags: ["إطلاق منتج", "فعالية", "VIP"],
    owner: "خالد عبدالله",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-10",
    activities: [
      { date: "2024-09-15", type: "email", name: "دعوة للحدث", status: "draft" },
      { date: "2024-10-01", type: "email", name: "تذكير بالحدث", status: "draft" },
      { date: "2024-10-15", type: "event", name: "الحدث الرئيسي", status: "draft" },
      { date: "2024-10-20", type: "email", name: "متابعة بعد الحدث", status: "draft" }
    ]
  },
  {
    id: "5",
    name: "حملة رمضان",
    type: "sms",
    status: "cancelled",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    budget: 2500,
    spent: 0,
    expectedRevenue: 15000,
    targetAudience: "جميع العملاء",
    description: "عروض وتخفيضات خاصة بشهر رمضان",
    channels: ["sms", "email", "social"],
    goals: {
      impressions: 40000,
      clicks: 4000,
      conversions: 400,
      roi: 500
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    },
    tags: ["رمضان", "عروض موسمية", "تخفيضات"],
    owner: "سارة أحمد",
    createdAt: "2024-06-15",
    updatedAt: "2024-07-05",
    activities: []
  },
  {
    id: "6",
    name: "حملة الجمعة السوداء",
    type: "multi",
    status: "planned",
    startDate: "2024-11-20",
    endDate: "2024-11-30",
    budget: 15000,
    spent: 0,
    expectedRevenue: 75000,
    targetAudience: "جميع العملاء والعملاء المحتملين",
    description: "تخفيضات ضخمة بمناسبة الجمعة السوداء",
    channels: ["email", "sms", "social", "web", "tv", "radio"],
    goals: {
      impressions: 200000,
      clicks: 20000,
      conversions: 2000,
      roi: 400
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    },
    tags: ["الجمعة السوداء", "تخفيضات", "موسم التسوق"],
    owner: "محمد علي",
    createdAt: "2024-07-25",
    updatedAt: "2024-07-25",
    activities: [
      { date: "2024-11-15", type: "email", name: "إعلان مسبق", status: "planned" },
      { date: "2024-11-20", type: "social", name: "إطلاق الحملة", status: "planned" },
      { date: "2024-11-25", type: "email", name: "تذكير بالعروض", status: "planned" },
      { date: "2024-11-29", type: "sms", name: "آخر فرصة", status: "planned" }
    ]
  },
  {
    id: "7",
    name: "حملة الولاء للعملاء",
    type: "loyalty",
    status: "active",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    budget: 5000,
    spent: 2000,
    expectedRevenue: 30000,
    targetAudience: "العملاء الحاليين",
    description: "برنامج مكافآت للعملاء الدائمين",
    channels: ["email", "app", "web"],
    goals: {
      impressions: 30000,
      clicks: 6000,
      conversions: 1200,
      roi: 500
    },
    performance: {
      impressions: 18000,
      clicks: 3500,
      conversions: 700,
      roi: 420
    },
    tags: ["ولاء", "مكافآت", "عملاء دائمين"],
    owner: "أحمد محمد",
    createdAt: "2024-06-01",
    updatedAt: "2024-07-15",
    activities: [
      { date: "2024-07-01", type: "email", name: "إطلاق البرنامج", status: "completed" },
      { date: "2024-08-01", type: "email", name: "تحديث النقاط", status: "scheduled" },
      { date: "2024-09-01", type: "email", name: "عروض خاصة", status: "scheduled" },
      { date: "2024-10-01", type: "email", name: "تحديث النقاط", status: "scheduled" },
      { date: "2024-11-01", type: "email", name: "عروض خاصة", status: "scheduled" },
      { date: "2024-12-01", type: "email", name: "هدايا نهاية العام", status: "scheduled" }
    ]
  }
];

// Enhanced campaign performance data
const campaignPerformanceData = [
  { name: "الأسبوع 1", مشاهدات: 1200, نقرات: 350, تحويلات: 45, معدل_التحويل: 12.9 },
  { name: "الأسبوع 2", مشاهدات: 1800, نقرات: 520, تحويلات: 68, معدل_التحويل: 13.1 },
  { name: "الأسبوع 3", مشاهدات: 2400, نقرات: 680, تحويلات: 92, معدل_التحويل: 13.5 },
  { name: "الأسبوع 4", مشاهدات: 3000, نقرات: 820, تحويلات: 120, معدل_التحويل: 14.6 },
];

// Enhanced campaign channel distribution data
const channelDistributionData = [
  { name: "البريد الإلكتروني", value: 40, color: "#0088FE" },
  { name: "وسائل التواصل", value: 30, color: "#00C49F" },
  { name: "الرسائل النصية", value: 15, color: "#FFBB28" },
  { name: "الفعاليات", value: 10, color: "#FF8042" },
  { name: "الإعلانات المدفوعة", value: 5, color: "#8884d8" },
];

// Campaign ROI comparison data
const campaignROIData = [
  { name: "حملة العودة إلى المدارس", roi: 380 },
  { name: "حملة الشركات الصغيرة", roi: 528 },
  { name: "حملة الولاء للعملاء", roi: 420 },
  { name: "عروض نهاية العام", roi: 0 },
  { name: "إطلاق المنتج الجديد", roi: 0 },
];

// Campaign audience demographics data
const audienceDemographicsData = [
  { subject: "18-24", A: 120, B: 110, fullMark: 150 },
  { subject: "25-34", A: 98, B: 130, fullMark: 150 },
  { subject: "35-44", A: 86, B: 130, fullMark: 150 },
  { subject: "45-54", A: 99, B: 100, fullMark: 150 },
  { subject: "55-64", A: 85, B: 90, fullMark: 150 },
  { subject: "65+", A: 65, B: 85, fullMark: 150 },
];

// Campaign templates data
const campaignTemplates = [
  {
    id: "template1",
    name: "حملة ترويجية للمنتج الجديد",
    type: "email",
    description: "قالب جاهز لإطلاق منتج جديد مع سلسلة من رسائل البريد الإلكتروني",
    channels: ["email", "social", "web"],
    duration: 30,
    activities: 5
  },
  {
    id: "template2",
    name: "حملة المناسبات الموسمية",
    type: "multi",
    description: "قالب للحملات الموسمية مثل رمضان، العيد، العودة للمدارس",
    channels: ["email", "sms", "social"],
    duration: 21,
    activities: 7
  },
  {
    id: "template3",
    name: "حملة استعادة العملاء",
    type: "email",
    description: "سلسلة رسائل لاستعادة العملاء غير النشطين",
    channels: ["email", "sms"],
    duration: 14,
    activities: 3
  },
  {
    id: "template4",
    name: "حملة الولاء والمكافآت",
    type: "loyalty",
    description: "برنامج مكافآت للعملاء الدائمين",
    channels: ["email", "app", "web"],
    duration: 90,
    activities: 6
  },
  {
    id: "template5",
    name: "حملة التخفيضات الكبرى",
    type: "multi",
    description: "قالب للتخفيضات الكبرى مثل الجمعة السوداء",
    channels: ["email", "sms", "social", "web", "tv"],
    duration: 10,
    activities: 8
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const EnhancedCampaigns = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [campaignType, setCampaignType] = useState("all");
  const [campaignStatus, setCampaignStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignFormData, setCampaignFormData] = useState({
    name: "",
    type: "email",
    startDate: null,
    endDate: null,
    budget: "",
    expectedRevenue: "",
    targetAudience: "",
    description: "",
    channels: ["email"],
    goals: {
      impressions: "",
      clicks: "",
      conversions: "",
      roi: ""
    },
    tags: ""
  });
  const [calendarView, setCalendarView] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { toast } = useToast();

  // Filter campaigns based on search, type, status, and date range
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      (campaign.description && campaign.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (campaign.tags && campaign.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesType =
      campaignType === "all" || campaign.type === campaignType;
    
    const matchesStatus =
      campaignStatus === "all" || campaign.status === campaignStatus;
    
    let matchesDateRange = true;
    if (startDate && endDate) {
      const campaignStart = parseISO(campaign.startDate);
      const campaignEnd = parseISO(campaign.endDate);
      matchesDateRange = 
        (isAfter(campaignStart, startDate) || isSameDay(campaignStart, startDate)) && 
        (isBefore(campaignEnd, endDate) || isSameDay(campaignEnd, endDate));
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  // Handle campaign selection for details view
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignDetails(true);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Pre-fill campaign form with template data
    setCampaignFormData({
      ...campaignFormData,
      name: "",
      type: template.type,
      channels: template.channels,
      description: "",
    });
    setShowTemplateGallery(false);
    toast({
      title: "تم اختيار القالب",
      description: `تم اختيار قالب "${template.name}" بنجاح. يمكنك الآن تخصيص الحملة.`,
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "scheduled":
        return "مجدولة";
      case "planned":
        return "مخططة";
      case "completed":
        return "مكتملة";
      case "draft":
        return "مسودة";
      case "cancelled":
        return "ملغاة";
      default:
        return status;
    }
  };

  // Get campaign type icon
  const getCampaignTypeIcon = (type) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "social":
        return <Share2 className="h-4 w-4 text-green-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      case "multi":
        return <Layers className="h-4 w-4 text-indigo-500" />;
      case "loyalty":
        return <Award className="h-4 w-4 text-pink-500" />;
      case "print":
        return <Newspaper className="h-4 w-4 text-gray-500" />;
      case "tv":
        return <Tv className="h-4 w-4 text-red-500" />;
      case "radio":
        return <Radio className="h-4 w-4 text-yellow-500" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  // Get campaign type text in Arabic
  const getCampaignTypeText = (type) => {
    switch (type) {
      case "email":
        return "بريد إلكتروني";
      case "sms":
        return "رسائل نصية";
      case "social":
        return "وسائل التواصل";
      case "event":
        return "فعالية";
      case "multi":
        return "متعددة القنوات";
      case "loyalty":
        return "برنامج ولاء";
      case "print":
        return "مطبوعات";
      case "tv":
        return "إعلانات تلفزيونية";
      case "radio":
        return "إعلانات إذاعية";
      case "other":
        return "أخرى";
      default:
        return type;
    }
  };

  // Get channel icon
  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />;
      case "web":
        return <Globe className="h-4 w-4 text-green-500" />;
      case "app":
        return <Smartphone className="h-4 w-4 text-indigo-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      case "tv":
        return <Tv className="h-4 w-4 text-red-500" />;
      case "radio":
        return <Radio className="h-4 w-4 text-yellow-500" />;
      case "print":
        return <Newspaper className="h-4 w-4 text-gray-500" />;
      case "press":
        return <FileText className="h-4 w-4 text-teal-500" />;
      case "social":
        return <Share2 className="h-4 w-4 text-green-500" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignFormData({
      ...campaignFormData,
      [name]: value
    });
  };

  // Handle nested form input change (for goals)
  const handleNestedInputChange = (e, parent) => {
    const { name, value } = e.target;
    setCampaignFormData({
      ...campaignFormData,
      [parent]: {
        ...campaignFormData[parent],
        [name]: value
      }
    });
  };

  // Handle channel selection
  const handleChannelToggle = (channel) => {
    const currentChannels = [...campaignFormData.channels];
    if (currentChannels.includes(channel)) {
      setCampaignFormData({
        ...campaignFormData,
        channels: currentChannels.filter(c => c !== channel)
      });
    } else {
      setCampaignFormData({
        ...campaignFormData,
        channels: [...currentChannels, channel]
      });
    }
  };

  // Validate campaign form
  const validateCampaignForm = () => {
    const errors = {};
    if (!campaignFormData.name.trim()) errors.name = "اسم الحملة مطلوب";
    if (!campaignFormData.startDate) errors.startDate = "تاريخ البدء مطلوب";
    if (!campaignFormData.endDate) errors.endDate = "تاريخ الانتهاء مطلوب";
    if (!campaignFormData.budget.trim()) errors.budget = "الميزانية مطلوبة";
    if (campaignFormData.channels.length === 0) errors.channels = "يجب اختيار قناة واحدة على الأقل";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle campaign submission
  const handleSubmitCampaign = () => {
    if (!validateCampaignForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowAddCampaign(false);
      toast({
        title: "تم إنشاء الحملة",
        description: "تم إنشاء الحملة التسويقية بنجاح",
      });
      
      // Reset form
      setCampaignFormData({
        name: "",
        type: "email",
        startDate: null,
        endDate: null,
        budget: "",
        expectedRevenue: "",
        targetAudience: "",
        description: "",
        channels: ["email"],
        goals: {
          impressions: "",
          clicks: "",
          conversions: "",
          roi: ""
        },
        tags: ""
      });
    }, 1500);
  };

  // Get campaign activities for calendar
  const getCampaignActivities = () => {
    const activities = [];
    campaignsData.forEach(campaign => {
      if (campaign.activities && campaign.activities.length > 0) {
        campaign.activities.forEach(activity => {
          activities.push({
            ...activity,
            campaignId: campaign.id,
            campaignName: campaign.name,
            campaignType: campaign.type
          });
        });
      }
    });
    return activities;
  };

  // Group activities by date for calendar view
  const getActivitiesByDate = () => {
    const activities = getCampaignActivities();
    const groupedActivities = {};
    
    activities.forEach(activity => {
      const date = activity.date;
      if (!groupedActivities[date]) {
        groupedActivities[date] = [];
      }
      groupedActivities[date].push(activity);
    });
    
    return groupedActivities;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const days = [];
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(today.getFullYear(), today.getMonth(), i));
    }
    
    return days;
  };

  // Get activities for a specific date
  const getActivitiesForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const activitiesByDate = getActivitiesByDate();
    return activitiesByDate[formattedDate] || [];
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">
            <FileText className="h-4 w-4 ml-2" />
            قائمة الحملات
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 ml-2" />
            تقويم الحملات
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 ml-2" />
            تحليل الأداء
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Clipboard className="h-4 w-4 ml-2" />
            قوالب الحملات
          </TabsTrigger>
        </TabsList>

        {/* Campaigns List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن حملة..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Filter className="h-4 w-4 ml-2" />
                      تصفية
                      <ChevronDown className="h-4 w-4 mr-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>نوع الحملة</Label>
                        <Select
                          value={campaignType}
                          onValueChange={setCampaignType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="جميع الأنواع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الأنواع</SelectItem>
                            <SelectItem value="email">بريد إلكتروني</SelectItem>
                            <SelectItem value="sms">رسائل نصية</SelectItem>
                            <SelectItem value="social">وسائل التواصل</SelectItem>
                            <SelectItem value="event">فعالية</SelectItem>
                            <SelectItem value="multi">متعددة القنوات</SelectItem>
                            <SelectItem value="loyalty">برنامج ولاء</SelectItem>
                            <SelectItem value="print">مطبوعات</SelectItem>
                            <SelectItem value="tv">إعلانات تلفزيونية</SelectItem>
                            <SelectItem value="radio">إعلانات إذاعية</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>حالة الحملة</Label>
                        <Select
                          value={campaignStatus}
                          onValueChange={setCampaignStatus}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="جميع الحالات" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الحالات</SelectItem>
                            <SelectItem value="active">نشطة</SelectItem>
                            <SelectItem value="scheduled">مجدولة</SelectItem>
                            <SelectItem value="planned">مخططة</SelectItem>
                            <SelectItem value="completed">مكتملة</SelectItem>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="cancelled">ملغاة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>الفترة الزمنية</Label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-right font-normal"
                              >
                                {startDate ? (
                                  format(startDate, "dd/MM/yyyy")
                                ) : (
                                  <span>تاريخ البدء</span>
                                )}
                                <CalendarIcon className="mr-auto h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-right font-normal"
                              >
                                {endDate ? (
                                  format(endDate, "dd/MM/yyyy")
                                ) : (
                                  <span>تاريخ الانتهاء</span>
                                )}
                                <CalendarIcon className="mr-auto h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCampaignType("all");
                            setCampaignStatus("all");
                            setStartDate(null);
                            setEndDate(null);
                          }}
                        >
                          إعادة تعيين
                        </Button>
                        <Button>
                          <Check className="ml-2 h-4 w-4" />
                          تطبيق
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowTemplateGallery(true)}>
                <Clipboard className="ml-2 h-4 w-4" />
                استخدام قالب
              </Button>
              <Button onClick={() => setShowAddCampaign(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إنشاء حملة جديدة
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الحملة</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ البدء</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>الميزانية</TableHead>
                  <TableHead>الإنفاق</TableHead>
                  <TableHead>الإيرادات المتوقعة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{campaign.name}</span>
                          {campaign.tags && campaign.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {campaign.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getCampaignTypeIcon(campaign.type)}
                          <span>{getCampaignTypeText(campaign.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                            campaign.status,
                          )}`}
                        >
                          {getStatusText(campaign.status)}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(campaign.startDate)}</TableCell>
                      <TableCell>{formatDate(campaign.endDate)}</TableCell>
                      <TableCell>{campaign.budget.toLocaleString()} ₴</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{campaign.spent.toLocaleString()} ₴</span>
                          {campaign.budget > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {campaign.expectedRevenue.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCampaignSelect(campaign)}
                          >
                            <FileText className="h-4 w-4" />
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>لا توجد حملات تطابق معايير البحث</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchQuery("");
                            setCampaignType("all");
                            setCampaignStatus("all");
                            setStartDate(null);
                            setEndDate(null);
                          }}
                        >
                          إعادة تعيين المرشحات
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Campaign Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تقويم الحملات التسويقية</CardTitle>
                <div className="flex gap-2">
                  <Select value={calendarView} onValueChange={setCalendarView}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="اختر العرض" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">يوم</SelectItem>
                      <SelectItem value="week">أسبوع</SelectItem>
                      <SelectItem value="month">شهر</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة نشاط
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day) => (
                    <div key={day} className="bg-white p-2 text-center font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {generateCalendarDays().map((day, index) => {
                    const isToday = isSameDay(day, new Date());
                    const activities = getActivitiesForDate(day);
                    return (
                      <div 
                        key={index} 
                        className={`bg-white p-2 min-h-[100px] ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <div className="text-right text-sm font-medium mb-1">
                          {format(day, "d")}
                        </div>
                        <div className="space-y-1">
                          {activities.map((activity, actIndex) => (
                            <div 
                              key={actIndex} 
                              className={`text-xs p-1 rounded truncate ${activity.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}
                              title={`${activity.name} - ${activity.campaignName}`}
                            >
                              {activity.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>الحملات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "scheduled" || campaign.status === "planned")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {getCampaignTypeText(campaign.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحملات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "active")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)} -{" "}
                            {formatDate(campaign.endDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {campaign.targetAudience}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحملات المكتملة مؤخراً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "completed")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)} -{" "}
                            {formatDate(campaign.endDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <BarChart className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-500">
                              {campaign.actualRevenue
                                ? `الإيرادات: ${campaign.actualRevenue.toLocaleString()} ₴`
                                : "لا توجد بيانات"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaign Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الحملات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+3</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الميزانية الإجمالية
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData
                        .reduce((sum, campaign) => sum + campaign.budget, 0)
                        .toLocaleString()}{" "}
                      ₴
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+15%</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الإنفاق الحالي
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData
                        .reduce((sum, campaign) => sum + campaign.spent, 0)
                        .toLocaleString()}{" "}
                      ₴
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Percent className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>الإنفاق</span>
                    <span>
                      {Math.round(
                        (campaignsData.reduce((sum, campaign) => sum + campaign.spent, 0) /
                          campaignsData.reduce((sum, campaign) => sum + campaign.budget, 0)) *
                          100
                      )}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: `${Math.round(
                          (campaignsData.reduce((sum, campaign) => sum + campaign.spent, 0) /
                            campaignsData.reduce((sum, campaign) => sum + campaign.budget, 0)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الإيرادات المتوقعة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData
                        .reduce(
                          (sum, campaign) => sum + campaign.expectedRevenue,
                          0,
                        )
                        .toLocaleString()}{" "}
                      ₴
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+22%</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء الحملة الحالية</CardTitle>
                <CardDescription>مقارنة المشاهدات والنقرات والتحويلات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="مشاهدات"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="نقرات" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="تحويلات" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الحملات حسب القناة</CardTitle>
                <CardDescription>نسبة استخدام كل قناة في الحملات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={channelDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>مقارنة العائد على الاستثمار (ROI)</CardTitle>
                <CardDescription>مقارنة ROI بين الحملات المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignROIData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="roi" fill="#8884d8" name="العائد على الاستثمار %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التركيبة السكانية للجمهور</CardTitle>
                <CardDescription>مقارنة بين الفئات العمرية المستهدفة والفعلية</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={audienceDemographicsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                      name="المستهدف"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="الفعلي"
                      dataKey="B"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مقارنة أداء الحملات</CardTitle>
              <CardDescription>تحليل مفصل لأداء الحملات النشطة والمكتملة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الحملة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الميزانية</TableHead>
                      <TableHead>الإنفاق</TableHead>
                      <TableHead>الإيرادات المتوقعة</TableHead>
                      <TableHead>الإيرادات الفعلية</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>معدل التحويل</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignsData
                      .filter(
                        (campaign) =>
                          campaign.status === "completed" ||
                          campaign.status === "active",
                      )
                      .map((campaign) => {
                        const actualRevenue = campaign.actualRevenue || 0;
                        const roi =
                          campaign.spent > 0
                            ? ((actualRevenue - campaign.spent) /
                                campaign.spent) *
                              100
                            : 0;
                        const conversionRate = campaign.performance ? 
                          campaign.performance.conversions > 0 && campaign.performance.clicks > 0 ?
                            ((campaign.performance.conversions / campaign.performance.clicks) * 100).toFixed(1) + "%" :
                            "0%" :
                          "N/A";
                        return (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">
                              {campaign.name}
                            </TableCell>
                            <TableCell>
                              {getCampaignTypeText(campaign.type)}
                            </TableCell>
                            <TableCell>
                              {campaign.budget.toLocaleString()} ₴
                            </TableCell>
                            <TableCell>
                              {campaign.spent.toLocaleString()} ₴
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div 
                                  className="bg-blue-600 h-1.5 rounded-full" 
                                  style={{ width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%` }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {campaign.expectedRevenue.toLocaleString()} ₴
                            </TableCell>
                            <TableCell>
                              {actualRevenue
                                ? actualRevenue.toLocaleString() + " ₴"
                                : "جارية"}
                            </TableCell>
                            <TableCell>
                              <span className={roi > 0 ? "text-green-600" : roi < 0 ? "text-red-600" : ""}>
                                {campaign.status === "completed" ? roi.toFixed(1) + "%" : "جارية"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {conversionRate}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                                  campaign.status,
                                )}`}
                              >
                                {getStatusText(campaign.status)}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير التقرير
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaign Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">قوالب الحملات الجاهزة</h3>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              إنشاء قالب جديد
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{template.name}</CardTitle>
                    <Badge variant="outline">{getCampaignTypeText(template.type)}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">المدة:</span>
                      <span>{template.duration} يوم</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">عدد الأنشطة:</span>
                      <span>{template.activities} أنشطة</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">القنوات:</span>
                      <div className="flex gap-1">
                        {template.channels.map((channel, index) => (
                          <div key={index} title={channel}>
                            {getChannelIcon(channel)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="ml-1 h-3 w-3" />
                    معاينة
                  </Button>
                  <Button size="sm" onClick={() => handleTemplateSelect(template)}>
                    <Check className="ml-1 h-3 w-3" />
                    استخدام
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-semibold mb-4">قوالب البريد الإلكتروني</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2"></div>
                <CardHeader>
                  <CardTitle>رسالة ترحيب</CardTitle>
                  <CardDescription>رسالة ترحيب للعملاء الجدد</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-3 bg-gray-50 text-sm">
                    <p>مرحباً [اسم العميل]،</p>
                    <p className="mt-2">نرحب بك في عائلتنا! نحن سعداء بانضمامك إلينا...</p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowEmailEditor(true)}>
                    <Edit className="ml-1 h-3 w-3" />
                    تحرير
                  </Button>
                  <Button size="sm">
                    <Check className="ml-1 h-3 w-3" />
                    استخدام
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2"></div>
                <CardHeader>
                  <CardTitle>عرض خاص</CardTitle>
                  <CardDescription>رسالة لإرسال عروض خاصة للعملاء</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-3 bg-gray-50 text-sm">
                    <p>عزيزي [اسم العميل]،</p>
                    <p className="mt-2">لدينا عرض خاص لك! استمتع بخصم [نسبة الخصم]% على...</p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="ml-1 h-3 w-3" />
                    تحرير
                  </Button>
                  <Button size="sm">
                    <Check className="ml-1 h-3 w-3" />
                    استخدام
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2"></div>
                <CardHeader>
                  <CardTitle>تذكير بالمنتج</CardTitle>
                  <CardDescription>رسالة تذكير للعملاء بالمنتجات المتروكة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-3 bg-gray-50 text-sm">
                    <p>مرحباً [اسم العميل]،</p>
                    <p className="mt-2">لاحظنا أنك تركت [اسم المنتج] في سلة التسوق الخاصة بك...</p>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="ml-1 h-3 w-3" />
                    تحرير
                  </Button>
                  <Button size="sm">
                    <Check className="ml-1 h-3 w-3" />
                    استخدام
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={showAddCampaign} onOpenChange={setShowAddCampaign}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إنشاء حملة تسويقية جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل الحملة التسويقية الجديدة. الحقول المميزة بـ * مطلوبة.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                اسم الحملة *
                {validationErrors.name && (
                  <span className="text-red-500 text-xs mr-1">{validationErrors.name}</span>
                )}
              </Label>
              <Input 
                id="name" 
                name="name"
                placeholder="اسم الحملة التسويقية" 
                value={campaignFormData.name}
                onChange={handleInputChange}
                className={validationErrors.name ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">نوع الحملة *</Label>
              <Select 
                value={campaignFormData.type} 
                onValueChange={(value) => setCampaignFormData({...campaignFormData, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="اختر نوع الحملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
                  <SelectItem value="sms">رسائل نصية</SelectItem>
                  <SelectItem value="social">وسائل التواصل</SelectItem>
                  <SelectItem value="event">فعالية</SelectItem>
                  <SelectItem value="multi">متعددة القنوات</SelectItem>
                  <SelectItem value="loyalty">برنامج ولاء</SelectItem>
                  <SelectItem value="print">مطبوعات</SelectItem>
                  <SelectItem value="tv">إعلانات تلفزيونية</SelectItem>
                  <SelectItem value="radio">إعلانات إذاعية</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">
                تاريخ البدء *
                {validationErrors.startDate && (
                  <span className="text-red-500 text-xs mr-1">{validationErrors.startDate}</span>
                )}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-right font-normal ${validationErrors.startDate ? "border-red-500" : ""}`}
                  >
                    {campaignFormData.startDate ? (
                      format(campaignFormData.startDate, "dd/MM/yyyy")
                    ) : (
                      <span>اختر تاريخ البدء</span>
                    )}
                    <CalendarIcon className="mr-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={campaignFormData.startDate}
                    onSelect={(date) => setCampaignFormData({...campaignFormData, startDate: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">
                تاريخ الانتهاء *
                {validationErrors.endDate && (
                  <span className="text-red-500 text-xs mr-1">{validationErrors.endDate}</span>
                )}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-right font-normal ${validationErrors.endDate ? "border-red-500" : ""}`}
                  >
                    {campaignFormData.endDate ? (
                      format(campaignFormData.endDate, "dd/MM/yyyy")
                    ) : (
                      <span>اختر تاريخ الانتهاء</span>
                    )}
                    <CalendarIcon className="mr-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={campaignFormData.endDate}
                    onSelect={(date) => setCampaignFormData({...campaignFormData, endDate: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">
                الميزان