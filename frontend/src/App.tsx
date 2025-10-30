import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import JobsPosted from "./pages/JobsPosted";
import CustomerAnalysis from "./pages/CustomerAnalysis";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import { useEffect } from 'react';
import { fetchProfile } from './store/slices/authSlice';
import { useAppDispatch } from './store/hooks';

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Sonner />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="jobs" element={<JobsPosted />} />
              <Route path="analysis" element={<CustomerAnalysis />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  </Provider>
);


export default App;
