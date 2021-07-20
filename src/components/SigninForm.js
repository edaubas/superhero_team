import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signError: '',
    }
  }

  onSubmit(values) {

    axios.post('http://challenge-react.alkemy.org?', {
      email: values.email,
      password: values.password
    })
      .then((res) => {
        if (res.data.token) {
          this.props.isSignedIn(res.data.token);
        }
      })
      .catch(error => {
        this.setState({ signError: error.message })
        console.log(error.toJSON());
      }
      )

  }

  validateInput(values) {
    const errors = {};
    if (!values.email) {
      errors.email = <p className='fw-bold text-center'>Email is required</p>;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = <p className='fw-bold text-center'>Invalid email address</p>;
    }
    if (!values.password) {
      errors.password = <p className='fw-bold text-center'>Password is required</p>;
    }
    return errors;
  }

  render() {

    let signError = '';
    signError = this.state.signError ? this.state.signError : '';

    return (
      <div>
        <h1 className='d-flex justify-content-center'>Please sign in</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(data, { setSubmitting }) => { this.onSubmit(data); setSubmitting(false); }}
          validate={data => this.validateInput(data)}
        >
          {({ isSubmitting }) => (
            <div className='d-flex justify-content-center'>
              <Form>
                <div>
                  Email:
                  <Field className='rounded m-2' type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
              Password:
              <Field className='rounded m-2' type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <div className='d-flex justify-content-center'>
                  <button className='rounded m-2 w-50' type="submit" disabled={isSubmitting}>
                    Submit
             </button></div>
                {signError}
              </Form>
            </div>

          )}
        </Formik>
      </div>

    )

  }

}