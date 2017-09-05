import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./Store/ConfigureStore";
import Main from "./Containers/Main";

export default class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
