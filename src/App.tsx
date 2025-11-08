import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Leads />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Placeholder routes for other pages */}
            <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Веб-аналітика</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Email-кампанії</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/social" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Соцмережі</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Звіти</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">AI-Асистент</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><DashboardLayout><div className="text-center py-20"><h1 className="text-2xl font-bold">Налаштування</h1><p className="text-muted-foreground">Coming soon...</p></div></DashboardLayout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
