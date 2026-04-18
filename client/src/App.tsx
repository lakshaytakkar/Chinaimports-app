import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import AppLauncher from "@/pages/AppLauncher";
import { ElementLoginEmptyState } from "@/pages/ElementLoginEmptyState";
import SplashScreen from "@/pages/SplashScreen";
import GetStarted from "@/pages/GetStarted";
import Activity from "@/pages/Activity";
import Notifications from "@/pages/Notifications";
import HomeV2 from "@/pages/HomeV2";
import Successful from "@/pages/Successful";

import SupransOnboarding from "@/pages/suprans/SupransOnboarding";
import SupransApp from "@/pages/suprans/SupransApp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppLauncher} />

      <Route path="/flock" component={ElementLoginEmptyState} />
      <Route path="/splash" component={SplashScreen} />
      <Route path="/get-started" component={GetStarted} />
      <Route path="/home" component={HomeV2} />
      <Route path="/activity" component={Activity} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/successful" component={Successful} />

      <Route path="/suprans">
        <Redirect to="/suprans/onboarding" />
      </Route>
      <Route path="/suprans/onboarding" component={SupransOnboarding} />
      <Route path="/suprans/chat" component={SupransApp} />
      <Route path="/suprans/explore" component={SupransApp} />
      <Route path="/suprans/projects" component={SupransApp} />
      <Route path="/suprans/account" component={SupransApp} />

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
