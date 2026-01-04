import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountMenu, Brand, IUser, MobileMenu, Navbar } from './header-components';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, MenuIcon, XIcon } from 'lucide-react';
import './header.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user || state) as IUser;
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    // Cast user ID về string hoặc undefined để so sánh an toàn
    const userId = user?._id || user?.id;

    if (savedUser && !userId) {
      try {
        const parsedUser = JSON.parse(savedUser) as IUser;
        dispatch(setDataUser(parsedUser));
      } catch {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, [user, setDataUser]);

  const handleLogout = async () => {
    const ok = window.confirm('Are you sure you want to logout?');
    if (!ok) return;

    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await requestLogout();
    } catch (e) {
      console.error('Logout API error:', e);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    try {
      if (setDataUser) setDataUser({});
    } catch (e) {
      console.error('Failed to clear user data in Redux store:', e);
    }

    navigate('/signin');
  };

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

            <AccountMenu user={user} handleLogout={handleLogout} />
          </div>

          {/* --- Toggle button mobile --- */}
          <div className="menu-toggle">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}</button>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} user={user} />
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
function setDataUser(parsedUser: IUser): any {
  throw new Error('Function not implemented.');
}

function requestLogout() {
  throw new Error('Function not implemented.');
}
