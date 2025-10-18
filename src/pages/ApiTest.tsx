import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ApiTest = () => {
  const navigate = useNavigate();
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testApiKey = async () => {
    setTesting(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('test-weather-api');

      if (error) throw error;

      setResult(data);
      
      if (data.success) {
        toast.success("API Key is working!");
      } else {
        toast.error("API Key test failed");
      }
    } catch (error: any) {
      console.error('Error testing API:', error);
      setResult({ 
        success: false, 
        error: error.message || 'Failed to test API key' 
      });
      toast.error("Failed to test API key");
    } finally {
      setTesting(false);
    }
  };

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
            <h1 className="text-xl font-bold">API Test</h1>
            <p className="text-xs text-muted-foreground">Test OpenWeather API Key</p>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4">OpenWeather API Status</h3>
          
          <Button 
            onClick={testApiKey} 
            disabled={testing}
            className="w-full gradient-primary text-white"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Test API Key'
            )}
          </Button>

          {result && (
            <div className="mt-6 p-4 rounded-xl bg-accent/30 border border-border">
              <div className="flex items-center gap-2 mb-3">
                {result.success ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-500">Success!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-red-500">Failed</span>
                  </>
                )}
              </div>

              {result.success ? (
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{result.message}</p>
                  <div className="mt-3 p-3 bg-background/50 rounded-lg">
                    <p className="font-medium mb-1">Test Location: London</p>
                    <p className="text-muted-foreground">
                      Air Quality Index: <span className="font-semibold text-primary">{result.aqi}</span>
                      {result.aqi === 1 && " (Good)"}
                      {result.aqi === 2 && " (Fair)"}
                      {result.aqi === 3 && " (Moderate)"}
                      {result.aqi === 4 && " (Poor)"}
                      {result.aqi === 5 && " (Very Poor)"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  <p className="text-red-500 font-medium">Error: {result.error}</p>
                  {result.details && (
                    <pre className="mt-2 p-2 bg-background/50 rounded text-xs overflow-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-3">About OpenWeather API</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>The OpenWeather API provides:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Real-time Air Quality Index (AQI)</li>
              <li>Pollutant concentrations (CO, NO, NO₂, O₃, SO₂, PM2.5, PM10, NH₃)</li>
              <li>Weather conditions and forecasts</li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ApiTest;
