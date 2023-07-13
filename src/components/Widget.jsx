import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const WidgetPopup = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleAmountClick = (am) => {
    console.log(am, "am");
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
          <Button value="10" onClick={(e) => handleAmountClick(e.target.value)}>
            10
          </Button>
          <Button value="20" onClick={(e) => handleAmountClick(e.target.value)}>
            20
          </Button>
          <Button value="30" onClick={(e) => handleAmountClick(e.target.value)}>
            30
          </Button>
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
