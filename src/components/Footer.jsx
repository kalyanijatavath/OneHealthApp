import React from 'react';

const Footer = ({ onNavigate }) => {
  const handleNavClick = (page, e) => {
    e.preventDefault();
    onNavigate(page);
  };

  const handleDownloadApp = () => {
    alert('One Health Mobile App is available for download on Google Play Store and Apple App Store.');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>One Health Card</h3>
            <p>A unified digital health identity system for all citizens, ensuring quick access to medical information during emergencies.</p>
            <div className="social-icons">
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-facebook-f"></i></a>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-twitter"></i></a>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-instagram"></i></a>
              <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#" onClick={(e) => handleNavClick('home', e)}>Home</a>
            <a href="#" onClick={(e) => handleNavClick('registration', e)}>Registration</a>
            <a href="#" onClick={(e) => handleNavClick('card-preview', e)}>Health Card</a>
            <a href="#" onClick={(e) => handleNavClick('laws', e)}>Laws & Regulations</a>
            <a href="#" onClick={(e) => handleNavClick('notifications', e)}>Notifications</a>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <a href="#" onClick={(e) => handleNavClick('pdfs', e)}>PDF Documents</a>
            <a href="#" onClick={(e) => handleNavClick('pdfs', e)}>Health Books</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Emergency Protocols page coming soon!'); }}>Emergency Protocols</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Vaccination Schedule page coming soon!'); }}>Vaccination Schedule</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Healthcare Providers page coming soon!'); }}>Healthcare Providers</a>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><i className="fas fa-phone"></i> 24x7 Helpline: 104</p>
            <p><i className="fas fa-envelope"></i> support@onehealth.gov.in</p>
            <p><i className="fas fa-map-marker-alt"></i> Ministry of Health & Family Welfare, Government of India</p>
            <button 
              className="btn btn-secondary btn-small" 
              style={{marginTop: '10px'}}
              onClick={handleDownloadApp}
            >
              <i className="fas fa-mobile-alt"></i> Download Mobile App
            </button>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2023 One Health Card System. All rights reserved. | Designed for Government Health Scheme</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;