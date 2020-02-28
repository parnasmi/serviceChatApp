import { createRoutine } from "redux-saga-routines";

const CreateOffer = createRoutine("CREATE_OFFER");
const FetchOffers = createRoutine("FETCH_OFFERS");
export default {
  CreateOffer,
  FetchOffers
};
