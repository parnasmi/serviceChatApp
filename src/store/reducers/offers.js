import OfferActions from "store/actions/offers";

const { SUCCESS, REQUEST, FAILURE } = OfferActions.FetchOffers;

const {
  SUCCESS: CREATE_SUCCESS,
  REQUEST: CREATE_REQUEST,
  FAILURE: CREATE_FAILURE
} = OfferActions.CreateOffer;

const INITIAL_STATE = {
  isFetched: true,
  sent: [],
  received: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_REQUEST:
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
    case CREATE_SUCCESS: {
      return {
        ...state,
        isFetched: true
      };
    }

    case FAILURE: {
      return { ...state, error: action.payload.error, isFetched: true };
    }

    case CREATE_FAILURE: {
      return { ...state, error: action.payload.error, isFetched: true };
    }

    default:
      return state;
  }
};
