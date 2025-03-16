import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./services/redux/Store";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./utils/AuthContext";
import useOnlineStatus from "./components/hooks/useOnlineStatus";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function App() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    let timeout;
    if (isOnline) {
      timeout = setTimeout(() => {
        enqueueSnackbar("You are online", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }, 100);
    } else {
      timeout = setTimeout(() => {
        enqueueSnackbar("You are offline", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }, 100);
    }
  
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [isOnline]);
  

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}
