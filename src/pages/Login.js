/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import personIcon from '../imgs/person-fill.svg';
import lockIcon from '../imgs/file-lock-fill.svg';
import { saveEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch } = this.props;

    dispatch(saveEmail(email));
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { email, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/carteira" />;
    }

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9]+$/gm;
    const minLength = 6;
    const isFormValid = emailRegex.test(email) && password.length >= minLength;
    return (
      <div
        className="columns is-flex is-justify-content-center is-align-items-center"
        style={ { minHeight: '100vh', margin: '0' } }
      >
        <div className="column is-one-third">
          <div className="box">
            <h1 className="title has-text-centered">Login</h1>
            <form onSubmit={ this.handleSubmit }>
              <div className="field">
                <label htmlFor="email" className="label is-inline-flex">
                  <img src={ personIcon } alt="email" />
                  <span>E-mail:</span>
                </label>
                <input
                  id="email"
                  data-testid="email-input"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  className="input"
                />
              </div>
              <div className="field">
                <label htmlFor="password" className="label is-inline-flex">
                  <img src={ lockIcon } alt="senha" />
                  <span>Senha:</span>
                </label>
                <input
                  id="password"
                  data-testid="password-input"
                  type="password"
                  name="password"
                  value={ password }
                  onChange={ this.handleChange }
                  className="input"
                />
              </div>
              <button
                type="submit"
                disabled={ !isFormValid }
                className="button is-primary"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
