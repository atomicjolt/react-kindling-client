"use strict";

import React            from 'react';
import BaseComponent    from "../base_component";
import {Styles}         from "material-ui";

const Colors = Styles.Colors; 
const Spacing = Styles.Spacing; 
const Typography = Styles.Typography; 
const ThemeManager = new Styles.ThemeManager().getCurrentTheme();

class Home extends BaseComponent{
  render(){
  	let divStyle = {
  		root: {
  			paddingTop: Spacing.desktopKeylineIncrement,
  		},
  		text: {
  			backgroundColor: Colors.yellow500,
  		}
  	};
    return <div style={divStyle.root}> 
      <h2 style={divStyle.text}>Home</h2>
    </div>;
  }
}

module.exports = Home;
