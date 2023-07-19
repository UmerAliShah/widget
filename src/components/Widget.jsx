import React, { useState, useEffect } from "react";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import img_logo from "../images/heart_logo.png";
import logo from "../images/logo.png";
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

  useEffect(() => {
    // Retrieve donation data from local storage on component mount
    const storedData = localStorage.getItem("donationData");
    if (storedData) {
      setDonationData(JSON.parse(storedData));
      setSelectedAmount(JSON.parse(storedData)[0]?.amount || 0);
    }
  }, []);

  console.log(donationData, "saving in widget");

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
  console.log(showModal, "modal console");

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

    console.log(donation.organization, donation.amount);
    window.parent.postMessage(
      { donationData: [...donationData, donation] },
      "*"
    );
  };

  const handleDonation = () => {
    // Handle the donation logic here
    // ...
    localStorage.setItem(
      "donationData",
      JSON.stringify([...donationData, donationData])
    );

    // Clear the selected amount
    setSelectedAmount(0);
  };

  const handleRemoveDonation = (org) => {
    const updatedDonationData = donationData.filter(
      (donation) => donation.organization !== org.name
    );

    setDonationData(updatedDonationData);
    localStorage.setItem("donationData", JSON.stringify(updatedDonationData));
  };

  return (
    <div className="widget">
      <div className="widget-button" style={{ backgroundColor: "transparent" }}>
        <Button className="btn text-white" onClick={handleButtonClick}>
          Open Widget
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
                    <Button
                      className="btn text-white donate-btn"
                      variant="secondary"
                      onClick={handleDonation}
                    >
                      Donate
                    </Button>
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
