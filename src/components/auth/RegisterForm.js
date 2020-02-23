/* eslint no-useless-escape: 0 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validators, toast } from "helpers";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
const { isValidImage, sameAs, isValidUrl } = validators;

function RegisterForm({ Register }) {
  const { register, handleSubmit, errors, getValues } = useForm();
  const { addToast } = useToasts();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  function onSubmitForm(values) {
    setLoading(true);
    Register({
      values,
      cb: {
        onSuccess: data => {
          toast.success("Succesfully sent", addToast);
          setLoading(false);
          setRedirect(true);
        },
        onError: err => {
          toast.error(err, addToast);
          setLoading(false);
        }
      }
    });
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="field">
        <div className="control">
          <input
            name="email"
            className="input is-large"
            type="text"
            placeholder="Your Email"
            autoComplete="email"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />
          {errors.email && (
            <div className="form-error">
              {errors.email.type === "required" && (
                <span className="help is-danger">Email is required</span>
              )}
              {errors.email.type === "pattern" && (
                <span className="help is-danger">Email address is not valid</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            name="fullName"
            className="input is-large"
            type="text"
            placeholder="Full Name"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.fullName && (
            <div className="form-error">
              {errors.fullName.type === "required" && (
                <span className="help is-danger">Name is required</span>
              )}
              {errors.fullName.type === "pattern" && (
                <span className="help is-danger">Name is not valid</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            name="avatar"
            className="input is-large"
            type="text"
            placeholder="Avatar"
            ref={register({
              required: true,
              validate: { isValidImage, isValidUrl }
            })}
          />
          {errors.avatar && (
            <div className="form-error">
              {errors.avatar.type === "required" && (
                <span className="help is-danger">Avatar is required</span>
              )}
              {errors.avatar.type === "isValidImage" && (
                <span className="help is-danger">Avatar image format is not valid</span>
              )}
              {errors.avatar.type === "isValidUrl" && (
                <span className="help is-danger">Avatar image url is not valid</span>
              )}
            </div>
          )}
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
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && (
            <div className="form-error">
              {errors.password.type === "required" && (
                <span className="help is-danger">Password is required</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            name="passwordConfirmation"
            className="input is-large"
            type="password"
            placeholder="Repeat Password"
            autoComplete="current-password"
            ref={register({
              required: true,
              minLength: 6,
              validate: { sameAs: sameAs(getValues, "password") }
            })}
          />
          {errors.passwordConfirmation && (
            <div className="form-error">
              {errors.passwordConfirmation.type === "required" && (
                <span className="help is-danger">Password Confirmation is required</span>
              )}
              {errors.passwordConfirmation.type === "minLength" && (
                <span className="help is-danger">
                  Password must contain minimum 6 characters
                </span>
              )}
              {errors.passwordConfirmation.type === "sameAs" && (
                <span className="help is-danger">
                  Password Confirmation does not match
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`button is-block is-info is-large is-fullwidth ${
          loading ? "is-loading disabled" : ""
        }`}
        disabled={loading}>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
