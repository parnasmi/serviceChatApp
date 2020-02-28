import OfferActions from "store/actions/offers";

const { SUCCESS, REQUEST, FAILURE } = OfferActions.FetchOffers;
// import Actions from "store/actions";

// const { CreateOffer } = Actions.offers;

const INITIAL_STATE = {
  offers: {},
  isFetched: true
};

export default (state = INITIAL_STATE, action) => {
  // const { offers, offerType } = action.payload;

  switch (action.type) {
    case REQUEST:
      return { ...state, isFetched: false };
    case SUCCESS: {
      return {
        ...state,
        offers: { [action.payload.offerType]: action.payload.offers },
        isFetched: true
      };
    }

    case FAILURE:
      return { ...state, offers: [], isFetched: false };
    default:
      return state;
  }
};
