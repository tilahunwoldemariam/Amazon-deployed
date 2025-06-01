import styles from './Category.module.css';
import CategoryCard from './CategoryCard';
import { categoryInfos } from './categoryFullInfos';

function Category() {
  return (
    <section className={styles.category__container}>
      {categoryInfos.map((data, i) => <CategoryCard data={data} key={i} /> )}
    </section>
  );
}

export default Category