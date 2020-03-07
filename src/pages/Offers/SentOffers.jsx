import React, { useEffect } from "react";
import withAuthentication from "components/hoc/withAuthentication";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OfferActions from "store/actions/offers";
// import get from "lodash/get";

import { Spinner } from "components";
const { FetchOffers } = OfferActions;

const SentOffers = ({ auth, FetchOffers, offers }) => {
  useEffect(() => {
    FetchOffers({ userId: auth.user.uid, offerType: "sent" });
  }, []);

  const { isFetched, sent } = offers;
  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Sent Offers</h1>
        <div className="columns is-multiline">
          {isFetched &&
            sent.map(offer => (
              <ServiceItem
                noButton
                className="offer-card"
                service={offer.service}
                key={offer.id}>
                <div className="tag is-large">{offer.status}</div>
                <hr />
                <div className="service-offer">
                  <div>
                    <span className="label">To User:</span> {offer.toUser.fullName}
                  </div>
                  <div>
                    <span className="label">Note:</span> {offer.note}
                  </div>
                  <div>
                    <span className="label">Price:</span> ${offer.price}
                  </div>
                  <div>
                    <span className="label">Time:</span> {offer.time} hours
                  </div>
                </div>
              </ServiceItem>
            ))}
          {!isFetched && <Spinner />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    offers: state.offers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      FetchOffers
    },
    dispatch
  );

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(SentOffers)
);
