import { useContext, useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Orders.module.css';
import ProductCard from '../../components/Product/ProductCard';
import { DataContext } from '../../components/Context/Context';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';


function Orders() {

  const [orders, setOrder] = useState([])
  const [{user}, dispatch] = useContext(DataContext)


  useEffect(()=>{

    if(user){
      // creating query reference
      
      const ordersQuery = query(
        collection(    doc(db, "users", user.uid), "orders"), // to get the reference for "orders" subcollection
        orderBy("created", "desc") // sorst them by the created field (with the most recent first)
      )


     onSnapshot(ordersQuery, (snapshot)=>{
         setOrder(
          snapshot.docs.map((singleOrder)=>(
               {
                id: singleOrder.id, // paymentIntent.id
                data: singleOrder.data() // data() returns an actual content of a document
               }
          ))
         )
     } )



    } else {
      setOrder([])
    }


  },[user])

  return (
    <LayOut>
      
      {/* a section that contain everything */}
      <section className={styles.container}>
       
       {/* a div -- the inner part container */}
       <div className={styles.orders__container}>
         {/* header */}
         <h2>Your Orders</h2>

         {/* in case our user have no any order */}
         {orders?.length === 0 && (
          <div className={styles.optional}>You don't have orders yet.</div>
         )}
       

       {/* ordered items container -- which is a div */}
       <div>
        {orders?.map((eachOrder, i)=>{
          return (
            <div key={i}>
              <p>Order ID: {eachOrder?.id}</p>
              
              {eachOrder?.data?.cart?.map((item, index)=>(
              <ProductCard product={item} key={index} notDisplayAdd={true} payment={true}/>
        ))}
           <hr />

            </div>
          );
        })}
       </div>



       </div>



      </section>


    </LayOut>
  );
}

export default Orders