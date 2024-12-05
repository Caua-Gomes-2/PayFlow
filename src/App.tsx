import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentForm } from './components/payment/PaymentForm';
import { Card } from './components/ui/Card';
import { Logo } from './components/ui/Logo';
import { AdminLayout } from './admin/components/AdminLayout';
import { LoginForm } from './admin/components/LoginForm';
import { AuthProvider } from './admin/providers/AuthProvider';
import { DashboardOverview } from './admin/components/dashboard/DashboardOverview';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Payment Routes */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Logo className="w-8 h-8 text-primary-600" />
                      <h1 className="text-2xl font-bold text-gray-900">PayFlow</h1>
                    </div>
                    <PaymentForm />
                  </div>
                </Card>
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="transactions" element={<div>Transactions Content</div>} />
            <Route path="users" element={<div>Users Content</div>} />
            <Route path="reports" element={<div>Reports Content</div>} />
            <Route path="activity" element={<div>Activity Log Content</div>} />
            <Route path="settings" element={<div>Settings Content</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;