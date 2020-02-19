import { takeLatest, call, /*put,*/ all } from "redux-saga/effects";
import db from "store/db";
import Actions from "store/actions";
import firebase from "firebase/app";
import "firebase/auth";

const {
  auth: { Register, Login }
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
  } catch (err) {
    yield call(cb.onError, err.message);
  } finally {
    // yield put(filemanagerActions.UploadImages.fulfill());
  }
}

function* LoginUser(action) {
  const {
    values: { email, password },
    cb
  } = action.payload;

  try {
    const response = yield firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("response", response);
    const onAuthStateChange = yield firebase
      .auth()
      .onAuthStateChanged(authUser => authUser);
    console.log("onAuthStateChange", onAuthStateChange);
  } catch (err) {
    yield call(cb.onError, err.message);
  }
}

export default function* root() {
  yield all([
    takeLatest(Register.TRIGGER, RegisterUser),
    takeLatest(Login.TRIGGER, LoginUser)
  ]);
}
