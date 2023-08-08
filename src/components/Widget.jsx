import React, { useState, useEffect } from "react";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import img_logo from "../images/logo.png";
import logo from "../images/logo.png";
import basket from "../images/basket.png";
import logo2 from "../images/logo2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0); // New variable to store the total amount selected
  const [showBasket, setShowBasket] = useState(false); // To show/hide the basket modal

  // useEffect(() => {
  //   // Retrieve donation data from local storage on component mount
  //   const storedData = localStorage.getItem("donationData");
  //   if (storedData) {
  //     setDonationData(JSON.parse(storedData));
  //     setSelectedAmount(JSON.parse(storedData)[0]?.amount || 0);

  //     // Calculate total amount
  //     const total = JSON.parse(storedData).reduce((sum, { amount }) => sum + amount, 0);
  //     setTotalAmount(total);
  //   }
  // }, []);

  const organizations = [
    {
      name: "Donation To Food Wise",
      description:
        "Donate and Help Companies Redistributes Surplus Food to People In Need",
      logo: img_logo,
    },
    {
      name: "Donation Sahara life",
      description:
        "Donate and Help Companies Redistributes Surplus Medicines to People In Need",
      logo: img_logo,
    },
    {
      name: "Donation Eidi Center",
      description:
        "Donate and Help Companies Redistributes Surplus cloths to People In Need",
      logo: logo,
    },
  ];

  const handleButtonClick = () => {
    window.top.postMessage(JSON.stringify({ event: "showModal" }), "*");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAmountClick = (org, amount) => {
    setSelectedAmount(amount);

    const donation = { organization: org.name, amount: amount };
    const existingDonationIndex = donationData.findIndex(
      (item) => item.organization === org.name
    );

    if (existingDonationIndex !== -1) {
      const updatedDonationData = [...donationData];
      updatedDonationData[existingDonationIndex] = donation;
      setDonationData(updatedDonationData);
    } else {
      setDonationData([...donationData, donation]);
    }

    // Update total amount
    const total =
      donationData.reduce((sum, { amount }) => sum + amount, 0) + amount;
    setTotalAmount(total);

    console.log(donation.organization, donation.amount,'in widget');
    window.parent.postMessage(
      { donationData: [...donationData, donation] },
      "*"
    );
  };

  // Function to toggle basket modal
  const toggleBasketModal = () => {
    setShowBasket((prev) => !prev);
  };

  const handleDonation = () => {
    // You may want to perform other actions related to donation here,
    // like sending the donation data to your backend or handling the donation process.

    // Send the donationData in the postMessage
    window.parent.postMessage({ donationData, totalAmount }, "*");

    // Reset the selected amount to 0
    setSelectedAmount(0);
  };

  const handleRemoveDonation = (org) => {
    const updatedDonationData = donationData.filter(
      (donation) => donation.organization !== org.name
    );

    setDonationData(updatedDonationData);
  };

  return (
    <div className="widget">
      <div className="widget-button" style={{ backgroundColor: "transparent" }}>
        <Button className="btn text-white" onClick={handleButtonClick}>
          <img
            className="img-icon"
            width="30px"
            src={logo2}
            alt="Button Image"
          />
          Let's Donate
        </Button>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="widget-popup"
        style={{
          width: "100%",
          position: "fixed",
          bottom: "10px",
          right: "20px",
          zIndex: "9999",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Kind Heart</Modal.Title>
          <div
            className="wrapper"
            style={{ width: "60%", display: "flex", justifyContent: "end" }}
          >
            <Button
              style={{ marginRight: "1.5rem" }}
              className="btn text-white donate-btn"
              variant="secondary"
              onClick={handleDonation}
            >
              Donate
            </Button>
            <div className="basket" style={{ alignSelf: "center" }}>
              <img
                src={basket}
                alt=""
                onClick={toggleBasketModal}
                style={{ cursor: "pointer" }}
              />
              {showBasket && (
                <div className="basket-modal">
                  <h3>Selected Donations:</h3>
                  <ul>
                    {donationData.map((donation, index) => (
                      <li key={index}>
                        {donation.organization}: ${donation.amount}
                      </li>
                    ))}
                  </ul>
                  <p>Total Amount: ${totalAmount}</p>
                </div>
              )}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Slider {...settings}>
              {organizations.map((org, index) => {
                const isAmountSelected =
                  selectedAmount > 0 &&
                  org.name ===
                    donationData.find((item) => item.organization === org.name)
                      ?.organization;
                return (
                  <div className="main-slide" key={index}>
                    <h5 className="text-dark">{org.name}</h5>
                    <div className="com-info">
                      <a href="#">
                        <img src={org.logo} alt="" />
                      </a>
                      <p className="text-dark">{org.description}</p>
                    </div>
                    <div className="Actions">
                      <Button
                        className={`btn-1 ${
                          selectedAmount === 10 ? "active" : ""
                        }`}
                        onClick={() => handleAmountClick(org, 10)}
                      >
                        10
                      </Button>
                      <Button
                        className={`btn-2 ${
                          selectedAmount === 20 ? "active" : ""
                        }`}
                        onClick={() => handleAmountClick(org, 20)}
                      >
                        20
                      </Button>
                      <Button
                        className={`btn-3 ${
                          selectedAmount === 30 ? "active" : ""
                        }`}
                        onClick={() => handleAmountClick(org, 30)}
                      >
                        30
                      </Button>
                      <InputGroup className="field">
                        <FormControl
                          type="number"
                          className="form-group"
                          placeholder="Custom Amount"
                          step={5}
                          onChange={(e) => {
                            const customAmount = parseInt(e.target.value);
                            if (!isNaN(customAmount)) {
                              handleAmountClick(org, customAmount);
                            }
                          }}
                        />
                      </InputGroup>
                    </div>
                    {isAmountSelected && (
                      <Button
                        className="btn text-white remove-btn"
                        variant="secondary"
                        onClick={() => handleRemoveDonation(org)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                );
              })}
            </Slider>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WidgetPopup;
