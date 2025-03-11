import React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeClass } from "@/utils/formatters";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Badge variant="outline" className={getStatusBadgeClass(status)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
