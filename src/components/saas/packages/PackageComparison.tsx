import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PackageComparisonProps {
  packages: any[];
  onSelectPackage?: (packageId: string) => void;
}

const PackageComparison: React.FC<PackageComparisonProps> = ({
  packages,
  onSelectPackage,
}) => {
  // تصفية الباقات النشطة فقط
  const activePackages = packages.filter((pkg) => pkg.status === "نشط");

  // الحصول على جميع الميزات الفريدة من جميع الباقات
  const allFeatures = Array.from(
    new Set(
      activePackages
        .flatMap((pkg) => pkg.features.map((f: any) => f.name))
        .sort(),
    ),
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">مقارنة الباقات</h2>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(200px,1fr))]">
            {/* عنوان الجدول */}
            <div className="p-4 font-medium">الميزات</div>
            {activePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 text-center border-l border-t border-r rounded-t-lg bg-muted/30"
              >
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {pkg.description}
                </p>
                <div className="text-xl font-bold text-primary mb-1">
                  ₴ {pkg.monthlyPrice.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    /شهر
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  ₴ {pkg.yearlyPrice.toLocaleString()}
                  <span className="text-xs">/سنة</span>
                </div>
                {onSelectPackage && (
                  <Button
                    className="w-full"
                    onClick={() => onSelectPackage(pkg.id)}
                  >
                    اختيار الباقة
                  </Button>
                )}
              </div>
            ))}

            {/* حدود الاستخدام */}
            <div className="p-4 font-medium border-t bg-muted/10">
              حدود الاستخدام
            </div>
            {activePackages.map((pkg) => (
              <div
                key={`${pkg.id}-limits`}
                className="p-4 text-center border-l border-t border-r bg-muted/10"
              >
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      المستخدمين
                    </span>
                    <span className="font-medium">{pkg.limits.users}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      المساحة
                    </span>
                    <span className="font-medium">{pkg.limits.storage}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      العملاء
                    </span>
                    <span className="font-medium">{pkg.limits.customers}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">
                      المنتجات
                    </span>
                    <span className="font-medium">{pkg.limits.products}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* الوحدات والميزات */}
            <div className="p-4 font-medium border-t bg-muted/10">
              الوحدات والميزات
            </div>
            {activePackages.map((pkg) => (
              <div
                key={`${pkg.id}-features-header`}
                className="p-4 text-center border-l border-t border-r bg-muted/10"
              ></div>
            ))}

            {/* صفوف الميزات */}
            {allFeatures.map((featureName) => (
              <React.Fragment key={featureName}>
                <div className="p-4 border-t">{featureName}</div>
                {activePackages.map((pkg) => {
                  const feature = pkg.features.find(
                    (f: any) => f.name === featureName,
                  );
                  const included = feature ? feature.included : false;

                  return (
                    <div
                      key={`${pkg.id}-${featureName}`}
                      className="p-4 text-center border-l border-t border-r"
                    >
                      {included ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* الصف الأخير */}
            <div className="p-4 border-t"></div>
            {activePackages.map((pkg) => (
              <div
                key={`${pkg.id}-footer`}
                className="p-4 text-center border-l border-t border-r border-b rounded-b-lg"
              >
                {onSelectPackage && (
                  <Button
                    className="w-full"
                    onClick={() => onSelectPackage(pkg.id)}
                  >
                    اختيار الباقة
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageComparison;
