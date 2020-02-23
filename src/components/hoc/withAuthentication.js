import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function withAuthentication(Component) {
  class WithAuthentication extends React.Component {
    render() {
      const {
        auth: { isAuthResolved },
        dispatch,
        ...rest
      } = this.props;
      return isAuthResolved ? <Component {...rest} /> : <Redirect to="/login" />;
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });

  return connect(mapStateToProps)(WithAuthentication);
}

export default withAuthentication;
