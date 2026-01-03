import React, { useState } from 'react';

const Header = ({ 
  activePage, 
  onNavigate, 
  isMobileMenuOpen, 
  onToggleMobileMenu,
  onRegisterClick,
  onDownloadApp,
  userInfo,
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    onNavigate(page);
    setShowUserMenu(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setShowUserMenu(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'registration', label: 'Registration' },
    { id: 'card-preview', label: 'Health Card' },
    { id: 'laws', label: 'Laws' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'pdfs', label: 'PDFs/Books' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <i className="fas fa-heartbeat logo-icon"></i>
            <div className="logo-text">One<span>Health</span></div>
          </div>
          
          <div className="hamburger" onClick={onToggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </div>
          
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {navItems.map(item => (
              <li key={item.id}>
                <a 
                  href="#" 
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`} 
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="nav-buttons" style={{ position: 'relative' }}>
            <button 
              className="btn btn-primary btn-small" 
              onClick={onRegisterClick}
              style={{ marginRight: '10px' }}
            >
              Register Now
            </button>
            
            {/* User Profile */}
            {userInfo && (
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: '#f0f7ff'
                  }}
                >
                  <i className="fas fa-user-circle"></i>
                  <span style={{ 
                    maxWidth: '100px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {userInfo.name || userInfo.email || userInfo.phone}
                  </span>
                  <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
                    minWidth: '200px',
                    zIndex: 1000,
                    marginTop: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: '500', marginBottom: '5px' }}>
                        {userInfo.name || 'User'}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-color)' }}>
                        {userInfo.loginMethod === 'phone' ? userInfo.phone : userInfo.email}
                      </div>
                    </div>
                    
                    <div style={{ padding: '5px 0' }}>
                      <button
                        onClick={() => {
                          onNavigate('card-preview');
                          setShowUserMenu(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 15px',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14px',
                          color: 'var(--dark-color)'
                        }}
                      >
                        <i className="fas fa-id-card"></i>
                        My Health Card
                      </button>
                      
                      <button
                        onClick={handleLogoutClick}
                        style={{
                          width: '100%',
                          padding: '10px 15px',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#ea4335'
                        }}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
