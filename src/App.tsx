import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./pages/dashboard";
import Accounting from "./pages/accounting";
import Sales from "./pages/sales";
import Purchases from "./pages/purchases";
import Inventory from "./pages/inventory";
import Manufacturing from "./pages/manufacturing";
import CRM from "./pages/crm";
import Calendar from "./pages/calendar";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import Help from "./pages/help";
import HRPage from "./pages/hr";
import HRPerformance from "./pages/hr/performance";
import HRAttendance from "./pages/hr/attendance";
import HRPerformanceTable from "./pages/hr/performance-table";
import SaaSAdminPage from "./pages/saas-admin";
import WorkflowPage from "./pages/workflow";
import WorkflowDesignerPage from "./pages/workflow/designer";
import WorkflowEnginePage from "./pages/workflow/engine";
import WorkflowIntegrationPage from "./pages/workflow/integration";
import routes from "tempo-routes";

function App() {
  // Render Tempo routes conditionally
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <>
      {tempoRoutes}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/hr" element={<HRPage />} />
          <Route path="/hr/performance" element={<HRPerformance />} />
          <Route
            path="/hr/performance-table"
            element={<HRPerformanceTable />}
          />
          <Route path="/hr/attendance" element={<HRAttendance />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/saas-admin" element={<SaaSAdminPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/workflow/designer" element={<WorkflowDesignerPage />} />
          <Route path="/workflow/engine" element={<WorkflowEnginePage />} />
          <Route
            path="/workflow/integration"
            element={<WorkflowIntegrationPage />}
          />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
