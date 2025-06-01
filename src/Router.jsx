import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
//  import from './pages/Auth/SignUp';
import Auth from "./pages/Auth/Auth";
import Result from "./pages/Result/Result";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function Router() {
  
  const stripePromise = loadStripe(
    "pk_test_51RUPLF2Mpd6Y9lMIx9RmqWJskBi3RN1xlohYJ54UQNljn8C7sdxRjjBPNJWoyGfxwcRTycOFJP2TfckcSKhONaW500jNk7uEAp"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              message="You have to login to make a payment"
              redirect="/payments"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/category/:category" element={<Result />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="orders"
          element={
            <ProtectedRoute
              message="You have to login to view your orders"
              redirect="/orders"
            >
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
