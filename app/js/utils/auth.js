'use strict';

import {BaseUrl, WebApi}     from '../utils/web-api.js';
import assign                from 'object-assign';

const Auth = {
    onAuth(authObject){
        console.log('onAuth called');
    },
    oAuthLogin(provider, cb){
      //If we have a token already, just invoke callback and return.
      if(localStorage.token){
        if(cb) cb({isLoggedIn: true, isNewUser: false});
        this.onChange(true);
        return;
      }
      //Else, need to log in.
      switch(provider){
        case 'google':
          const dataRef = new Firebase(Config.firebaseBaseUrl);
          dataRef.authWithOAuthPopup("google", (error, authData) => {
            if(error) {
              console.log("Login Failed!", error);
              if(cb) cb({isLoggedIn: false, isNewUser: false});
              this.onChange(false);
            }
            else{
              //New user or existing user?
              console.log('Authenticated successfully with payload:', authData);
              localStorage.token = authData.token;
              let userData = dataRef.child('users').child(authData.uid).once("value", data => {
                const dataVal = data.val();
                if(!dataVal){
                  //new user
                  var newUserData = assign({provider: authData.provider}, getUserDataFromGoogle(authData));
                  dataRef.child('users').child(authData.uid).set(newUserData)
                }
                if(cb) cb({isLoggedIn: true, isNewUser: !data.val});
                });
              this.onChange(true);
            }
          }, {scope: "email"});
        break;
        case 'facebook':
          console.log('facebook auth called.')
        break;
        case 'twitter':
          console.log('twitter auth called.')
        break;
        case 'github':
          console.log('github auth called.')
        break;
      }
    },

    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb)  cb(true);
            this.onChange(true);
            return;
        }
        pretendRequest(email, pass, res => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
                this.onChange(true);
            } else {
                if (cb) cb(false);
                this.onChange(false);
            }
        });
    },

    getToken() {
        return localStorage.token;
    },

    logout(cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {}
};
//dataRef.onAuth(authData => Auth.onAuth(authData));
function getUserDataFromGoogle(authData){
  return {
    email: authData.google.email,
    family_name: authData.google.cachedUserProfile.family_name, 
    given_name: authData.google.cachedUserProfile.given_name, 
    locale: "en",
    picture: authData.google.cachedUserProfile.picture
  };
}

function pretendRequest(email, pass, cb) {
    setTimeout(() => {
        if (email === 'joe@example.com' && pass === 'password1') {
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            cb({authenticated: false});
        }
    }, 1000);
}

export default Auth;
