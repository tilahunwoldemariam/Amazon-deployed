import CarouselEffect from "../../components/CarouselEffect/CarouselEffect"
import Category from "../../components/Category/Category"
import Product from "../../components/Product/Product"
import LayOut from '../../components/LayOut/LayOut';

function Home() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Home