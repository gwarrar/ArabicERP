export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "active" | "inactive";
  requiredForCore: boolean;
  dependencies?: string[];
  features: Feature[];
}

export interface Feature {
  id: string;
  name: string;
  description: string;
}

export interface ModulePackageAssignment {
  moduleId: string;
  packageId: string;
  isEnabled: boolean;
}

export interface SaaSPackage {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  status: "نشط" | "غير نشط";
  features: {
    name: string;
    included: boolean;
  }[];
  limits: {
    users: number;
    storage: string;
    customers: number | string;
    products: number | string;
  };
  createdAt: string;
  updatedAt: string;
}
