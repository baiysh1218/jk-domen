import React, { useEffect, useState, useRef } from "react";
import icondiraction from "../../../assets/icons/direction.png";
import "./style/Statis.css";

import empIcon from "../../../assets/icons/global/employees.png";
import lineIcon from "../../../assets/icons/global/directions.png";
import partIcon from "../../../assets/icons/global/idea.png";

// MUI ICONS
import ForkRightIcon from "@mui/icons-material/ForkRight";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";
import Unique from "./Unique";

const Statis = ({ stats }) => {
  const [counts, setCounts] = useState();

  const statisticRef = useRef(null);

  const { t } = useTranslation();

  return (
    <>
      <div className="stats_content_wrapper">
        <Unique />
        <div ref={statisticRef} className="stats-number_wrapper">
          <>
            <div className="stats_number_wrapper_main">
              <p className="stats-number">
                {/* <AccountTreeIcon sx={{ fontSize: "40px", marginRight: "20px" }} /> */}
                <img src={partIcon} alt="" />
                <span title="Projects">{stats["Projects"]}</span>
                <span>{t("unique.projects")}</span>
              </p>

              <p className="stats-number">
                {/* <ForkRightIcon sx={{ fontSize: "40px", marginRight: "20px" }} /> */}
                <img src={lineIcon} alt="" />
                <span title={"Lines of Bussiness"}>
                  {stats["Lines of Bussiness"]}
                </span>
                <span>{t("unique.line")}</span>
              </p>

              <p className="stats-number">
                {/* <CardTravelIcon sx={{ fontSize: "40px", marginRight: "20px" }} /> */}
                <img src={empIcon} alt="" />
                <span title="Team members">{stats["Team members"]}</span>
                <span>{t("unique.employees")}</span>
              </p>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Statis;
