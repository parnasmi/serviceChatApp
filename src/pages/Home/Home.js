/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { connect } from "react-redux"; // HOC
import Hero from "components/Hero";
import ServiceItem from "components/service/ServiceItem";
import { bindActionCreators } from "redux";
// import { fetchServices } from "store/actions/services";
import ServiceActions from "store/actions/services";

class Home extends React.Component {
  state = {
    services: []
  };

  componentDidMount() {
    this.props.fetchServices();
  }

  renderServices = services =>
    services.map(service => <ServiceItem service={service} key={service.id} />);

  render() {
    const { services } = this.props;
    return (
      <div>
        <Hero />
        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">Great Power Comes </h2>
              <h3 className="subtitle is-5 is-muted">With great Responsability</h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper ">
              <div className="columns is-multiline">{this.renderServices(services)}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  services: state.services.items,
  isFetched: state.services.isFetched
});

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchServices: dispatch(ServiceActions.FetchServices())
//   };
// };

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchServices: ServiceActions.FetchServices
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
