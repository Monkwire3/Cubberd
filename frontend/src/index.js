import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import { ModalProvider } from './context/Modal';
import { PotProvider } from "./context/PotContext";
import { TourProvider } from "@reactour/tour";

let store = configureStore({});

const steps = [
  {
    selector: '#main-page',
    content: 'Welcome to Cubberd! Click the arrows to learn more. Feel free to exit this tutorial anytime.'
  },
  {
    selector: '.cubberd-content-container',
    content: 'This is your Cubberd. It should represent the ingredients that you have on hand in real life. To that end...'
  },
  {
    selector: '.cubberd-search-bar',
    content: '...you can add or remove ingredients until it is accurate and up-to-date.'
  },
  {
    selector: '.cubberd-ingredient-row:first-of-type',
    content: 'Ingredients can be added to your shopping list, removed from your Cubberd, or added to the Pot.'
  },
  {
    selector: '.pot-ingredient-container',
    content: 'Here are the current contents of the Pot. You can remove each ingredient from the Pot by clicking the X by its name.'
  },
  {
    selector: '.clear-all-pot-items-btn',
    content: 'You can also clear all items from the Pot by clicking this button.'
  }
]

function Root() {
  return (
    <TourProvider steps={steps}>
      <ModalProvider>
        <Provider store={store}>
          <PotProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PotProvider>
        </Provider>
      </ModalProvider>
    </TourProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
