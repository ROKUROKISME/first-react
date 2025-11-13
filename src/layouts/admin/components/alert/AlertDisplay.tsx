import { useAlertStore } from "@/store/alertStore";
import BasicAlert from "@/layouts/admin/components/alert/BasicAlert";

const AlertDisplay = () => {
  const alerts = useAlertStore((state) => state.alerts);

  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <BasicAlert msg={alert.message} variant={alert.variant} />
        </div>
      ))}
    </div>
  );
};

export default AlertDisplay;
