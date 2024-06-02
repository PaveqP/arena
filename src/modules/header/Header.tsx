import React from 'react'
import { Config } from '../config/Config'
import { Logo } from '../../ui'
import './Header.scss'

function Header() {
  return (
    <div className='header'>
        <div className="header__row">
            <div className="header-leftBlock">

            </div>
            <Config/>
            <div className="header__logo">
                <Logo/>
            </div>
        </div>
    </div>

  )
}

export {Header}
