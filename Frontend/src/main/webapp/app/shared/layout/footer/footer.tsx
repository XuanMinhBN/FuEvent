import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { MapPin as MapPinIcon, Phone as PhoneIcon, Mail as MailIcon, FacebookIcon, InstagramIcon } from 'lucide-react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {/* Cột 1: Thông tin chung & Tải app */}
      <div className="footer-column">
        <h2 className="footer-logo">
          <Translate contentKey="global.title">FuEvent</Translate>
        </h2>
        <p className="footer-text">
          <Translate contentKey="global.footer.text">
            Your go-to platform for discovering and managing university events with ease and convenience.
          </Translate>
        </p>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <FacebookIcon size={20} />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
      {/* Cột 2: Quick Links */}
      <div className="footer-column">
        <h3 className="footer-heading">
          <Translate contentKey="global.footer.quickLinks">Quick Links</Translate>
        </h3>
        <ul>
          <li>
            <Link to="/">
              <Translate contentKey="global.menu.home">Home</Translate>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <Translate contentKey="global.menu.entities.event">Events</Translate>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Translate contentKey="global.footer.aboutUs">About Us</Translate>
            </Link>
          </li>
          <li>
            <Link to="/faq">
              <Translate contentKey="global.footer.faq">FAQ</Translate>
            </Link>
          </li>
        </ul>
      </div>
      {/* Cột 3: Categories */}
      <div className="footer-column">
        <h3 className="footer-heading">
          <Translate contentKey="global.footer.categories">Categories</Translate>
        </h3>
        <ul>
          <li>
            <Link to="/category/academic">
              <Translate contentKey="global.footer.academic">Academic</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/music">
              <Translate contentKey="global.footer.music">Music</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/workshop">
              <Translate contentKey="global.footer.workshop">Workshop</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/club">
              <Translate contentKey="global.footer.club">Club</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/sports">
              <Translate contentKey="global.footer.sports">Sports</Translate>
            </Link>
          </li>
        </ul>
      </div>
      {/* Cột 4: Contact */}
      <div className="footer-column">
        <h3 className="footer-heading">
          <Translate contentKey="global.footer.contactUs">Contact Us</Translate>
        </h3>
        <ul className="footer-contact">
          <li>
            <MapPinIcon size={16} />
            <span>
              <Translate contentKey="global.map.pin">FPT University, Hoa Lac Hi-Tech Park, Hanoi</Translate>
            </span>
          </li>
          <li>
            <PhoneIcon size={16} />
            <span>
              <Translate contentKey="global.phone.number">+84 123 456 789</Translate>
            </span>
          </li>
          <li>
            <MailIcon size={16} />
            <span>
              <Translate contentKey="global.email.address">support@fpticket.edu.vn</Translate>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>
        &copy; {new Date().getFullYear()}
        <Translate contentKey="global.footer.rights">FuEvent. All rights reserved.</Translate>
      </p>
    </div>
  </footer>
);

export default Footer;
