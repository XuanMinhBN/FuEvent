import React, { useEffect, useRef, useState } from 'react';
import { Translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import './header.scss';

export interface IUser {
  id?: string;
  _id?: string;
  username?: string;
  user_name?: string;
  userName?: string;
  full_name?: string;
  role?: string;
  [key: string]: any;
}

export interface INotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface AccountMenuProps {
  user: IUser | null;
  handleLogout: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: IUser | null;
}

export const Brand: React.FC = () => {
  return (
    <div className="header-left">
      <Link to="/" className="logo">
        <Translate contentKey="home.header.title">FuEvent</Translate>
      </Link>
    </div>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="menu-desktop">
      <Link to="/">
        <Translate contentKey="home.header.home">Home</Translate>
      </Link>
      <Link to="/events">
        <Translate contentKey="home.header.events">Events</Translate>
      </Link>
      <Link to="/about">
        <Translate contentKey="home.header.about_us">About Us</Translate>
      </Link>
      <Link to="/contact">
        <Translate contentKey="home.header.contact">Contact Us</Translate>
      </Link>
    </nav>
  );
};

export const AccountMenu: React.FC<AccountMenuProps> = ({ user, handleLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const userId = user?._id || user?.id || null;
  const usernameDisplay = user?.username || user?.user_name || user?.userName || user?.full_name || 'Profile';
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!userId) {
    return (
      <Link to="/signin" className="login-btn">
        <UserIcon size={18} className="icon" /> <Translate contentKey="global.login">Login</Translate>
      </Link>
    );
  }

  return (
    <div className="profile-root" ref={profileRef}>
      <button className="login-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
        <UserIcon size={18} className="icon" /> {usernameDisplay}
      </button>

      {showProfileMenu && (
        <div className="profile-menu shadow">
          <Link to="/profile" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
            <Translate contentKey="home.header.profile">Profile</Translate>
          </Link>

          {user?.role === 'Admin' && (
            <Link to="/admin/dashboard" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
              <Translate contentKey="home.header.admin_dashboard">Admin Dashboard</Translate>
            </Link>
          )}
          <Link to="/organizer" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
            <Translate contentKey="home.header.create_event">Create Event</Translate>
          </Link>
          <Link to="/profile/tickets" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
            <Translate contentKey="home.header.my_tickets">My Ticket</Translate>
          </Link>

          <button className="profile-menu-item logout-btn" onClick={handleLogout}>
            <Translate contentKey="home.header.logout">Logout</Translate>
          </button>
        </div>
      )}
    </div>
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, user }) => {
  if (!isOpen) return null;
  const userId = user?._id || user?.id || null;
  const usernameDisplay = user?.username || user?.user_name || user?.userName || user?.full_name || 'Profile';
  const closeMenu = () => setIsOpen(false);
  return (
    <nav className="menu-mobile">
      <Link to="/" onClick={closeMenu}>
        <Translate contentKey="home.header.home">Home</Translate>
      </Link>
      <Link to="/events" onClick={closeMenu}>
        <Translate contentKey="home.header.events">Events</Translate>
      </Link>
      <Link to="/about" onClick={closeMenu}>
        <Translate contentKey="home.header.about_us">About Us</Translate>
      </Link>
      <Link to="/contact" onClick={closeMenu}>
        <Translate contentKey="home.header.contact">Contact Us</Translate>
      </Link>

      {user?.role === 'Admin' && (
        <Link to="/admin/dashboard" onClick={closeMenu}>
          <Translate contentKey="home.header.admin_dashboard">Admin Dashboard</Translate>
        </Link>
      )}

      <div className="menu-mobile-bottom">
        <Link to="/profile/tickets" className="icon-btn" onClick={closeMenu}>
          <Translate contentKey="home.header.my_tickets">My Ticket</Translate>
        </Link>
        {userId ? (
          <Link to="/profile" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> {usernameDisplay}
          </Link>
        ) : (
          <Link to="/signin" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> <Translate contentKey="home.header.login">Login</Translate>
          </Link>
        )}
      </div>
    </nav>
  );
};
