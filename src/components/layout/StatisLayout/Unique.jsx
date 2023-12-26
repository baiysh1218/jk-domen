import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/icons/JKGroup_black_nav_logo.png";

const Unique = () => {
  const { t } = useTranslation();

  return (
    <>
      <img className="stats_number_logo" src={logo} alt="Logo stats" />
      <p className="unique_stats_wrapper">{t("statistics.sub_title")}</p>
    </>
  );
};

export default Unique;
