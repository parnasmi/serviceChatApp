import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import Actions from "store/actions";

function withOnlyGuests(Component) {
  class WithOnlyGuests extends React.Component {
    render() {
      const {
        auth: { isAuthResolved }
        // dispatch,
        // ...rest
      } = this.props;
      return isAuthResolved ? <Redirect to="/" /> : <Component {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      { LoginUser: Actions.auth.Login, RegisterUser: Actions.auth.Register },
      dispatch
    );

  return connect(mapStateToProps, mapDispatchToProps)(WithOnlyGuests);
}

export default withOnlyGuests;
