import React, { useState, useEffect, useRef } from 'react';

const LoginPage = ({ isActive, onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const otpInputs = useRef([]);

  // Check if already verified from localStorage
  useEffect(() => {
    const verified = localStorage.getItem('oneHealthOTPVerified');
    const savedUser = localStorage.getItem('oneHealthUser');
    
    if (verified === 'true' && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        onLogin(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, [onLogin]);

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    setError('');
    
    if (loginMethod === 'phone') {
      if (!validatePhone(phone)) {
        setError('Please enter a valid 10-digit mobile number starting with 6-9');
        return;
      }
    } else {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setTimer(30); // 30 seconds timer
      setIsResendDisabled(true);
      
      // Generate a random OTP for demo (in real app, this comes from backend)
      const demoOtp = '123456'; // For demo purposes
      setOtp(demoOtp.split(''));
      
      alert(`OTP sent successfully to your ${loginMethod === 'phone' ? 'mobile number' : 'email address'}!\n\nDemo OTP: ${demoOtp}`);
      
      // Auto-focus first OTP input
      if (otpInputs.current[0]) {
        otpInputs.current[0].focus();
      }
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
    
    // Auto-verify if all digits entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, accept any 6-digit OTP starting with 1
      if (enteredOtp.startsWith('1')) {
        setIsOtpVerified(true);
        setError('');
        
        // Create user object based on login method
        const user = loginMethod === 'phone' 
          ? { phone, name: `User${phone.slice(-4)}`, loginMethod: 'phone' }
          : { email, name: email.split('@')[0], loginMethod: 'email' };
        
        // Save verification status to localStorage
        localStorage.setItem('oneHealthOTPVerified', 'true');
        
        // Show success and proceed to login
        setTimeout(() => {
          onLogin(user);
        }, 500);
      } else {
        setError('Invalid OTP. Please try again. Demo OTP starts with 1');
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    setError('');
    setOtp(['', '', '', '', '', '']);
    handleSendOtp();
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDemoLogin = () => {
    // Auto-fill demo credentials
    if (loginMethod === 'phone') {
      setPhone('9876543210');
    } else {
      setEmail('demo@onehealth.gov.in');
    }
    
    // Show instruction
    alert('Demo credentials filled! Click "Send OTP" to proceed.\n\nFor OTP verification, use: 123456');
  };

  return (
    <div id="login-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="section">
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            backgroundColor: 'var(--card-background)',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Login Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              padding: '40px 20px',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                <i className="fas fa-heartbeat"></i>
              </div>
              <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>One Health Card</h1>
              <p style={{ opacity: 0.9, fontSize: '16px' }}>
                Your Digital Health Identity for a Safer Tomorrow
              </p>
            </div>

            {/* Login Form */}
            <div style={{ padding: '40px 30px' }}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '30px', 
                color: 'var(--dark-color)',
                fontSize: '24px'
              }}>
                Secure Login
              </h2>

              {/* Login Method Toggle */}
              <div style={{ 
                display: 'flex', 
                marginBottom: '30px',
                backgroundColor: '#f5f7fa',
                borderRadius: '8px',
                padding: '4px'
              }}>
                <button
                  onClick={() => setLoginMethod('phone')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    background: loginMethod === 'phone' ? 'var(--primary-color)' : 'transparent',
                    color: loginMethod === 'phone' ? 'white' : 'var(--gray-color)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px'
                  }}
                >
                  <i className="fas fa-mobile-alt"></i>
                  Mobile
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    background: loginMethod === 'email' ? 'var(--primary-color)' : 'transparent',
                    color: loginMethod === 'email' ? 'white' : 'var(--gray-color)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px'
                  }}
                >
                  <i className="fas fa-envelope"></i>
                  Email
                </button>
              </div>

              {/* Phone/Email Input */}
              {!isOtpSent ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: 'var(--dark-color)'
                    }}>
                      {loginMethod === 'phone' ? 'Mobile Number' : 'Email Address'} *
                    </label>
                    <input
                      type={loginMethod === 'phone' ? 'tel' : 'email'}
                      value={loginMethod === 'phone' ? phone : email}
                      onChange={(e) => loginMethod === 'phone' ? setPhone(e.target.value) : setEmail(e.target.value)}
                      placeholder={loginMethod === 'phone' ? 'Enter 10-digit mobile number' : 'Enter your email address'}
                      style={{
                        width: '100%',
                        padding: '14px 15px',
                        border: `1px solid ${error ? '#ea4335' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'var(--transition)'
                      }}
                      maxLength={loginMethod === 'phone' ? 10 : undefined}
                    />
                  </div>

                  {error && (
                    <div style={{
                      backgroundColor: '#ffebee',
                      color: '#c62828',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px'
                    }}>
                      <i className="fas fa-exclamation-circle"></i>
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      opacity: isLoading ? 0.7 : 1
                    }}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send OTP
                      </>
                    )}
                  </button>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <p style={{ color: 'var(--gray-color)', marginBottom: '15px' }}>
                      For demo purposes, you can:
                    </p>
                    <button
                      onClick={handleDemoLogin}
                      style={{
                        padding: '12px 25px',
                        backgroundColor: 'transparent',
                        color: 'var(--primary-color)',
                        border: '1px solid var(--primary-color)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '500'
                      }}
                    >
                      <i className="fas fa-magic"></i>
                      Fill Demo Credentials
                    </button>
                  </div>
                </>
              ) : (
                /* OTP Verification */
                <>
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#e8f5e9', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px'
                    }}>
                      <i className="fas fa-sms" style={{ fontSize: '36px', color: '#2e7d32' }}></i>
                    </div>
                    <h3 style={{ color: 'var(--dark-color)', marginBottom: '10px' }}>
                      Enter Verification Code
                    </h3>
                    <p style={{ color: 'var(--gray-color)', fontSize: '15px' }}>
                      OTP sent to {loginMethod === 'phone' ? phone : email}
                    </p>
                  </div>

                  {/* OTP Input Fields */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '10px',
                    marginBottom: '30px'
                  }}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={el => otpInputs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        style={{
                          width: '50px',
                          height: '60px',
                          textAlign: 'center',
                          fontSize: '24px',
                          border: `2px solid ${error ? '#ea4335' : 'var(--border-color)'}`,
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa',
                          fontWeight: 'bold'
                        }}
                        disabled={isLoading || isOtpVerified}
                      />
                    ))}
                  </div>

                  {error && (
                    <div style={{
                      backgroundColor: '#ffebee',
                      color: '#c62828',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px'
                    }}>
                      <i className="fas fa-exclamation-circle"></i>
                      {error}
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={isLoading || isOtpVerified || otp.join('').length !== 6}
                      style={{
                        flex: 1,
                        padding: '16px',
                        backgroundColor: isOtpVerified ? '#34a853' : 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: (isLoading || isOtpVerified) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        opacity: (isLoading || isOtpVerified || otp.join('').length !== 6) ? 0.7 : 1
                      }}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Verifying...
                        </>
                      ) : isOtpVerified ? (
                        <>
                          <i className="fas fa-check-circle"></i>
                          Verified!
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check"></i>
                          Verify OTP
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsOtpSent(false);
                        setError('');
                        setOtp(['', '', '', '', '', '']);
                      }}
                      style={{
                        padding: '16px 20px',
                        backgroundColor: 'transparent',
                        color: 'var(--gray-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                  </div>

                  {/* Resend OTP */}
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--gray-color)', marginBottom: '15px' }}>
                      Didn't receive the code? {timer > 0 && `Resend in ${formatTimer(timer)}`}
                    </p>
                    <button
                      onClick={handleResendOtp}
                      disabled={isResendDisabled || isLoading}
                      style={{
                        padding: '12px 25px',
                        backgroundColor: isResendDisabled ? '#f5f5f5' : 'var(--primary-color)',
                        color: isResendDisabled ? 'var(--gray-color)' : 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isResendDisabled ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '500',
                        opacity: isLoading ? 0.7 : 1
                      }}
                    >
                      <i className="fas fa-redo"></i>
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              {/* Demo Instructions */}
              {!isOtpSent && (
                <div style={{ 
                  backgroundColor: '#f0f7ff', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginTop: '30px',
                  fontSize: '14px',
                  color: 'var(--gray-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <i className="fas fa-info-circle" style={{ color: 'var(--primary-color)' }}></i>
                    <div>
                      <strong>Demo Instructions:</strong>
                      <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        <li>Use any valid phone number (10 digits starting with 6-9)</li>
                        <li>Or use any valid email address</li>
                        <li>OTP will be auto-filled for demo purposes</li>
                        <li>For verification, use: <strong>123456</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Notice */}
              <div style={{ 
                textAlign: 'center', 
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '13px',
                color: 'var(--gray-color)'
              }}>
                <p>
                  <i className="fas fa-shield-alt" style={{ marginRight: '5px' }}></i>
                  Your information is secure and will not be shared with third parties
                </p>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div style={{ 
            maxWidth: '800px', 
            margin: '60px auto 0',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              color: 'var(--dark-color)', 
              marginBottom: '30px',
              fontSize: '24px'
            }}>
              Why One Health Card?
            </h3>
            
            <div className="features" style={{ marginBottom: '0' }}>
              <div className="feature-card">
                <i className="fas fa-heartbeat feature-icon"></i>
                <h3>Emergency Use</h3>
                <p>Instant access to critical health information during emergencies</p>
              </div>
              
              <div className="feature-card">
                <i className="fas fa-users feature-icon"></i>
                <h3>Family Tracking</h3>
                <p>Track health records for your entire family with unique IDs</p>
              </div>
              
              <div className="feature-card">
                <i className="fas fa-shield-alt feature-icon"></i>
                <h3>Secure Database</h3>
                <p>Encrypted health data accessible only to authorized personnel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;