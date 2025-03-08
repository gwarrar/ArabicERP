// Customer types
export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  category: "new" | "regular" | "vip" | "inactive";
  taxNumber?: string;
  balance: number;
  totalSpent: number;
  orderCount: number;
  firstOrder?: string;
  lastOrder?: string;
  status: "active" | "inactive" | "blocked";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Opportunity types
export interface Opportunity {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage:
    | "lead"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed_won"
    | "closed_lost";
  probability: number; // percentage
  expectedCloseDate: string;
  assignedTo: string;
  description?: string;
  products?: string[];
  createdAt: string;
  updatedAt: string;
}

// Communication types
export interface Communication {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  type: "phone" | "email" | "visit" | "meeting" | "other";
  employeeId: string;
  employeeName: string;
  summary: string;
  action?: string;
  createdAt: string;
  updatedAt: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  relatedTo: {
    type: "customer" | "opportunity" | "campaign";
    id: string;
    name: string;
  };
  dueDate: string;
  assigneeId: string;
  assigneeName: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "cancelled";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Campaign types
export interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "social" | "event" | "other";
  status: "draft" | "scheduled" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  budget: number;
  expectedRevenue: number;
  actualRevenue?: number;
  targetAudience: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Loyalty Program types
export interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  pointsPerPurchase: number; // points per currency unit
  minimumPurchase: number;
  rewardThreshold: number;
  rewardValue: number;
  status: "active" | "inactive";
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Customer Loyalty types
export interface CustomerLoyalty {
  id: string;
  customerId: string;
  customerName: string;
  programId: string;
  programName: string;
  currentPoints: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  tier?: "bronze" | "silver" | "gold" | "platinum";
  memberSince: string;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

// CRM Dashboard types
export interface CRMDashboardStats {
  newCustomers: number;
  activeCustomers: number;
  openOpportunities: number;
  closedOpportunities: number;
  conversionRate: number; // percentage
  customerRetention: number; // percentage
  monthlySales: {
    month: string;
    sales: number;
    target: number;
  }[];
  customerDistribution: {
    category: string;
    count: number;
  }[];
  upcomingTasks: Task[];
  recentCommunications: Communication[];
}
