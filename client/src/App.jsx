import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster }         from 'react-hot-toast';
import { AuthProvider }    from './context/AuthContext';
import SmoothScroll        from './components/SmoothScroll';
import CustomCursor        from './components/CustomCursor';
import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import ScrollToTop         from './components/ScrollToTop';
import Home                from './pages/Home';
import Resume              from './pages/Resume';
import Projects            from './pages/Projects';
import Skills              from './pages/Skills';
import About               from './pages/About';
import Contact             from './pages/Contact';
import AdminLogin          from './pages/admin/AdminLogin';
import AdminDashboard      from './pages/admin/AdminDashboard';
import NebulaBg            from './components/NebulaBg';
import { Analytics }       from '@vercel/analytics/react';

// AnimatePresence needs access to useLocation — must be inside BrowserRouter
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<Home />} />
        <Route path="/resume"          element={<Resume />} />
        <Route path="/projects"        element={<Projects />} />
        <Route path="/skills"          element={<Skills />} />
        <Route path="/about"           element={<About />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="/admin"           element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SmoothScroll>
          <CustomCursor />
          <NebulaBg />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background:   '#111111',
              color:        '#ffffff',
              border:       '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0px',
              fontSize:     '13px',
              fontFamily:   'Kanit, sans-serif',
            },
          }}
        />
        <Analytics />
      </BrowserRouter>
    </AuthProvider>
  );
}
