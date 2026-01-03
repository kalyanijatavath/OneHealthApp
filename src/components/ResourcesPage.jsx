import React, { useState } from 'react';

const ResourcesPage = ({ isActive }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const resources = [
    {
      id: 1,
      category: "pdf",
      title: "Cardiovascular Health Guide",
      description: "Complete guide to heart health, prevention of cardiovascular diseases, and lifestyle modifications.",
      icon: "fas fa-heart",
      fileType: "PDF",
      fileSize: "2.4 MB",
      downloadCount: 1245,
      lastUpdated: "Nov 15, 2023",
      tags: ["heart", "health", "prevention", "lifestyle"]
    },
    {
      id: 2,
      category: "pdf",
      title: "Child Immunization Schedule",
      description: "Updated immunization schedule for children from birth to 18 years with vaccine information.",
      icon: "fas fa-child",
      fileType: "PDF",
      fileSize: "1.8 MB",
      downloadCount: 2341,
      lastUpdated: "Oct 28, 2023",
      tags: ["vaccine", "children", "immunization", "schedule"]
    },
    {
      id: 3,
      category: "pdf",
      title: "First Aid Manual",
      description: "Emergency first aid procedures for common injuries, accidents, and medical emergencies.",
      icon: "fas fa-user-md",
      fileType: "PDF",
      fileSize: "3.2 MB",
      downloadCount: 3120,
      lastUpdated: "Nov 5, 2023",
      tags: ["first aid", "emergency", "procedures", "manual"]
    },
    {
      id: 4,
      category: "pdf",
      title: "Nutrition Guidelines",
      description: "Dietary guidelines for different age groups and health conditions with meal plans.",
      icon: "fas fa-utensils",
      fileType: "PDF",
      fileSize: "2.1 MB",
      downloadCount: 1876,
      lastUpdated: "Oct 20, 2023",
      tags: ["nutrition", "diet", "meal plans", "guidelines"]
    },
    {
      id: 5,
      category: "book",
      title: "Mental Health Handbook",
      description: "Comprehensive guide to mental wellness, stress management, and recognizing disorders.",
      icon: "fas fa-brain",
      fileType: "E-Book",
      fileSize: "4.7 MB",
      downloadCount: 2987,
      lastUpdated: "Nov 10, 2023",
      tags: ["mental health", "wellness", "stress", "therapy"]
    },
    {
      id: 6,
      category: "book",
      title: "Physical Activity Guide",
      description: "Exercise routines for all fitness levels, yoga, and rehabilitation exercises.",
      icon: "fas fa-dumbbell",
      fileType: "E-Book",
      fileSize: "3.9 MB",
      downloadCount: 1567,
      lastUpdated: "Oct 15, 2023",
      tags: ["exercise", "fitness", "yoga", "rehabilitation"]
    },
    {
      id: 7,
      category: "book",
      title: "Chronic Disease Management",
      description: "Managing diabetes, hypertension, arthritis, and other chronic conditions at home.",
      icon: "fas fa-allergies",
      fileType: "E-Book",
      fileSize: "5.2 MB",
      downloadCount: 2098,
      lastUpdated: "Nov 8, 2023",
      tags: ["chronic", "diabetes", "hypertension", "management"]
    },
    {
      id: 8,
      category: "book",
      title: "Substance Abuse Prevention",
      description: "Guide to quitting tobacco, alcohol, and drug addiction with support resources.",
      icon: "fas fa-smoking-ban",
      fileType: "E-Book",
      fileSize: "3.5 MB",
      downloadCount: 1324,
      lastUpdated: "Oct 25, 2023",
      tags: ["substance abuse", "addiction", "prevention", "recovery"]
    },
    {
      id: 9,
      category: "pdf",
      title: "Diabetes Care Handbook",
      description: "Complete guide to diabetes management, monitoring, and lifestyle adjustments.",
      icon: "fas fa-heartbeat",
      fileType: "PDF",
      fileSize: "2.8 MB",
      downloadCount: 1876,
      lastUpdated: "Nov 12, 2023",
      tags: ["diabetes", "management", "monitoring", "care"]
    },
    {
      id: 10,
      category: "pdf",
      title: "Pregnancy Care Guide",
      description: "Comprehensive guide for expectant mothers covering all trimesters and postpartum care.",
      icon: "fas fa-baby",
      fileType: "PDF",
      fileSize: "3.1 MB",
      downloadCount: 2456,
      lastUpdated: "Nov 3, 2023",
      tags: ["pregnancy", "mothers", "postpartum", "care"]
    },
    {
      id: 11,
      category: "book",
      title: "Ayurveda for Daily Life",
      description: "Traditional Ayurvedic practices for modern lifestyle and common health issues.",
      icon: "fas fa-spa",
      fileType: "E-Book",
      fileSize: "4.2 MB",
      downloadCount: 1789,
      lastUpdated: "Oct 30, 2023",
      tags: ["ayurveda", "traditional", "wellness", "natural"]
    },
    {
      id: 12,
      category: "book",
      title: "Yoga & Meditation Guide",
      description: "Complete guide to yoga asanas, meditation techniques, and breathing exercises.",
      icon: "fas fa-yin-yang",
      fileType: "E-Book",
      fileSize: "3.8 MB",
      downloadCount: 2134,
      lastUpdated: "Nov 1, 2023",
      tags: ["yoga", "meditation", "breathing", "asanas"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: 'fas fa-th', count: resources.length },
    { id: 'pdf', label: 'PDF Documents', icon: 'fas fa-file-pdf', count: resources.filter(r => r.category === 'pdf').length },
    { id: 'book', label: 'Health Books', icon: 'fas fa-book-medical', count: resources.filter(r => r.category === 'book').length }
  ];

  const handleDownload = async (resource) => {
    setDownloadingId(resource.id);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show download confirmation
    alert(`Download started for: ${resource.title}\n\nFile: ${resource.title}.${resource.fileType.toLowerCase()}\nSize: ${resource.fileSize}\n\nIn a real application, this would download the actual file.`);
    
    setDownloadingId(null);
    
    // Update download count locally
    const updatedResources = resources.map(r => 
      r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r
    );
    // In a real app, you would update this in state/backend
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handlePreview = (resource) => {
    alert(`Preview: ${resource.title}\n\nThis would show a preview of the ${resource.fileType.toLowerCase()} file in a real application.`);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (activeCategory !== 'all' && resource.category !== activeCategory) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  const totalDownloads = resources.reduce((sum, resource) => sum + resource.downloadCount, 0);

  return (
    <div id="pdfs-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="section">
          <h2 className="section-title">Health <span>Resources & Documents</span></h2>
          
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ color: 'var(--gray-color)', fontSize: '18px' }}>
              Access free health resources, PDF documents, and e-books. Download educational materials 
              for better health management and awareness.
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                backgroundColor: '#e8f5e9', 
                padding: '15px 25px', 
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
                  {resources.length}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Total Resources
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '15px 25px', 
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a73e8' }}>
                  {totalDownloads.toLocaleString()}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Total Downloads
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f3e5f5', 
                padding: '15px 25px', 
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>
                  {categories.length}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Categories
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div style={{ 
            backgroundColor: 'var(--card-background)', 
            padding: '25px', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search resources by title, description, or tags..."
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
                        cursor: 'pointer',
                        fontSize: '18px'
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
                    <span style={{
                      backgroundColor: activeCategory === cat.id ? 'white' : 'var(--primary-color)',
                      color: activeCategory === cat.id ? 'var(--primary-color)' : 'white',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      marginLeft: '5px'
                    }}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              flexWrap: 'wrap',
              paddingTop: '15px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-file-pdf" style={{ color: '#ea4335' }}></i>
                <span style={{ fontSize: '14px', color: 'var(--gray-color)' }}>
                  {resources.filter(r => r.category === 'pdf').length} PDF Documents
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-book" style={{ color: '#34a853' }}></i>
                <span style={{ fontSize: '14px', color: 'var(--gray-color)' }}>
                  {resources.filter(r => r.category === 'book').length} E-Books
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-download" style={{ color: '#1a73e8' }}></i>
                <span style={{ fontSize: '14px', color: 'var(--gray-color)' }}>
                  {totalDownloads.toLocaleString()} Total Downloads
                </span>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="resources-container">
            {filteredResources.length > 0 ? (
              <>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: 'var(--primary-color)' }}>
                    Showing {filteredResources.length} of {resources.length} resources
                    {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
                    {searchTerm && ` for "${searchTerm}"`}
                  </h3>
                  <div style={{ fontSize: '14px', color: 'var(--gray-color)' }}>
                    Sorted by: <strong>Most Popular</strong>
                  </div>
                </div>
                
                <div className="resource-grid">
                  {filteredResources.map(resource => (
                    <div key={resource.id} className="resource-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <div className="resource-icon">
                          <i className={resource.icon}></i>
                        </div>
                        <div style={{
                          backgroundColor: resource.category === 'pdf' ? '#ffebee' : '#e8f5e9',
                          color: resource.category === 'pdf' ? '#c62828' : '#2e7d32',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {resource.fileType}
                        </div>
                      </div>
                      
                      <h4>{resource.title}</h4>
                      <p>{resource.description}</p>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {resource.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              style={{
                                backgroundColor: '#f0f7ff',
                                color: 'var(--primary-color)',
                                padding: '3px 8px',
                                borderRadius: '3px',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '15px',
                        fontSize: '13px',
                        color: 'var(--gray-color)'
                      }}>
                        <div>
                          <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
                          {resource.downloadCount.toLocaleString()} downloads
                        </div>
                        <div>
                          <i className="far fa-calendar" style={{ marginRight: '5px' }}></i>
                          {resource.lastUpdated}
                        </div>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        gap: '10px',
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: '15px'
                      }}>
                        <button
                          onClick={() => handleDownload(resource)}
                          disabled={downloadingId === resource.id}
                          style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: downloadingId === resource.id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontWeight: '500',
                            opacity: downloadingId === resource.id ? 0.7 : 1
                          }}
                        >
                          {downloadingId === resource.id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i>
                              Downloading...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-download"></i>
                              Download ({resource.fileSize})
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handlePreview(resource)}
                          style={{
                            padding: '10px 15px',
                            backgroundColor: 'transparent',
                            color: 'var(--primary-color)',
                            border: '1px solid var(--primary-color)',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontWeight: '500'
                          }}
                        >
                          <i className="far fa-eye"></i>
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px', 
                backgroundColor: 'var(--card-background)', 
                borderRadius: '10px',
                boxShadow: 'var(--shadow)'
              }}>
                <i className="fas fa-search" style={{ fontSize: '48px', color: 'var(--gray-color)', marginBottom: '20px' }}></i>
                <h3 style={{ color: 'var(--dark-color)', marginBottom: '10px' }}>No resources found</h3>
                <p style={{ color: 'var(--gray-color)', marginBottom: '20px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {searchTerm 
                    ? `No resources found for "${searchTerm}". Try a different search term or clear the search.`
                    : 'No resources available in this category.'
                  }
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      style={{
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
                  <button
                    onClick={() => setActiveCategory('all')}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--primary-color)',
                      border: '1px solid var(--primary-color)',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    View All Resources
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Popular Resources Section */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '30px', 
              color: 'var(--primary-color)',
              fontSize: '28px'
            }}>
              <i className="fas fa-fire" style={{ marginRight: '10px', color: '#ff6b35' }}></i>
              Most Popular Resources
            </h3>
            
            <div className="resource-grid">
              {resources
                .sort((a, b) => b.downloadCount - a.downloadCount)
                .slice(0, 4)
                .map(resource => (
                  <div key={resource.id} className="resource-card" style={{ position: 'relative' }}>
                    {resource.downloadCount > 2000 && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: '#ff6b35',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <i className="fas fa-fire"></i>
                        Popular
                      </div>
                    )}
                    
                    <div className="resource-icon">
                      <i className={resource.icon}></i>
                    </div>
                    
                    <h4>{resource.title}</h4>
                    <p>{resource.description}</p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <div style={{ fontSize: '13px', color: 'var(--gray-color)' }}>
                        <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
                        {resource.downloadCount.toLocaleString()} downloads
                      </div>
                      
                      <button
                        onClick={() => handleDownload(resource)}
                        style={{
                          padding: '8px 15px',
                          backgroundColor: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '14px'
                        }}
                      >
                        <i className="fas fa-download"></i>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div style={{ 
            backgroundColor: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
            padding: '40px',
            borderRadius: '10px',
            marginTop: '60px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
              <i className="fas fa-newspaper" style={{ marginRight: '10px' }}></i>
              Get New Resources Alert
            </h3>
            <p style={{ color: 'var(--gray-color)', marginBottom: '25px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Subscribe to our newsletter to get notified when new health resources are added.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '12px 15px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={() => alert('Thank you for subscribing! You will receive notifications about new resources.')}
                style={{
                  padding: '12px 30px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </div>
            
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--gray-color)', 
              marginTop: '15px',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <i className="fas fa-shield-alt" style={{ marginRight: '5px' }}></i>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;