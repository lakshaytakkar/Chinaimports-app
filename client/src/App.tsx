import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import AppLauncher from "@/pages/AppLauncher";

import ChinaImportsOnboarding from "@/pages/chinaimports/ChinaImportsOnboarding";
import ChinaImportsApp from "@/pages/chinaimports/ChinaImportsApp";

import SupransHubOnboarding from "@/pages/supranshub/SupransHubOnboarding";
import SupransHubApp from "@/pages/supranshub/SupransHubApp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppLauncher} />

      <Route path="/chinaimports" component={ChinaImportsApp} />
      <Route path="/chinaimports/onboarding" component={ChinaImportsOnboarding} />
      <Route path="/chinaimports/chat" component={ChinaImportsApp} />
      <Route path="/chinaimports/explore" component={ChinaImportsApp} />
      <Route path="/chinaimports/projects" component={ChinaImportsApp} />
      <Route path="/chinaimports/account" component={ChinaImportsApp} />
      <Route path="/chinaimports/requests" component={ChinaImportsApp} />
      <Route path="/chinaimports/requests/:id" component={ChinaImportsApp} />

      <Route path="/supranshub" component={SupransHubApp} />
      <Route path="/supranshub/onboarding" component={SupransHubOnboarding} />
      <Route path="/supranshub/home" component={SupransHubApp} />
      <Route path="/supranshub/events" component={SupransHubApp} />
      <Route path="/supranshub/services" component={SupransHubApp} />
      <Route path="/supranshub/account" component={SupransHubApp} />
      <Route path="/supranshub/product/:id" component={SupransHubApp} />

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
