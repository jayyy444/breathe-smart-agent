import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Wind, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { AQIDisplay } from "@/components/AQIDisplay";
import { RiskScoreCard } from "@/components/RiskScoreCard";
import { QuickActions } from "@/components/QuickActions";

const Home = () => {
  const navigate = useNavigate();
  const [aqiData, setAqiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AQI data fetch - will integrate real API later
    setTimeout(() => {
      setAqiData({
        aqi: 78,
        status: "Moderate",
        pm25: 28,
        pm10: 45,
        location: "San Francisco",
      });
      setLoading(false);
    }, 1000);
  }, []);

  const riskScore = aqiData ? Math.min(100, Math.round((aqiData.aqi / 150) * 100)) : 0;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Breathe Smart
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Your AI Health Guardian</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full"
          >
            <Activity className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-6">
        {/* AQI Display */}
        <AQIDisplay data={aqiData} loading={loading} />

        {/* Risk Score */}
        <RiskScoreCard score={riskScore} />

        {/* AI Assistant CTA */}
        <Card className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Health Assistant</h3>
                <p className="text-xs text-muted-foreground">Get personalized advice</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ask me anything about air quality, breathing exercises, or health tips.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <QuickActions />

        {/* Health Insights */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Today's Insights</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/tracker")}
              className="text-primary hover:text-primary"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50">
              <Wind className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Air Quality Update</p>
                <p className="text-xs text-muted-foreground">
                  Moderate levels detected. Consider limiting outdoor activities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50">
              <TrendingUp className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium">Health Streak</p>
                <p className="text-xs text-muted-foreground">
                  7 days of maintaining good respiratory health! Keep it up.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-6 py-4">
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/")}>
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-xs text-primary">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/tracker")}>
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Tracker</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/actions")}>
            <AlertTriangle className="h-5 w-5" />
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

export default Home;
