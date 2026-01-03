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
          <Translate contentKey="home.footer.title">FuEvent</Translate>
        </h2>
        <p className="footer-text">
          <Translate contentKey="home.footer.text">
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
          <Translate contentKey="home.footer.quickLinks">Quick Links</Translate>
        </h3>
        <ul>
          <li>
            <Link to="/">
              <Translate contentKey="home.footer.home">Home</Translate>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <Translate contentKey="home.footer.events">Events</Translate>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Translate contentKey="home.footer.about">About Us</Translate>
            </Link>
          </li>
          <li>
            <Link to="/faq">
              <Translate contentKey="home.footer.faq">FAQ</Translate>
            </Link>
          </li>
        </ul>
      </div>
      {/* Cột 3: Categories */}
      <div className="footer-column">
        <h3 className="footer-heading">
          <Translate contentKey="home.footer.categories">Categories</Translate>
        </h3>
        <ul>
          <li>
            <Link to="/category/academic">
              <Translate contentKey="home.footer.academic">Academic</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/music">
              <Translate contentKey="home.footer.music">Music</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/workshop">
              <Translate contentKey="home.footer.workshop">Workshop</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/club">
              <Translate contentKey="home.footer.club">Club</Translate>
            </Link>
          </li>
          <li>
            <Link to="/category/sports">
              <Translate contentKey="home.footer.sport">Sport</Translate>
            </Link>
          </li>
        </ul>
      </div>
      {/* Cột 4: Contact */}
      <div className="footer-column">
        <h3 className="footer-heading">
          <Translate contentKey="home.footer.contact">Contact Us</Translate>
        </h3>
        <ul className="footer-contact">
          <li>
            <MapPinIcon size={16} />
            <span>
              <Translate contentKey="home.footer.map_pin">FPT University, Hoa Lac Hi-Tech Park, Hanoi</Translate>
            </span>
          </li>
          <li>
            <PhoneIcon size={16} />
            <span>
              <Translate contentKey="home.footer.phone">+84 123 456 789</Translate>
            </span>
          </li>
          <li>
            <MailIcon size={16} />
            <span>
              <Translate contentKey="home.footer.email">support@fpticket.edu.vn</Translate>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>
        &copy; {new Date().getFullYear()}
        <Translate contentKey="home.footer.copyright">FuEvent. All rights reserved.</Translate>
      </p>
    </div>
  </footer>
);

export default Footer;
