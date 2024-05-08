import React from 'react'
import './Header.scss'

function Header() {
  return (
    <div className='header'>
        <div className="header__row">
            <div className="header__logo">
                <p className="logo-title">
                    arena
                </p>
                <p className="logo-demo">
                    Demo
                </p>
            </div>
        </div>
        <div className="header__separator">
            
        </div>
    </div>

  )
}

export {Header}
