import styles from './Carousel.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { img } from './img/data'

function CarouselEffect() {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} showThumbs={false} showStatus={false} emulateTouch={true} swipeable={true} interval={3000} >
        {img.map((imgLink) => (
          <img src={imgLink} />
        ))}
      </Carousel>
      <div className={styles.hero__img}></div>
    </div>
  );
}

export default CarouselEffect