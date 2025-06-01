import styles from './Header.module.css';

 import logo from '../../assets/amazon_dark_logo.png'; 
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import cartIcon from '../../assets/cart-icon.png';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../Context/Context';
import { auth } from '../../../Firebase/firebase';

function Header() {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const totalItem = cart?.reduce((amount, item) => item.quantity + amount, 0)
  return (
    <>
      <nav className={styles.upper_Header_wrapper}>
        <div className={styles.header__container}>
          <div className={styles.logo__container}>
            <div className={styles.logo__wrapper}>
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  className={styles.logo}
                />
              </Link>
            </div>

            <div className={styles.delivery}>
              <SlLocationPin className={styles.icon} />
              <div>
                <p className={styles.label}>Delivery to</p>
                <span className={styles.location}>USA</span>
              </div>
            </div>
          </div>

          <div className={styles.search}>
            <select
              name="category"
              className={`${styles.search__select} no-style`}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
            </select>

            <input
              type="text"
              placeholder="Search Amazon"
              className={`${styles.search__input} no-style`}
            />

            <button className={`${styles.search__button} no-style`}>
              <BsSearch size={20} />
            </button>
          </div>

          <div className={styles.order__container}>
            <Link to="#" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_State.svg.png"
                alt="US Flag"
                className={styles.flag}
              />

              <select className={`${styles.language__select} no-style`}>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </Link>

            <Link to={!user && '/auth'} className={styles.account}>


              {
                user ? (<>
                <p>Hello, {user?.displayName?.split(' ')[0]}</p>
                <span onClick={()=>auth.signOut()}>sign out</span>
                
                </>) : (<>
                <p>Hello, sign In</p>
                <span>Account & lists</span>
                </>)
              }


            </Link>

            <Link to="/orders" className={styles.orders}>
              <p className={styles.label}>Returns</p>
              <span className={styles.bold}>& Orders</span>
            </Link>

            <Link to="/cart" className={styles.cart}>
              <img
                src={cartIcon}
                alt="cart icon"
                className={styles.icon}
                width="40px"
              />
              <span className={styles.cart__count}>{totalItem}</span>
              <span className={styles.cart__label}>Cart</span>
            </Link>
          </div>
        </div>
      </nav>
      <LowerHeader />
    </>
  );
}

export default Header;
