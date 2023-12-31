import React, { useContext, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper";

import arrow from "../../assets/icons/arrow.png";

import Loader from "../loader/Loader";
import "./style/Section.css";
import { pageContext } from "../../contexts/PageContext/PageContext";

const CustomCarousel = ({ data }) => {
  const [objectData, setObjectData] = useState([]);

  const { language } = useContext(pageContext);

  const handleCheckValid = () => {
    setObjectData(data?.extra_fields.filter(item => typeof item === "object"));
  };

  useEffect(() => {
    handleCheckValid();
  }, [data]);

  // swiper-button-prev swiper-button-disabled swiper-button-lock

  useEffect(() => {
    const paginationPrev = document.querySelector(".swiper-button-prev");
    const paginationNext = document.querySelector(".swiper-button-next");
    console.log(paginationPrev);
    paginationPrev.innerHTML = `
    <img src=${arrow} alt="" />
    `;
    paginationNext.innerHTML = `
    <img src=${arrow} alt="" />
    `;
  }, []);

  return (
    <>
      <Swiper
        direction="horizontal"
        navigation={true}
        className="customSwiper"
        id="companyCarousel">
        {objectData?.map((itemCarousel, i) => (
          <SwiperSlide key={i}>
            <div className="carouselWrapperItems">
              <div className="carouselContent">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: itemCarousel[`sub_title_${language}`],
                  }}></h2>

                <p
                  dangerouslySetInnerHTML={{
                    __html: itemCarousel[`description_${language}`],
                  }}></p>
              </div>
              <div className="carouselImgWrapper">
                <img src={itemCarousel?.picture} alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CustomCarousel;
