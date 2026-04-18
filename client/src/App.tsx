import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ElementLoginEmptyState } from "@/pages/ElementLoginEmptyState";
import SplashScreen from "@/pages/SplashScreen";
import GetStarted from "@/pages/GetStarted";
import Activity from "@/pages/Activity";
import Notifications from "@/pages/Notifications";
import HomeV2 from "@/pages/HomeV2";
import Successful from "@/pages/Successful";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ElementLoginEmptyState} />
      <Route path="/splash" component={SplashScreen} />
      <Route path="/get-started" component={GetStarted} />
      <Route path="/home" component={HomeV2} />
      <Route path="/activity" component={Activity} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/successful" component={Successful} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
