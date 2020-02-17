import { takeEvery, call, /*put,*/ all } from "redux-saga/effects";
import db from "store/db";
import Actions from "store/actions";
import firebase from "firebase/app";
import "firebase/auth";

const {
  auth: { Register }
} = Actions;

const createUserProfile = userProfile => {
  db.collection("profile")
    .doc(userProfile.uid)
    .set(userProfile);
};

function* RegisterUser(action) {
  const { values, cb } = action.payload;
  const { email, password, fullName, avatar } = values;

  try {
    // yield put(ServiceActions.FetchServices.request());

    // yield put(Register.request());

    const { user } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const userProfile = {
      uid: user.uid,
      email,
      fullName,
      avatar,
      services: [],
      description: []
    };

    const createdUser = yield createUserProfile(userProfile);

    console.log("createdUser", createdUser);
    yield call(cb.onSuccess, user);

    // yield put(ServiceActions.FetchServices.success(services));
    // yield call(api.request.delete, queryBuilder(`/filemanager/${imageId}`));
  } catch (e) {
    yield call(cb.onError, e.message);
  } finally {
    // yield put(filemanagerActions.UploadImages.fulfill());
  }
}

export default function* root() {
  yield all([takeEvery(Register.TRIGGER, RegisterUser)]);
}
