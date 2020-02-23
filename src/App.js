import React, { useEffect } from "react";

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Actions from "store/actions";

function App({ Getme, children, auth, Logout }) {
  useEffect(() => {
    Getme();
  }, [Getme]);

  return (
    <>
      <Navbar id="navbar-main" {...{ auth, Logout }} />
      <Navbar id="navbar-clone" {...{ auth, Logout }} />
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
