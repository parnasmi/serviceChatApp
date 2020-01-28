import requireContext from "require-context.macro";
import { importAll } from "store/utils";

const actions = importAll(requireContext("", false, /\w+$/), ".js");

export default {
  ...actions
};
