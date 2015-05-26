"use strict";

import React                from "react";
import Messages             from "./common/messages";
import {RouteHandler}       from "react-router";
import BaseComponent        from "./base_component";
import {Styles, AppBar, AppCanvas, Menu, IconButton} from 'material-ui';
import AppLeftNav           from './app-left-nav';

var Colors = Styles.Colors;
var Typography = Styles.Typography;
var ThemeManager = new Styles.ThemeManager();

class Index extends BaseComponent{
  //https://github.com/callemall/material-ui/issues/689
  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  }

  render(){
    //TODO: This should be listening to a route change and giving the title of the new route.
    let title = "Title";
      // this.context.router.isActive('get-started') ? 'Get Started' :
      // this.context.router.isActive('customization') ? 'Customization' :
      // this.context.router.isActive('components') ? 'Components' : '';
    let styles = this.getStyles();
    const githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/jbasdf/react-kindling-firebase"
        linkButton={true} />
    );
    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            title={title}
            zDepth={1}
            iconElementRight={githubButton}
            >
        </AppBar>
        <AppLeftNav ref="leftNav" />
        <RouteHandler />
      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
      this.refs.leftNav.toggle();
  }

}            

Index.contextTypes = {
  router: React.PropTypes.func
};

Index.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Index;
            //<RouteHandler {...this.props} />
