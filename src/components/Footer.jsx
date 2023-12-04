import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          {/* Little Fashion Information Section */}
          <div className="col-lg-3 col-10 me-auto mb-4">
            <h4 className="text-white mb-3">
              <a href="index.html">Yultrish Home</a>
            </h4>
            <p className="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">
              Copyright © 2022 <strong>Yultrish Home</strong>
            </p>
            <br />
            <p className="copyright-text">
              Designed by{" "}
              <a href="https://www.tooplate.com/" target="_blank">
                Yultrish
              </a>
            </p>
          </div>

          {/* Sitemap Section */}
          <div className="col-lg-5 col-8 site">
            <h5 className="text-white mb-3">Sitemap</h5>
            <ul className="footer-menu d-flex flex-wrap">
              <li className="footer-menu-item">
                <a href="about.html" className="footer-menu-link">
                  Story
                </a>
              </li>
              <li className="footer-menu-item">
                <a href="#" className="footer-menu-link">
                  Products
                </a>
              </li>
              <li className="footer-menu-item">
                <a href="#" className="footer-menu-link">
                  Privacy policy
                </a>
              </li>
              <li className="footer-menu-item">
                <a href="#" className="footer-menu-link">
                  FAQs
                </a>
              </li>
              <li className="footer-menu-item">
                <a href="#" className="footer-menu-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-lg-3 col-4">
            <h5 className="text-white mb-3">Social</h5>
            <ul className="social-icon">
              <li>
                <a href="#" className="social-icon-link bi-youtube"></a>
              </li>
              <li>
                <a href="#" className="social-icon-link bi-whatsapp"></a>
              </li>
              <li>
                <a href="#" className="social-icon-link bi-instagram"></a>
              </li>
              <li>
                <a href="#" className="social-icon-link bi-skype"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
