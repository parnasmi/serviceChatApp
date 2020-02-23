import React from "react";
// import { connect } from "react-redux";
// import Actions from "store/actions";
import { Auth } from "components";
// import { bindActionCreators } from "redux";
import withOnlyGuests from "components/hoc/withOnlyGuests";

const Register = ({ RegisterUser }) => {
  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Register</h3>
          <p className="subtitle has-text-grey">Please Register to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="" />
            </figure>
            <Auth.RegisterForm {...{ Register: RegisterUser }} />
          </div>
          <p className="has-text-grey">
            <a href="/">Sign In With Google</a>&nbsp;
            <a href="/">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withOnlyGuests(Register);
