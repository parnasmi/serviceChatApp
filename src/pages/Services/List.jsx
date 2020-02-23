import React, { useEffect } from "react";
import withAuthentication from "components/hoc/withAuthentication";
import { connect } from "react-redux";
import ServiceItem from "components/service/ServiceItem";
import { bindActionCreators } from "redux";
import ServicesActions from "store/actions/services";
function UserServicesList(props) {
	
	const { FetchUSerServices, auth, user:{services, isFetched} } = props;
	
	useEffect(() => {
    auth &&
      auth.isFetched &&
      FetchUSerServices({ userId: auth.user.uid });
  }, [FetchUSerServices, auth]);

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Your Services</h1>
        <div className="columns is-multiline">
          {isFetched && services.map(s => (
            <div key={s.id} className="column">
              <ServiceItem service={s} />
            </div>
          ))}
					{
						!isFetched && <p>Loading</p>
					}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ FetchUSerServices: ServicesActions.FetchUserServices }, dispatch);

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(UserServicesList)
);


