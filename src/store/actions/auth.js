import { createRoutine } from "redux-saga-routines";

const Register = createRoutine("REGISTER");
const Login = createRoutine("LOGIN");
const Logout = createRoutine("LOGOUT");
const GetMe = createRoutine("GETME");

export default {
  Register,
  Login,
  GetMe,
  Logout
};
