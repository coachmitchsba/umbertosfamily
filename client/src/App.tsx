import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Catering from "./pages/Catering";
import PrivateEvents from "./pages/PrivateEvents";
import Locations from "./pages/Locations";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Order from "./pages/Order";
import Arcade from "./pages/Arcade";
import Massapequa from "./pages/Massapequa";
import Farmingdale from "./pages/Farmingdale";
import Shipping from "./pages/Shipping";
import Rewards from "./pages/Rewards";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/catering" component={Catering} />
      <Route path="/private-events" component={PrivateEvents} />
      <Route path="/locations" component={Locations} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/order" component={Order} />
      <Route path="/arcade" component={Arcade} />
      <Route path="/massapequa" component={Massapequa} />
      <Route path="/farmingdale" component={Farmingdale} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
