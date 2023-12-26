import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./style/cTabCarousel.css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { EffectFade, Mousewheel } from "swiper";

const LineCarousel = ({ marker, setIsEndScroll }) => {
  const tabsRef = useRef(null);
  const { line, language } = useContext(pageContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Индекс активного слайда, по умолчанию 0

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const wrapper = document.querySelector(".swiper-wrapper");

    if (wrapper) {
      wrapper.classList.add("swiper_wrapper_line");
    }
  }, []);

  const handleSlideChange = swiper => {
    setActiveSlideIndex(swiper.realIndex);
    console.log(swiper);
    if (swiper.isEnd) {
      setIsEndScroll(true); // Set the state to true when the last slide is reached
      setActive(true);
    } else {
      setIsEndScroll(false); // Set the state to false for other slides
      setActive(false);
    }
  };

  return (
    <section>
      <div id="tabs_line" className="c-tabs_line" ref={tabsRef}>
        <div className="line_wrapper">
          <Swiper
            onSlideChange={handleSlideChange}
            direction={isSmallScreen ? "horizontal" : "vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                const item = line[index];
                if (item && item.title && !isSmallScreen) {
                  return `<div class="${className}">${
                    item ? item[`title_${language}`] : ""
                  }</div>`;
                } else {
                  return "";
                }
              },
            }}
            speed={1000}
            modules={[Pagination, Mousewheel, EffectFade]}
            className="mySwiper">
            {line.map((item, index) => (
              <SwiperSlide
                className={
                  index === line.length - 1 ? "swiper-no-mousewheel" : ""
                }
                key={item.id}>
                <div className="swiper_content_line">
                  <div className="content_carousel">
                    {/* <h2>{content.title}</h2> */}
                    {/* <h3>{content[`sub_title_${language}`]}</h3> */}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item[`description_${language}`],
                      }}></p>
                    <button
                      onClick={() => navigate(`/team/section/${item.id}`)}>
                      {t("projects")}
                    </button>
                  </div>
                  <div className="carousel_img_wrapper">
                    <img
                      className="carousel_img_line"
                      src={item?.main_picture}
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LineCarousel;
