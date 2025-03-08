import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          الإعدادات والتكامل
        </h1>
        <SettingsTabs />
      </div>
    </MainLayout>
  );
};

export default Settings;
