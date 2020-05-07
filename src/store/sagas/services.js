import { takeLatest, put, select, all } from "redux-saga/effects";
import db from "store/db";
import ServiceActions from "store/actions/services";
import firebaseFunc from "helpers/firebase";

function* FetchServices(action) {
  // const { imageId } = action.payload;

  try {
    yield put(ServiceActions.FetchServices.request());

    // const services = yield db
    //   .collection("services")
    //   .get()
    //   .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    let services;
    const servicesSnapshot = yield db
      .collection("services")
      .get()
      .then((snapshot) => snapshot);

    if (!servicesSnapshot.metadata.fromCache) {
      services = servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      //For caching purposes
      services = yield select((state) => state.services.items);
    }

    yield put(ServiceActions.FetchServices.success({ services }));
  } catch (error) {
    yield put(ServiceActions.FetchServices.failure({ error }));
  } finally {
    // yield put(filemanagerActions.UploadImages.fulfill());
  }
}
function* FetchUserServices(action) {
  const { userId } = action.payload;

  try {
    yield put(ServiceActions.FetchUserServices.request());

    const services = yield db
      .collection("services")
      .where("userId", "==", userId)
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    yield put(ServiceActions.FetchUserServices.success({ services }));
  } catch (err) {
    yield put(ServiceActions.FetchUserServices.failure({ err }));
  } finally {
  }
}

function* FetchServicesSelected(action) {
  const { id } = action.payload;

  try {
    yield put(ServiceActions.FetchServicesSelected.request());
    const service = yield db
      .collection("services")
      .doc(id)
      .get()
      .then((snapshot) => ({ ...snapshot.data(), id: snapshot.id }));

    //fetching user's profile and attach to SelectedService
    const user = yield service.user.get();
    service.user = user.data();
    service.user.id = user.id;

    yield put(ServiceActions.FetchServicesSelected.success({ service }));
  } catch (e) {
  } finally {
  }
}

function* CreateService(action) {
  let { values, cb } = action.payload;
  try {
    yield put(ServiceActions.CreateService.request());
    //creating referance to user's profile
    values.user = firebaseFunc.createRef("profiles", values.userId);

    yield db
      .collection("services")
      .add(values)
      .then((docRef) => docRef.id);
    cb.onSuccess();
  } catch (e) {
    cb.onError(e.message);
  } finally {
  }
}

//createUserRef = (uid) => db.doc('profiles/' + uid)
//createRef = (collection,docId) => db.doc(`${collection}/${docId}`)

export default function* root() {
  yield all([
    takeLatest(ServiceActions.FetchServices.TRIGGER, FetchServices),
    takeLatest(ServiceActions.FetchUserServices.TRIGGER, FetchUserServices),
    takeLatest(ServiceActions.FetchServicesSelected.TRIGGER, FetchServicesSelected),
    takeLatest(ServiceActions.CreateService.TRIGGER, CreateService)
  ]);
}
