import React, { useState } from "react";
// import {useForm} from 'react-hook-form';
import withAuthentication from "components/hoc/withAuthentication";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
import { toast } from "helpers";

function Create(props) {
	const {auth, CreateService} = props;
	const [formValues, setFormValues] = useState({})
	const { addToast } = useToasts();
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const {user} = auth;
	
	const handleChange = (e) => {
		const {name ,value} = e.target;
		setFormValues({...formValues, [name]: value})	
	}
	
	const handleSubmit = e => {
		e.preventDefault();
		
		CreateService({
      values: { ...formValues, userId: user.uid },
      cb: {
        onSuccess: () => {
          toast.success("New Service is Successfully created", addToast);
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
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select onChange={handleChange} name="category">
                    <option value="">Please Select category</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="textarea"
                  placeholder="Textarea"></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  onChange={handleChange}
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  className="input"
                  onChange={handleChange}
                  name="price"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className={`button is-link ${loading ? 'is-loading': ''} `} disabled={loading}>
                  Create
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



export default withAuthentication(Create);
