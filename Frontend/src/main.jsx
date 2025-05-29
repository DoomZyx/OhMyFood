import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { AuthProvider } from "./Provider/Auth/authProvider.jsx";
import { AuthOwnerProvider } from "./Provider/Auth/authOwnerProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AuthOwnerProvider>
            <App />
          </AuthOwnerProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
