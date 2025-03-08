import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SheetTabsProps {
  title: string;
  tabs: Tab[];
  defaultTab?: string;
  onClose: () => void;
}

export const SheetTabs = ({
  title,
  tabs,
  defaultTab,
  onClose,
}: SheetTabsProps) => {
  return (
    <Sheet defaultOpen={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-[800px] overflow-y-auto" side="left">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Tabs defaultValue={defaultTab || tabs[0].id}>
            <TabsList
              className="grid"
              style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
            >
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
