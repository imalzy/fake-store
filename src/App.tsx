import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { FaTimesCircle } from "react-icons/fa";

interface CloseButtonProps {
  closeToast: () => void;
}

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <FaTimesCircle onClick={closeToast} className="cursor-pointer" />
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton closeToast={() => {}} />}
        />
      </div>
    </Router>
  );
}

export default App;
