import React from "react";
import { Bell, Settings, LogOut, ChevronDown, Search } from "lucide-react";
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
  return (
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
        <h1 className="text-[1.25rem] font-bold text-[#1e293b] mr-3">
          نظام ERP المتكامل
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
          <Input
            placeholder="بحث سريع..."
            className="pr-10 h-9 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3b82f6] focus:ring-[#3b82f6]"
          />
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-4">
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
  );
};

export default Header;
