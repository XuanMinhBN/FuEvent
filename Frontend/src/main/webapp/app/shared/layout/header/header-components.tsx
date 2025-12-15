import React, { useEffect, useRef, useState } from 'react';
import { Translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';

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
        <Translate contentKey="global.brand">FuEvent</Translate>
      </Link>
    </div>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="menu-desktop">
      <Link to="/">
        <Translate contentKey="global.navbar.home">Trang chủ</Translate>
      </Link>
      <Link to="/events">
        <Translate contentKey="global.navbar.events">Các sự kiện</Translate>
      </Link>
      <Link to="/about">
        <Translate contentKey="global.navbar.about_us">Về chúng tôi</Translate>
      </Link>
      <Link to="/contact">
        <Translate contentKey="global.navbar.contact">Liên hệ</Translate>
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
            <Translate contentKey="global.profile">Hồ sơ</Translate>
          </Link>

          {user?.role === 'Admin' && (
            <Link to="/admin/dashboard" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
              <Translate contentKey="global.admin_dashboard">Quản trị hệ thống</Translate>
            </Link>
          )}
          <Link to="/organizer" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
            <Translate contentKey="global.create_event">Tạo sự kiện</Translate>
          </Link>
          <Link to="/profile/tickets" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
            <Translate contentKey="global.my_tickets">Vé của tôi</Translate>
          </Link>

          <button className="profile-menu-item logout-btn" onClick={handleLogout}>
            <Translate contentKey="global.logout">Đăng xuất</Translate>
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
        <Translate contentKey="global.navbar.home">Trang chủ</Translate>
      </Link>
      <Link to="/events" onClick={closeMenu}>
        <Translate contentKey="global.navbar.events">Các sự kiện</Translate>
      </Link>
      <Link to="/about" onClick={closeMenu}>
        <Translate contentKey="global.navbar.about_us">Về chúng tôi</Translate>
      </Link>
      <Link to="/contact" onClick={closeMenu}>
        <Translate contentKey="global.navbar.contact">Liên hệ</Translate>
      </Link>

      {user?.role === 'Admin' && (
        <Link to="/admin/dashboard" onClick={closeMenu}>
          <Translate contentKey="global.admin_dashboard">Quản trị hệ thống</Translate>
        </Link>
      )}

      <div className="menu-mobile-bottom">
        <Link to="/profile/tickets" className="icon-btn" onClick={closeMenu}>
          <Translate contentKey="global.my_tickets">Vé của tôi</Translate>
        </Link>
        {userId ? (
          <Link to="/profile" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> {usernameDisplay}
          </Link>
        ) : (
          <Link to="/signin" className="login-btn" onClick={closeMenu}>
            <UserIcon size={18} className="icon" /> <Translate contentKey="global.login">Login</Translate>
          </Link>
        )}
      </div>
    </nav>
  );
};
