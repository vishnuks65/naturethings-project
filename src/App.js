import {Component} from 'react'
import {Redirect,Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import ElectronicsProducts from './components/ElectronicsProducts'
import JeweleryProducts from './components/JeweleryProducts'
import MensClothingProducts from './components/MensClothingProducts'
import WomensClothingProducts from './components/WomensClothingProducts'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem('cartData') || '[]',
)

class App extends Component {
    state = {
      cartList: cartFromLocalStorage,
    }
    componentDidUpdate() {
      const {cartList} = this.state
      localStorage.setItem('cartData', JSON.stringify(cartList))
    }
  
    removeAllCartItems = () => {
      this.setState({cartList: []})
    }
  
    incrementCartItemQuantity = id => {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  
    decrementCartItemQuantity = id => {
      const {cartList} = this.state
      const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
      if (productObject.quantity > 1) {
        this.setState(prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity - 1
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }))
      } else {
        this.removeCartItem(id)
      }
    }
  
    removeCartItem = id => {
      const {cartList} = this.state
      const updatedCartList = cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      )
  
      this.setState({cartList: updatedCartList})
    }
  
    addCartItem = product => {
      const {cartList} = this.state
      const productObject = cartList.find(
        eachCartItem => eachCartItem.id === product.id,
      )
  
      if (productObject) {
        this.setState(prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity + product.quantity
  
              return {...eachCartItem, quantity: updatedQuantity}
            }
  
            return eachCartItem
          }),
        }))
      } else {
        const updatedCartList = [...cartList, product]
  
        this.setState({cartList: updatedCartList})
      }
    }
    render() {
      const {cartList} = this.state
  
      return (
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
        <Switch>
          <Route  path="/login" component={LoginForm} />
          <ProtectedRoute  exact path="/" component={Home} />
          <ProtectedRoute  exact path="/products" component={Products} />
          <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
          <ProtectedRoute exact path="/products/category/electronics" component={ElectronicsProducts} />
          <ProtectedRoute exact path="/products/category/jewelery" component={JeweleryProducts} />
          <ProtectedRoute exact path="/products/category/men's clothing" component={MensClothingProducts} />
          <ProtectedRoute exact path="/products/category/women's clothing" component={WomensClothingProducts} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
        </CartContext.Provider>
      )
    }
  }
export default App
