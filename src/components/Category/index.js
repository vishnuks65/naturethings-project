import {Link} from 'react-router-dom'
import './index.css'
import { Component } from 'react'

class Category extends Component{
 
render(){
  return (
    <nav className="category-header">
        <div className="nav-category-large-container">
          <ul className="nav-category-menu">
            <li className="nav-category-item">
              <Link to="/products/category/electronics" className="nav-category-item">
              Electronics
              </Link>
            </li>

            <li className="nav-category-item">
              <Link to="/products/category/jewelery" className="nav-category-item">
              Jewelery
              </Link>
            </li>

            <li className="nav-category-item">
              <Link to="/products/category/men's clothing" className="nav-category-item">
              Men's clothing
              </Link>
            </li>
            <li className="nav-category-item">
              <Link to="/products/category/women's clothing" className="nav-category-item">
              Women's clothing
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  )
}
}
export default Category
