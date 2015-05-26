"use strict";

import React             from 'react';
import Router            from 'react-router';
import Routes            from './routes';
import FontIcons         from '../styles/font-icons/style.css';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

Router.run(Routes, (Handler, state) => {
  let params = state.params;
  return React.render(
  	<Handler params={state} />, document.getElementById('app-container'));
});

// Use the HTML5 history API for cleaner URLs:
// Router.run(routes, Router.HistoryLocation, (Handler) => {
//   return React.render(<Handler/>, document.body);
// });