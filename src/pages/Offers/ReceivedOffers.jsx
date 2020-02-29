import React, { useEffect } from "react";
import withAuthentication from "components/hoc/withAuthentication";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OfferActions from "store/actions/offers";

const { FetchOffers } = OfferActions;

const SentOffers = ({ auth, FetchOffers }) => {
  useEffect(() => {
    FetchOffers({ userId: auth.user.uid, offerType: "received" });
  }, []);

	
	
  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Received Offers</h1>
        <div className="columns">
          <div className="column is-one-third">
            {/* <ServiceItem
              noButton
              className="offer-card"
              service={o.service}>
              <div className="tag is-large">
                {o.status}
              </div>
              <hr />
              <div className="service-offer">
                <div>
                  <span className="label">From User:</span> {o.toUser.fullName}
                </div>
                <div>
                  <span className="label">Note:</span> {o.note}
                </div>
                <div>
                  <span className="label">Price:</span> ${o.price}
                </div>
                <div>
                  <span className="label">Time:</span> {o.time} hours
                </div>
              </div>
            </ServiceItem>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
// 	return {

// 	}
// }

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      FetchOffers
    },
    dispatch
  );

export default withAuthentication(connect(null, mapDispatchToProps)(SentOffers));
