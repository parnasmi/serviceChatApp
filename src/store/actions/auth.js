import { createRoutine } from "redux-saga-routines";

const Register = createRoutine("REGISTER");
const Login = createRoutine("LOGIN");

export default {
  Register,
  Login
};
