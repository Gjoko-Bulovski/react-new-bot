import React, { useState } from "react";
import "../Form/Form.css";
import InputGroups from "../InputGroups/InputGroups";
import SelectGroups from "../SelectGroups/SelectGroups";
import CheckboxGroups from "../CheckboxGroups/CheckboxGroups";
import { v4 as uuidv4 } from "uuid";
import Accordion from "../Accordion/Accordion";
import Order from "../../components/Order/Order";
import Alert from "../Alert/Aler";

const Form = () => {
  //bot
  const [bot, setBot] = useState([]);
  //company name
  const [companyName, setCompanyName] = useState("");
  //company phone
  const [companyPhone, setcompanyPhone] = useState("");
  //Your website
  const [website, setWebsite] = useState("");
  //Boat Name
  const [boatName, setBoatName] = useState("");
  //select zone
  const [zone, setZone] = useState("");
  //deliveryDate
  const [deliveryDate, setDeliveryDate] = useState("");
  //Do you want your bot to send SMS
  const [sendSMS, setSendSMS] = useState(false);
  //Do you want your bot to be bilingual
  const [bilingual, setBilingual] = useState(false);
  //leadDeliveryEmail
  const [leadDeliveryEmails, setLeadDeliveryEmails] = useState([]);
  const [leadDeliveryEmail, setLeadDeliveryEmail] = useState("");
  //Billing Info
  const [billingAddress, setBillingAddress] = useState("");
  // Billing Contact
  const [billingContact, setBillingContact] = useState("");
  //Billing Email
  const [billingEmail, setBillingEmail] = useState("");

  //accordion Billing Info
  const [isOpenBillingInfo, setIsOpenBillingInfo] = useState(true);
  //accordion Submitted Form
  const [isOpenSubmittedForm, setisOpenSubmittedForm] = useState(true);

  //select zones
  const zones = [
    { value: "", label: "Please select time zone" },
    { value: "Pacific Time", label: "Pacific Time" },
    { value: "Mountain Time", label: "Mountain Time" },
    { value: "Central Time", label: "Central Time" },
    { value: "Eastern Time", label: "Eastern Time" },
  ];

  //companyNameBlured
  const [companyNameBlured, setCompanyNameBlured] = useState(false);
  //leadDeliveryEmailBlured
  const [leadDeliveryEmailBlured, setLeadDeliveryEmailBlured] = useState(false);

  //form submited
  const [formSubmitted, setFormSubmitted] = useState(false);

  // alert
  const [alert, setAlert] = useState({ show: false });

  const updateEmail = (emailId, leadDeliveryEmail) => {
    setLeadDeliveryEmails(
      leadDeliveryEmails.map((email) => {
        if (email.id === emailId) {
          return { ...email, leadDeliveryEmail };
        } else {
          return email;
        }
      })
    );
  };

  const addNewLeadDeliveryEmail = () => {
    if (leadDeliveryEmailIsValid()) {
      let newEmail = { id: uuidv4(), leadDeliveryEmail };
      setLeadDeliveryEmails([...leadDeliveryEmails, newEmail]);
      setLeadDeliveryEmail("");
      setLeadDeliveryEmailBlured(false);
    }
  };

  const deleteEmail = (id) => {
    let updatedEmail = leadDeliveryEmails.filter((email) => email.id !== id);
    setLeadDeliveryEmails(updatedEmail);
  };

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //valid
  const companyNameIsValid = () => {
    return companyName && companyName.length > 0;
  };

  const leadDeliveryEmailIsValid = () => {
    return (
      leadDeliveryEmail &&
      leadDeliveryEmail.includes("@") &&
      leadDeliveryEmail.length !== 0
    );
  };

  //isError
  const isErrorCompanyName = () => {
    return (formSubmitted || companyNameBlured) && !companyNameIsValid();
  };

  const isErrorLeadDeliveryEmail = () => {
    return leadDeliveryEmailBlured && !leadDeliveryEmailIsValid();
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setLeadDeliveryEmailBlured(false);
    handleAlert({
      type: "danger",
      text: `Company Name is required`,
    });
    if (companyNameIsValid()) {
      const newBotObject = {
        id: uuidv4(),
        companyName,
        companyPhone,
        website,
        boatName,
        zone,
        deliveryDate,
        sendSMS,
        bilingual,
        billingAddress,
        billingContact,
        billingEmail,
        leadDeliveryEmails,
      };
      setBot([...bot, newBotObject]);
      setCompanyNameBlured(false);
      setLeadDeliveryEmailBlured(false);
      setCompanyName("");
      setcompanyPhone("");
      setWebsite("");
      setBoatName("");
      setZone("");
      setDeliveryDate("");
      setBillingAddress("");
      setBillingContact("");
      setBillingEmail("");
      setLeadDeliveryEmail("");
      setSendSMS(false);
      setBilingual(false);
      setLeadDeliveryEmails([]);
      setFormSubmitted(false);
      handleAlert({ type: "success", text: "Form Submitted" });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <div className="formWrapper">
        <h1>New Bot</h1>
        <form className="formNewBot" onSubmit={handleSubmit}>
          <InputGroups
            type="text"
            labelTitle="Company Name"
            placeholder="Company Name"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={() => setCompanyNameBlured(true)}
            isError={isErrorCompanyName()}
            isErrorTitle="Company Name is required"
          />
          <InputGroups
            type="number"
            labelTitle="Company Pnone"
            placeholder="(xxx) xxx-xxxx"
            name="companyPhone"
            value={companyPhone}
            onChange={(e) => setcompanyPhone(e.target.value)}
          />
          <InputGroups
            type="text"
            labelTitle="Your website"
            placeholder="https://test@test.com"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <InputGroups
            type="text"
            labelTitle="Boat Name"
            placeholder="Boat Name"
            name="boatName"
            value={boatName}
            onChange={(e) => setBoatName(e.target.value)}
          />
          <SelectGroups
            zones={zones}
            labelTitle="Bot Time Zone"
            onChange={(e) => setZone(e.target.value)}
          />
          <InputGroups
            type="date"
            labelTitle="Desired delivery date"
            placeholder="MM/DD/YYYY"
            name="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
          <div>
            <label>
              <strong>Additional settings</strong>
            </label>
            <CheckboxGroups
              labelRight="Do you want your bot to send SMS"
              marginRight="10px"
              name="sendSMS"
              value={sendSMS}
              checked={sendSMS}
              onChange={() => setSendSMS(!sendSMS)}
            />
            <CheckboxGroups
              labelRight="Do you want your bot to be bilingual"
              marginRight="10px"
              name="bilingual"
              value={bilingual}
              checked={bilingual}
              onChange={() => setBilingual(!bilingual)}
            />
          </div>
          <div style={{ display: "grid" }}>
            <label className="leadDeliveryEmailLabel">
              <strong>Lead Delivery Email</strong>
            </label>
            <ul>
              {leadDeliveryEmails.map((email) => {
                return (
                  <li key={email.id} className="leadDeliveryEmailWrapper">
                    <input
                      type="email"
                      name="leadDeliveryEmail"
                      value={email.leadDeliveryEmail}
                      onChange={(e) => updateEmail(email.id, e.target.value)}
                      className="leadDeliveryEmail"
                    />
                    <button
                      className="leadDeliveryEmailButton"
                      onClick={() => deleteEmail(email.id)}
                    >
                      <i
                        className="fas fa-trash-alt fa-2x"
                        title="Delete email"
                      ></i>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="leadDeliveryEmailWrapper">
              <input
                type="email"
                name="leadDeliveryEmail"
                value={leadDeliveryEmail}
                placeholder="Lead Delivery Email"
                onChange={(e) => setLeadDeliveryEmail(e.target.value)}
                className={
                  isErrorLeadDeliveryEmail()
                    ? "leadDeliveryEmail red"
                    : "leadDeliveryEmail"
                }
                onBlur={() => setLeadDeliveryEmailBlured(true)}
              />
              <span
                className="leadDeliveryEmailButton"
                onClick={() => addNewLeadDeliveryEmail()}
              >
                <i
                  className={
                    leadDeliveryEmail.length > 0
                      ? "fas fa-plus-square fa-2x"
                      : "fas fa-plus-square fa-2x isDisabled "
                  }
                  title="Add new email"
                ></i>
              </span>
              {isErrorLeadDeliveryEmail() && (
                <div style={{ width: "100%", textAlign: "left" }}>
                  <p style={{ color: "red", fontSize: "12px" }}>
                    Please Incluid an @ in the email address.
                  </p>
                </div>
              )}
            </div>
          </div>
          <Accordion
            title="Billing Info"
            isOpen={isOpenBillingInfo}
            handleClick={() => setIsOpenBillingInfo(!isOpenBillingInfo)}
          >
            <div className="inputGroupsAccordion">
              <InputGroups
                type="text"
                labelTitle="Billing Address"
                placeholder="Billing Address"
                name="billingAddress"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
              <InputGroups
                type="number"
                labelTitle="Billing Contact"
                placeholder="Billing Contact"
                name="billingContact"
                value={billingContact}
                onChange={(e) => setBillingContact(e.target.value)}
              />
              <InputGroups
                type="email"
                labelTitle="Billing Email"
                placeholder="Billing Email"
                name="billingEmail"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
              />
            </div>
          </Accordion>
          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </form>
        {bot.length !== 0 && (
          <Accordion
            title="Orders"
            isOpen={isOpenSubmittedForm}
            handleClick={() => setisOpenSubmittedForm(!isOpenSubmittedForm)}
          >
            <ul className="containerUl">
              {bot.map((b) => {
                return (
                  <li key={b.id} className="containerLi">
                    <ul style={{ listStyle: "none" }}>
                      {b.companyName.length !== 0 && (
                        <Order
                          orderTitle="Company Name:"
                          orderBody={b.companyName}
                        />
                      )}
                      {b.companyPhone.length !== 0 && (
                        <Order
                          orderTitle="Company Phone:"
                          orderBody={b.companyPhone}
                        />
                      )}
                      {b.website.length !== 0 && (
                        <Order
                          orderTitle="Your website:"
                          orderBody={b.website}
                        />
                      )}
                      {b.boatName.length !== 0 && (
                        <Order orderTitle="Bot Name:" orderBody={b.boatName} />
                      )}
                      {b.zone.length !== 0 && (
                        <Order orderTitle="Bot Time Zone:" orderBody={b.zone} />
                      )}
                      {b.deliveryDate.length !== 0 && (
                        <Order
                          orderTitle="Desired delivery date:"
                          orderBody={b.deliveryDate}
                        />
                      )}
                      {b.sendSMS !== false && (
                        <Order
                          orderTitle="Do you want your bot to send SMS:"
                          orderBody="Yes"
                        />
                      )}
                      {b.bilingual !== false && (
                        <Order
                          orderTitle="Do you want your bot to be bilingual:"
                          orderBody="Yes"
                        />
                      )}
                      {b.leadDeliveryEmails.length !== 0 && (
                        <li>
                          <strong>Lead Delivery Email:</strong>{" "}
                          <ul style={{ listStyle: "none" }}>
                            {b.leadDeliveryEmails.map((email) => {
                              return (
                                <li key={email.id} style={{ color: "#072d43" }}>
                                  {email.leadDeliveryEmail}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      )}
                      {(b.billingAddress.length !== 0 ||
                        b.billingContact.length !== 0 ||
                        b.billingEmail.length !== 0) && (
                        <li style={{ marginTop: "10px" }}>
                          <ul style={{ listStyle: "none" }}>
                            <strong>Billing Info:</strong>{" "}
                            {b.billingAddress.length !== 0 && (
                              <Order
                                orderTitle="Billing Address:"
                                orderBody={b.billingAddress}
                              />
                            )}
                            {b.billingContact.length !== 0 && (
                              <Order
                                orderTitle="Billing Contact:"
                                orderBody={b.billingContact}
                              />
                            )}
                            {b.billingEmail.length !== 0 && (
                              <Order
                                orderTitle="Billing Email:"
                                orderBody={b.billingEmail}
                              />
                            )}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Accordion>
        )}
      </div>
    </>
  );
};

export default Form;
