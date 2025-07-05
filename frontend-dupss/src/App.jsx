import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/homepage/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Profile from './components/auth/Profile';
import ChangePassword from './components/auth/ChangePassword';
import AboutUs from './components/about/AboutUs';
import Appointment from './components/appointment/Appointment';
import AppointmentReview from './components/appointment/AppointmentReview';
import VideoMeeting from './components/appointment/VideoMeeting';
import BlogDetail from './components/blogs/BlogDetail';
import BlogsList from './components/blogs/BlogsList';
import CoursesList from './components/courses/CoursesList';
import CourseDetail from './components/courses/CourseDetail';
import CourseLearning from './components/courses/CourseLearning';
import CourseCertificate from './components/courses/CourseCertificate';
import CourseQuiz from './components/courses/CourseQuiz';
import SurveysList from './components/surveys/SurveysList';
import SurveyDetail from './components/surveys/SurveyDetail';
import AlertNotification from './components/common/AlertNotification';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AlertNotification />
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />
        <Route path="/forgot-password" element={
          <Layout>
            <ForgotPassword />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
        <Route path="/change-password" element={
          <Layout>
            <ChangePassword />
          </Layout>
        } />
        <Route path="/about-us" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />
        <Route path="/appointment" element={
          <Layout>
            <Appointment />
          </Layout>
        } />
        <Route path="/appointment/:id/review" element={
          <Layout>
            <AppointmentReview />
          </Layout>
        } />
        <Route path="/appointment/:videoCallId/meeting" element={
          <Layout>
            <VideoMeeting />
          </Layout>
        } />
        <Route path="/blogs" element={
          <Layout>
            <BlogsList />
          </Layout>
        } />
        <Route path="/blogs/:id" element={
          <Layout>
            <BlogDetail />
          </Layout>
        } />
        <Route path="/courses" element={
          <Layout>
            <CoursesList />
          </Layout>
        } />
        <Route path="/courses/:id" element={
          <Layout>
            <CourseDetail />
          </Layout>
        } />
        <Route path="/courses/:id/learn" element={
          <Layout>
            <CourseLearning />
          </Layout>
        } />
        <Route path="/courses/:id/quiz" element={
          <Layout>
            <CourseQuiz />
          </Layout>
        } />
        <Route path="/courses/:courseId/cert/:userId" element={
          <Layout>
            <CourseCertificate />
          </Layout>
        } />
        <Route path="/surveys" element={
          <Layout>
            <SurveysList />
          </Layout>
        } />
        <Route path="/surveys/:id" element={
          <Layout>
            <SurveyDetail />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App