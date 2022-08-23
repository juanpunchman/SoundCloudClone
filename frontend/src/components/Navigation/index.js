import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import './Navigation.css';

const Navigation = () => {
  let user = useSelector(state => state.session.user)

  let navlinks = [
    <LoginFormModal />,
    <NavLink className='header__navlink' to='/signup'>Sign Up</NavLink>
  ];

  return (
    <header className='header__nav'>
      <div className='header__nav__container'>
        <ul className='Navigation'>
          <li key='nav-home'><NavLink className='header__navlink' to='/'>Home</NavLink></li>
          <li key='nav-stream'><NavLink className='header__navlink' to='/stream'>Stream</NavLink></li>
          <li key='nav-library'><NavLink className='header__navlink' to='/you/library'>Library</NavLink></li>
          <li key='nav-upload'><NavLink className='header__navlink' to='/upload'>Upload</NavLink></li>
            {user && <ProfileButton />}
            {!user && navlinks}
        </ul>
      </div>
    </header>
  );
}

export default Navigation;
