import React from "react";
import { useContext } from "react";
import { pageContext } from "../../contexts/PageContext/PageContext";
import About from "../about/About";
import CtabCarousel from "../cTabCarousel/CtabCarousel";
import CtabMissionValues from "../layout/cTabMissionValues/CtabMissionValues";
import Loader from "../loader/Loader";

import "./style/MissionValues.css";

const MissionValues = () => {
  const { mission, language } = useContext(pageContext);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${mission.main_picture})` }}
        className="history_company_wrapper_img">
        <h2>{mission[`title_${language}`]}</h2>

        <div className="history_company_wrapper_content">
          <h4>{mission[`title_other`]}</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: mission[`description_${language}`],
            }}></p>
        </div>
      </div>
    </>
  );
};

export default MissionValues;
