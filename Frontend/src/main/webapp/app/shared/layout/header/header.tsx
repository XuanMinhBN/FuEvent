import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountMenu, Brand, IUser, MobileMenu, Navbar } from './header-components';
import { useDispatch, useSelector } from 'react-redux';
import './header.scss';
import { setDataUser, logoutUser } from 'app/shared/redux/userSlice';
import { CustomButton } from 'app/shared/components/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { setLocale } from 'app/shared/reducers/locale';
import { LanguageMenu } from './header-components';
import { logout } from 'app/shared/reducers/authentication';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const { isAuthenticated, isAdmin, currentLocale } = props;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user) as IUser;

  // eslint-disable-next-line no-console
  console.log('Current Redux User:', user);
  // eslint-disable-next-line no-console
  console.log('Props isAuthenticated:', props.isAuthenticated);

  const handleLocaleChange = (langKey: string) => {
    dispatch(setLocale(langKey));
  };

  const handleLogout = () => {
    // const ok = window.confirm('Are you sure you want to logout?');
    // if (!ok) return;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('jhi-authenticationToken');
    dispatch(logout());
    dispatch(logoutUser());
    navigate('/login', {
      replace: true,
      state: { fromLogout: true },
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const isReduxEmpty = !user || (!user.id && !user.login);

    if (savedUser && isReduxEmpty) {
      try {
        const parsedUser = JSON.parse(savedUser) as IUser;
        // eslint-disable-next-line no-console
        console.log('Restoring user from LocalStorage:', parsedUser);
        dispatch(setDataUser(parsedUser));
      } catch {
        console.error('Failed to parse user from localStorage');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <>
      <header className="header">
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
