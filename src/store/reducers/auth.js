import Actions from "store/actions";

const { GetMe, Logout, Login } = Actions.auth;

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false,
  isFetched: true
};

const auth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Login.REQUEST:
    case Logout.REQUEST:
    case GetMe.REQUEST: {
      return {
        ...state,
        isFetched: false
      };
    }
    case Login.SUCCESS:
    case GetMe.SUCCESS:
      return {
        ...state,
        isAuthResolved: true,
        isAuth: !!payload.user,
        user: payload.user,
        isFetched: true
      };
    case Login.FAILURE:
      return {
        ...state,
        isFetched: true
      };

    case Logout.SUCCESS:
    case Logout.FAILURE:
    case GetMe.FAILURE:
      return {
        ...state,
        isAuthResolved: false,
        isAuth: false,
        user: null,
        isFetched: true
      };

    default:
      return state;
  }
};

export default auth;
