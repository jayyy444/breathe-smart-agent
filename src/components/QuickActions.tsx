import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, TrendingUp, Heart, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: TrendingUp,
      label: "View Tracker",
      path: "/tracker",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Heart,
      label: "Health Tips",
      path: "/chat",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: AlertTriangle,
      label: "Actions",
      path: "/actions",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Bell,
      label: "Alerts",
      path: "/profile",
      color: "text-danger",
      bg: "bg-danger/10",
    },
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3 px-1">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Card
            key={action.label}
            className="glass-card p-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(action.path)}
          >
            <div className={`p-3 rounded-xl ${action.bg} w-fit mb-3`}>
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <p className="text-sm font-medium">{action.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
