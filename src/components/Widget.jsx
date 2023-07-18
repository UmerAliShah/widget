import React, { useState } from "react";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WidgetPopup = () => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
        <Button className="btn text-white" onClick={handleButtonClick}>Open Widget</Button>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="widget-popup"
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Kind Heart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Slider {...settings}>
            {organizations.map((org, index) => (
              <div className="main-slide" key={index}>
                <h5 className="text-dark">{org.name}</h5>
                <div className="Actions">
                  <Button className="btn-1" onClick={() => handleAmountClick(org, 10)}>10</Button>
                  <Button className="btn-2 active" onClick={() => handleAmountClick(org, 20)}>20</Button>
                  <Button className="btn-3" onClick={() => handleAmountClick(org, 30)}>30</Button>
                  <InputGroup className="field">
                  <FormControl
                    type="number"
                    className="form-group"
                    placeholder="Custom Amount"
                    onChange={(e) => {
                      const customAmount = parseInt(e.target.value);
                      if (!isNaN(customAmount)) {
                        handleAmountClick(org, customAmount);
                      }
                    }}
                  />
                
                </InputGroup>
                </div>
                <Button className="btn text-white donate-btn" variant="secondary" onClick={() => handleAmountClick(org, 0)}>
                    Donate
                </Button>
              </div>
            ))}
            </Slider>
          </div>
          {/* <p>This is the content of the widget popup.</p> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WidgetPopup;
