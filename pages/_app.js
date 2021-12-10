import App from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import '../public/index.css';

class MyApp extends App {
  render() {
    const theme = createTheme({
      typography: {
        fontFamily: ["Inter"].join(","),
      },
      palette: {
        primary: {
          main: "#1C30E0",
        },
        secondary: {
          main: "#f2c826",
        },
      },
    });

    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
