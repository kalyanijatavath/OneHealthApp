import React, { useState } from 'react';

const HomePage = ({ isActive, onNavigate, onRegisterClick, onDownloadApp, onViewCard, userInfo, onLogout }) => {
  const [faqItems, setFaqItems] = useState([
    {
      id: 1,
      question: 'How do I register for a One Health Card?',
      answer: 'You can register online through our website or mobile app by providing your personal details, contact information, and address. The system will automatically generate your Family ID and Member ID.',
      open: false
    },
    {
      id: 2,
      question: 'Is there any cost for the Health Card?',
      answer: 'No, the One Health Card is provided free of charge to all citizens as part of the government\'s healthcare initiative.',
      open: false
    },
    {
      id: 3,
      question: 'How is my health information protected?',
      answer: 'All health data is stored in a secure, encrypted database. Information is only accessible to authorized medical personnel during emergencies or with your explicit consent.',
      open: false
    },
    {
      id: 4,
      question: 'What should I do if I lose my Health Card?',
      answer: 'You can request a replacement card through our website or mobile app. Your existing Family ID and Member ID will remain the same for continuity of your health records.',
      open: false
    },
    {
      id: 5,
      question: 'Can I update my health information?',
      answer: 'Yes, you can update your health information anytime through our website or mobile app. Critical updates like new allergies or chronic conditions should be updated immediately.',
      open: false
    }
  ]);

  const toggleFAQ = (id) => {
    setFaqItems(faqItems.map(item => {
      if (item.id === id) {
        return { ...item, open: !item.open };
      }
      return { ...item, open: false };
    }));
  };

  const handleExploreFeatures = () => {
    onNavigate('registration');
  };

  return (
    <div id="home-page" className={`page ${isActive ? 'active' : ''}`}>
      {/* Welcome Banner */}
      {userInfo && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '15px 0',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-user-circle" style={{ fontSize: '20px', color: 'var(--primary-color)' }}></i>
                <span style={{ fontWeight: '500' }}>
                  Welcome, {userInfo.name || 'User'}! 
                  {userInfo.loginMethod === 'phone' ? ` (${userInfo.phone})` : ` (${userInfo.email})`}
                </span>
              </div>
              <button
                onClick={() => onNavigate('card-preview')}
                className="btn btn-small btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="fas fa-id-card"></i>
                View Health Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the HomePage component remains the same... */}
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Your Digital <span>Health Identity</span> for a Safer Tomorrow</h1>
              <p>The One Health Card System provides a unified digital health identity for every citizen, enabling instant access to medical information during emergencies and seamless healthcare services.</p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={onRegisterClick}>
                  Register for Health Card
                </button>
                <button className="btn btn-secondary" onClick={onDownloadApp}>
                  <i className="fas fa-download"></i> Download Mobile App
                </button>
              </div>
              <div className="card-preview" onClick={onViewCard} style={{ cursor: 'pointer', marginTop: '30px' }}>
                <div className="card-header">
                  <div className="card-logo">OneHealth</div>
                  <div className="card-chip"></div>
                </div>
                <div className="card-details">
                  <div>
                    <div className="card-number">FAM-3056 • MEM-3800</div>
                    <div className="card-holder">RAJESH KUMAR</div>
                  </div>
                  <div>
                    <div className="card-holder">O+</div>
                    <div className="card-holder">01/04/1985</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', opacity: 0.8 }}>
                  Click to view your Health Card
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why <span>One Health Card</span>?</h2>
          
          <div className="features">
            <div className="feature-card" onClick={() => onNavigate('card-preview')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-heartbeat feature-icon"></i>
              <h3>Emergency Use</h3>
              <p>Instant access to critical health information during emergencies through QR code scanning by medical personnel.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> View Health Card
              </div>
            </div>
            
            <div className="feature-card" onClick={handleExploreFeatures} style={{ cursor: 'pointer' }}>
              <i className="fas fa-users feature-icon"></i>
              <h3>Family-Based Tracking</h3>
              <p>Each family gets a unique Family ID with individual Member IDs for comprehensive health tracking.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> Register Now
              </div>
            </div>
            
            <div className="feature-card" onClick={() => onNavigate('laws')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3>Secure Database</h3>
              <p>All health data is stored securely with encryption and privacy controls, accessible only to authorized personnel.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> View Privacy Laws
              </div>
            </div>
          </div>
          
          <div className="features">
            <div className="feature-card" onClick={() => onNavigate('notifications')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-bolt feature-icon"></i>
              <h3>Quick Registration</h3>
              <p>Simple online registration process with auto-generated Family ID and Member ID for each individual.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> Latest Updates
              </div>
            </div>
            
            <div className="feature-card" onClick={onDownloadApp} style={{ cursor: 'pointer' }}>
              <i className="fas fa-mobile-alt feature-icon"></i>
              <h3>Mobile App</h3>
              <p>Download our mobile app to access your health card, update information, and find nearby health facilities.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> Download App
              </div>
            </div>
            
            <div className="feature-card" onClick={() => onNavigate('pdfs')} style={{ cursor: 'pointer' }}>
              <i className="fas fa-file-medical feature-icon"></i>
              <h3>Digital Health Records</h3>
              <p>Maintain digital health records including vaccinations, allergies, medications, and past treatments.</p>
              <div style={{ color: 'var(--primary-color)', marginTop: '10px', fontSize: '14px' }}>
                <i className="fas fa-arrow-right"></i> View Resources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{backgroundColor: '#f0f7ff'}}>
        <div className="container">
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          
          <div className="faq-container">
            {faqItems.map(item => (
              <div key={item.id} className={`faq-item ${item.open ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFAQ(item.id)}>
                  <span>{item.question}</span>
                  <i className={`fas fa-plus faq-toggle`} 
                     style={{ transform: item.open ? 'rotate(45deg)' : 'rotate(0deg)' }}></i>
                </div>
                <div className={`faq-answer ${item.open ? 'open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ marginBottom: '20px', color: 'var(--gray-color)' }}>
              Still have questions? Contact our support team
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('contact')}
            >
              <i className="fas fa-headset"></i> Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;