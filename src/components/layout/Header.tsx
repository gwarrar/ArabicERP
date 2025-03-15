import React, { useState } from "react";
import {
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Users,
  Truck,
  DollarSign,
  FileText,
  ShoppingCart,
  ShoppingBag,
  User,
  Euro,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import CustomerSupplierQuickView from "@/components/layout/CustomerSupplierQuickView";
import CustomerSupplierPopup from "@/components/shared/CustomerSupplierPopup";
import CashJournalPopup from "@/components/accounting/CashJournalPopup";
import JournalEntriesPopup from "@/components/accounting/JournalEntriesPopup";
import SalesPopup from "@/components/sales/SalesPopup";
import PurchasesPopup from "@/components/purchases/PurchasesPopup";
import ExchangeRateHeader from "./ExchangeRateHeader";

interface HeaderProps {
  userName?: string;
  notificationCount?: number;
  logoSrc?: string;
}

const Header = ({
  userName = "أحمد محمد",
  notificationCount = 3,
  logoSrc = "/logo.svg",
}: HeaderProps) => {
  const [customerSupplierPopupOpen, setCustomerSupplierPopupOpen] =
    useState(false);
  const [cashJournalOpen, setCashJournalOpen] = useState(false);
  const [journalEntriesOpen, setJournalEntriesOpen] = useState(false);
  const [salesPopupOpen, setSalesPopupOpen] = useState(false);
  const [purchasesPopupOpen, setPurchasesPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [entityType, setEntityType] = useState<"customer" | "supplier">(
    "customer",
  );
  const [showQuickView, setShowQuickView] = useState(false);

  // بيانات تجريبية للعملاء والموردين
  const customers = [
    {
      id: "CUST-001",
      name: "شركة الأفق للتجارة",
      contactPerson: "أحمد محمد",
      email: "info@horizon-trading.com",
      phone: "+966 55 123 4567",
      address: "الرياض، المملكة العربية السعودية",
      country: "السعودية",
      city: "الرياض",
      status: "active",
      type: "customer",
      paymentTerms: "30 يوم",
    },
    {
      id: "CUST-002",
      name: "مؤسسة النور للمقاولات",
      contactPerson: "محمد علي",
      email: "contact@alnoor.com",
      phone: "+966 50 987 6543",
      address: "جدة، المملكة العربية السعودية",
      country: "السعودية",
      city: "جدة",
      status: "active",
      type: "customer",
      paymentTerms: "30 يوم",
    },
  ];

  const suppliers = [
    {
      id: "SUP-001",
      name: "شركة الصين للملابس",
      contactPerson: "لي وانغ",
      email: "contact@chinafashion.com",
      phone: "+86 123 4567 8901",
      address: "شنغهاي، الصين",
      country: "الصين",
      city: "شنغهاي",
      status: "active",
      type: "supplier",
      paymentTerms: "30 يوم",
    },
    {
      id: "SUP-002",
      name: "شركة الأحذية العالمية",
      contactPerson: "أحمد محمود",
      email: "info@globalshoes.com",
      phone: "+90 532 123 4567",
      address: "إسطنبول، تركيا",
      country: "تركيا",
      city: "إسطنبول",
      status: "active",
      type: "supplier",
      paymentTerms: "45 يوم",
    },
  ];

  // دمج العملاء والموردين للبحث
  const allEntities = [...customers, ...suppliers];

  // البحث في العملاء والموردين
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // فتح نافذة العرض السريع
  const handleQuickView = (entity: any) => {
    setSelectedEntity(entity);
    setEntityType(entity.type as "customer" | "supplier");
    setShowQuickView(true);
    setSearchTerm(""); // إعادة تعيين البحث بعد الاختيار
  };

  // تصفية النتائج حسب البحث
  const filteredEntities = searchTerm
    ? allEntities.filter(
        (entity) =>
          entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entity.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <>
      <div className="flex flex-col">
        <header
          className="bg-white border-b border-[#e2e8f0] h-[64px] w-[1512px] max-w-full px-6 flex items-center justify-between shadow-sm fixed top-0 right-0 left-0 z-50"
          dir="rtl"
        >
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt="شعار النظام"
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://api.dicebear.com/7.x/shapes/svg?seed=erp-system";
              }}
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
              <Input
                placeholder="بحث عن عميل أو مورد..."
                className="pr-10 h-9 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]"
                value={searchTerm}
                onChange={handleSearch}
              />

              {/* نتائج البحث */}
              {searchTerm && filteredEntities.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-[#e2e8f0] rounded-md shadow-lg z-50 max-h-[300px] overflow-auto">
                  <div className="p-2">
                    <div className="text-xs font-medium text-[#64748b] mb-1 px-2">
                      نتائج البحث
                    </div>
                    {filteredEntities.map((entity) => (
                      <div
                        key={entity.id}
                        className="flex items-center gap-2 p-2 hover:bg-[#f8fafc] rounded-md cursor-pointer"
                        onClick={() => handleQuickView(entity)}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${entity.type === "customer" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
                        >
                          {entity.type === "customer" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{entity.name}</p>
                          <p className="text-xs text-[#64748b]">
                            {entity.id} -{" "}
                            {entity.type === "customer" ? "عميل" : "مورد"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {/* Quick Access Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#64748b] hover:bg-[#f8fafc] hover:text-[#3b82f6]"
                onClick={() => setCustomerSupplierPopupOpen(true)}
              >
                <Users className="h-4 w-4 ml-1" />
                <span className="text-sm">الزبائن والموردين</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#64748b] hover:bg-[#f8fafc] hover:text-[#3b82f6]"
                onClick={() => setSalesPopupOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 ml-1" />
                <span className="text-sm">المبيعات</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#64748b] hover:bg-[#f8fafc] hover:text-[#3b82f6]"
                onClick={() => setPurchasesPopupOpen(true)}
              >
                <ShoppingBag className="h-4 w-4 ml-1" />
                <span className="text-sm">المشتريات</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#64748b] hover:bg-[#f8fafc] hover:text-[#3b82f6]"
                onClick={() => setCashJournalOpen(true)}
              >
                <DollarSign className="h-4 w-4 ml-1" />
                <span className="text-sm">يومية الصندوق</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#64748b] hover:bg-[#f8fafc] hover:text-[#3b82f6]"
                onClick={() => setJournalEntriesOpen(true)}
              >
                <FileText className="h-4 w-4 ml-1" />
                <span className="text-sm">القيود المحاسبية</span>
              </Button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full hover:bg-[#f8fafc]"
              >
                <Bell className="h-5 w-5 text-[#64748b]" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -left-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#3b82f6]"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-1 h-9 hover:bg-[#f8fafc] rounded-full"
                >
                  <Avatar className="h-8 w-8 border-2 border-[#e2e8f0]">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                    />
                    <AvatarFallback className="bg-[#3b82f6] text-white">
                      {userName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-[#1e293b] hidden md:inline-block">
                    {userName}
                  </span>
                  <ChevronDown className="h-4 w-4 text-[#64748b] hidden md:inline-block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-1 p-1 border-[#e2e8f0] bg-white shadow-lg rounded-md"
              >
                <DropdownMenuLabel className="text-[#64748b]">
                  حسابي
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#e2e8f0]" />
                <DropdownMenuItem className="rounded-md hover:bg-[#f8fafc] cursor-pointer">
                  <Settings className="ml-2 h-4 w-4 text-[#64748b]" />
                  <span className="text-[#1e293b]">الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md hover:bg-[#f8fafc] cursor-pointer">
                  <LogOut className="ml-2 h-4 w-4 text-[#64748b]" />
                  <span className="text-[#1e293b]">تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>

      {/* Customer/Supplier Popup */}
      <CustomerSupplierPopup
        open={customerSupplierPopupOpen}
        onClose={() => setCustomerSupplierPopupOpen(false)}
      />

      {/* Sales Popup */}
      <SalesPopup
        open={salesPopupOpen}
        onClose={() => setSalesPopupOpen(false)}
      />

      {/* Purchases Popup */}
      <PurchasesPopup
        open={purchasesPopupOpen}
        onClose={() => setPurchasesPopupOpen(false)}
      />

      {/* Cash Journal Popup */}
      <CashJournalPopup
        open={cashJournalOpen}
        onClose={() => setCashJournalOpen(false)}
      />

      {/* Journal Entries Popup */}
      {journalEntriesOpen && (
        <JournalEntriesPopup
          open={journalEntriesOpen}
          onClose={() => setJournalEntriesOpen(false)}
        />
      )}

      {/* نافذة العرض السريع للعميل/المورد */}
      {selectedEntity && (
        <CustomerSupplierQuickView
          open={showQuickView}
          onClose={() => setShowQuickView(false)}
          data={selectedEntity}
          type={entityType}
        />
      )}
    </>
  );
};

export default Header;
