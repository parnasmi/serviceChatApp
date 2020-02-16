import { createRoutine } from "redux-saga-routines";

const FetchServices = createRoutine("FETCH_SERVICES");
const FetchServicesSelected = createRoutine("FETCH_SERVICES_SELECTED");

export default { FetchServices, FetchServicesSelected };
