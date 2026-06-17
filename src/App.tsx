import { Routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import { BrowserRouter } from "react-router";


export function App() {

  return (
    <BrowserRouter>
      <AlertProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </AlertProvider>
    </BrowserRouter>

  )
}
