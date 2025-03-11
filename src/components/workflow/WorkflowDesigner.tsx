import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Play,
  Plus,
  ArrowRight,
  ArrowDown,
  X,
  Settings,
  Copy,
  Trash,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  MoveHorizontal,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  User,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

// نموذج لخطوة سير العمل
interface WorkflowStep {
  id: string;
  type: string;
  label: string;
  description?: string;
  position: { x: number; y: number };
  assignedRole?: string;
  conditions?: any[];
  actions?: string[];
  nextSteps?: Record<string, string>;
  properties?: Record<string, any>;
}

// نموذج لاتصال بين خطوات سير العمل
interface WorkflowConnection {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  condition?: string;
}

// بيانات تجريبية لخطوات سير العمل
const initialSteps: WorkflowStep[] = [
  {
    id: "start",
    type: "start",
    label: "بداية",
    position: { x: 100, y: 100 },
    nextSteps: { default: "request" },
  },
  {
    id: "request",
    type: "task",
    label: "طلب الشراء",
    description: "إنشاء طلب شراء جديد",
    position: { x: 300, y: 100 },
    assignedRole: "purchaseRequester",
    actions: ["submit", "cancel"],
    nextSteps: { submit: "initialApproval", cancel: "cancelled" },
  },
  {
    id: "initialApproval",
    type: "approval",
    label: "الموافقة الأولية",
    description: "موافقة مدير القسم على الطلب",
    position: { x: 500, y: 100 },
    assignedRole: "departmentManager",
    actions: ["approve", "reject", "requestChanges"],
    nextSteps: {
      approve: "finalApproval",
      reject: "rejected",
      requestChanges: "request",
    },
  },
  {
    id: "finalApproval",
    type: "approval",
    label: "الموافقة النهائية",
    description: "موافقة المدير المالي على الطلب",
    position: { x: 700, y: 100 },
    assignedRole: "financeManager",
    actions: ["approve", "reject", "requestChanges"],
    nextSteps: {
      approve: "createPurchaseOrder",
      reject: "rejected",
      requestChanges: "initialApproval",
    },
  },
  {
    id: "createPurchaseOrder",
    type: "task",
    label: "إنشاء أمر شراء",
    description: "إنشاء أمر شراء بناءً على الطلب المعتمد",
    position: { x: 900, y: 100 },
    assignedRole: "purchasingOfficer",
    actions: ["complete"],
    nextSteps: { complete: "completed" },
  },
  {
    id: "completed",
    type: "end",
    label: "مكتمل",
    position: { x: 1100, y: 100 },
  },
  {
    id: "rejected",
    type: "end",
    label: "مرفوض",
    position: { x: 700, y: 250 },
  },
  {
    id: "cancelled",
    type: "end",
    label: "ملغي",
    position: { x: 300, y: 250 },
  },
];

// بيانات تجريبية للاتصالات بين الخطوات
const initialConnections: WorkflowConnection[] = [
  {
    id: "conn-1",
    sourceId: "start",
    targetId: "request",
    label: "بدء",
  },
  {
    id: "conn-2",
    sourceId: "request",
    targetId: "initialApproval",
    label: "تقديم",
    condition: "action === 'submit'",
  },
  {
    id: "conn-3",
    sourceId: "request",
    targetId: "cancelled",
    label: "إلغاء",
    condition: "action === 'cancel'",
  },
  {
    id: "conn-4",
    sourceId: "initialApproval",
    targetId: "finalApproval",
    label: "موافقة",
    condition: "action === 'approve'",
  },
  {
    id: "conn-5",
    sourceId: "initialApproval",
    targetId: "rejected",
    label: "رفض",
    condition: "action === 'reject'",
  },
  {
    id: "conn-6",
    sourceId: "initialApproval",
    targetId: "request",
    label: "طلب تغييرات",
    condition: "action === 'requestChanges'",
  },
  {
    id: "conn-7",
    sourceId: "finalApproval",
    targetId: "createPurchaseOrder",
    label: "موافقة",
    condition: "action === 'approve'",
  },
  {
    id: "conn-8",
    sourceId: "finalApproval",
    targetId: "rejected",
    label: "رفض",
    condition: "action === 'reject'",
  },
  {
    id: "conn-9",
    sourceId: "finalApproval",
    targetId: "initialApproval",
    label: "طلب تغييرات",
    condition: "action === 'requestChanges'",
  },
  {
    id: "conn-10",
    sourceId: "createPurchaseOrder",
    targetId: "completed",
    label: "إكمال",
    condition: "action === 'complete'",
  },
];

