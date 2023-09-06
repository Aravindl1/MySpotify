import React from 'react'
import './SideBar.css'
import SideBarOption from '../SideBarOption/SideBarOption'
import { AiFillHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { useStateValue } from '../Provider';
import {getTokenFromUrl} from '../Spotify'

const SideBar = () => {
  const [{ playlists }, dispatch] = useStateValue();
  console.log(playlists);

  return (
    <div className='sidebar'>
      <img 
      className='sidebar__logo'
      src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
      alt=''
      />
        
      <SideBarOption Icon={AiFillHome} title='Home'/>
      <SideBarOption Icon={AiOutlineSearch} title='Search'/>
      <SideBarOption Icon={BiSolidPlaylist} title='Your Library'/>
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SideBarOption option={playlist.name} />
      ))}
      </div>

  )
}

export default SideBar