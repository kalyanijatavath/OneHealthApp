import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import CardPreviewPage from './components/CardPreviewPage';
import LawsPage from './components/LawsPage';
import NotificationsPage from './components/NotificationsPage';
import ResourcesPage from './components/ResourcesPage';
import ContactPage from './components/ContactPage';
import LoginPage from "./components/LoginPage";

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('login'); // Start with login page
  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('oneHealthUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserInfo(user);
        setIsAuthenticated(true);
        setActivePage('home');
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('oneHealthUser');
      }
    }

    // Set demo data for initial card preview
    const demoData = {
      fullName: 'Rajesh Kumar',
      dob: '1985-04-01',
      gender: 'male',
      bloodGroup: 'O+',
      aadhaar: '123456789012',
      phone: '9876543210',
      email: 'rajesh@example.com',
      emergencyName: 'Priya Kumar',
      emergencyPhone: '9123456780',
      houseNo: '123',
      street: 'Main Street',
      city: 'Delhi',
      district: 'New Delhi',
      state: 'delhi',
      pincode: '110001'
    };
    setUserData(demoData);
    
    // Set initial card data
    const formattedDOB = '01/04/1985';
    const familyId = 'FAM-3056';
    const memberId = 'MEM-3800';
    
    const initialCardData = {
      name: 'RAJESH KUMAR',
      dob: formattedDOB,
      bloodGroup: 'O+',
      emergency: '9123456780',
      familyId: familyId,
      memberId: memberId,
      qrData: JSON.stringify({
        name: 'Rajesh Kumar',
        dob: '1985-04-01',
        bloodGroup: 'O+',
        phone: '9876543210',
        emergencyContact: '9123456780',
        familyId: familyId,
        memberId: memberId,
        lastUpdated: new Date().toISOString().split('T')[0]
      })
    };
    
    setCardData(initialCardData);
  }, []);

  const handleLogin = (user) => {
    setUserInfo(user);
    setIsAuthenticated(true);
    setActivePage('home');
    
    // Save user to localStorage
    localStorage.setItem('oneHealthUser', JSON.stringify(user));
    
    // Show welcome message
    setTimeout(() => {
      alert(`Welcome back, ${user.name || user.email || user.phone}!`);
    }, 100);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setActivePage('login');
    localStorage.removeItem('oneHealthUser');
    localStorage.removeItem('oneHealthOTPVerified');
    alert('You have been logged out successfully.');
  };

  const handleNavigation = (page) => {
    if (!isAuthenticated && page !== 'login') {
      setActivePage('login');
      return;
    }
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleRegistration = (data) => {
    setUserData(data);
    
    // Generate card data from registration form
    const dob = new Date(data.dob);
    const formattedDOB = `${String(dob.getDate()).padStart(2, '0')}/${String(dob.getMonth() + 1).padStart(2, '0')}/${dob.getFullYear()}`;
    
    // Generate IDs like in original HTML
    const familyId = 'FAM-' + Math.floor(1000 + Math.random() * 9000);
    const memberId = 'MEM-' + String(Math.floor(1 + Math.random() * 9)).padStart(3, '0');
    
    const newCardData = {
      name: data.fullName.toUpperCase(),
      dob: formattedDOB,
      bloodGroup: data.bloodGroup,
      emergency: data.emergencyPhone,
      familyId: familyId,
      memberId: memberId,
      qrData: JSON.stringify({
        name: data.fullName,
        dob: data.dob,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        emergencyContact: data.emergencyPhone,
        familyId: familyId,
        memberId: memberId,
        lastUpdated: new Date().toISOString().split('T')[0]
      })
    };
    
    setCardData(newCardData);
    setActivePage('card-preview');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
    
    // Show success message exactly like in original HTML
    setTimeout(() => {
      alert('Registration successful! Your Health Card has been generated.');
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDownloadApp = () => {
    alert('One Health Mobile App is available for download on Google Play Store and Apple App Store.');
  };

  const handleRegisterClick = () => {
    setActivePage('registration');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleRegisterAnother = () => {
    setActivePage('registration');
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Render active page
  const renderActivePage = () => {
    if (!isAuthenticated && activePage !== 'login') {
      return <LoginPage isActive={true} onLogin={handleLogin} />;
    }

    const commonProps = {
      isActive: true
    };

    switch (activePage) {
      case 'login':
        return <LoginPage {...commonProps} onLogin={handleLogin} />;
      case 'home':
        return (
          <HomePage 
            {...commonProps}
            onNavigate={handleNavigation}
            onRegisterClick={handleRegisterClick}
            onDownloadApp={handleDownloadApp}
            onViewCard={() => handleNavigation('card-preview')}
            userInfo={userInfo}
            onLogout={handleLogout}
          />
        );
      case 'registration':
        return (
          <RegistrationPage 
            {...commonProps}
            onNavigate={handleNavigation}
            onSubmit={handleRegistration}
            onBack={() => handleNavigation('home')}
          />
        );
      case 'card-preview':
        return (
          <CardPreviewPage 
            {...commonProps}
            cardData={cardData}
            onNavigate={handleNavigation}
            onRegisterAnother={handleRegisterAnother}
            onDownload={() => {
              alert('In a real application, this would download a PDF of your health card. For now, you can print the page.');
            }}
          />
        );
      case 'laws':
        return <LawsPage {...commonProps} />;
      case 'notifications':
        return <NotificationsPage {...commonProps} />;
      case 'pdfs':
        return <ResourcesPage {...commonProps} />;
      case 'contact':
        return <ContactPage {...commonProps} />;
      default:
        if (!isAuthenticated) {
          return <LoginPage {...commonProps} onLogin={handleLogin} />;
        }
        return (
          <HomePage 
            {...commonProps}
            onNavigate={handleNavigation}
            onRegisterClick={handleRegisterClick}
            onDownloadApp={handleDownloadApp}
            onViewCard={() => handleNavigation('card-preview')}
            userInfo={userInfo}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div className="App">
      {isAuthenticated && activePage !== 'login' && (
        <Header 
          activePage={activePage}
          onNavigate={handleNavigation}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
          onRegisterClick={handleRegisterClick}
          onDownloadApp={handleDownloadApp}
          userInfo={userInfo}
          onLogout={handleLogout}
        />
      )}
      <main>
        {renderActivePage()}
      </main>
      {isAuthenticated && activePage !== 'login' && (
        <Footer 
          onNavigate={handleNavigation}
          onDownloadApp={handleDownloadApp}
        />
      )}
    </div>
  );
}

export default App;