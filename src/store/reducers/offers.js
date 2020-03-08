import OfferActions from "store/actions/offers";

const { ChangeOfferStatus, FetchOffers, CreateOffer } = OfferActions;

const INITIAL_STATE = {
  isFetched: true,
  sent: [],
  received: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CreateOffer.REQUEST:
    case FetchOffers.REQUEST: {
      return { ...state, isFetched: false };
    }

    case FetchOffers.SUCCESS: {
      const { offers, offerType } = action.payload;

      return {
        ...state,
        [offerType]: offers,
        isFetched: true
      };
    }
    case CreateOffer.SUCCESS: {
      return {
        ...state,
        isFetched: true
      };
    }

    case FetchOffers.FAILURE: {
      return { ...state, error: action.payload.error, isFetched: true };
    }

    case CreateOffer.FAILURE: {
      return { ...state, error: action.payload.error, isFetched: true };
    }

    default:
      return state;
  }
};
