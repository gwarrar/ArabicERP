import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ZoomIn,
  ZoomOut,
  MapPin,
  Package,
  Layers,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FabricRoll } from "@/types/inventory";

interface ShelfProps {
  shelfNumber: string;
  occupancyRate: number;
  items?: FabricRoll[];
  onClick: () => void;
}

const Shelf: React.FC<ShelfProps> = ({
  shelfNumber,
  occupancyRate,
  onClick,
}) => {
  const getShelfColor = (rate: number) => {
    if (rate >= 0.8) return "bg-red-500";
    if (rate >= 0.5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div
      className={`${getShelfColor(occupancyRate)} p-2 rounded text-white text-center cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={onClick}
    >
      رف {shelfNumber}
    </div>
  );
};

interface SectionProps {
  sectionNumber: string;
  shelves: {
    shelfNumber: string;
    occupancyRate: number;
    items?: FabricRoll[];
  }[];
  onShelfClick: (shelfNumber: string, items?: FabricRoll[]) => void;
}

const Section: React.FC<SectionProps> = ({
  sectionNumber,
  shelves,
  onShelfClick,
}) => {
  return (
    <div className="border border-gray-200 p-2 rounded">
      <h5 className="text-sm mb-2 font-medium">قسم {sectionNumber}</h5>
      <div className="flex flex-col gap-2">
        {shelves.map((shelf) => (
          <Shelf
            key={shelf.shelfNumber}
            shelfNumber={shelf.shelfNumber}
            occupancyRate={shelf.occupancyRate}
            items={shelf.items}
            onClick={() => onShelfClick(shelf.shelfNumber, shelf.items)}
          />
        ))}
      </div>
    </div>
  );
};

interface AisleProps {
  aisleNumber: string;
  sections: {
    sectionNumber: string;
    shelves: {
      shelfNumber: string;
      occupancyRate: number;
      items?: FabricRoll[];
    }[];
  }[];
  onShelfClick: (shelfNumber: string, items?: FabricRoll[]) => void;
}

const Aisle: React.FC<AisleProps> = ({
  aisleNumber,
  sections,
  onShelfClick,
}) => {
  return (
    <div className="border border-gray-300 p-2 rounded">
      <h4 className="text-md font-medium mb-2">ممر {aisleNumber}</h4>
      <div className="flex gap-4">
        {sections.map((section) => (
          <Section
            key={section.sectionNumber}
            sectionNumber={section.sectionNumber}
            shelves={section.shelves}
            onShelfClick={onShelfClick}
          />
        ))}
      </div>
    </div>
  );
};

interface FloorProps {
  floorNumber: string;
  aisles: {
    aisleNumber: string;
    sections: {
      sectionNumber: string;
      shelves: {
        shelfNumber: string;
        occupancyRate: number;
        items?: FabricRoll[];
      }[];
    }[];
  }[];
  onShelfClick: (shelfNumber: string, items?: FabricRoll[]) => void;
}

const Floor: React.FC<FloorProps> = ({ floorNumber, aisles, onShelfClick }) => {
  return (
    <div className="border-2 border-gray-400 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">الطابق {floorNumber}</h3>
      <div className="flex gap-8 flex-wrap">
        {aisles.map((aisle) => (
          <Aisle
            key={aisle.aisleNumber}
            aisleNumber={aisle.aisleNumber}
            sections={aisle.sections}
            onShelfClick={onShelfClick}
          />
        ))}
      </div>
    </div>
  );
};

const WarehouseMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedShelf, setSelectedShelf] = useState<{
    shelfNumber: string;
    items?: FabricRoll[];
  } | null>(null);
  const [showItemsList, setShowItemsList] = useState(false);
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(
    null,
  );

  // بيانات تجريبية لرولونات القماش
  const fabricRolls: FabricRoll[] = [
    {
      id: "FR-001",
      serialNumber: "SN12345678",
      barcode: "BC12345678",
      name: "قطن مصري فاخر",
      type: "قطن",
      color: "أبيض",
      weight: 25,
      length: 50,
      width: 150,
      supplier: "شركة الأمل للتوريدات",
      receivedDate: "2023-06-15",
      warehouseId: "WH-001",
      shelfNumber: "1",
      sectionNumber: "1",
      aisleNumber: "A",
      floorNumber: "1",
      status: "available",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15",
    },
    {
      id: "FR-002",
      serialNumber: "SN12345679",
      barcode: "BC12345679",
      name: "قطن أمريكي متوسط",
      type: "قطن",
      color: "أبيض",
      weight: 20,
      length: 45,
      width: 150,
      supplier: "شركة الأمل للتوريدات",
      receivedDate: "2023-06-16",
      warehouseId: "WH-001",
      shelfNumber: "1",
      sectionNumber: "1",
      aisleNumber: "A",
      floorNumber: "1",
      status: "available",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-16",
      updatedAt: "2023-06-16",
    },
  ];

  // بيانات تجريبية لتخطيط المستودع
  const warehouseLayout = {
    floors: [
      {
        floorNumber: "1",
        aisles: [
          {
            aisleNumber: "A",
            sections: [
              {
                sectionNumber: "1",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.8, items: fabricRolls },
                  { shelfNumber: "2", occupancyRate: 0.3 },
                  { shelfNumber: "3", occupancyRate: 0.9 },
                ],
              },
              {
                sectionNumber: "2",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.5 },
                  { shelfNumber: "2", occupancyRate: 0.2 },
                  { shelfNumber: "3", occupancyRate: 0.7 },
                ],
              },
            ],
          },
          {
            aisleNumber: "B",
            sections: [
              {
                sectionNumber: "1",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.4 },
                  { shelfNumber: "2", occupancyRate: 0.6 },
                ],
              },
              {
                sectionNumber: "2",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.1 },
                  { shelfNumber: "2", occupancyRate: 0.9 },
                ],
              },
            ],
          },
        ],
      },
      {
        floorNumber: "2",
        aisles: [
          {
            aisleNumber: "A",
            sections: [
              {
                sectionNumber: "1",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.2 },
                  { shelfNumber: "2", occupancyRate: 0.5 },
                ],
              },
            ],
          },
          {
            aisleNumber: "B",
            sections: [
              {
                sectionNumber: "1",
                shelves: [
                  { shelfNumber: "1", occupancyRate: 0.3 },
                  { shelfNumber: "2", occupancyRate: 0.7 },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // وظيفة للبحث عن عنصر في المستودع
  const searchItem = () => {
    if (!searchTerm) return;

    // البحث عن الرولون بالرقم التسلسلي أو الباركود
    const foundRoll = fabricRolls.find(
      (roll) =>
        roll.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roll.barcode.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (foundRoll) {
      // تحديد موقع الرولون على الخريطة
      const location = `${foundRoll.floorNumber}-${foundRoll.aisleNumber}-${foundRoll.sectionNumber}-${foundRoll.shelfNumber}`;
      setHighlightedLocation(location);

      // التمرير إلى الطابق المناسب
      const floorElement = document.getElementById(
        `floor-${foundRoll.floorNumber}`,
      );
      if (floorElement) {
        floorElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      alert("لم يتم العثور على الرولون");
    }
  };

  // وظيفة لتغيير مستوى التكبير
  const changeZoom = (increment: number) => {
    setZoomLevel(Math.max(0.5, Math.min(2, zoomLevel + increment)));
  };

  // وظيفة للتعامل مع النقر على الرف
  const handleShelfClick = (shelfNumber: string, items?: FabricRoll[]) => {
    setSelectedShelf({ shelfNumber, items });
    if (items && items.length > 0) {
      setShowItemsList(true);
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">خريطة المستودع</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => changeZoom(0.1)}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => changeZoom(-0.1)}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث عن رولون قماش برقم الباركود أو الرقم التسلسلي..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchItem()}
          />
        </div>
        <Button onClick={searchItem}>بحث</Button>
      </div>

      <div
        className="border rounded-lg p-4 overflow-auto"
        style={{ height: "600px" }}
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top right",
          }}
        >
          {/* رسم تخطيط المستودع */}
          <div className="flex flex-col gap-8">
            {warehouseLayout.floors.map((floor) => (
              <div
                key={floor.floorNumber}
                id={`floor-${floor.floorNumber}`}
                className="border-2 border-gray-400 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">
                  الطابق {floor.floorNumber}
                </h3>
                <div className="flex gap-8 flex-wrap">
                  {floor.aisles.map((aisle) => (
                    <div
                      key={aisle.aisleNumber}
                      className="border border-gray-300 p-2 rounded"
                    >
                      <h4 className="text-md font-medium mb-2">
                        ممر {aisle.aisleNumber}
                      </h4>
                      <div className="flex gap-4">
                        {aisle.sections.map((section) => (
                          <div
                            key={section.sectionNumber}
                            className="border border-gray-200 p-2 rounded"
                          >
                            <h5 className="text-sm mb-2">
                              قسم {section.sectionNumber}
                            </h5>
                            <div className="flex flex-col gap-2">
                              {section.shelves.map((shelf) => {
                                const location = `${floor.floorNumber}-${aisle.aisleNumber}-${section.sectionNumber}-${shelf.shelfNumber}`;
                                const isHighlighted =
                                  location === highlightedLocation;

                                return (
                                  <div
                                    key={shelf.shelfNumber}
                                    className={`${isHighlighted ? "ring-4 ring-blue-500" : ""} relative`}
                                  >
                                    <Shelf
                                      shelfNumber={shelf.shelfNumber}
                                      occupancyRate={shelf.occupancyRate}
                                      items={shelf.items}
                                      onClick={() =>
                                        handleShelfClick(
                                          shelf.shelfNumber,
                                          shelf.items,
                                        )
                                      }
                                    />
                                    {isHighlighted && (
                                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                        <MapPin className="h-4 w-4" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* معلومات الرف المحدد */}
      {selectedShelf && (
        <div className="mt-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">تفاصيل الرف</h3>
              <p>رقم الرف: {selectedShelf.shelfNumber}</p>
              <p>عدد الرولونات: {selectedShelf.items?.length || 0}</p>
            </div>
            {selectedShelf.items && selectedShelf.items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowItemsList(true)}
              >
                <Package className="ml-2 h-4 w-4" />
                عرض المحتويات
              </Button>
            )}
          </div>
        </div>
      )}

      {/* مفتاح الألوان */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm">متاح (أقل من 50%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-sm">متوسط (50% - 80%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm">ممتلئ (أكثر من 80%)</span>
        </div>
        {highlightedLocation && (
          <div className="flex items-center mr-auto">
            <div className="w-4 h-4 ring-4 ring-blue-500 rounded mr-2"></div>
            <span className="text-sm">موقع البحث</span>
          </div>
        )}
      </div>

      {/* نافذة عرض محتويات الرف */}
      <Dialog open={showItemsList} onOpenChange={setShowItemsList}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>محتويات الرف {selectedShelf?.shelfNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedShelf?.items && selectedShelf.items.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                        الرقم التسلسلي
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                        الاسم
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                        النوع
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                        اللون
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedShelf.items.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-muted/50">
                        <td className="py-2 px-3">{item.serialNumber}</td>
                        <td className="py-2 px-3">{item.name}</td>
                        <td className="py-2 px-3">{item.type}</td>
                        <td className="py-2 px-3">{item.color}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-1 text-xs ${item.status === "available" ? "bg-green-100 text-green-800" : item.status === "reserved" ? "bg-blue-100 text-blue-800" : item.status === "used" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"} rounded-full`}
                          >
                            {item.status === "available"
                              ? "متاح"
                              : item.status === "reserved"
                                ? "محجوز"
                                : item.status === "used"
                                  ? "مستخدم"
                                  : "تالف"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد رولونات في هذا الرف</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowItemsList(false)}>
                إغلاق
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* نصائح استخدام الخريطة */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">
              كيفية استخدام الخريطة
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>استخدم أزرار التكبير والتصغير للتحكم في حجم الخريطة</li>
              <li>اضغط على أي رف لعرض تفاصيله ومحتوياته</li>
              <li>
                استخدم خانة البحث للعثور على رولون معين بالرقم التسلسلي أو
                الباركود
              </li>
              <li>
                الألوان تشير إلى نسبة إشغال الرف (أخضر: متاح، أصفر: متوسط، أحمر:
                ممتلئ)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WarehouseMap;
