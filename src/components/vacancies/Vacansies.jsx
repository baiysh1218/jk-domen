import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";
import CtabCarousel from "../cTabCarousel/CtabCarousel";

const Vacansies = () => {
  const { vacanciesAll } = useContext(pageContext);

  const [vacancies, setVacancies] = useState(null);

  const { id } = useParams();

  console.log(vacancies);

  const handleFilteredVacancies = () => {
    setVacancies(vacanciesAll.results.filter(item => item.id === +id));
  };

  useEffect(() => {
    handleFilteredVacancies();
  }, []);

  return (
    <>
      <div className="vacansies_main_wrapper">
        <div className="vacancies_left_block"></div>
      </div>
    </>
  );
};

export default Vacansies;
