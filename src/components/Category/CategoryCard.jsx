import { Link } from 'react-router-dom';
import styles from './Category.module.css';

function CategoryCard({data}) {
  return (
    <div className={styles.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard