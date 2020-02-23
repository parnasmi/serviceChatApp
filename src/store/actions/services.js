import { createRoutine } from "redux-saga-routines";

const FetchServices = createRoutine("FETCH_SERVICES");
const FetchUserServices = createRoutine("FETCH_USER_SERVICES");
const FetchServicesSelected = createRoutine("FETCH_SERVICES_SELECTED");
const CreateService = createRoutine("CREATE_SERVICE");

export default { FetchServices, FetchServicesSelected, CreateService, FetchUserServices };
