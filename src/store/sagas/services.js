import { takeEvery, put, /*call,*/ all, select } from "redux-saga/effects";
import db from "store/db";
import ServiceActions from "store/actions/services";

function* FetchServices(action) {
  // const { imageId } = action.payload;

  try {
    yield put(ServiceActions.FetchServices.request());

    const services = yield db
      .collection("services")
      .get()
      .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    yield put(ServiceActions.FetchServices.success(services));
    // yield call(api.request.delete, queryBuilder(`/filemanager/${imageId}`));
  } catch (e) {
    // yield put(filemanagerActions.UploadImages.failure(e));
  } finally {
    // yield put(filemanagerActions.UploadImages.fulfill());
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
      .then(snapshot => ({ ...snapshot.data(), id: snapshot.id }));

    yield put(ServiceActions.FetchServicesSelected.success({ service }));
  } catch (e) {
  } finally {
  }
}

export default function* root() {
  yield all([
    takeEvery(ServiceActions.FetchServices.TRIGGER, FetchServices),
    takeEvery(ServiceActions.FetchServicesSelected.TRIGGER, FetchServicesSelected)
  ]);
}
