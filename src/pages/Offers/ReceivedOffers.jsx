import React, { useEffect } from "react";
import withAuthentication from "components/hoc/withAuthentication";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OfferActions from "store/actions/offers";
// import get from "lodash/get";
// import cx from 'classnames';
import { Spinner } from "components";
const { FetchOffers, ChangeOfferStatus } = OfferActions;

const SentOffers = ({ auth, FetchOffers, offers, ChangeOfferStatus }) => {
  useEffect(() => {
    FetchOffers({ userId: auth.user.uid, offerType: "received" });
  }, []);

	const changeStatus = (offerId, status) => {
		const cb = {
			onSuccess: () => {
				console.log('successfully changes')
			},
			onError: () => {
				console.log('failed')
			},
		}
		ChangeOfferStatus({ offerId, status, cb});
	}

  const statusClass = status => {
    switch (status) {
      case "pending": {
        return "is-warning";
      }
      case "accepted": {
        return "is-success";
      }
      case "declined": {
        return "is-danger";
      }
      default:
        return "";
    }
  };

  const { isFetched, received } = offers;

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Received Offers</h1>
        <div className="columns is-multiline">
          {isFetched &&
            received.map(offer => {
              return (
                <ServiceItem
                  noButton
                  className="offer-card"
                  service={offer.service}
                  key={offer.id}>
                  <div className={`tag is-large ${statusClass(offer.status)}`}>
                    {offer.status}
                  </div>
                  <hr />
                  <div className="service-offer">
                    <div>
                      <span className="label">From User:</span> {offer.fromUser.fullName}
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
                  {offer.status === "pending" && (
                    <div>
                      <hr />
                      <button
                        onClick={() => changeStatus(offer.id, "accepted")}
                        className="button is-success s-m-r">
                        Accept
                      </button>
                      <button
                        onClick={() => changeStatus(offer.id, "declined")}
                        className="button is-danger">
                        Decline
                      </button>
                    </div>
                  )}
                </ServiceItem>
              );
            })}
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
      FetchOffers,
      ChangeOfferStatus
    },
    dispatch
  );

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(SentOffers)
);
