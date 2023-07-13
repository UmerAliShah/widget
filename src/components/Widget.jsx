import React, { useState } from "react";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";

const WidgetPopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [donationData, setDonationData] = useState([]);
  console.log(donationData, 'saving in widget')
  const organizations = [
    { name: "Organization 1" },
    { name: "Organization 2" },
    { name: "Organization 3" },
    { name: "WE are needy" },
  ];

  const handleButtonClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAmountClick = (org, amount) => {
    const donation = { organization: org.name, amount: amount };
    setDonationData([...donationData, donation]);
    console.log(donation.organization, donation.amount);

    window.parent.postMessage({ donationData: [...donationData, donation] }, "*");
  };

  return (
    <>
      <div className="widget-button">
        <Button onClick={handleButtonClick}>Open Widget</Button>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="widget-popup"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Widget Popup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {organizations.map((org, index) => (
              <div key={index}>
                <h5>{org.name}</h5>
                <Button onClick={() => handleAmountClick(org, 10)}>Donate $10</Button>
                <Button onClick={() => handleAmountClick(org, 20)}>Donate $20</Button>
                <Button onClick={() => handleAmountClick(org, 30)}>Donate $30</Button>
                <InputGroup>
                  <FormControl
                    type="number"
                    placeholder="Enter custom amount"
                    onChange={(e) => {
                      const customAmount = parseInt(e.target.value);
                      if (!isNaN(customAmount)) {
                        handleAmountClick(org, customAmount);
                      }
                    }}
                  />
                  <Button variant="secondary" onClick={() => handleAmountClick(org, 0)}>
                    Donate Custom Amount
                  </Button>
                </InputGroup>
              </div>
            ))}
          </div>
          <p>This is the content of the widget popup.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WidgetPopup;
