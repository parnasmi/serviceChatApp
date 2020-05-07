import OfferActions from "store/actions/offers";

const { ChangeOfferStatus, FetchOffers, CreateOffer } = OfferActions;

const INITIAL_STATE = {
  sent: [],
  received: [],
  error: null,
  isFetched: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ChangeOfferStatus.REQUEST: {
    //   const { status } = action.payload;
    //   return { ...state, isStatusChanged: { ...state.isStatusChanged, [status]: false } };
    // }

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

    case ChangeOfferStatus.SUCCESS: {
      const { offerId, status } = action.payload;

      const patchedOffers = state.received.reduce((acc, obj) => {
        if (obj.id === offerId) {
          return [...acc, { ...obj, status }];
        } else {
          return [...acc, { ...obj }];
        }
      }, []);

      const nextState = {
        ...state,
        received: [...patchedOffers]
      };

      return nextState;
    }
    case ChangeOfferStatus.FAILURE: {
      return {
        ...state,
        isFetched: true,
        error: action.payload.error
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
