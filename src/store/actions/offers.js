import { createRoutine } from "redux-saga-routines";

const CreateOffer = createRoutine("CREATE_OFFER");
const FetchOffers = createRoutine("FETCH_OFFERS");
const ChangeOfferStatus = createRoutine("CHANGE_OFFER_STATUS");
export default {
  CreateOffer,
  FetchOffers,
  ChangeOfferStatus
};
