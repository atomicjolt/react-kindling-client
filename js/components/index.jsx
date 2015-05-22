"use strict";

import React                from "react";
import Messages             from "./common/messages";
import {RouteHandler}       from "react-router";
import BaseComponent        from "./base_component";

export default class Index extends BaseComponent{

  constructor(){
    super();
    this.state = this.getState();
  }

  getState(){
    return {
    };
  }

  render(){
    return (
      <RouteHandler {...this.props} />
    );
  }

}