"use strict";

import React            from 'react';
import BaseComponent    from "../base_component";
import { Link }         from 'react-router';
import UserActions      from '../../actions/userActions';
import {Styles, Paper, TextField, FlatButton, RaisedButton, FloatingActionButton } from "material-ui";

const Colors = Styles.Colors; 
const Spacing = Styles.Spacing; 
const Typography = Styles.Typography; 
const ThemeManager = new Styles.ThemeManager().getCurrentTheme();

class Login extends BaseComponent{

  constructor() {
    super();
    this.state = {
      validations: {} 
    };
  }

  validateEmail(e){
    return this.validate(
      Validator.isEmail(this.refs.email.getValue()),
      { email: "Invalid email" },
      { email: "" }
    );
  }

  validatePassword(e){
    return this.validate(
      Validator.isLength(this.refs.password.getValue(), 5),
      { password: "Password must be at least 5 characters" },
      { password: "" }
    );
  }

  validateConfirmPassword(){
    return this.validate(
      (this.refs.password.getValue() == this.refs.confirmPassword.getValue()),
      { confirmPassword: "Passwords do not match" },
      { confirmPassword: "" }
    );
  }

  validate(isValid, invalidState, emptyState){
    if(!isValid){
      this.setState(assign(this.state.validations, invalidState));
    } else {
      this.setState(assign(this.state.validations, emptyState));
    }
    return isValid;
  }

  validateAll(){
    return _.every([
      this.validateEmail(),
      this.validatePassword(),
      this.validateConfirmPassword()
    ], (v)=> { return v; });
  }

  getStyles() {
    return {
      root: {
        maxWidth: 345,
        margin: 'auto',
        paddingTop: Spacing.desktopLeftNavMenuItemHeight
      },
      signupLabel: {
        fontWeight: 400
      },
      registerPaper: {
        maxWidth: 450,
        margin: '5% auto',
        //paddingTop: Spacing.desktopLeftNavMenuItemHeight
      },
      form: {
        margin: 20,
        padding: 23,
        'float': 'left'
      },
      submitButtonContainer : {
        paddingTop: 23
      },
      p: {
        padding: 23,
        margin:20
      },
      oAuthContainer: {
        textAlign: 'center',
      },
      oauthButton: {
        marginRight: 30,
        marginLeft: 30,
      },
    };
  }

  render(){
    let styles = this.getStyles();
    return <div style={styles.root}> 
      <Paper style={styles.registerPaper} >
        <form style={styles.form} onSubmit={this._handleLogin}>
          <h1 style={styles.signupLabel} >Login</h1>
          <TextField hintText="johndoe@example.com" floatingLabelText="Email" errorText={this.state.validations.email} ref="email" onBlur={this.validateEmail} />
          <TextField type="password" hintText="******" floatingLabelText="Password" errorText={this.state.validations.password} ref="password" onBlur={this.validatePassword} />
          <div style={styles.submitButtonContainer}>
            <RaisedButton className="sign-up-button"label="Login" primary={true} />
          </div>
        </form>
        <div style={styles.oAuthContainer} >
          <FloatingActionButton style={styles.oauthButton} iconClassName='icon-google' mini={true} secondary={true} onClick={()=> this._oAuthLogin('google')} />
          <FloatingActionButton style={styles.oauthButton} iconClassName='icon-facebook' mini={true} secondary={true} onClick={()=> this._oAuthLogin('facebook')} />
          <FloatingActionButton style={styles.oauthButton} iconClassName='icon-twitter' mini={true} secondary={true} onClick={()=> this._oAuthLogin('twitter')} />
        </div>
        <p style={styles.p}>
          Need an account? <Link to="register">Register</Link>
        </p>
      </Paper>
    </div>;
  }

  _handleLogin(e){
    e.preventDefault();
     UserActions.login({
       email: this.refs.email.getValue(),
       password: this.refs.password.getValue()
     });
  }

  _oAuthLogin(provider) {
    //TODO:  Wire this up to actions
  }

}

module.exports = Login;

