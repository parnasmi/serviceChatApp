import React, { useEffect } from "react";

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Actions from "store/actions";

function App({ Getme, children, auth, Logout }) {
  console.log("auth", auth);
  useEffect(() => {
    Getme();
  }, [Getme]);

  return (
    <>
      <Navbar {...{ auth, Logout }} />
      <Navbar id="navbar-clone" />
      <Sidebar {...{ auth }} />
      {children}
    </>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      Getme: Actions.auth.GetMe,
      Logout: Actions.auth.Logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
