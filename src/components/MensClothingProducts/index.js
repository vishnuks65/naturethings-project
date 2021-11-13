import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import Category from '../Category'
import Header from '../Header'
import './index.css'

const sortbyOptions = [
    {
      optionId: 'desc',
      displayText: '(High-Low)',
    },
    {
      optionId: 'asc',
      displayText: '(Low-High)',
    },
  ]
  
  
  
  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class MensClothingProducts extends Component{
  

  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeOptionId,
    } = this.state
    const apiUrl = `https://fakestoreapi.com/products/category/men's clothing?sort=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(product => ({
        category:product.category, 
        description: product.description,
        price: product.price,
        id: product.id,
        imageUrl: product.image,
        count: product.rating.count,
        rating:product.rating.rate
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }



  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

    render(){
        return(
  <>
    <Header />
    <div className="product-sections">
      <Category/>
      <div className="all-products-section">
        {this.renderAllProducts()}
      </div>
    </div>
  </>
        )
    }
}

export default MensClothingProducts
