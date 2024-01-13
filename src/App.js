import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./component/checkout1/Checkout";
import Success from "./component/checkout1/Success";
import Cancel from "./component/checkout1/Cancel";
import Processing from "./component/checkout1/Processing";
import PreOrder from "./component/checkout2/PreOrder";
import PayPalCompletePayment from "./component/checkout2/PayPalCompletePayment";
import SuccessPage from "./component/checkout2/SuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/checkout" element={<Checkout />} />
      <Route path="/paypal-success" element={<Success />} />
      <Route path="/paypal-cancel" element={<Cancel />} />
      <Route path="/processing" element={<Processing />} /> */}
        <Route path="/order" element={<PreOrder />} />
        <Route path="/paypal-success" element={<PayPalCompletePayment />} />
        <Route path="/payment-success" element={<SuccessPage />} />
        {/* <Route path="/paypal-return" element={<PayPalReturnPage />} /> */}
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
