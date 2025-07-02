import { useContext, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Payment.module.css';
import { DataContext } from '../../components/Context/Context';
import ProductCard from '../../components/Product/ProductCard'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { ClipLoader } from 'react-spinners';
import { axiosInstance } from '../../Api/axios';
import { Type } from '../../Utility/action.type';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';

function Payment() {
  console.log("check")
  const [{ user, cart }, dispatch] = useContext(DataContext);

  const totalItem = cart?.reduce((amount, item) => item.quantity + amount, 0);
  
  const totalPriceInDollar = cart?.reduce((amount, item) => {
    return amount + item.quantity * item.price;
  }, 0);

  const totalPriceInCents = totalPriceInDollar * 100;
   

  const [processing, setProcessing] = useState(false)
  const [cardError, setCardError] = useState(null)

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();


  const handleChange = (e)=>{
        e?.error?.message  ? setCardError(e?.error?.message) : setCardError("")
  }

  const handlePayment = async (e)=>{
    e.preventDefault();
    setProcessing(true)
    
    const response = await axiosInstance({
       method: "POST",
       url: `/payment/create?total=${totalPriceInCents}`,
     });

    const clientSecret = response.data?.clientSecret;
    



   console.log("clientSecret: ", clientSecret)
    const confirmation = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })


    const {paymentIntent}  = confirmation
    console.log("paymentIntent: ", paymentIntent)
    

    // creating order Reference
    const orderDocRef = doc ( collection ( doc (db, "users", user.uid), "orders") , paymentIntent.id)
    await setDoc(orderDocRef, {
      cart: cart,
      quantity: paymentIntent.amount,
      created: paymentIntent.created
    });
    
    dispatch(
      {
        type: Type.SET_EMPTY
      }
    )


    setProcessing(false)

    navigate("/orders")

  }


  return (
    <LayOut>


         {/* header */}
         <div className={styles.payment__header}>Checkout ({totalItem}) itmes</div>



         {/* we have a section containg everything */}
         <section className={styles.payment}>

          {/* Delivery Address */}
          <div className={styles.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 </div>
              <div>Houston, Tx</div>
            </div>
          </div>

        

        <hr />

          {/* product review ----- */}
          <div className={styles.flex}>
              <h3>Review items and delivery</h3>
              <div>
                {cart?.map((item, i)=>(
                    <ProductCard product={item} key={i} notDisplayAdd={true} payment={true}/>
                ))}
              </div>
          </div>


          <hr />


          {/* payment related conatiner div ---- */}
          <div className={styles.flex}>

            <h3>Payment methods</h3>
             
             <div className={styles.payment__card__container}>
              <div className={styles.payment__details}>
                <form onSubmit={handlePayment}>
                  {cardError && (<small style={{color: "red"}}>{cardError}</small>)}

                   <CardElement onChange={handleChange} />


                   <div className={styles.payment__price}>
                      <div>
                        <span style={{display: "flex", gap: "10px"}}>
                          <p>Total order | </p>
                          <CurrencyFormat amount={totalPriceInDollar} />
                        </span>
                      </div>

                      <button type='submit'>
                         {processing ? (<div className={styles.loading}>
                          <ClipLoader color="grey" size={12} />
                          <p>Please wait</p>
                         </div>) : ("Pay Now")}
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

export default Payment