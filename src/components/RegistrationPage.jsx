import React, { useState } from 'react';

const RegistrationPage = ({ isActive, onNavigate, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    aadhaar: '',
    phone: '',
    email: '',
    emergencyName: '',
    emergencyPhone: '',
    houseNo: '',
    street: '',
    city: '',
    district: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.aadhaar.match(/^\d{12}$/)) {
      newErrors.aadhaar = 'Aadhaar must be exactly 12 digits';
    }
    
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }
    
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.emergencyName.trim()) {
      newErrors.emergencyName = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyPhone.match(/^\d{10}$/)) {
      newErrors.emergencyPhone = 'Emergency phone must be exactly 10 digits';
    }
    
    if (!formData.houseNo.trim()) {
      newErrors.houseNo = 'House number is required';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode.match(/^\d{6}$/)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
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
      alert('Please fix the errors in the form before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      aadhaar: '',
      phone: '',
      email: '',
      emergencyName: '',
      emergencyPhone: '',
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pincode: ''
    });
    setErrors({});
  };

  return (
    <div id="registration-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="registration-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="form-title">One Health Card Registration</h2>
            <button 
              className="btn btn-secondary btn-small"
              onClick={onBack}
            >
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
          </div>
          
          <div style={{ backgroundColor: '#e8f4fd', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
            <p style={{ margin: 0, color: '#0d47a1' }}>
              <i className="fas fa-info-circle"></i> Fill in all the required fields (*) to register for your Health Card
            </p>
          </div>
          
          <form id="registrationForm" onSubmit={handleSubmit} noValidate>
            {/* Personal Details Section */}
            <div className="form-section">
              <h3><i className="fas fa-user"></i> Personal Details</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth *</label>
                    <input 
                      type="date" 
                      id="dob" 
                      name="dob" 
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={errors.dob ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.dob && <div className="error-message">{errors.dob}</div>}
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select 
                      id="gender" 
                      name="gender" 
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={errors.gender ? 'error' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="bloodGroup">Blood Group *</label>
                    <select 
                      id="bloodGroup" 
                      name="bloodGroup" 
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                      className={errors.bloodGroup ? 'error' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    {errors.bloodGroup && <div className="error-message">{errors.bloodGroup}</div>}
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="aadhaar">Aadhaar Number *</label>
                    <input 
                      type="text" 
                      id="aadhaar" 
                      name="aadhaar" 
                      value={formData.aadhaar}
                      onChange={handleChange}
                      required 
                      placeholder="12-digit Aadhaar number" 
                      maxLength="12"
                      className={errors.aadhaar ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.aadhaar && <div className="error-message">{errors.aadhaar}</div>}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Details Section */}
            <div className="form-section">
              <h3><i className="fas fa-address-book"></i> Contact Details</h3>
              
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="phone">Contact Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="10-digit mobile number" 
                      maxLength="10"
                      className={errors.phone ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={errors.email ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="emergencyName">Emergency Contact Name *</label>
                <input 
                  type="text" 
                  id="emergencyName" 
                  name="emergencyName" 
                  value={formData.emergencyName}
                  onChange={handleChange}
                  required 
                  placeholder="Name of emergency contact"
                  className={errors.emergencyName ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.emergencyName && <div className="error-message">{errors.emergencyName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Contact Number *</label>
                <input 
                  type="tel" 
                  id="emergencyPhone" 
                  name="emergencyPhone" 
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required 
                  placeholder="Emergency contact number" 
                  maxLength="10"
                  className={errors.emergencyPhone ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.emergencyPhone && <div className="error-message">{errors.emergencyPhone}</div>}
              </div>
            </div>
            
            {/* Address Section */}
            <div className="form-section">
              <h3><i className="fas fa-home"></i> Address Details</h3>
              
              <div className="form-group">
                <label htmlFor="houseNo">House/Apartment Number *</label>
                <input 
                  type="text" 
                  id="houseNo" 
                  name="houseNo" 
                  value={formData.houseNo}
                  onChange={handleChange}
                  required 
                  placeholder="House/Flat number"
                  className={errors.houseNo ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.houseNo && <div className="error-message">{errors.houseNo}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="street">Street/Area *</label>
                <input 
                  type="text" 
                  id="street" 
                  name="street" 
                  value={formData.street}
                  onChange={handleChange}
                  required 
                  placeholder="Street name and area"
                  className={errors.street ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.street && <div className="error-message">{errors.street}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleChange}
                      required 
                      placeholder="City"
                      className={errors.city ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.city && <div className="error-message">{errors.city}</div>}
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="district">District *</label>
                    <input 
                      type="text" 
                      id="district" 
                      name="district" 
                      value={formData.district}
                      onChange={handleChange}
                      required 
                      placeholder="District"
                      className={errors.district ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.district && <div className="error-message">{errors.district}</div>}
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <select 
                      id="state" 
                      name="state" 
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className={errors.state ? 'error' : ''}
                      disabled={isSubmitting}
                    >
                      <option value="">Select State</option>
                      <option value="delhi">Delhi</option>
                      <option value="andhra">Andhra Pradesh</option>
                      <option value="telangana">Telangana</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="tamilnadu">Tamil Nadu</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="kerala">Kerala</option>
                      <option value="westbengal">West Bengal</option>
                      <option value="uttarpradesh">Uttar Pradesh</option>
                      <option value="gujarat">Gujarat</option>
                    </select>
                    {errors.state && <div className="error-message">{errors.state}</div>}
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode *</label>
                    <input 
                      type="text" 
                      id="pincode" 
                      name="pincode" 
                      value={formData.pincode}
                      onChange={handleChange}
                      required 
                      placeholder="6-digit pincode" 
                      maxLength="6"
                      className={errors.pincode ? 'error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.pincode && <div className="error-message">{errors.pincode}</div>}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="form-section">
              <h3><i className="fas fa-file-contract"></i> Terms & Conditions</h3>
              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>By submitting this form, you agree to:</strong>
                </p>
                <ul style={{ paddingLeft: '20px', color: 'var(--gray-color)' }}>
                  <li>Provide accurate and complete information</li>
                  <li>Allow authorized medical personnel to access your health information during emergencies</li>
                  <li>Update your health information regularly</li>
                  <li>Maintain the confidentiality of your Health Card</li>
                </ul>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="form-row" style={{ marginTop: '30px' }}>
              <div className="form-col">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleReset}
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-redo"></i> Reset Form
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
                      <i className="fas fa-spinner fa-spin"></i> Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-id-card"></i> Generate Health Card
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;