import { Link, Outlet } from 'react-router-dom'

import "./Header.scss"
import { Fragment } from 'react'

const Header = () => {
  return (
    <Fragment>
      <header>
        <nav>
          <div className="container nav__container">
            <Link className='nav__link' to="/">Home</Link>
            <Link className='nav__link' to="/about">About</Link>
            <Link className='nav__link' to="/quotes">Quotes</Link>
          </div>
        </nav>
      </header>
      <Outlet/>
    </Fragment>
  )
}

export default Header