"use strict";

import Constants   from   "../constants";
import Dispatcher  from "../dispatcher";
import WebAPI      from "../utils/web-api";

export default {

  login(payload){
    Dispatcher.dispatch({ action: Constants.LOGIN_PENDING });
    WebAPI.login(payload);
    //Api.post(Constants.LOGIN, "sessions/", payload);
  },

  register(payload) {
    Dispatcher.dispatch({ action: Constants.REGISTER_PENDING });
    WebAPI.register(payload);
    //Api.post(Constants.REGISTER, "users/", payload);
  }

};
