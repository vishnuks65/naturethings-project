import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Fashion is what you buy, style is what you do with it.</h1>
          <img
            src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1636832431/this-is-same-shoes_jjnis4.jpg"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
          The thing about shopping is that you never know exactly what you are going to find. 
          A shopping experience can be filled with joyous surprises or unexpected pitfalls. 
          No matter how hard you try, you cannot plan every detail of a shopping trip, and you never 
          know exactly how it will end up.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1636832431/this-is-same-shoes_jjnis4.jpg"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home
