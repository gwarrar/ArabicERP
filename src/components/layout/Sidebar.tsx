import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Factory,
  BarChart2,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Cloud,
  DollarSign,
  Euro,
  TrendingUp,
  TrendingDown,
  GitBranch,
  Sparkles,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // بيانات تجريبية لأسعار الصرف
  const exchangeRates = [
    { currency: "USD", symbol: "$", rate: 3.75, trend: "up" },
    { currency: "EUR", symbol: "€", rate: 4.12, trend: "down" },
  ];

  return (
    <aside
      className="w-[280px] bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto"
      dir="rtl"
    >
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">نظام ERP</h1>
      </div>

      <nav className="px-2 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="لوحة التحكم"
          href="/dashboard"
          active={isActive("/dashboard")}
        />
        <SidebarItem
          icon={<ShoppingCart className="h-5 w-5" />}
          label="المبيعات"
          href="/sales"
          active={isActive("/sales")}
        />
        <SidebarItem
          icon={<Truck className="h-5 w-5" />}
          label="المشتريات"
          href="/purchases"
          active={isActive("/purchases")}
        />
        <SidebarItem
          icon={<Package className="h-5 w-5" />}
          label="المخزون"
          href="/inventory"
          active={isActive("/inventory")}
        />
        <SidebarItem
          icon={<Factory className="h-5 w-5" />}
          label="التصنيع"
          href="/manufacturing"
          active={isActive("/manufacturing")}
        />
        <SidebarItem
          icon={<BarChart2 className="h-5 w-5" />}
          label="المحاسبة"
          href="/accounting"
          active={isActive("/accounting")}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="إدارة العملاء"
          href="/crm"
          active={isActive("/crm")}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="الموارد البشرية"
          href="/hr"
          active={isActive("/hr")}
        />
        <SidebarItem
          icon={<GitBranch className="h-5 w-5" />}
          label="سير العمل والأتمتة"
          href="/workflow"
          active={isActive("/workflow")}
        />
        <SidebarItem
          icon={<Calendar className="h-5 w-5" />}
          label="التقويم"
          href="/calendar"
          active={isActive("/calendar")}
        />
        <SidebarItem
          icon={<Cloud className="h-5 w-5" />}
          label="لوحة تحكم SaaS"
          href="/saas-admin"
          active={isActive("/saas-admin")}
        />
        <SidebarItem
          icon={<Sparkles className="h-5 w-5" />}
          label="المساعد الذكي"
          href="/ai-assistant"
          active={isActive("/ai-assistant")}
        />
      </nav>
      <div className="mt-6 px-2 space-y-1">
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          label="الإعدادات"
          href="/settings"
          active={isActive("/settings")}
        />
        <SidebarItem
          icon={<HelpCircle className="h-5 w-5" />}
          label="المساعدة"
          href="/help"
          active={isActive("/help")}
        />
        <SidebarItem
          icon={<LogOut className="h-5 w-5" />}
          label="تسجيل الخروج"
          href="/logout"
          active={false}
        />
      </div>

      {/* Exchange Rate Display at bottom */}
      <div className="mt-auto px-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
          <div className="text-xs font-medium text-blue-700 mb-2">
            أسعار الصرف
          </div>
          <div className="space-y-2">
            {exchangeRates.map((rate, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {rate.currency === "USD" ? (
                    <DollarSign className="h-3.5 w-3.5 text-blue-600" />
                  ) : (
                    <Euro className="h-3.5 w-3.5 text-blue-600" />
                  )}
                  <span className="text-xs">{rate.currency}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{rate.rate} ₴</span>
                  {rate.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 pt-1 border-t border-blue-100 text-[10px] text-right text-blue-500">
            آخر تحديث: 10 أغسطس 09:30
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
