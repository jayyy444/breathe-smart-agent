import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";

interface RiskScoreCardProps {
  score: number;
}

export const RiskScoreCard = ({ score }: RiskScoreCardProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { text: "Low Risk", color: "text-success" };
    if (score < 70) return { text: "Moderate Risk", color: "text-warning" };
    return { text: "High Risk", color: "text-danger" };
  };

  const risk = getRiskLevel(score);

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Respiratory Risk Score</h3>
          <p className="text-xs text-muted-foreground">Based on your health profile</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <span className="text-4xl font-bold">{score}</span>
          <span className={`text-sm font-semibold ${risk.color}`}>{risk.text}</span>
        </div>
        <Progress value={score} className="h-2" />
        <p className="text-xs text-muted-foreground">
          Your risk score is calculated based on current air quality and your health conditions.
        </p>
      </div>
    </Card>
  );
};
