import { takeLatest, put, /*call,*/ all /*select*/ } from "redux-saga/effects";
import db from "store/db";
import OfferActions from "store/actions/offers";
import firebaseFunc from "helpers/firebase";

const { CreateOffer } = OfferActions;

function* CreateOfferSaga(action) {
  let { values, cb } = action.payload;
  console.log("values from saga", values);
  try {
    yield put(CreateOffer.request());
    //creating referance to user's profile

    console.log("values", values);
    const offer = yield db
      .collection("offers")
      .add(values)
      .then(docRef => docRef);
    console.log("offer", offer);
    cb.onSuccess();
  } catch (e) {
    cb.onError(e.message);
  } finally {
  }
}

export default function* root() {
  yield all([takeLatest(CreateOffer.TRIGGER, CreateOfferSaga)]);
}
