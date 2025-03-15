export interface Backup {
  id: string;
  name: string;
  description?: string;
  type: "platform" | "customer";
  customerId?: string;
  customerName?: string;
  size: string;
  createdAt: string;
  status: "completed" | "in_progress" | "failed";
  location: string;
  retentionDays: number;
}

export interface BackupSchedule {
  id: string;
  name: string;
  type: "platform" | "customer";
  customerId?: string;
  customerName?: string;
  frequency: "daily" | "weekly" | "monthly";
  time: string;
  day?: number; // Day of week (0-6) for weekly, day of month (1-31) for monthly
  retentionDays: number;
  status: "active" | "inactive";
  lastRun?: string;
  nextRun: string;
  createdAt: string;
  updatedAt: string;
}

export interface RestoreOperation {
  id: string;
  backupId: string;
  backupName: string;
  type: "platform" | "customer";
  customerId?: string;
  customerName?: string;
  startedAt: string;
  completedAt?: string;
  status: "in_progress" | "completed" | "failed";
  error?: string;
}
