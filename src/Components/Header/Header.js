import React from 'react'
import './Header.css'
import { useStateValue } from '../Provider';
import { AiOutlineSearch } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";


const Header = ({spotify}) => {
  
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='header'>
      <div className="header__left">
        <AiOutlineSearch/>
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
      <RxAvatar className='Avatar-logo' alt={user?.display_name} src={user?.images[0].url} />
        <h4>{user?.display_name}</h4>
      </div>

    </div>
  )
}

export default Header