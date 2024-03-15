import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Company</h5>
            <ul className={styles.sectionLinks}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Shop</h5>
            <ul className={styles.sectionLinks}>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/brands">Brands</Link>
              </li>
              <li>
                <Link to="/sales">Sales</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Help</h5>
            <ul className={styles.sectionLinks}>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Subscribe to Our Newsletter</h5>
            <form className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
              />
              <button type="submit" className={styles.subscribeButton}>
                Subscribe
              </button>
            </form>
            <div className="soc mt-5">
              <h5 className={styles.sectionTitle}>Follow Us</h5>
              <ul className={styles.socialIcons}>
                <li>
                  <a href="#" className={`icon ${styles.icon}`}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className={`icon ${styles.icon}`}>
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className={`icon ${styles.icon}`}>
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className={`icon ${styles.icon}`}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className={`icon ${styles.icon}`}>
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
