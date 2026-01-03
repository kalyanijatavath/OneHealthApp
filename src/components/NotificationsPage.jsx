import React, { useState } from 'react';

const NotificationsPage = ({ isActive }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      category: "vaccine",
      icon: "fas fa-syringe",
      title: "Vaccine Updates",
      items: [
        {
          id: 1,
          icon: "fas fa-exclamation-circle",
          title: "New COVID-19 Booster Available",
          priority: "HIGH PRIORITY",
          priorityClass: "priority-high",
          description: "Updated COVID-19 booster targeting XBB variant now available at all government health centers. Recommended for adults 18+ and high-risk individuals.",
          details: [
            "Available at all government health centers",
            "Recommended for adults 18+",
            "High-risk individuals priority",
            "Free of charge",
            "Walk-in or appointment"
          ],
          date: "December 15, 2023"
        },
        {
          id: 2,
          icon: "fas fa-virus",
          title: "Influenza Vaccine Campaign",
          priority: "MEDIUM PRIORITY",
          priorityClass: "priority-medium",
          description: "Annual influenza vaccination campaign begins December 20. Free for children under 5, pregnant women, and senior citizens above 65.",
          details: [
            "Starts December 20",
            "Free for specified groups",
            "Available at all PHCs",
            "Campaign duration: 2 months",
            "No appointment needed"
          ],
          date: "December 10, 2023"
        },
        {
          id: 3,
          icon: "fas fa-baby",
          title: "HPV Vaccine Expansion",
          priority: "MEDIUM PRIORITY",
          priorityClass: "priority-medium",
          description: "HPV vaccination now extended to boys aged 9-14 in addition to girls. Protects against cervical and other cancers.",
          details: [
            "Now for boys 9-14",
            "Two-dose schedule",
            "School-based programs",
            "Parental consent required",
            "Free in government schools"
          ],
          date: "December 5, 2023"
        }
      ]
    },
    {
      category: "medicine",
      icon: "fas fa-pills",
      title: "New Medicines & Treatments",
      items: [
        {
          id: 4,
          icon: "fas fa-heartbeat",
          title: "Breakthrough Diabetes Drug Approved",
          priority: "HIGH PRIORITY",
          priorityClass: "priority-high",
          description: "New oral medication for type 2 diabetes shows 30% better glucose control. Available under Ayushman Bharat scheme from January 2024.",
          details: [
            "Available from January 2024",
            "30% better glucose control",
            "Under Ayushman Bharat",
            "Oral medication",
            "Reduced side effects"
          ],
          date: "December 12, 2023"
        },
        {
          id: 5,
          icon: "fas fa-brain",
          title: "New Alzheimer's Treatment",
          priority: "MEDIUM PRIORITY",
          priorityClass: "priority-medium",
          description: "First disease-modifying treatment for early Alzheimer's approved. Slows cognitive decline by 27% in clinical trials.",
          details: [
            "For early Alzheimer's",
            "27% slower cognitive decline",
            "Available at select centers",
            "Specialist prescription required",
            "Insurance coverage available"
          ],
          date: "December 8, 2023"
        },
        {
          id: 6,
          icon: "fas fa-lungs",
          title: "Updated Asthma Guidelines",
          priority: "LOW PRIORITY",
          priorityClass: "priority-low",
          description: "New treatment protocols for asthma management released. Includes updated inhaler techniques and combination therapies.",
          details: [
            "New treatment protocols",
            "Updated inhaler techniques",
            "Combination therapies",
            "Available on MoHFW website",
            "Doctor training programs"
          ],
          date: "December 3, 2023"
        }
      ]
    },
    {
      category: "alert",
      icon: "fas fa-bell",
      title: "Health Alerts",
      items: [
        {
          id: 7,
          icon: "fas fa-exclamation-triangle",
          title: "Respiratory Virus Alert",
          priority: "HIGH PRIORITY",
          priorityClass: "priority-high",
          description: "Increased cases of RSV and influenza reported in northern states. Elderly and children at higher risk. Practice hand hygiene and wear masks in crowded places.",
          details: [
            "Northern states affected",
            "Elderly and children at risk",
            "Practice hand hygiene",
            "Wear masks in crowds",
            "Avoid crowded places"
          ],
          date: "December 14, 2023"
        },
        {
          id: 8,
          icon: "fas fa-tint",
          title: "Dengue Prevention Campaign",
          priority: "MEDIUM PRIORITY",
          priorityClass: "priority-medium",
          description: "Community awareness program for dengue prevention launched. Focus on eliminating mosquito breeding sites.",
          details: [
            "Community awareness program",
            "Eliminate breeding sites",
            "Fogging schedules",
            "Fever screening camps",
            "24/7 helpline: 104"
          ],
          date: "December 7, 2023"
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Notifications', icon: 'fas fa-bell' },
    { id: 'vaccine', label: 'Vaccine Updates', icon: 'fas fa-syringe' },
    { id: 'medicine', label: 'Medicines', icon: 'fas fa-pills' },
    { id: 'alert', label: 'Health Alerts', icon: 'fas fa-exclamation-triangle' }
  ];

  // Filter notifications based on category and search term
  const filteredNotifications = notifications.filter(category => {
    if (activeCategory === 'all') return true;
    return category.category === activeCategory;
  }).map(category => {
    const filteredItems = category.items.filter(item => {
      if (!searchTerm) return true;
      return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const getPriorityCount = (priority) => {
    return notifications.reduce((count, category) => {
      return count + category.items.filter(item => item.priorityClass === priority).length;
    }, 0);
  };

  return (
    <div id="notifications-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="section">
          <h2 className="section-title">Health <span>Notifications & Updates</span></h2>
          
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ color: 'var(--gray-color)', fontSize: '18px' }}>
              Stay updated with the latest health advisories, vaccine information, and medical alerts.
              All information is sourced from official government health departments.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div style={{ 
            backgroundColor: 'var(--card-background)', 
            padding: '20px', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      width: '100%',
                      padding: '12px 15px 12px 45px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '5px',
                      fontSize: '16px'
                    }}
                  />
                  <i className="fas fa-search" style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--gray-color)'
                  }}></i>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--gray-color)',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '10px 20px',
                      border: `2px solid ${activeCategory === cat.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      borderRadius: '5px',
                      background: activeCategory === cat.id ? 'var(--primary-color)' : 'transparent',
                      color: activeCategory === cat.id ? 'white' : 'var(--dark-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <i className={cat.icon}></i>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Summary */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 15px',
                backgroundColor: '#ffebee',
                borderRadius: '5px',
                flex: 1,
                minWidth: '200px'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#c62828' }}></div>
                <span style={{ fontWeight: '500' }}>High Priority:</span>
                <span>{getPriorityCount('priority-high')} alerts</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 15px',
                backgroundColor: '#fff3e0',
                borderRadius: '5px',
                flex: 1,
                minWidth: '200px'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef6c00' }}></div>
                <span style={{ fontWeight: '500' }}>Medium Priority:</span>
                <span>{getPriorityCount('priority-medium')} updates</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 15px',
                backgroundColor: '#e8f5e9',
                borderRadius: '5px',
                flex: 1,
                minWidth: '200px'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2e7d32' }}></div>
                <span style={{ fontWeight: '500' }}>Low Priority:</span>
                <span>{getPriorityCount('priority-low')} notices</span>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="notifications-container">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((category, index) => (
                <div key={index} className="notification-category">
                  <h3><i className={category.icon}></i> {category.title}</h3>
                  
                  {category.items.map(item => (
                    <div key={item.id} className="notification-item">
                      <div className="notification-icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="notification-content">
                        <h4>{item.title} <span className={`notification-priority ${item.priorityClass}`}>{item.priority}</span></h4>
                        <p>{item.description}</p>
                        
                        <div style={{ marginTop: '10px' }}>
                          <h5 style={{ fontSize: '14px', marginBottom: '5px', color: 'var(--primary-color)' }}>
                            <i className="fas fa-info-circle"></i> Key Points:
                          </h5>
                          <ul style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                            {item.details.map((detail, idx) => (
                              <li key={idx} style={{ fontSize: '14px', color: 'var(--gray-color)', marginBottom: '3px' }}>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="notification-date">
                          <i className="far fa-calendar"></i> {item.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                backgroundColor: 'var(--card-background)', 
                borderRadius: '10px',
                boxShadow: 'var(--shadow)'
              }}>
                <i className="fas fa-search" style={{ fontSize: '48px', color: 'var(--gray-color)', marginBottom: '20px' }}></i>
                <h3 style={{ color: 'var(--dark-color)', marginBottom: '10px' }}>No notifications found</h3>
                <p style={{ color: 'var(--gray-color)' }}>
                  {searchTerm ? 'Try a different search term or clear the search.' : 'No notifications in this category.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    style={{
                      marginTop: '15px',
                      padding: '10px 20px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Subscription Section */}
          <div style={{ 
            backgroundColor: '#e3f2fd', 
            padding: '30px', 
            borderRadius: '10px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
              <i className="fas fa-bell"></i> Stay Updated
            </h3>
            <p style={{ color: 'var(--gray-color)', marginBottom: '20px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Get instant notifications about health alerts, vaccine updates, and medical advisories on your phone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '12px 25px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500'
              }}>
                <i className="fas fa-mobile-alt"></i> Subscribe via SMS
              </button>
              <button style={{
                padding: '12px 25px',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500'
              }}>
                <i className="fas fa-envelope"></i> Email Updates
              </button>
              <button style={{
                padding: '12px 25px',
                backgroundColor: 'var(--gray-color)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '500'
              }}>
                <i className="fab fa-whatsapp"></i> WhatsApp Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;