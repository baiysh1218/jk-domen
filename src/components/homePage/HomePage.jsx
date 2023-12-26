import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";

import "./style/HomePage.css";
import "../../adaptive.css";

import direction from "../../assets/icons/direction.png";
import project from "../../assets/icons/project-management.png";
import user from "../../assets/icons/user.png";

import About from "../about/About";
import Team from "../team/Team";
import InformationStatistic from "../layout/StatisLayout/Statis";
import FormConnect from "../formConnect/FormConnect";
import CtabCarousel from "../cTabCarousel/CtabCarousel";
import NewsInfo from "../newsInfo/NewsInfo";
import Loader from "../loader/Loader";
import Lines from "../layout/lines/Lines";
import { useTranslation } from "react-i18next";
import LineCarousel from "../cTabCarousel/LineCarousel";
import Unique from "../layout/StatisLayout/Unique";
import { useRef } from "react";
import PageScroll, { NestedPageScroll } from "react-page-scroll";
import Footer from "../footer/Footer";
import RunningText from "../runningText/RunningText ";

const HomePage = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [currentElem, setCurrentElem] = useState(0);
  const [endScroll, setEndScroll] = useState(false);
  const navigate = useNavigate();

  const [isEndScroll, setIsEndScroll] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    const nextPage = Math.floor(scrollPosition / windowHeight);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToPage = pageIndex => {
    window.scrollTo({
      top: pageIndex * window.innerHeight,
      behavior: "smooth",
    });
  };

  const { main, stats, language, line } = useContext(pageContext);

  const { t } = useTranslation();

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoader(false);
    }, 500);
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    if (currentElem === 2 && !isEndScroll) {
      const elem = document.querySelector(".flex-col");
      elem?.classList.add("full_page_active");
    } else if (isEndScroll) {
      const elem = document.querySelector(".flex-col");
      elem?.classList.remove("full_page_active");
    }
  }, [currentElem, isEndScroll]);

  const [mainContentHomePage] = main;

  return (
    <>
      <main className="main_home_page">
        <section
          id="section1"
          data-scroll
          className="section-one-box third-section-box">
          {mainContentHomePage?.main_video ? (
            <video autoPlay muted loop id="homepage-video">
              <source src={mainContentHomePage.main_video} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
          <div className="content-box">
            <div className="mainsection-content-box">
              <div className="mainsection-content">
                <div className="mainsection-content-text">
                  {mainContentHomePage && (
                    <p>{mainContentHomePage[`description_${language}`]}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mainsection-options">
              {mainContentHomePage?.lines.map(item => (
                <a
                  key={item.id}
                  id={item[`title_${language}`]}
                  className="mainsection-options-item"
                  onClick={() => navigate(`/team/section/${item.id}`)}>
                  <span>{item[`title_${language}`]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50%"
                    height="50%"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="section2" data-scroll className="section-one-box">
          <InformationStatistic stats={stats} />
        </section>

        <section id="section3" data-scroll className="section-one-box">
          <div className="sub_head_wrapper  sub_head_wrapper_line">
            <h2 className="sub_head">{t("LinesOfBusiness")}</h2>
          </div>
          <LineCarousel setIsEndScroll={setIsEndScroll} />

          <div className="arrow mobile_right">
            <span className="arrow-right"></span>
          </div>
        </section>

        <section id="section4" data-scroll className="section-one-box">
          <div className="sub_head_wrapper">
            <h2 className="sub_head">{t("navbar.projects")}</h2>
          </div>
          <CtabCarousel content={line} />
        </section>
        <section id="section5" data-scroll className="section-one-box">
          <div className="sub_head_wrapper">
            <h2 className="sub_head">{t("navbar.news")}</h2>
          </div>
          <NewsInfo />
        </section>

        <section id="section6" data-scroll className="section-one-box">
          <FormConnect />
        </section>
      </main>
    </>
  );
};

export default HomePage;
