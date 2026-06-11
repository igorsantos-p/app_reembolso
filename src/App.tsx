import { Routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";


export function App() {

  return (
    <AlertProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </AlertProvider>

  )
}
