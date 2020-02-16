import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import FetchServices from "store/actions/services";
import { Spinner } from "components";

function ServicesDetails({ fetchServicesSelected, serviceItem, isFetched }) {
  const { id } = useParams();

  useEffect(
    function() {
      fetchServicesSelected({ id });
    },
    [fetchServicesSelected, id]
  );

  const { title, description, image } = serviceItem;
  return (
    <>
      {!isFetched ? (
        <Spinner />
      ) : (
        <section className="hero is-fullheight is-default is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <figure className="image is-4by3">
                    <img src={image} alt="Description" />
                  </figure>
                </div>
                <div className="column is-6 is-offset-1">
                  <h1 className="title is-2">{title}</h1>
                  <h2 className="subtitle is-4">{description}</h2>
                  <br />
                  <p className="has-text-centered">
                    <button className="button is-medium is-info is-outlined">
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hero-foot">
								<div className="container">
										<div className="tabs is-centered">
												<ul>
														<li>
																<Link>And this is the bottom</Link>
														</li>
												</ul>
										</div>
								</div>
						</div> */}
        </section>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  serviceItem: state.servicesSelected.item,
  isFetched: state.servicesSelected.isFetched
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchServicesSelected: FetchServices.FetchServicesSelected
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesDetails);
