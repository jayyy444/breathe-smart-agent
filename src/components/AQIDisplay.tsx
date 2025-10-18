import { Card } from "@/components/ui/card";
import { Wind, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AQIDisplayProps {
  data: any;
  loading: boolean;
}

export const AQIDisplay = ({ data, loading }: AQIDisplayProps) => {
  if (loading) {
    return (
      <Card className="glass-card p-6">
        <Skeleton className="h-40 w-full" />
      </Card>
    );
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-success";
    if (aqi <= 100) return "text-warning";
    return "text-danger";
  };

  const getAQIBg = (aqi: number) => {
    if (aqi <= 50) return "bg-success/10";
    if (aqi <= 100) return "bg-warning/10";
    return "bg-danger/10";
  };

  return (
    <Card className="glass-card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{data?.location}</span>
          </div>
          <Wind className="h-5 w-5 text-primary" />
        </div>

        <div className="flex items-end gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Air Quality Index</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${getAQIColor(data?.aqi || 0)}`}>
                {data?.aqi}
              </span>
              <span className="text-lg text-muted-foreground">AQI</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${getAQIBg(data?.aqi || 0)} mb-2`}>
            <span className={`text-sm font-semibold ${getAQIColor(data?.aqi || 0)}`}>
              {data?.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">PM2.5</p>
            <p className="text-lg font-semibold">{data?.pm25} <span className="text-xs">μg/m³</span></p>
          </div>
          <div className="p-3 rounded-xl bg-accent/50">
            <p className="text-xs text-muted-foreground mb-1">PM10</p>
            <p className="text-lg font-semibold">{data?.pm10} <span className="text-xs">μg/m³</span></p>
          </div>
        </div>
      </div>
    </Card>
  );
};
