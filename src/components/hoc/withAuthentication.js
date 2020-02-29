import React from "react";
import { Redirect } from "react-router-dom";
import ServicesActions from "store/actions/services";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Spinner } from "components";
function withAuthentication(Component) {
  class WithAuthentication extends React.Component {
    render() {
      const {
        auth: { isAuth, isFetched }
      } = this.props;
      const renderContent = () => {
        if (!isFetched) {
          return <Spinner />;
        } else {
          console.log("in auth");
          return isAuth ? <Component {...this.props} /> : <Redirect to="/login" />;
        }
      };
      return renderContent();
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });

  const mapDispatchToProps = dispatch =>
    bindActionCreators({ CreateService: ServicesActions.CreateService }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
