import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";

const Login = () => {
  // const { register, handleSubmit } = useForm();
  const { register, handleSubmit, errors, getValues } = useForm();
  const [redirect, setRedirect] = useState(false);

  const onSubmitForm = values => {
    console.log("values", values);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  console.log("test");
  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="" />
            </figure>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="field">
                <div className="control">
                  <input
                    ref={register()}
                    className="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autoComplete="email"
                    name="email"
                  />
                  {/* <div className="form-error">
                    <span className="help is-danger">Email is required</span>
                    <span className="help is-danger">Email address is not valid</span>
                  </div> */}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="current-password"
                    ref={register()}
                  />
                  {/* <div className="form-error">
                    <span className="help is-danger">Password is required</span>
                  </div> */}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-large is-fullwidth">
                Sign In
              </button>
            </form>
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

export default Login;
