import AllProductsSection from '../AllProductsSection'
import Category from '../Category'


import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="product-sections">
      <Category/>
      <AllProductsSection />
    </div>
  </>
)

export default Products
