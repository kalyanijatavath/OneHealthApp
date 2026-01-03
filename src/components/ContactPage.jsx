import React, { useState } from 'react';

const ContactPage = ({ isActive }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call like in original HTML
    setTimeout(() => {
      // Show success message exactly like in original HTML
      alert('Thank you for your message! We will respond within 24-48 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div id="contact-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="section">
          <h2 className="section-title">Contact <span>Us</span></h2>
          
          <div className="contact-container">
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>24x7 Helpline</h4>
                    <p>104 (Toll-free)</p>
                    <p>108 (Emergency Ambulance)</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email Support</h4>
                    <p>support@onehealth.gov.in</p>
                    <p>helpdesk@onehealth.gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Head Office</h4>
                    <p>Ministry of Health & Family Welfare</p>
                    <p>Nirman Bhawan, New Delhi - 110011</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Working Hours</h4>
                    <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-form">
                <h3>Send Us a Message</h3>
                <form id="contactForm" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="contactName">Your Name *</label>
                    <input 
                      type="text" 
                      id="contactName" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      placeholder="Enter your name"
                      className={errors.name ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input 
                      type="email" 
                      id="contactEmail" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="Your email address"
                      className={errors.email ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactSubject">Subject *</label>
                    <input 
                      type="text" 
                      id="contactSubject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                      placeholder="Message subject"
                      className={errors.subject ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactMessage">Message *</label>
                    <textarea 
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      id="contactMessage" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required 
                      placeholder="Type your message here..."
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>
                  
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-col">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleReset}
                        style={{ width: '100%' }}
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-redo"></i> Clear Form
                      </button>
                    </div>
                    <div className="form-col">
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i> Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane"></i> Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div style={{marginTop: '40px', textAlign: 'center'}}>
              <h3 style={{marginBottom: '20px', color: 'var(--primary-color)'}}>Regional Offices</h3>
              <div className="features">
                <div className="feature-card">
                  <i className="fas fa-city feature-icon"></i>
                  <h3>North Zone</h3>
                  <p>Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Uttarakhand</p>
                  <p><strong>Contact:</strong> 011-2306xxxx</p>
                  <button 
                    className="btn btn-small btn-secondary"
                    style={{ marginTop: '10px' }}
                    onClick={() => alert('North Zone Office: 011-23061234\nAddress: Delhi Secretariat, New Delhi')}
                  >
                    <i className="fas fa-phone"></i> Call Office
                  </button>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-city feature-icon"></i>
                  <h3>South Zone</h3>
                  <p>Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana</p>
                  <p><strong>Contact:</strong> 044-2856xxxx</p>
                  <button 
                    className="btn btn-small btn-secondary"
                    style={{ marginTop: '10px' }}
                    onClick={() => alert('South Zone Office: 044-28561234\nAddress: Chennai Regional Office, Tamil Nadu')}
                  >
                    <i className="fas fa-phone"></i> Call Office
                  </button>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-city feature-icon"></i>
                  <h3>East Zone</h3>
                  <p>West Bengal, Odisha, Bihar, Jharkhand, Assam, North East States</p>
                  <p><strong>Contact:</strong> 033-2367xxxx</p>
                  <button 
                    className="btn btn-small btn-secondary"
                    style={{ marginTop: '10px' }}
                    onClick={() => alert('East Zone Office: 033-23671234\nAddress: Kolkata Regional Office, West Bengal')}
                  >
                    <i className="fas fa-phone"></i> Call Office
                  </button>
                </div>
                
                <div className="feature-card">
                  <i className="fas fa-city feature-icon"></i>
                  <h3>West Zone</h3>
                  <p>Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Goa</p>
                  <p><strong>Contact:</strong> 022-2654xxxx</p>
                  <button 
                    className="btn btn-small btn-secondary"
                    style={{ marginTop: '10px' }}
                    onClick={() => alert('West Zone Office: 022-26541234\nAddress: Mumbai Regional Office, Maharashtra')}
                  >
                    <i className="fas fa-phone"></i> Call Office
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Contact Banner */}
            <div style={{ 
              backgroundColor: '#fff3cd', 
              borderLeft: '4px solid #ffc107',
              padding: '20px', 
              marginTop: '40px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#856404', fontSize: '28px' }}></i>
              <div>
                <h4 style={{ color: '#856404', marginBottom: '5px' }}>Emergency Contact</h4>
                <p style={{ color: '#856404', marginBottom: '0' }}>
                  For medical emergencies, dial <strong>108</strong> for ambulance or <strong>104</strong> for health advice. 
                  These services are available 24/7 across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;