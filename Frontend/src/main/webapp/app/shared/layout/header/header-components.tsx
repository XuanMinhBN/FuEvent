import React, { useEffect, useRef, useState } from 'react';
import { Translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { Globe, UserIcon } from 'lucide-react';
import './header.scss';
import { languages } from 'app/config/translation';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
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
  isAdmin?: boolean;
  isAuthenticated?: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: IUser | null;
  isAdmin?: boolean;
  isAuthenticated?: boolean;
}

interface LanguageMenuProps {
  currentLocale: string;
  onLocaleChange: (langKey: string) => void;
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({ currentLocale, onLocaleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguageName = languages[currentLocale]?.name || currentLocale;

  return (
    <div className="language-root" ref={menuRef} style={{ position: 'relative', marginLeft: '1rem' }}>
      <button
        className="icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Language"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        <Globe size={20} />
        {/* Nếu muốn hiện tên ngôn ngữ cạnh icon thì bỏ comment dòng dưới */}
        <span className="d-none d-md-inline">{currentLanguageName}</span>
      </button>

      {isOpen && (
        <div className="profile-menu shadow" style={{ right: 0, minWidth: '150px' }}>
          {Object.keys(languages).map(langKey => (
            <button
              key={langKey}
              className={`profile-menu-item ${currentLocale === langKey ? 'active' : ''}`}
              onClick={() => {
                onLocaleChange(langKey);
                setIsOpen(false);
              }}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '10px 15px', cursor: 'pointer' }}
            >
              {languages[langKey].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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

export const AccountMenu: React.FC<AccountMenuProps> = ({ user, handleLogout, isAdmin, isAuthenticated }) => {
  // eslint-disable-next-line no-console
  console.log('AccountMenu User Data:', user);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const fullName = `${user?.lastName || ''} ${user?.firstName || ''}`.trim();
  const usernameDisplay = fullName || user?.login || 'Profile';
  const hasUserId = user && user.id;
  const isUserLoggedIn = isAuthenticated || hasUserId;
  const hasAdminAuthority = isAdmin || (user?.authorities && user.authorities.includes('ROLE_ADMIN'));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isUserLoggedIn) {
    return (
      <Link to="/login" className="login-btn">
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

          {hasAdminAuthority && (
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

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, user, isAuthenticated, isAdmin }) => {
  if (!isOpen) return null;
  const fullName = `${user?.lastName || ''} ${user?.firstName || ''}`.trim();
  const usernameDisplay = fullName || user?.login || 'Profile';
  const hasAdminAuthority = isAdmin || (user?.authorities && user.authorities.includes('ROLE_ADMIN'));
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

      {hasAdminAuthority && (
        <Link to="/admin/dashboard" onClick={closeMenu}>
          <Translate contentKey="home.header.admin_dashboard">Admin Dashboard</Translate>
        </Link>
      )}

      <div className="menu-mobile-bottom">
        <Link to="/profile/tickets" className="icon-btn" onClick={closeMenu}>
          <Translate contentKey="home.header.my_tickets">My Ticket</Translate>
        </Link>
        {isAuthenticated ? (
          <Link to="/profile" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> {usernameDisplay}
          </Link>
        ) : (
          <Link to="/login" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> <Translate contentKey="home.header.login">Login</Translate>
          </Link>
        )}
      </div>
    </nav>
  );
};
