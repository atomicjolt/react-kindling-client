"use strict";

import React        from 'react';
import { Link }     from 'react-router';
import Validator    from "validator";
import UserActions  from "../../actions/userActions";
import _            from "lodash";
import assign       from "object-assign";
import BaseComponent    from "../base_component";
import { FloatingActionButton, Styles, Paper, TextField, FlatButton, RaisedButton, FontIcon } from "material-ui";

const Colors = Styles.Colors; 
const Spacing = Styles.Spacing; 
const Typography = Styles.Typography; 
const ThemeManager = new Styles.ThemeManager().getCurrentTheme();


class Register extends BaseComponent{

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

  handleRegister(e){
    e.preventDefault();
    if(this.validateAll()){
      UserActions.register({
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      });
    }
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
      }
    };
  }

  render(){
    let styles = this.getStyles();
    return <div style={styles.root}> 
      <Paper style={styles.registerPaper} >
        <form style={styles.form} onSubmit={this.handleRegister}>
          <h1 style={styles.signupLabel} >Signup</h1>
          <TextField hintText="johndoe@example.com" floatingLabelText="Email" errorText={this.state.validations.email} ref="email" onBlur={this.validateEmail} />
          <TextField type="password" hintText="******" floatingLabelText="Password" errorText={this.state.validations.password} ref="password" onBlur={this.validatePassword} />
          <TextField type="password" hintText="******" floatingLabelText="Confirm Password"  errorText={this.state.validations.confirmPassword} ref="confirmPassword" onBlur={this.validateConfirmPassword} />
          <div style={styles.submitButtonContainer}>
            <RaisedButton className="sign-up-button"label="Signup" primary={true} />
          </div>
        </form>
        <p style={styles.p}>
          Already have an account? <Link to="login">Login</Link>
        </p>
      </Paper>
    </div>;
  }


}

module.exports = Register;
