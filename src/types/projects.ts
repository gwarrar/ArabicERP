export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  budget: number;
  actualCost: number;
  progress: number;
  clientId: string;
  clientName: string;
  managerId: string;
  managerName: string;
  priority: ProjectPriority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  PLANNING = "planning",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ProjectTask {
  id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  progress: number;
  assignedTo: string[];
  assignedToNames: string[];
  priority: ProjectPriority;
  dependsOn: string[];
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  DONE = "done",
  CANCELLED = "cancelled",
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
  deliverables: string[];
  createdAt: string;
  updatedAt: string;
}

export enum MilestoneStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  DELAYED = "delayed",
  CANCELLED = "cancelled",
}

export interface ProjectResource {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  role: string;
  allocation: number; // percentage of time allocated to project
  startDate: string;
  endDate: string;
  hourlyRate: number;
  totalBudgetedHours: number;
  totalActualHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectExpense {
  id: string;
  projectId: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  receipt: string; // URL to receipt image
  approvedBy: string;
  approvedByName: string;
  status: ExpenseStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ExpenseStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  PAID = "paid",
}

export interface ProjectRisk {
  id: string;
  projectId: string;
  name: string;
  description: string;
  probability: RiskProbability;
  impact: RiskImpact;
  mitigation: string;
  status: RiskStatus;
  owner: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export enum RiskProbability {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very_high",
}

export enum RiskImpact {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  SEVERE = "severe",
}

export enum RiskStatus {
  IDENTIFIED = "identified",
  MONITORED = "monitored",
  MITIGATED = "mitigated",
  OCCURRED = "occurred",
  CLOSED = "closed",
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  name: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  version: string;
  uploadedBy: string;
  uploadedByName: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectComment {
  id: string;
  projectId: string;
  taskId?: string;
  userId: string;
  userName: string;
  content: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInvoice {
  id: string;
  projectId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  items: ProjectInvoiceItem[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export enum InvoiceStatus {
  DRAFT = "draft",
  SENT = "sent",
  PAID = "paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled",
}

export interface ProjectTimesheet {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  taskId: string;
  taskName: string;
  date: string;
  hours: number;
  description: string;
  status: TimesheetStatus;
  approvedBy?: string;
  approvedByName?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TimesheetStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
