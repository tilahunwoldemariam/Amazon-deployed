import { Rating } from '@mui/material';
import styles from './ProductCard.module.css';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import Category from '../Category/Category';
import { useContext } from 'react';
import { DataContext } from '../Context/Context';
import { Type } from '../../Utility/action.type';


function ProductCard({
  product: { image, title, price, rating, id, category, description },
  detail,
  notDisplayAdd,
  cart,
}) {
  const [state, dispatch] = useContext(DataContext);

  function handleAddToCart() {
    dispatch({
      type: Type.ADD_TO_CART,
      item: { image, title, price, rating, id, category, description },
    });
  }

  return (
    <>
      <div
        className={`${styles.product_container} ${
          detail ? styles.product_flexed : ''
        } ${cart ? styles.product_cart : ''}`}
      >
        <Link to={`/products/${id}`}>
          <div className={styles.product_image_container}>
            <img src={image} alt="" className={styles.product_image} />
          </div>
        </Link>

        <div className={`${styles.product_name} limit_text_to_2_lines`}>
          {title}
        </div>

        <div className={styles.product_rating_container}>
          <Rating value={rating?.rate} precision={0.1} />

          <div
            className={`${styles.product_rating_count} ${styles.link_primary}`}
          >
            {rating?.count}
          </div>
        </div>

        <div className={styles.product_price}>
          <CurrencyFormat amount={price} />
        </div>

        <div className={styles.product_quantity_container}>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className={styles.product_spacer}></div>

        <div className={styles.added_to_cart}>
          <img src="" alt="" />
        </div>

        {notDisplayAdd ? (
          ''
        ) : (
          <button
            className={`${styles.add_to_cart_button}  button_primary`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
      {detail && (
        <div className={styles.productDescription}>
          <h2 className={styles.descriptionTitle}>{category}</h2>
          <p>
            {title} <br />
            <br /> {description || 'No description available'}
          </p>
        </div>
      )}
    </>
  );
}

export default ProductCard;
