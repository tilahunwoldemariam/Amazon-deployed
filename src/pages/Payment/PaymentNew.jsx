// importing react hooks
import React, { useContext, useState } from "react";

// importing styles
import styles from "./Payment.module.css";

// importing components
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";



// importing types
import { Type } from "../../Utility/action.type";

// importing stripe hooks
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// importing axios instance
import { axiosInstance } from "../../Api/axios";

// importing react-spinners
import { ClipLoader } from "react-spinners";



// Import the specific Firestore functions needed in this component
import { collection, doc, setDoc } from "firebase/firestore";

// importing react-router-dom
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../components/Context/Context";
import { db } from "../../../Firebase/firebase";

function Payment() {
  // using useContext to get user, basket and popup data
  const [{ user, cart, popup }, dispatch] = useContext(DataContext);

  // calculating the total number of items in the basket
  const totalItem = cart?.reduce((amount, item) => {
    return amount + item.quantity;
  }, 0);

  // calculating the total price of the items in the basket
  const totalPriceInDollar = cart.reduce((amount, item) => {
    return amount + item.quantity * item.price;
  }, 0);

  const totalPriceInCents = totalPriceInDollar * 100; // converting to cents for Stripe
  const totalPriceInt = Math.round(totalPriceInCents); // rounding to the nearest integer

  // state to manage card error and processing state
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // using stripe and elements hooks to access stripe and elements objects
  const stripe = useStripe();
  const elements = useElements();

  // using useNavigate to redirect the user after payment
  const navigate = useNavigate();

  // handleChange function to set card error message
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // handlePayment function to process the payment
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // request to create a payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalPriceInt}`,
      });

      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const orderDocRef = doc(
        collection(doc(db, "users", user.uid), "orders"),
        paymentIntent.id
      );
      console.log(orderDocRef);
      // Create a new document reference in the user's orders collection
      await setDoc(orderDocRef, {
        cart: cart,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);

      dispatch({
        type: Type.SET_POPUP,
        message: "Payment successfully completed!",
      });

      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Piassa</div>
            <div>Chigago, IL</div>
          </div>
        </div>

        <hr />

        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {cart?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>{" "}
                      <CurrencyFormat amount={totalPriceInDollar} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
