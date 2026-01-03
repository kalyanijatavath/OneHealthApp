import React, { useState } from 'react';

const LawsPage = ({ isActive }) => {
  const [expandedLaw, setExpandedLaw] = useState(null);

  const lawCategories = [
    {
      id: 1,
      title: "Patient Rights & Protection",
      icon: "fas fa-balance-scale",
      description: "Laws governing patient rights, confidentiality, and informed consent",
      laws: [
        {
          id: 1,
          title: "Right to Information Act",
          icon: "fas fa-shield-alt",
          description: "Patients have the right to know about their medical condition, treatment options, risks, and costs. Healthcare providers must provide complete information in a language the patient understands.",
          details: [
            "Complete disclosure of medical condition",
            "Information about treatment alternatives",
            "Cost estimates and payment options",
            "Risks and benefits of procedures",
            "Right to ask questions and seek clarifications"
          ],
          reference: "Reference: Section 4 of Clinical Establishment Act, 2010"
        },
        {
          id: 2,
          title: "Patient Confidentiality",
          icon: "fas fa-user-shield",
          description: "Medical information cannot be disclosed without patient consent except in specific circumstances like court orders or public health emergencies.",
          details: [
            "Medical records are confidential",
            "Consent required for information sharing",
            "Exceptions for public health emergencies",
            "Penalties for unauthorized disclosure",
            "Digital data protection under IT Act"
          ],
          reference: "Reference: MCI Code of Ethics Regulations, 2002"
        },
        {
          id: 3,
          title: "Informed Consent",
          icon: "fas fa-file-contract",
          description: "Written informed consent is mandatory for all surgical procedures, anesthesia, and high-risk treatments. Consent can be withdrawn at any time.",
          details: [
            "Written consent for all procedures",
            "Consent can be withdrawn anytime",
            "Special consent for minors",
            "Emergency treatment exceptions",
            "Witness requirement for major procedures"
          ],
          reference: "Reference: Section 13 of Clinical Establishment Act, 2010"
        }
      ]
    },
    {
      id: 2,
      title: "Pharmaceutical Regulations",
      icon: "fas fa-prescription-bottle-alt",
      description: "Regulations for drugs, medicines, and pharmaceutical products",
      laws: [
        {
          id: 4,
          title: "Drugs and Cosmetics Act",
          icon: "fas fa-capsules",
          description: "Regulates import, manufacture, distribution and sale of drugs in India. All drugs must meet quality standards and be approved by Central Drugs Standard Control Organization.",
          details: [
            "CDSCO approval required",
            "Quality control standards",
            "Import and export regulations",
            "Price control mechanisms",
            "Schedule-based drug classification"
          ],
          reference: "Reference: Drugs and Cosmetics Act, 1940"
        },
        {
          id: 5,
          title: "Narcotic Drugs Control",
          icon: "fas fa-ban",
          description: "Strict regulations on manufacture, possession, sale, purchase, transport, and use of narcotic drugs and psychotropic substances.",
          details: [
            "Licensed possession only",
            "Prescription requirements",
            "Storage and transportation rules",
            "Record keeping mandates",
            "Severe penalties for violations"
          ],
          reference: "Reference: Narcotic Drugs and Psychotropic Substances Act, 1985"
        }
      ]
    },
    {
      id: 3,
      title: "Healthcare Facility Regulations",
      icon: "fas fa-hospital",
      description: "Standards and regulations for hospitals and clinics",
      laws: [
        {
          id: 6,
          title: "Clinical Establishment Act",
          icon: "fas fa-clinic-medical",
          description: "Mandatory registration and minimum standards for all clinical establishments. Includes requirements for infrastructure, equipment, and qualified staff.",
          details: [
            "Mandatory registration",
            "Minimum infrastructure standards",
            "Qualified staff requirements",
            "Emergency care facilities",
            "Regular inspections and audits"
          ],
          reference: "Reference: Clinical Establishment (Registration & Regulation) Act, 2010"
        },
        {
          id: 7,
          title: "Emergency Care Obligation",
          icon: "fas fa-ambulance",
          description: "All hospitals must provide emergency medical care without insisting on payment or police clearance. Stabilization and transfer if needed.",
          details: [
            "Emergency care without payment",
            "No police clearance required",
            "Stabilization before transfer",
            "24/7 emergency services",
            "Non-discrimination in treatment"
          ],
          reference: "Reference: Supreme Court Judgment in Pt. Parmanand Katara vs Union of India"
        }
      ]
    },
    {
      id: 4,
      title: "Medical Research & Ethics",
      icon: "fas fa-dna",
      description: "Ethical guidelines for medical research and organ transplantation",
      laws: [
        {
          id: 8,
          title: "Biomedical Research Ethics",
          icon: "fas fa-flask",
          description: "All biomedical research involving human participants must be approved by Institutional Ethics Committee and follow ICMR guidelines.",
          details: [
            "IEC approval mandatory",
            "Informed consent for research",
            "Risk-benefit assessment",
            "Confidentiality of research data",
            "Participant compensation guidelines"
          ],
          reference: "Reference: ICMR Ethical Guidelines for Biomedical Research, 2017"
        },
        {
          id: 9,
          title: "Organ Transplant Regulations",
          icon: "fas fa-vial",
          description: "Strict regulations for organ donation and transplantation to prevent commercial dealings. Living donors must be near relatives with authorization committee approval.",
          details: [
            "Near relative requirement",
            "Authorization committee approval",
            "No commercial transactions",
            "Brain death certification",
            "National registry maintenance"
          ],
          reference: "Reference: Transplantation of Human Organs Act, 1994"
        }
      ]
    }
  ];

  const toggleLawDetails = (lawId) => {
    if (expandedLaw === lawId) {
      setExpandedLaw(null);
    } else {
      setExpandedLaw(lawId);
    }
  };

  return (
    <div id="laws-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="section">
          <h2 className="section-title">Medical <span>Laws & Regulations</span></h2>
          
          <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ color: 'var(--gray-color)', fontSize: '18px' }}>
              Comprehensive guide to medical laws, patient rights, and healthcare regulations in India. 
              Stay informed about your rights and responsibilities as a patient.
            </p>
          </div>
          
          <div className="laws-container">
            {lawCategories.map(category => (
              <div key={category.id} className="law-category">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <i className={category.icon} style={{ fontSize: '28px', color: 'var(--primary-color)' }}></i>
                  <div>
                    <h3>{category.title}</h3>
                    <p style={{ color: 'var(--gray-color)', fontSize: '16px' }}>{category.description}</p>
                  </div>
                </div>
                
                {category.laws.map(law => (
                  <div key={law.id} className="law-item">
                    <div 
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleLawDetails(law.id)}
                    >
                      <h4>
                        <i className={law.icon}></i> {law.title}
                        <i 
                          className={`fas ${expandedLaw === law.id ? 'fa-chevron-up' : 'fa-chevron-down'}`} 
                          style={{ float: 'right', color: 'var(--primary-color)' }}
                        ></i>
                      </h4>
                      <p>{law.description}</p>
                    </div>
                    
                    {expandedLaw === law.id && (
                      <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                        <h5 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Key Provisions:</h5>
                        <ul style={{ marginBottom: '15px', paddingLeft: '20px' }}>
                          {law.details.map((detail, index) => (
                            <li key={index} style={{ marginBottom: '5px', color: 'var(--gray-color)' }}>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <div className="law-reference">{law.reference}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Important Notice */}
          <div style={{ 
            backgroundColor: '#fff3cd', 
            borderLeft: '4px solid #ffc107',
            padding: '20px', 
            marginTop: '40px',
            borderRadius: '5px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#856404', fontSize: '24px' }}></i>
              <div>
                <h4 style={{ color: '#856404', marginBottom: '10px' }}>Legal Disclaimer</h4>
                <p style={{ color: '#856404', marginBottom: '0' }}>
                  This information is for educational purposes only. For specific legal advice, 
                  please consult a qualified legal professional. Laws may vary by state and are subject to change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawsPage;