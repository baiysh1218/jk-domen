import React, { useContext, useRef } from "react";
import AboutContent from "../aboutContent/AboutContent";
import Statis from "../layout/StatisLayout/Statis";
import Loader from "../loader/Loader";
import { pageContext } from "../../contexts/PageContext/PageContext";
import { useEffect, useState } from "react";

import "./style/AboutMainContent.css";
import RunningText from "../runningText/RunningText ";

const AboutMain = () => {
  const { stats, language, about, history } = useContext(pageContext);

  const [aboutContent, setAboutContent] = useState(null);
  const hasRef = useRef(null);

  // useEffect(() => {
  //   if (about) {

  //   }
  // }, [about]);

  // setAboutContent(aboutDes);

  // console.log(window.location);

  useEffect(() => {
    if (window.location.hash) {
      // Прокрутить страницу в самый верх
      window.scrollTo(0, 0);

      if (hasRef.current) {
        hasRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const [aboutDes = []] = about;

  console.log(history);

  return (
    <>
      <AboutContent />
      {/* Компонент с содержимым About */}
      <div className="about_page_haed_item">
        <h3>{aboutDes[`subtitle_${language}`]}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: aboutDes[`description_${language}`],
          }}></p>
      </div>

      <div ref={hasRef} className="company_philosophy">
        <div className="company_philosophy_first_top_block">
          <h3>COMPANY PHILOSOPHY</h3>
          <p>
            We contribute to society through work that offers true value. With
            this as our core objective, we grow as individuals and develop as a
            worthy company.
          </p>
        </div>
        <div className="company_philosophy_fist_bottom_block">
          <div className="company_philosophy_left_block">
            <h4>BRAND VISION</h4>
            <p>
              We are experts who integrate the skills, knowledge and experience
              needed to bring our clients' ideas to life.
            </p>
            <p>
              We are eager to listen to their voices, to share their vision, and
              together, to shape spaces, environments, cities and society.
            </p>
            <p>
              We invent new possibilities by bringing together the right mix of
              experience, creativity and passion to deliver that exceeds
              expectations.
            </p>
            <p>
              For 100 years, we have worked hand-in-hand with clients, designing
              solutions and environments that create truly meaningful experience
              for all.
            </p>
          </div>
          <div className="company_philosophy_right_block">
            <div className="company_philosophy_top_block">
              <h6>BRAND TAGLINE</h6>
              <h5>EXPERIENCE, INTEGRATED</h5>
              <p>
                Integrating accumulated proficiency to deliver rich experiences.
              </p>
            </div>
            <div className="company_philosophy_bottom_block">
              <h4>MOTTO</h4>
              <p>more than creative Immutability Fair and neutral manner</p>
            </div>
          </div>
        </div>
      </div>
      <section id="section7">
        <RunningText />
      </section>
    </>
  );
};

export default AboutMain;
