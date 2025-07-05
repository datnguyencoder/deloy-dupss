import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderManager from './layout/HeaderManager';
import HeaderAdmin from './layout/Header';
import Dashboard from './pages/manager/Dashboard';
import EmployeeManagement from './pages/manager/EmployeeManagement';
import ContentReview from './pages/manager/ContentReview';
import Topic from './pages/manager/Topic';
import HistoryManager from './pages/manager/HistoryManager';
import Login from './pages/Login';
import AdminPage from './pages/admin/AdminPage';
import HeaderConsultant from './layout/HeaderConsultant';
import ConsultantDashboard from './pages/consultant/Dashboard';
import Schedule from './pages/consultant/Schedule';
import SlotRegistration from './pages/consultant/SlotRegistration';
import History from './pages/consultant/History';
import HeaderStaff from './layout/HeaderStaff';
import StaffDashboard from './pages/staff/Dashboard';
import CreateBlog from './pages/staff/CreateBlog';
import CreateCourse from './pages/staff/CreateCourse';
import CreateSurvey from './pages/staff/CreateSurvey';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import { isAuthenticated, getUserInfo, checkAndRefreshToken } from './utils/auth';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      
      // Verify token and refresh if needed
      const tokenValid = await checkAndRefreshToken();
      
      if (!tokenValid) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      
      // Check role if required
      if (requiredRole) {
        const userInfo = getUserInfo();
        if (userInfo && userInfo.role) {
          // Check if user has the required role
          const hasRole = userInfo.role.includes(requiredRole) || 
                          userInfo.role === requiredRole.replace('ROLE_', '').toLowerCase();
          setAuthorized(hasRole);
        } else {
          setAuthorized(false);
        }
      } else {
        setAuthorized(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [requiredRole]);
  
  if (loading) {
    return <div>Đang tải...</div>;
  }
  
  return authorized ? children : <Navigate to="/login" replace />;
};

function App() {
  const [userInfo, setUserInfo] = useState(null);
  
  // Hàm để cập nhật thông tin người dùng từ localStorage
  const updateUserInfo = () => {
    const info = getUserInfo();
    if (info) {
      setUserInfo(info);
    }
  };
  
  useEffect(() => {
    // Load user info from localStorage khi component được mount
    updateUserInfo();
    
    // Thêm event listener để lắng nghe thay đổi trong localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'userInfo') {
        updateUserInfo();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Kiểm tra userInfo định kỳ (mỗi 5 giây)
    const interval = setInterval(() => {
      updateUserInfo();
    }, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login updateUserInfo={updateUserInfo} />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <>
                  <HeaderAdmin userName={userInfo?.fullName || 'Admin'} />
                  <main className="content">
                    <Routes>
                      <Route path="dashboard" element={<AdminPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="change-password" element={<ChangePassword />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute requiredRole="ROLE_MANAGER">
                <>
                  <HeaderManager userName={userInfo?.fullName || 'Manager'} />
                  <main className="content">
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="employees" element={<EmployeeManagement />} />
                      <Route path="content-review" element={<ContentReview />} />
                      <Route path="history" element={<HistoryManager />} />
                      <Route path="topics" element={<Topic />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="change-password" element={<ChangePassword />} />
                      <Route path="*" element={<Navigate to="/manager/dashboard" replace />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            }
          />

          {/* Consultant Routes */}
          <Route
            path="/consultant/*"
            element={
              <ProtectedRoute requiredRole="ROLE_CONSULTANT">
                <>
                  <HeaderConsultant userName={userInfo?.fullName || 'Consultant'} />
                  <main className="content">
                    <Routes>
                      <Route path="dashboard" element={<ConsultantDashboard />} />
                      <Route path="schedule" element={<Schedule />} />
                      <Route path="slot-registration" element={<SlotRegistration />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="change-password" element={<ChangePassword />} />
                      <Route path="history" element={<History />} />
                      <Route path="*" element={<Navigate to="/consultant/dashboard" replace />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/*"
            element={
              <ProtectedRoute requiredRole="ROLE_STAFF">
                <>
                  <HeaderStaff userName={userInfo?.fullName || 'Staff'} />
                  <main className="content">
                    <Routes>
                      <Route path="dashboard" element={<StaffDashboard />} />
                      <Route path="create-blog" element={<CreateBlog />} />
                      <Route path="create-course" element={<CreateCourse />} />
                      <Route path="create-survey" element={<CreateSurvey />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="change-password" element={<ChangePassword />} />
                      <Route path="*" element={<Navigate to="/staff/dashboard" replace />} />
                    </Routes>
                  </main>
                </>
              </ProtectedRoute>
            }
          />

          {/* Default Route: chuyển hướng về /login nếu không khớp */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
