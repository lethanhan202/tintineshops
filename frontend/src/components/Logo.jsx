import React from 'react'
import logoImg from '../assest/TINTIN SHOP.png'

const Logo = ({ w, h }) => {
    return (
        <div>
            <img src={logoImg} width={w} height={h} className='mix-blend-multiply' />
        </div>
    )
}

export default Logo