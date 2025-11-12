import { BrowserRouter as Router } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./Providers/AuthProvider";
import { CartProvider } from "./Providers/CartProvider";

interface CloseButtonProps {
  closeToast: () => void;
}

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <FaTimesCircle onClick={closeToast} className="cursor-pointer" />
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <AppRoutes />

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              closeButton={<CloseButton closeToast={() => {}} />}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
