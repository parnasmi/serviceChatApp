import OfferActions from "store/actions/offers";

const { SUCCESS, REQUEST, FAILURE } = OfferActions.FetchOffers;
const INITIAL_STATE = {
  isFetched: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST: {
      return { ...state, isFetched: false };
    }
    case SUCCESS: {
      const { offers, offerType } = action.payload;
      return {
        ...state,
        [offerType]: offers,
        isFetched: true
      };
    }
    case FAILURE: {
      return { ...state, offers: {}, isFetched: true };
    }
    default:
      return state;
  }
};
