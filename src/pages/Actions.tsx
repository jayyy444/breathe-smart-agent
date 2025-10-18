import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle2, Circle, Bell, Clock } from "lucide-react";
import { useState } from "react";

interface Action {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  time?: string;
}

const Actions = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      title: "Stay Indoors",
      description: "Air quality is moderate. Limit outdoor activities until evening.",
      completed: false,
      priority: "high",
      time: "All day",
    },
    {
      id: "2",
      title: "Breathing Exercise",
      description: "Practice 5-minute deep breathing to improve lung capacity.",
      completed: true,
      priority: "medium",
      time: "Morning",
    },
    {
      id: "3",
      title: "Air Purifier Check",
      description: "Ensure your air purifier is running in the bedroom.",
      completed: false,
      priority: "medium",
      time: "Evening",
    },
    {
      id: "4",
      title: "Hydration Goal",
      description: "Drink 8 glasses of water to help cleanse respiratory system.",
      completed: false,
      priority: "low",
      time: "Throughout day",
    },
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleAction = (id: string) => {
    setActions(
      actions.map((action) =>
        action.id === id ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-danger bg-danger/10";
      case "medium":
        return "text-warning bg-warning/10";
      case "low":
        return "text-success bg-success/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const completedCount = actions.filter((a) => a.completed).length;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-6 pb-4 bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Preventive Actions</h1>
            <p className="text-xs text-muted-foreground">
              {completedCount} of {actions.length} completed
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Progress Card */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">Today's Progress</h3>
              <p className="text-xs text-muted-foreground">Keep up the good work!</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round((completedCount / actions.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-500"
              style={{ width: `${(completedCount / actions.length) * 100}%` }}
            />
          </div>
        </Card>

        {/* Notifications Toggle */}
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Smart Notifications</p>
                <p className="text-xs text-muted-foreground">Get timely health reminders</p>
              </div>
            </div>
            <Checkbox
              checked={notificationsEnabled}
              onCheckedChange={(checked) => setNotificationsEnabled(checked as boolean)}
            />
          </div>
        </Card>

        {/* Actions List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg px-1">Recommended Actions</h3>
          {actions.map((action) => (
            <Card
              key={action.id}
              className={`glass-card p-4 cursor-pointer transition-all ${
                action.completed ? "opacity-60" : ""
              }`}
              onClick={() => toggleAction(action.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {action.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-medium ${
                        action.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {action.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                        action.priority
                      )}`}
                    >
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                  {action.time && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {action.time}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Suggestion */}
        <Card className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <h4 className="font-semibold mb-2">💡 AI Suggestion</h4>
            <p className="text-sm text-muted-foreground">
              Based on tomorrow's forecast, consider preparing your mask and scheduling indoor
              activities for the afternoon when AQI peaks.
            </p>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-6 py-4">
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/")}>
            <Bell className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/tracker")}>
            <Bell className="h-5 w-5" />
            <span className="text-xs">Tracker</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/actions")}>
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-xs text-primary">Actions</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/profile")}>
            <Bell className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Actions;
