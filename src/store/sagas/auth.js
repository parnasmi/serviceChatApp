import { takeLatest, call, put, all } from "redux-saga/effects";
import db from "store/db";
import Actions from "store/actions";
import firebase from "firebase/app";
import "firebase/auth";

const {
  auth: { Register, Login, GetMe, Logout }
} = Actions;

const createUserProfile = userProfile => {
  db.collection("profiles")
    .doc(userProfile.uid)
    .set(userProfile);
};

function onAuthStateChanged() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Ops!"));
      }
    });
  });
}

function* RegisterUser(action) {
  const {
    values: { email, password, fullName, avatar },
    cb
  } = action.payload;

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

    // const createdUser = yield createUserProfile(userProfile);
    yield createUserProfile(userProfile);

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
    yield put(Login.request());

    const response = yield firebase.auth().signInWithEmailAndPassword(email, password);
    // console.log("response", response);
    const user = yield db
      .collection("profiles")
      .doc(response.user.uid)
      .get()
      .then(snapshot => ({ ...snapshot.data(), uid: response.user.uid }));

    yield put(Login.success({ user }));
    yield call(cb.onSuccess, response);
  } catch (err) {
    yield call(cb.onError, err.message);
  }
}

function* GetMeUser(action) {
  try {
    yield put(GetMe.request());
    const loginData = yield call(onAuthStateChanged);

    const user = yield db
      .collection("profiles")
      .doc(loginData.uid)
      .get()
      .then(snapshot => ({ ...snapshot.data(), uid: loginData.uid }));

    yield put(GetMe.success({ user }));
  } catch (err) {
    yield put(GetMe.failure(err));
  }
}
function* LogoutUser(action) {
  try {
    yield put(Logout.request());

    yield firebase.auth().signOut();
    yield put(Logout.success());
  } catch (err) {
    yield put(Logout.failure(err));
  }
}

export default function* root() {
  yield all([
    takeLatest(Register.TRIGGER, RegisterUser),
    takeLatest(Login.TRIGGER, LoginUser),
    takeLatest(GetMe.TRIGGER, GetMeUser),
    takeLatest(Logout.TRIGGER, LogoutUser)
  ]);
}
