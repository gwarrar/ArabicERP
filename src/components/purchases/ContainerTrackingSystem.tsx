import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ship,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  Package,
  X,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/types/inventory";

interface ContainerTrackingSystemProps {
  open: boolean;
  onClose: () => void;
  container: Container;
  onUpdate?: (updatedContainer: Container) => void;
}

interface TrackingEvent {
  id: string;
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  isCompleted: boolean;
}

const ContainerTrackingSystem: React.FC<ContainerTrackingSystemProps> = ({
  open,
  onClose,
  container,
  onUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [estimatedArrival, setEstimatedArrival] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // تحميل بيانات التتبع عند فتح النافذة
  useEffect(() => {
    if (open && container) {
      loadTrackingData();
    }
  }, [open, container]);

  // محاكاة تحميل بيانات التتبع من API خارجي
  const loadTrackingData = () => {
    setIsLoading(true);

    // في التطبيق الحقيقي، هنا سيتم استدعاء API لشركة الشحن للحصول على بيانات التتبع
    // نحن نستخدم بيانات تجريبية للتوضيح
    setTimeout(() => {
      // تحديد البيانات بناءً على حالة الكونتينر
      const events: TrackingEvent[] = [];
      let location = "";
      let eta = "";

      // إنشاء أحداث التتبع بناءً على حالة الكونتينر
      switch (container.status) {
        case "pending":
          events.push(
            {
              id: "1",
              date: "2023-12-01",
              time: "09:30",
              location: container.origin,
              status: "تم إنشاء الطلب",
              description: "تم إنشاء طلب الشحن وجدولته للتحميل",
              isCompleted: true,
            },
            {
              id: "2",
              date: "2023-12-05",
              time: "14:00",
              location: container.origin,
              status: "قيد التحضير",
              description: "جاري تحضير البضائع للشحن",
              isCompleted: true,
            },
            {
              id: "3",
              date: "2023-12-10",
              time: "08:00",
              location: container.origin,
              status: "في انتظار التحميل",
              description: "البضائع جاهزة وفي انتظار التحميل على السفينة",
              isCompleted: false,
            },
          );
          location = container.origin;
          eta = container.expectedArrivalDate || "";
          break;

        case "in_transit":
          events.push(
            {
              id: "1",
              date: "2023-12-01",
              time: "09:30",
              location: container.origin,
              status: "تم إنشاء الطلب",
              description: "تم إنشاء طلب الشحن وجدولته للتحميل",
              isCompleted: true,
            },
            {
              id: "2",
              date: "2023-12-05",
              time: "14:00",
              location: container.origin,
              status: "قيد التحضير",
              description: "جاري تحضير البضائع للشحن",
              isCompleted: true,
            },
            {
              id: "3",
              date: "2023-12-10",
              time: "08:00",
              location: container.origin,
              status: "تم التحميل",
              description: "تم تحميل البضائع على السفينة",
              isCompleted: true,
            },
            {
              id: "4",
              date: "2023-12-12",
              time: "10:30",
              location: "البحر المتوسط",
              status: "في الطريق",
              description: "الشحنة في الطريق إلى الوجهة",
              isCompleted: true,
            },
            {
              id: "5",
              date: "2023-12-20",
              time: "00:00",
              location: "قناة السويس",
              status: "في الطريق",
              description: "الشحنة تعبر قناة السويس",
              isCompleted: false,
            },
          );
          location = "البحر المتوسط - قناة السويس";
          eta = container.expectedArrivalDate || "";
          break;

        case "arrived":
          events.push(
            {
              id: "1",
              date: "2023-12-01",
              time: "09:30",
              location: container.origin,
              status: "تم إنشاء الطلب",
              description: "تم إنشاء طلب الشحن وجدولته للتحميل",
              isCompleted: true,
            },
            {
              id: "2",
              date: "2023-12-05",
              time: "14:00",
              location: container.origin,
              status: "قيد التحضير",
              description: "جاري تحضير البضائع للشحن",
              isCompleted: true,
            },
            {
              id: "3",
              date: "2023-12-10",
              time: "08:00",
              location: container.origin,
              status: "تم التحميل",
              description: "تم تحميل البضائع على السفينة",
              isCompleted: true,
            },
            {
              id: "4",
              date: "2023-12-12",
              time: "10:30",
              location: "البحر المتوسط",
              status: "في الطريق",
              description: "الشحنة في الطريق إلى الوجهة",
              isCompleted: true,
            },
            {
              id: "5",
              date: "2023-12-20",
              time: "14:45",
              location: "قناة السويس",
              status: "في الطريق",
              description: "الشحنة تعبر قناة السويس",
              isCompleted: true,
            },
            {
              id: "6",
              date: container.arrivalDate,
              time: "08:30",
              location: container.destination,
              status: "وصلت",
              description: "وصلت الشحنة إلى ميناء الوجهة",
              isCompleted: true,
            },
            {
              id: "7",
              date: new Date(
                new Date(container.arrivalDate).getTime() + 86400000,
              )
                .toISOString()
                .split("T")[0],
              time: "10:00",
              location: container.destination,
              status: "في انتظار التخليص الجمركي",
              description: "الشحنة في انتظار إجراءات التخليص الجمركي",
              isCompleted: false,
            },
          );
          location = container.destination;
          eta = "";
          break;

        case "cleared":
        case "received":
        case "completed":
          events.push(
            {
              id: "1",
              date: "2023-12-01",
              time: "09:30",
              location: container.origin,
              status: "تم إنشاء الطلب",
              description: "تم إنشاء طلب الشحن وجدولته للتحميل",
              isCompleted: true,
            },
            {
              id: "2",
              date: "2023-12-05",
              time: "14:00",
              location: container.origin,
              status: "قيد التحضير",
              description: "جاري تحضير البضائع للشحن",
              isCompleted: true,
            },
            {
              id: "3",
              date: "2023-12-10",
              time: "08:00",
              location: container.origin,
              status: "تم التحميل",
              description: "تم تحميل البضائع على السفينة",
              isCompleted: true,
            },
            {
              id: "4",
              date: "2023-12-12",
              time: "10:30",
              location: "البحر المتوسط",
              status: "في الطريق",
              description: "الشحنة في الطريق إلى الوجهة",
              isCompleted: true,
            },
            {
              id: "5",
              date: "2023-12-20",
              time: "14:45",
              location: "قناة السويس",
              status: "في الطريق",
              description: "الشحنة تعبر قناة السويس",
              isCompleted: true,
            },
            {
              id: "6",
              date: container.arrivalDate,
              time: "08:30",
              location: container.destination,
              status: "وصلت",
              description: "وصلت الشحنة إلى ميناء الوجهة",
              isCompleted: true,
            },
            {
              id: "7",
              date: new Date(
                new Date(container.arrivalDate).getTime() + 86400000,
              )
                .toISOString()
                .split("T")[0],
              time: "10:00",
              location: container.destination,
              status: "في انتظار التخليص الجمركي",
              description: "الشحنة في انتظار إجراءات التخليص الجمركي",
              isCompleted: true,
            },
            {
              id: "8",
              date: new Date(
                new Date(container.arrivalDate).getTime() + 172800000,
              )
                .toISOString()
                .split("T")[0],
              time: "15:20",
              location: container.destination,
              status: "تم التخليص الجمركي",
              description: "تم الانتهاء من إجراءات التخليص الجمركي",
              isCompleted: true,
            },
          );

          if (
            container.status === "received" ||
            container.status === "completed"
          ) {
            events.push({
              id: "9",
              date: new Date(
                new Date(container.arrivalDate).getTime() + 259200000,
              )
                .toISOString()
                .split("T")[0],
              time: "11:45",
              location: container.destination,
              status: "تم الاستلام",
              description: "تم استلام البضائع في المستودع",
              isCompleted: true,
            });
          }

          if (container.status === "completed") {
            events.push({
              id: "10",
              date: new Date(
                new Date(container.arrivalDate).getTime() + 345600000,
              )
                .toISOString()
                .split("T")[0],
              time: "14:30",
              location: container.destination,
              status: "مكتمل",
              description: "تم إغلاق ملف الشحنة بنجاح",
              isCompleted: true,
            });
          }

          location = container.destination;
          eta = "";
          break;
      }

      setTrackingEvents(events);
      setCurrentLocation(location);
      setEstimatedArrival(eta);
      setLastUpdated(new Date().toLocaleString());
      setIsLoading(false);
    }, 1500); // محاكاة تأخير الشبكة
  };

  // تحديث بيانات التتبع
  const handleRefresh = () => {
    loadTrackingData();
  };

  // الحصول على لون حالة الحدث
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted
      ? "bg-green-100 text-green-800"
      : "bg-amber-100 text-amber-800";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Ship className="h-5 w-5" />
              تتبع الكونتينر {container?.id}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              تحديث
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات الكونتينر */}
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">اسم الكونتينر</p>
                <p className="font-medium">{container?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم التتبع</p>
                <p className="font-medium">
                  {container?.trackingNumber || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">شركة الشحن</p>
                <p className="font-medium">
                  {container?.shippingCompany || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الحالة</p>
                <Badge className={getContainerStatusColor(container?.status)}>
                  {getContainerStatusText(container?.status)}
                </Badge>
              </div>
            </div>
          </div>

          {/* ملخص التتبع */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  الموقع الحالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-blue-800">
                  {isLoading ? "جاري التحميل..." : currentLocation || "-"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-amber-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  تاريخ الوصول المتوقع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-amber-800">
                  {isLoading
                    ? "جاري التحميل..."
                    : estimatedArrival || "وصل بالفعل"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  آخر تحديث
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-green-800">
                  {isLoading ? "جاري التحميل..." : lastUpdated}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* جدول أحداث التتبع */}
          <div>
            <h3 className="text-lg font-medium mb-2">سجل التتبع</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوقت</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <RefreshCw className="h-8 w-8 mb-2 animate-spin text-muted-foreground" />
                          <p className="text-muted-foreground">
                            جاري تحميل بيانات التتبع...
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : trackingEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <AlertCircle className="h-8 w-8 mb-2 opacity-20" />
                          <p>لا توجد بيانات تتبع متاحة</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    trackingEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.time}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.isCompleted)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.description}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
            <div className="flex items-start">
              <Ship className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
              <div>
                <h3 className="font-medium mb-1">معلومات التتبع</h3>
                <p className="text-sm">
                  يتم تحديث معلومات التتبع تلقائياً من شركة الشحن. يمكنك النقر
                  على زر "تحديث" للحصول على أحدث المعلومات. في حالة وجود أي
                  استفسارات، يرجى التواصل مع شركة الشحن{" "}
                  {container?.shippingCompany || "المعنية"} مع ذكر رقم التتبع{" "}
                  {container?.trackingNumber || "الخاص بالشحنة"}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 ml-1" />
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// تحويل حالة الكونتينر إلى نص عربي
const getContainerStatusText = (status?: string) => {
  if (!status) return "";

  switch (status) {
    case "pending":
      return "قيد الانتظار";
    case "in_transit":
      return "في الطريق";
    case "arrived":
      return "وصل";
    case "cleared":
      return "تم التخليص";
    case "received":
      return "تم الاستلام";
    case "completed":
      return "مكتمل";
    default:
      return status;
  }
};

// تحديد لون حالة الكونتينر
const getContainerStatusColor = (status?: string) => {
  if (!status) return "";

  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "arrived":
      return "bg-purple-100 text-purple-800";
    case "cleared":
      return "bg-indigo-100 text-indigo-800";
    case "received":
      return "bg-cyan-100 text-cyan-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default ContainerTrackingSystem;
