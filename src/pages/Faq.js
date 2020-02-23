import React from "react";
import withAuthentication from "components/hoc/withAuthentication";

const Faq = props => {
  return <h1>I am FAQ Page</h1>;
};

export default withAuthentication(Faq);
