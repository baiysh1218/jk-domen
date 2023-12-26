import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import "./style/Footer.css";
import logo from "../../assets/icons/JKGroup_black_nav_logo.png";
import { pageContext } from "../../contexts/PageContext/PageContext";

import facebook from "../../assets/icons/global/facebook.png";
import instagram from "../../assets/icons/global/instagram.png";
import linkedin from "../../assets/icons/global/linkedin.png";
import twitter from "../../assets/icons/global/twitter.png";
import whatsapp from "../../assets/icons/global/whatsapp.png";
import youtube from "../../assets/icons/global/youtube.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { line, projects } = useContext(pageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer">
        {/* <div className="footer-top-box">
          <div className="footer-box-card">
            <h3>{t("footer.line")}</h3>

            {line?.map(item => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
          <div className="footer-box-card">
            <h3>{t("footer.projects")}</h3>
            {projects?.map(item => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
          <div className="footer-box-card footer_icon_wrapper">
            <h3>{t("footer.shortCusts")}</h3>

            <div className="icon_footer_wrapper">
              <a href="#">
                <img src={facebook} alt="" />
              </a>
              <a href="#">
                <img src={instagram} alt="" />
              </a>
              <a href="#">
                <img src={linkedin} alt="" />
              </a>
              <a href="#">
                <img src={twitter} alt="" />
              </a>
              <a href="#">
                <img src={whatsapp} alt="" />
              </a>
              <a href="#">
                <img src={youtube} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-box">
          <ul>JK GROUP</ul>

          <a id="btn-to-top-text" href="#top">
            {t("footer.back")}
          </a>
          <div id="footer-logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <a href="#top">
          <button className="green-btn-arrow footer-green-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </button>
        </a> */}
        <div className="footer_content_top">
          <div className="footer_content_left">
            <h4>Privacy policy</h4>
            <span>|</span>
            <p onClick={() => navigate("/")}>{t("footer.homepage")}</p>
            <span>|</span>
            <p onClick={() => navigate("/about/company")}>
              {t("footer.aboutUs")}
            </p>
            {/* <span>|</span>
            <p>{t("footer.partners")}</p> */}
            <span>|</span>
            <p onClick={() => navigate("/products/1")}>
              {t("footer.Projects")}
            </p>
            <span>|</span>
            <p onClick={() => navigate("/news")}>{t("footer.news")}</p>
            <span>|</span>
            <p onClick={() => navigate("/career")}>{t("footer.career")}</p>
            <span>|</span>
          </div>
          <div className="footer_content_right">
            {/* <button>YouTube</button>
            <button>Instagram</button>
            <button>Linkedin</button>
            <button>W/A</button> */}
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={linkedin} alt="" />
            {/* <img src={twitter} alt="" /> */}
            <img src={youtube} alt="" />
            <img src={whatsapp} alt="" />
          </div>
        </div>
        <div className="footer_content_bottom">
          {line.map(item => (
            <>
              <p key={item.id}>{item.title}</p>
              <span>|</span>
            </>
          ))}
        </div>
        <hr />
        <div className="footer_block">
          <p>
            JK Group, {t("footer.city")}, {t("footer.adress")}
          </p>
          <p>+996 553-445-544</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
