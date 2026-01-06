import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountMenu, Brand, IUser, MobileMenu, Navbar } from './header-components';
import { useDispatch, useSelector } from 'react-redux';
import './header.scss';
import { setDataUser, logoutUser } from 'app/shared/redux/userSlice';
import axios from 'axios';
import { CustomButton } from 'app/shared/components/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { setLocale } from 'app/shared/reducers/locale';
import { LanguageMenu } from './header-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const { isAuthenticated, isAdmin, ribbonEnv } = props;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user || state) as IUser;
  const navigate = useNavigate();

  const currentLocale = useSelector((state: any) => state.locale.currentLocale);

  const requestLogout = async () => {
    await axios.post('api/logout');
  };

  const handleLocaleChange = (langKey: string) => {
    dispatch(setLocale(langKey));
  };

  const handleLogout = async () => {
    const ok = window.confirm('Are you sure you want to logout?');
    if (!ok) return;

    try {
      await requestLogout();
    } catch (e) {
      console.warn('Logout server failed/ignored', e);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('jhi-authenticationToken');

    dispatch(logoutUser());

    navigate('/signin');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const userId = user?._id || user?.id;

    if (savedUser && !userId) {
      try {
        const parsedUser = JSON.parse(savedUser) as IUser;
        dispatch(setDataUser(parsedUser));
      } catch {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, [user, dispatch]);

  return (
    <>
      <header className="header">
        {ribbonEnv === 'dev' && <div className="ribbon dev">Development</div>}
        <div className="header-container">
          {/* --- Logo + Desktop Nav --- */}
          <div className="header-left-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Brand />
            <Navbar />
          </div>

          {/* --- Actions Desktop --- */}
          <div className="header-actions">
            {/* <button className="icon-btn" onClick={() => setShowNotifications(true)} title="Notifications">
              <Bell size={18} />
            </button> */}

            <LanguageMenu currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />

            <AccountMenu user={user} handleLogout={handleLogout} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
          </div>

          {/* --- Toggle button mobile --- */}
          <div className="menu-toggle">
            <CustomButton icon={isMenuOpen ? XIcon : MenuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} user={user} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </header>

      {/* --- Sidebar Notifications --- */}
      {/* Bạn có thể cần update NotificationSidebar sang TSX nếu chưa làm */}
      {/* <NotificationSidebar
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(s => s.map(n => ({ ...n, read: true })))}
        onClear={() => setNotifications([])}
      />

      <AIRecommend userId={user?._id || user?.id} /> */}
    </>
  );
};

export default Header;
