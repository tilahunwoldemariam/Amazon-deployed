import { useContext } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Cart.module.css';
import { DataContext } from '../../components/Context/Context';
import ProductCard from '../../components/Product/ProductCard';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

function Cart() {
  const [{ cart, user }, dispatch] = useContext(DataContext);

  const total = cart?.reduce((amount, item) => 
    item.price * item.quantity + amount
    , 0);
  
  function inc(item) {
    dispatch({
      type: Type.ADD_TO_CART,
      item
    });
  }

  function dec(id) {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id
    });
  }
  
  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          <div className={styles.cart_flex}>
            {cart?.length === 0 ? (
              <p>No item in your cart</p>
            ) : (
              cart?.map((product) => {
                return (
                  <section className={styles.cart_product}>
                    <ProductCard
                      product={product}
                      detail={true}
                      key={product.id}
                      cart={true}
                      notDisplayAdd={true}
                    />
                    <div className={styles.btn_container}>
                      <button className={styles.btn} onClick={() => inc(product)}>
                        <IoIosArrowUp size={30} />
                      </button>
                      <span>{product.quantity}</span>
                      <button className={styles.btn} onClick={() => dec(product.id)}>
                        <IoIosArrowDown size={30} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
        {cart?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({cart?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a </small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart