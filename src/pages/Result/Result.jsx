import { useParams } from 'react-router-dom';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Result.module.css';
import { productUrl } from '../../Api/endPoints';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

function Result() {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatted = category.toLocaleLowerCase();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${formatted}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(`Error on fetching product ${err}`);
        setIsLoading(false);
      })
  }, []);

  return (
    <LayOut>
      <section className={styles.results__container}>
        <h1>Results</h1>
        <p>Category / {category}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products__container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
