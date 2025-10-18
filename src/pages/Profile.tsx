import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, MapPin, Heart, Bell, LogOut } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-xs text-muted-foreground">Manage your health profile</p>
          </div>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Profile Card */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              JS
            </div>
            <div>
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-sm text-muted-foreground">john.smith@email.com</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <User className="mr-2 h-4 w-4" />
            Edit Profile Picture
          </Button>
        </Card>

        {/* Personal Info */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Smith" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" defaultValue="32" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select defaultValue="male">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="San Francisco" className="mt-2" />
            </div>
            <p className="text-xs text-muted-foreground">
              We use your location to provide accurate air quality data and health recommendations.
            </p>
          </div>
        </Card>

        {/* Health Conditions */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Health Conditions
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="conditions">Respiratory Conditions</Label>
              <Select defaultValue="asthma">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="asthma">Asthma</SelectItem>
                  <SelectItem value="allergies">Allergies</SelectItem>
                  <SelectItem value="copd">COPD</SelectItem>
                  <SelectItem value="multiple">Multiple Conditions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              This information helps us provide personalized health advice and risk assessments.
            </p>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
              <span className="text-sm">Daily Health Reports</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
              <span className="text-sm">AQI Alerts</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
              <span className="text-sm">Health Tips</span>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pb-6">
          <Button className="w-full gradient-primary text-white hover:opacity-90">
            Save Changes
          </Button>
          <Button variant="outline" className="w-full text-danger border-danger hover:bg-danger/10">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
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
            <Bell className="h-5 w-5" />
            <span className="text-xs">Actions</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto" onClick={() => navigate("/profile")}>
            <User className="h-5 w-5 text-primary" />
            <span className="text-xs text-primary">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
