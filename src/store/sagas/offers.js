import { takeLatest, put, all /*select*/ } from "redux-saga/effects";
import db from "store/db";
import OfferActions from "store/actions/offers";
import firebaseFunc from "helpers/firebase";

const { CreateOffer, FetchOffers, ChangeOfferStatus } = OfferActions;

// function* extractDataFromOffer(offer, userType) {
//   const service = yield offer.service.get();
//   const user = yield offer[userType].get();
//   offer.service = service.data();
//   offer.user = user.data();

//   return offer;
// }

function* CreateOfferSaga(action) {
  let { values, cb } = action.payload;
  try {
    yield put(CreateOffer.request());

    yield db
      .collection("offers")
      .add(values)
      .then(docRef => docRef);
    yield put(CreateOffer.success());
    cb.onSuccess();
  } catch (error) {
    yield put(CreateOffer.failure({ error }));
    cb.onError(error.message);
  } finally {
  }
}

function* ChangeOfferStatusSaga(action) {
  let { offerId, status, cb } = action.payload;
  try {
    yield put(ChangeOfferStatus.request());

    const offer = yield db
      .collection("offers")
      .doc(offerId)
      .update({ status });
    console.log("changed offer", offer);

    /*
			const service = yield db
			.collection("services")
			.doc(id)
			.get()
			.then(snapshot => ({ ...snapshot.data(), id: snapshot.id }));
		*/

    yield put(ChangeOfferStatus.success());
    cb.onSuccess();
  } catch (error) {
    yield put(ChangeOfferStatus.failure({ error }));
    cb.onError(error.message);
  } finally {
  }
}

function* FetchOffersSaga(action) {
  let { userId, offerType } = action.payload;
  const userRef = firebaseFunc.createRef("profiles", userId);
  let userType = "";

  if (offerType === "sent") {
    userType = "fromUser";
  } else {
    userType = "toUser";
  }

  try {
    yield put(FetchOffers.request());

    const offers = yield db
      .collection("offers")
      .where(userType, "==", userRef)
      .get()
      .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    // const userForCard
    const allOffers = yield all(
      offers.map(function*(offer) {
        const service = yield offer.service.get();

        const fromUser = yield offer["fromUser"].get();
        const toUser = yield offer["toUser"].get();
        offer.service = service.data();
        offer["fromUser"] = fromUser.data();
        offer["toUser"] = toUser.data();

        return offer;
      })
    );

    yield put(FetchOffers.success({ offers: allOffers, offerType }));
  } catch (e) {
  } finally {
  }
}

export default function* root() {
  yield all([
    takeLatest(CreateOffer.TRIGGER, CreateOfferSaga),
    takeLatest(FetchOffers.TRIGGER, FetchOffersSaga),
    takeLatest(ChangeOfferStatus.TRIGGER, ChangeOfferStatusSaga)
  ]);
}
