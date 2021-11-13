import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

import Header from '../Header'


import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    category: data.category,
    description: data.description,
    id: data.id,
    imageUrl: data.image,
    price: data.price,
    count: data.rating.count,
    rating:data.rating.rate,
    title: data.title,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://fakestoreapi.com/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
     
      this.setState({
        productData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
    const {productData, quantity} = this.state
    const {
      count,
      description,
      imageUrl,
      price,
      rating,
      title,
    } = productData
    const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{count} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onDecrementQuantity}
                testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={this.onIncrementQuantity}
                testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button type="button" className="button add-to-cart-btn"  onClick={onClickAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    )
      }}
      </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
