import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Tracker = () => {
  const navigate = useNavigate();

  const aqiData = [
    { time: "Mon", aqi: 45 },
    { time: "Tue", aqi: 62 },
    { time: "Wed", aqi: 78 },
    { time: "Thu", aqi: 55 },
    { time: "Fri", aqi: 48 },
    { time: "Sat", aqi: 72 },
    { time: "Sun", aqi: 65 },
  ];

  const stats = [
    { label: "Avg AQI", value: "62", trend: "down", change: "-5%" },
    { label: "Exposure Time", value: "4.2h", trend: "down", change: "-12%" },
    { label: "Health Score", value: "85", trend: "up", change: "+3%" },
  ];

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
            <h1 className="text-xl font-bold">Health Tracker</h1>
            <p className="text-xs text-muted-foreground">Your weekly overview</p>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-success" />
                )}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-success mt-1">{stat.change}</p>
            </Card>
          ))}
        </div>

        {/* AQI Chart */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">AQI Exposure</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              Last 7 Days
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Logs */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4">Daily Health Logs</h3>
          <div className="space-y-3">
            {[
              { date: "Today", mood: "Good", oxygen: "98%", note: "Feeling great" },
              { date: "Yesterday", mood: "Fair", oxygen: "97%", note: "Slight congestion" },
              { date: "2 days ago", mood: "Good", oxygen: "99%", note: "Excellent day" },
            ].map((log) => (
              <div
                key={log.date}
                className="flex items-center justify-between p-4 rounded-xl bg-accent/50"
              >
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{log.date}</p>
                    <p className="text-xs text-muted-foreground">{log.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{log.mood}</p>
                  <p className="text-xs text-muted-foreground">O₂: {log.oxygen}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-6 py-4">
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/")}>
            <Activity className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/tracker")}>
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs text-primary">Tracker</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/actions")}>
            <Activity className="h-5 w-5" />
            <span className="text-xs">Actions</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/profile")}>
            <Activity className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Tracker;
