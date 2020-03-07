import React, { useState } from "react";
import Modal from "components/Modal";
import get from "lodash/get";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OfferActions from "store/actions/offers";
import firebase from "helpers/firebase";
import { useToasts } from "react-toast-notifications";
import { toast } from "helpers";

const { createRef } = firebase;

const OfferModal = ({ service, offers: { isFetched, offers }, CreateOffer, auth }) => {
  const { addToast } = useToasts();
  const [offer, setOffer] = useState({
    fromUser: "",
    toUser: "",
    service: "",
    status: "pending",
    price: 0,
    time: 0,
    note: ""
  });

  const userId = auth && auth.user && auth.user.uid;

  const handleChange = ({ target: { value, name } }) => {
    if (name === "time") {
      const price = Math.round(value * service.price * 100) / 100;
      return setOffer({ ...offer, [name]: Number(value), price: Number(price) });
    }

    return setOffer({ ...offer, [name]: value });
  };

  const handleSubmit = closeModal => {
    const modifiedOffers = { ...offer };

    modifiedOffers.fromUser = createRef("profiles", userId);
    modifiedOffers.toUser = createRef("profiles", service.user.id);
    modifiedOffers.service = createRef("services", service.id);

    CreateOffer({
      values: modifiedOffers,
      cb: {
        onSuccess: data => {
          toast.success("Succesfully created offer", addToast);
          // setRedirect(true);
          closeModal();
        },
        onError: err => {
          toast.error(err, addToast);
        }
      }
    });
  };

  return (
    <Modal onModalSubmit={handleSubmit} openButtonText="Make an offer" {...{ isFetched }}>
      <div className="field">
        <input
          onChange={handleChange}
          name="note"
          className="input is-large"
          type="text"
          placeholder="Write some catchy note"
          max="5"
          min="0"
        />
        <p className="help">Note can increase chance of getting the service</p>
      </div>
      <div className="field">
        <input
          onChange={handleChange}
          name="time"
          className="input is-large"
          type="number"
          placeholder="How long you need service for ?"
          max="5"
          min="0"
        />
        <p className="help">Enter time in hours</p>
      </div>
      <div className="service-price has-text-centered">
        <div className="service-price-title">
          Uppon acceptance {`${get(service, "user.fullName")}`} will charge you:
        </div>
        <div className="service-price-value">
          <h1 className="title">{offer.price}$</h1>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ offers, auth }) => ({ offers, auth });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      CreateOffer: OfferActions.CreateOffer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OfferModal);
