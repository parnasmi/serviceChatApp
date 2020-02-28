import { takeLatest, put, /*call,*/ all /*select*/ } from "redux-saga/effects";
import db from "store/db";
import OfferActions from "store/actions/offers";
import firebaseFunc from "helpers/firebase";

const { CreateOffer, FetchOffers } = OfferActions;

function* CreateOfferSaga(action) {
  let { values, cb } = action.payload;
  console.log("values from saga", values);
  try {
    yield put(CreateOffer.request());

    yield db
      .collection("offers")
      .add(values)
      .then(docRef => docRef);
    cb.onSuccess();
  } catch (e) {
    cb.onError(e.message);
  } finally {
  }
}

function* FetchOffersSaga(action) {
  let { userId, offerType } = action.payload;
  const userRef = firebaseFunc.createRef("profiles", userId);
  try {
    yield put(FetchOffers.request());

    const offers = yield db
      .collection("offers")
      .where("fromUser", "==", userRef)
      .get()
      .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    //creating referance to user's profile
    yield put(FetchOffers.success({ offers, offerType }));
    // yield db
    //   .collection("offers")
    //   .add(values)
    //   .then(docRef => docRef);
    // console.log("offer", offer);
  } catch (e) {
  } finally {
  }
}

export default function* root() {
  yield all([
    takeLatest(CreateOffer.TRIGGER, CreateOfferSaga),
    takeLatest(FetchOffers.TRIGGER, FetchOffersSaga)
  ]);
}