// قائمة الأدوار المتاحة
const availableRoles = [
  { id: "purchaseRequester", name: "طالب الشراء" },
  { id: "departmentManager", name: "مدير القسم" },
  { id: "financeManager", name: "المدير المالي" },
  { id: "purchasingOfficer", name: "مسؤول المشتريات" },
  { id: "inventoryManager", name: "مدير المخزون" },
  { id: "generalManager", name: "المدير العام" },
  { id: "accountant", name: "المحاسب" },
  { id: "salesManager", name: "مدير المبيعات" },
  { id: "hrManager", name: "مدير الموارد البشرية" },
];

// قائمة أنواع الخطوات المتاحة
const stepTypes = [
  { id: "start", name: "بداية", icon: <Play className="h-4 w-4" /> },
  { id: "task", name: "مهمة", icon: <FileText className="h-4 w-4" /> },
  { id: "approval", name: "موافقة", icon: <Check className="h-4 w-4" /> },
  { id: "condition", name: "شرط", icon: <AlertCircle className="h-4 w-4" /> },
  { id: "notification", name: "إشعار", icon: <Mail className="h-4 w-4" /> },
  { id: "delay", name: "تأخير", icon: <Clock className="h-4 w-4" /> },
  { id: "end", name: "نهاية", icon: <CheckCircle className="h-4 w-4" /> },
];

