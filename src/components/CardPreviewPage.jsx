import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { toPng } from 'html-to-image';

const CardPreviewPage = ({ isActive, cardData, onNavigate, onRegisterAnother, onDownload }) => {
  const [formattedData, setFormattedData] = useState({
    name: 'RAJESH KUMAR',
    dob: '01/04/1985',
    bloodGroup: 'O+',
    emergency: '9123456780',
    familyId: 'FAM-3056',
    memberId: 'MEM-3800'
  });

  const [qrData, setQrData] = useState('');
  const cardFrontRef = useRef(null);
  const cardBackRef = useRef(null);

  useEffect(() => {
    if (cardData) {
      setFormattedData({
        name: cardData.name,
        dob: cardData.dob,
        bloodGroup: cardData.bloodGroup,
        emergency: cardData.emergency,
        familyId: cardData.familyId,
        memberId: cardData.memberId
      });
      setQrData(cardData.qrData);
    }
  }, [cardData]);

  const handleDownloadCard = () => {
    if (!cardFrontRef.current) return;
    
    // Show alert like in original HTML
    alert('In a real application, this would download a PDF of your health card. For now, you can print the page.');
    
    // Alternative: Download as image (optional)
    // toPng(cardFrontRef.current)
    //   .then((dataUrl) => {
    //     const link = document.createElement('a');
    //     link.download = 'health-card.png';
    //     link.href = dataUrl;
    //     link.click();
    //   })
    //   .catch((err) => {
    //     console.error('Error downloading card:', err);
    //   });
  };

  const handlePrintCard = () => {
    // Create print content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Health Card</title>
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            .print-card, .print-card * {
              visibility: visible;
            }
            .print-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
          .print-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }
          .print-card {
            width: 350px;
            height: 220px;
            border-radius: 12px;
            background: linear-gradient(to bottom, #e6f2ff 0%, #ffffff 15px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            position: relative;
            padding: 0;
            overflow: hidden;
            border: 1px solid #cccccc;
            margin: 0 auto;
          }
          .corner {
            position: absolute;
            width: 75px;
            height: 60px;
            background: #e0f7fa;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #b2ebf2;
          }
          .corner.left {
            top: 0;
            left: 0;
            border-bottom-right-radius: 60px;
          }
          .corner.right {
            top: 0;
            right: 0;
            border-bottom-left-radius: 60px;
          }
          .title {
            text-align: center;
            margin-top: 10px;
            padding-top: 5px;
          }
          .title .gov {
            font-size: 13px;
            font-weight: bold;
            color: #0d47a1;
            letter-spacing: 0.5px;
          }
          .title .health {
            font-size: 20px;
            font-weight: 900;
            color: #0d47a1;
            margin-top: 2px;
          }
          .body1 {
            margin-top: 8px;
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            padding: 0 15px;
          }
          .details {
            flex: 1;
            margin-left: 5px;
            margin-top: 2px;
          }
          .details p {
            font-size: 12px;
            margin: 3px 0;
            font-weight: bold;
            color: #1a237e;
            line-height: 1.3;
          }
          .details span {
            font-weight: normal;
            color: #3949ab;
          }
          .qr-area {
            width: 110px;
            margin-right: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin-top: 5px;
          }
          .qr-wrapper {
            position: relative;
            width: 95px;
            height: 95px;
            background: white;
            border-radius: 5px;
            padding: 5px;
            border: 1px solid #e0e0e0;
            margin-top: 0;
          }
          .qr-plus-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 18px;
            height: 18px;
            background: #ffffff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            border: 1px solid #e0e0e0;
          }
          .qr-plus {
            width: 10px;
            height: 10px;
            position: relative;
          }
          .qr-plus::before,
          .qr-plus::after {
            content: "";
            position: absolute;
            background: #0d47a1;
          }
          .qr-plus::before {
            width: 2px;
            height: 10px;
            left: 4px;
          }
          .qr-plus::after {
            width: 10px;
            height: 2px;
            top: 4px;
          }
          .qr-text {
            font-size: 10px;
            font-weight: bold;
            color: #0d47a1;
            margin-top: 4px;
          }
          .card-back {
            width: 350px;
            height: 220px;
            border-radius: 12px;
            background: linear-gradient(to bottom, #e6f2ff 0%, #ffffff 15px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            padding: 0;
            position: relative;
            text-align: center;
            border: 1px solid #cccccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 30px auto 0;
          }
          .logo-circle {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: #ffffff;
            margin: 10px auto 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e0e0e0;
          }
          .gov-text {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #0d47a1;
            letter-spacing: 0.5px;
          }
          .card-back-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 20px;
          }
          .highlight {
            background: #e0f7fa;
            color: #0d47a1;
            margin: 8px 20px;
            padding: 8px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: bold;
            border: 1px solid #b2ebf2;
            line-height: 1.4;
          }
          .footer-back {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            font-size: 11px;
            color: #666;
            font-weight: bold;
            letter-spacing: 0.3px;
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-card">
            <div class="corner left">
              <div style="width: 35px; height: 35px; background: #0d47a1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">GOV</div>
            </div>
            <div class="corner right">
              <div style="width: 35px; height: 35px; background: #34a853; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">AB</div>
            </div>
            <div class="title">
              <div class="gov">GOVERNMENT OF INDIA</div>
              <div class="health">HEALTH CARD</div>
            </div>
            <div class="body1">
              <div class="details">
                <p>Name: <span>${formattedData.name}</span></p>
                <p>DOB: <span>${formattedData.dob}</span></p>
                <p>Blood Group: <span>${formattedData.bloodGroup}</span></p>
                <p>Emergency: <span>${formattedData.emergency}</span></p>
                <p>Member ID: <span>${formattedData.memberId}</span></p>
                <p>Family ID: <span>${formattedData.familyId}</span></p>
              </div>
              <div class="qr-area">
                <div class="qr-wrapper">
                  <div style="width: 85px; height: 85px; display: flex; align-items: center; justify-content: center; background: white;">
                    <!-- QR code will be printed as image -->
                  </div>
                  <div class="qr-plus-circle">
                    <div class="qr-plus"></div>
                  </div>
                </div>
                <div class="qr-text">Scan for Details</div>
              </div>
            </div>
          </div>
        </div>
        <div class="print-container">
          <div class="card-back">
            <div class="logo-circle">
              <div style="width: 50px; height: 50px; background: #34a853; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">AB</div>
            </div>
            <div class="gov-text">GOVERNMENT OF INDIA</div>
            <div class="card-back-content">
              <div class="highlight">Emergency Helpline: 104, 108</div>
              <div class="highlight">Website: www.ayushmaanbharat.gov.in</div>
            </div>
            <div class="footer-back">Terms and Conditions Apply</div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = function() {
      printWindow.print();
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };
  };

  return (
    <div id="card-preview-page" className={`page ${isActive ? 'active' : ''}`}>
      <div className="container card-preview-page">
        <h2 className="section-title">Your <span>One Health Card</span></h2>
        <p style={{textAlign: 'center', marginBottom: '40px', color: 'var(--gray-color)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
          Your digital health card is ready! You can download or print it for use. The QR code contains your essential health information that can be accessed by medical personnel during emergencies.
        </p>
        
        <div className="card-container">
          {/* Front of Card */}
          <div className="body-front">
            <div className="card" ref={cardFrontRef}>
              <div className="corner left">
                <div style={{width: '35px', height: '35px', background: '#0d47a1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold'}}>
                  GOV
                </div>
              </div>

              <div className="corner right">
                <div style={{width: '35px', height: '35px', background: '#34a853', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold'}}>
                  AB
                </div>
              </div>

              <div className="title">
                <div className="gov">GOVERNMENT OF INDIA</div>
                <div className="health">HEALTH CARD</div>
              </div>

              <div className="body1">
                <div className="details">
                  <p>Name: <span id="card-name">{formattedData.name}</span></p>
                  <p>DOB: <span id="card-dob">{formattedData.dob}</span></p>
                  <p>Blood Group: <span id="card-blood">{formattedData.bloodGroup}</span></p>
                  <p>Emergency: <span id="card-emergency">{formattedData.emergency}</span></p>
                  <p>Member ID: <span id="card-member-id">{formattedData.memberId}</span></p>
                  <p>Family ID: <span id="card-family-id">{formattedData.familyId}</span></p>
                </div>

                <div className="qr-area">
                  <div className="qr-wrapper">
                    <div id="front-qr">
                      <QRCode 
                        value={qrData || 'default'} 
                        size={85}
                        level="H"
                        includeMargin={false}
                        style={{ width: '85px', height: '85px' }}
                      />
                    </div>
                    <div className="qr-plus-circle">
                      <div className="qr-plus"></div>
                    </div>
                  </div>
                  <div className="qr-text">Scan for Details</div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="body-back">
            <div className="card-back" ref={cardBackRef}>
              <div className="logo-circle">
                <div style={{width: '50px', height: '50px', background: '#34a853', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold'}}>
                  AB
                </div>
              </div>

              <div className="gov-text">GOVERNMENT OF INDIA</div>
              
              <div className="card-back-content">
                <div className="highlight">
                  Emergency Helpline: 104, 108
                </div>

                <div className="highlight">
                  Website: www.ayushmaanbharat.gov.in
                </div>
              </div>

              <div className="footer-back">
                Terms and Conditions Apply
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-actions">
          <button className="btn btn-download" id="downloadCardBtn" onClick={handleDownloadCard}>
            <i className="fas fa-download"></i> Download Health Card
          </button>
          <button className="btn btn-print" id="printCardBtn" onClick={handlePrintCard}>
            <i className="fas fa-print"></i> Print Health Card
          </button>
          <button className="btn btn-primary" id="registerAnotherBtn" onClick={onRegisterAnother}>
            <i className="fas fa-user-plus"></i> Register Another Member
          </button>
        </div>
        
        <div style={{marginTop: '60px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
          <h3 style={{marginBottom: '20px', color: 'var(--primary-color)'}}>How to Use Your Health Card</h3>
          <div className="features">
            <div className="feature-card">
              <i className="fas fa-ambulance feature-icon"></i>
              <h3>During Emergencies</h3>
              <p>Medical personnel can scan the QR code to access your critical health information like blood group, allergies, and emergency contacts.</p>
            </div>
            
            <div className="feature-card">
              <i className="fas fa-hospital feature-icon"></i>
              <h3>Hospital Visits</h3>
              <p>Present your health card at hospitals for quick registration and access to your medical history.</p>
            </div>
            
            <div className="feature-card">
              <i className="fas fa-mobile-alt feature-icon"></i>
              <h3>Mobile App</h3>
              <p>Download the One Health mobile app to access your digital card, update information, and find health services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreviewPage;