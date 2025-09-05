import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ConfigProvider } from './context/ConfigContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WizardPage from './pages/WizardPage';

// This component contains the main layout and routing logic.
// It's wrapped by the Router so it can use navigation hooks.
const AppContent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // On every initial load or refresh, force navigation to the homepage.
    // This ensures a consistent starting point in the AI Studio environment.
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/wizard" element={<WizardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
