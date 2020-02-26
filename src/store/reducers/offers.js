import OfferActions from "store/actions/offers";

const { SUCCESS, REQUEST, FAILURE } = OfferActions.CreateOffer;
// import Actions from "store/actions";

// const { CreateOffer } = Actions.offers;

const INITIAL_STATE = {
  offers: [],
  isFetched: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUEST:
      return { ...state, isFetched: false };
    case SUCCESS:
      return { ...state, offers: payload.offers, isFetched: true };
    case FAILURE:
      return { ...state, offers: [], isFetched: false };
    default:
      return state;
  }
};
