import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pageContext } from "../../../contexts/PageContext/PageContext";

const DropdownContent = ({
  content,
  toggleDropdown,
  index,
  setIsMenuOpen = false,
  dropDownContentRef,
}) => {
  const navigate = useNavigate();
  const { main, handleFiltered, language, line } = useContext(pageContext);

  const { t } = useTranslation();

  // Обработчик клика на выпадающем списке
  const handleClickDropDown = item => {
    navigate(`${item.path}/${item.title}`);
    toggleDropdown(index);
  };

  // Обработчик клика на пункте навигационного меню
  const handleClickNavItem = item => {
    navigate(`${item.path}/${item.const || item.item}`);
    toggleDropdown(index);
  };

  // Обработчик клика на элементе выпадающего списка с фильтрацией
  const handleClickDropDownElem = item => {
    handleFiltered(item);
    handleClickDropDown(item);
    toggleDropdown(index);
  };

  // Обработчик клика на пункте навигационного меню

  return (
    <div ref={dropDownContentRef} className={`drop_down_main_wrapper`}>
      <div className={`dropdown-content`}>
        <div className="dropdown_wrapper">
          <div className="dropdown_wrapper_content">
            <div className="drop_down_content_item_h3 ">
              {/* Отображение заголовков выпадающего списка */}
              <h3
                className="header-list-item drop_down_item"
                onClick={() => {
                  navigate(`/about/company`);
                  toggleDropdown(index);
                  setIsMenuOpen(false);
                }}>
                {t("contentTitle")}
              </h3>

              <p
                className="header-list-item drop_down_item"
                onClick={() => {
                  navigate("/about/company#history");
                  toggleDropdown(index);
                  setIsMenuOpen(false);
                }}>
                {t("history")}
              </p>
              <p
                className="header-list-item drop_down_item"
                onClick={() => {
                  navigate("/about/mission-values/company");
                  toggleDropdown(index);
                  setIsMenuOpen(false);
                }}>
                {t("mission")}
              </p>
              {/* <p
                className="header-list-item drop_down_item"
                onClick={() => {
                  navigate("/about/partners/company");
                  toggleDropdown(index);
                  setIsMenuOpen(false);
                }}>
                {t("partners")}
              </p> */}
            </div>
          </div>
          <div className="dropdown-content_p">
            {/* Отображение элементов выпадающего списка */}

            {line.map(item => (
              <div
                className="drop_down_content_wrapper_p header-list-item"
                key={index}>
                <p
                  onClick={() => {
                    navigate(`/project/section/${item.id}`);
                    toggleDropdown(index);
                    setIsMenuOpen(false);
                  }}
                  key={item.id}>
                  {item[`title_${language}`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownContent;
