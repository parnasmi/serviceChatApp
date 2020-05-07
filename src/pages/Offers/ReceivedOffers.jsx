import React, { useEffect, useState } from "react";
import withAuthentication from "components/hoc/withAuthentication";
import ServiceItem from "components/service/ServiceItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OfferActions from "store/actions/offers";
import cx from "classnames";
import { Spinner } from "components";
import { toast } from "helpers";
import { useToasts } from "react-toast-notifications";
const { FetchOffers, ChangeOfferStatus } = OfferActions;

const ReceivedOffers = ({ auth, FetchOffers, offers, ChangeOfferStatus }) => {
	const { addToast } = useToasts();
	const [loading, setLoading] = useState({})
  useEffect(() => {
    FetchOffers({ userId: auth.user.uid, offerType: "received" });
  }, [auth.user.uid,FetchOffers]);
	
	useEffect(() => {
		
		let offersLoadingState = {};
    offers &&
      offers.received.forEach(offer => {
				offersLoadingState[offer.id] = { accepted: false, declined: false };
      });
			setLoading(offersLoadingState);
  }, [offers]);

  const changeStatus = (offerId, status) => {
		setLoading({ ...loading, [offerId]: { ...loading[offerId], [status]: true } });
    const cb = {
      onSuccess: () => {
				if (status === 'accepted')
					toast.success("Succesfully accepted", addToast);
				else
					toast.success("Succesfully declined", addToast);
      },
      onError: (err) => {
        toast.error(err, addToast);
			},
			onFinally:() => {
				setLoading({ ...loading, [offerId]: { ...loading[offerId], [status]: false } });
			}
    };
    ChangeOfferStatus({ offerId, status, cb });
	};
	
	

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
                        className={cx(
                          "button",
                          "is-success",
                          "s-m-r",
                          loading[offer.id] && loading[offer.id].accepted && "is-loading"
                        )}>
                        Accept
                      </button>
                      <button
                        onClick={() => changeStatus(offer.id, "declined")}
                        className={cx(
                          "button",
                          "is-danger",
                          loading[offer.id] && loading[offer.id].declined && "is-loading"
                        )}>
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
  connect(mapStateToProps, mapDispatchToProps)(ReceivedOffers)
);