const WorkflowDesigner = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>(initialSteps);
  const [connections, setConnections] =
    useState<WorkflowConnection[]>(initialConnections);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [selectedConnection, setSelectedConnection] =
    useState<WorkflowConnection | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [workflowName, setWorkflowName] = useState(
    "دورة الموافقة على المشتريات",
  );
  const [workflowDescription, setWorkflowDescription] = useState(
    "سير عمل للموافقة على طلبات الشراء وإنشاء أوامر الشراء",
  );

  // الحصول على لون الخطوة حسب نوعها
  const getStepColor = (type: string) => {
    switch (type) {
      case "start":
        return "bg-green-100 border-green-500 text-green-800";
      case "end":
        return "bg-red-100 border-red-500 text-red-800";
      case "task":
        return "bg-blue-100 border-blue-500 text-blue-800";
      case "approval":
        return "bg-purple-100 border-purple-500 text-purple-800";
      case "condition":
        return "bg-amber-100 border-amber-500 text-amber-800";
      case "notification":
        return "bg-indigo-100 border-indigo-500 text-indigo-800";
      case "delay":
        return "bg-gray-100 border-gray-500 text-gray-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  // الحصول على أيقونة الخطوة حسب نوعها
  const getStepIcon = (type: string) => {
    switch (type) {
      case "start":
        return <Play className="h-4 w-4 text-green-600" />;
      case "end":
        return <CheckCircle className="h-4 w-4 text-red-600" />;
      case "task":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "approval":
        return <Check className="h-4 w-4 text-purple-600" />;
      case "condition":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "notification":
        return <Mail className="h-4 w-4 text-indigo-600" />;
      case "delay":
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  // إضافة خطوة جديدة
  const addStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type,
      label: stepTypes.find((t) => t.id === type)?.name || "خطوة جديدة",
      position: { x: 200, y: 200 },
      actions: type === "approval" ? ["approve", "reject"] : ["complete"],
    };
    setSteps([...steps, newStep]);
    setSelectedStep(newStep);
  };

  // حذف خطوة
  const deleteStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId));
    setConnections(
      connections.filter(
        (conn) => conn.sourceId !== stepId && conn.targetId !== stepId,
      ),
    );
    if (selectedStep?.id === stepId) {
      setSelectedStep(null);
    }
  };

  // تحديث خطوة
  const updateStep = (updatedStep: WorkflowStep) => {
    setSteps(
      steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)),
    );
  };

  // بدء سحب خطوة
  const startDragging = (
    e: React.MouseEvent,
    step: WorkflowStep,
    isSelected = false,
  ) => {
    e.stopPropagation();
    setIsDragging(true);
    if (!isSelected) {
      setSelectedStep(step);
      setSelectedConnection(null);
    }
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // تحريك خطوة أثناء السحب
  const handleDragging = (e: React.MouseEvent) => {
    if (isDragging && selectedStep) {
      const canvasRect = document
        .getElementById("workflow-canvas")
        ?.getBoundingClientRect();
      if (canvasRect) {
        const newX = e.clientX - canvasRect.left - dragOffset.x;
        const newY = e.clientY - canvasRect.top - dragOffset.y;
        const updatedStep = {
          ...selectedStep,
          position: { x: newX, y: newY },
        };
        updateStep(updatedStep);
      }
    }
  };

  // إنهاء سحب خطوة
  const stopDragging = () => {
    setIsDragging(false);
  };

  // إضافة اتصال جديد
  const addConnection = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    const newConnection: WorkflowConnection = {
      id: `conn-${Date.now()}`,
      sourceId,
      targetId,
      label: "اتصال",
    };
    setConnections([...connections, newConnection]);
    setSelectedConnection(newConnection);
  };

  // حذف اتصال
  const deleteConnection = (connectionId: string) => {
    setConnections(connections.filter((conn) => conn.id !== connectionId));
    if (selectedConnection?.id === connectionId) {
      setSelectedConnection(null);
    }
  };

  // تحديث اتصال
  const updateConnection = (updatedConnection: WorkflowConnection) => {
    setConnections(
      connections.map((conn) =>
        conn.id === updatedConnection.id ? updatedConnection : conn,
      ),
    );
  };

  // حساب نقاط الاتصال بين الخطوات
  const calculateConnectionPoints = (connection: WorkflowConnection) => {
    const sourceStep = steps.find((step) => step.id === connection.sourceId);
    const targetStep = steps.find((step) => step.id === connection.targetId);

    if (!sourceStep || !targetStep) return null;

    // حساب نقاط البداية والنهاية للاتصال
    const startX = sourceStep.position.x + 75; // منتصف عرض الخطوة
    const startY = sourceStep.position.y + 30; // منتصف ارتفاع الخطوة
    const endX = targetStep.position.x + 75;
    const endY = targetStep.position.y + 30;

    // حساب نقطة التحكم للمنحنى
    const controlX = (startX + endX) / 2;
    const controlY = (startY + endY) / 2;

    return {
      startX,
      startY,
      endX,
      endY,
      controlX,
      controlY,
    };
  };

  // رسم الاتصالات بين الخطوات
  const renderConnections = () => {
    return connections.map((connection) => {
      const points = calculateConnectionPoints(connection);
      if (!points) return null;

      const { startX, startY, endX, endY, controlX, controlY } = points;

      // حساب زاوية السهم
      const angle = Math.atan2(endY - controlY, endX - controlX);
      const arrowSize = 10;

      // حساب نقاط رأس السهم
      const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
      const arrowY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
      const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
      const arrowY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

      const isSelected = selectedConnection?.id === connection.id;
      const strokeColor = isSelected ? "#3b82f6" : "#64748b";
      const strokeWidth = isSelected ? 2 : 1;

      return (
        <g key={connection.id} className="connection">
          {/* خط الاتصال */}
          <path
            d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={connection.condition ? "5,5" : "none"}
            onClick={() => {
              setSelectedConnection(connection);
              setSelectedStep(null);
            }}
            className="cursor-pointer"
          />

          {/* رأس السهم */}
          <polygon
            points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
            fill={strokeColor}
            onClick={() => {
              setSelectedConnection(connection);
              setSelectedStep(null);
            }}
            className="cursor-pointer"
          />

          {/* تسمية الاتصال */}
          {connection.label && (
            <text
              x={controlX}
              y={controlY - 10}
              textAnchor="middle"
              fill={strokeColor}
              fontSize="12"
              className="select-none pointer-events-none"
            >
              {connection.label}
            </text>
          )}
        </g>
      );
    });
  };

  // رسم الخطوات
  const renderSteps = () => {
    return steps.map((step) => {
      const isSelected = selectedStep?.id === step.id;
      const stepColorClass = getStepColor(step.type);
      const stepIcon = getStepIcon(step.type);

      return (
        <div
          key={step.id}
          className={`absolute p-2 rounded-md border-2 ${stepColorClass} ${isSelected ? "ring-2 ring-blue-500" : ""} shadow-sm cursor-move transition-all duration-200 select-none`}
          style={{
            left: `${step.position.x}px`,
            top: `${step.position.y}px`,
            width: "150px",
            zIndex: isSelected ? 10 : 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedStep(step);
            setSelectedConnection(null);
          }}
          onMouseDown={(e) => startDragging(e, step, isSelected)}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              {stepIcon}
              <span className="text-sm font-medium">{step.label}</span>
            </div>
            {isSelected && (
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteStep(step.id);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          {step.description && (
            <p className="text-xs text-gray-600 truncate">{step.description}</p>
          )}
          {step.assignedRole && (
            <div className="mt-1 flex items-center gap-1">
              <User className="h-3 w-3 text-gray-500" />
              <span className="text-xs text-gray-600">
                {availableRoles.find((role) => role.id === step.assignedRole)
                  ?.name || step.assignedRole}
              </span>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">مصمم سير العمل</h2>
          <p className="text-muted-foreground">
            تصميم وتكوين سير العمل بشكل مرئي
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Undo className="ml-2 h-4 w-4" />
            تراجع
          </Button>
          <Button variant="outline">
            <Redo className="ml-2 h-4 w-4" />
            إعادة
          </Button>
          <Button>
            <Save className="ml-2 h-4 w-4" />
            حفظ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* معلومات سير العمل */}
        <Card className="md:col-span-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم سير العمل</label>
                <Input
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="أدخل اسم سير العمل"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف</label>
                <Input
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="أدخل وصف سير العمل"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* مكتبة العناصر */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">عناصر سير العمل</CardTitle>
            <CardDescription>اسحب العناصر إلى منطقة التصميم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">أنواع الخطوات</h3>
                <div className="space-y-2">
                  {stepTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-2 border rounded-md cursor-pointer flex items-center gap-2 ${getStepColor(type.id)}`}
                      onClick={() => addStep(type.id)}
                    >
                      {type.icon}
                      <span className="text-sm">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">الأدوار</h3>
                <Select defaultValue="purchaseRequester">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر دوراً" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">الإجراءات</h3>
                <div className="space-y-2">
                  <div className="p-2 border rounded-md flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">موافقة</span>
                  </div>
                  <div className="p-2 border rounded-md flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    <span className="text-sm">رفض</span>
                  </div>
                  <div className="p-2 border rounded-md flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">إعادة توجيه</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* منطقة التصميم */}
        <div className="md:col-span-2">
          <Card className="h-[600px] overflow-hidden">
            <CardHeader className="pb-2 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">منطقة التصميم</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{zoom}%</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.min(150, zoom + 10))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-57px)] overflow-auto">
              <div
                id="workflow-canvas"
                className="relative w-full h-full bg-gray-50"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                  minWidth: "1500px",
                  minHeight: "800px",
                }}
                onClick={() => {
                  setSelectedStep(null);
                  setSelectedConnection(null);
                }}
                onMouseMove={handleDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
              >
                {/* رسم الاتصالات */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 0 }}
                >
                  {renderConnections()}
                </svg>

                {/* رسم الخطوات */}
                {renderSteps()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* خصائص العنصر المحدد */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {selectedStep
                ? "خصائص الخطوة"
                : selectedConnection
                  ? "خصائص الاتصال"
                  : "الخصائص"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStep ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">العنوان</label>
                  <Input
                    value={selectedStep.label}
                    onChange={(e) =>
                      updateStep({ ...selectedStep, label: e.target.value })
                    }
                    placeholder="عنوان الخطوة"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea
                    value={selectedStep.description || ""}
                    onChange={(e) =>
                      updateStep({
                        ...selectedStep,
                        description: e.target.value,
                      })
                    }
                    placeholder="وصف الخطوة"
                    rows={2}
                  />
                </div>

                {selectedStep.type !== "start" &&
                  selectedStep.type !== "end" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        الدور المسؤول
                      </label>
                      <Select
                        value={selectedStep.assignedRole || ""}
                        onValueChange={(value) =>
                          updateStep({ ...selectedStep, assignedRole: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدور المسؤول" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">الموقع</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">X</label>
                      <Input
                        type="number"
                        value={selectedStep.position.x}
                        onChange={(e) =>
                          updateStep({
                            ...selectedStep,
                            position: {
                              ...selectedStep.position,
                              x: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Y</label>
                      <Input
                        type="number"
                        value={selectedStep.position.y}
                        onChange={(e) =>
                          updateStep({
                            ...selectedStep,
                            position: {
                              ...selectedStep.position,
                              y: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const stepCopy = { ...selectedStep };
                      stepCopy.id = `step-${Date.now()}`;
                      stepCopy.position = {
                        x: stepCopy.position.x + 20,
                        y: stepCopy.position.y + 20,
                      };
                      setSteps([...steps, stepCopy]);
                    }}
                  >
                    <Copy className="ml-1 h-3 w-3" />
                    نسخ
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteStep(selectedStep.id)}
                  >
                    <Trash className="ml-1 h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </div>
            ) : selectedConnection ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">التسمية</label>
                  <Input
                    value={selectedConnection.label || ""}
                    onChange={(e) =>
                      updateConnection({
                        ...selectedConnection,
                        label: e.target.value,
                      })
                    }
                    placeholder="تسمية الاتصال"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الشرط</label>
                  <Input
                    value={selectedConnection.condition || ""}
                    onChange={(e) =>
                      updateConnection({
                        ...selectedConnection,
                        condition: e.target.value,
                      })
                    }
                    placeholder="شرط الاتصال (اختياري)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">من</label>
                  <Select
                    value={selectedConnection.sourceId}
                    onValueChange={(value) =>
                      updateConnection({
                        ...selectedConnection,
                        sourceId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الخطوة المصدر" />
                    </SelectTrigger>
                    <SelectContent>
                      {steps.map((step) => (
                        <SelectItem key={step.id} value={step.id}>
                          {step.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">إلى</label>
                  <Select
                    value={selectedConnection.targetId}
                    onValueChange={(value) =>
                      updateConnection({
                        ...selectedConnection,
                        targetId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الخطوة الهدف" />
                    </SelectTrigger>
                    <SelectContent>
                      {steps.map((step) => (
                        <SelectItem key={step.id} value={step.id}>
                          {step.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteConnection(selectedConnection.id)}
                  >
                    <Trash className="ml-1 h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                <Settings className="h-8 w-8 mb-2" />
                <p>اختر عنصراً لعرض وتعديل خصائصه</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Play className="ml-2 h-4 w-4" />
          اختبار سير العمل
        </Button>
        <Button>
          <Save className="ml-2 h-4 w-4" />
          حفظ ونشر
        </Button>
      </div>
    </div>
  );
};

export default WorkflowDesigner;
