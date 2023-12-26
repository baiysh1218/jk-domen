import React, { startTransition, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style/Navbar.css";
import "../../adaptive.css";

import JKLogo from "../../assets/icons/JKGroup_black_nav_logo.png";

import arrow from "../../assets/icons/down-arrow.png";
import DropdownContent from "../layout/dropdownContent/DropdownContent";
import { pageContext } from "../../contexts/PageContext/PageContext";
import { useDebounce } from "@uidotdev/usehooks";

import contactsIcon from "../../assets/icons/global/telephone.png";
import languages from "../../assets/icons/global/language.png";
import searchIcon from "../../assets/icons/global/search.png";

import { useTranslation } from "react-i18next";
import i18n from "../../language/i18n";

import language_en from "../../language/language/en.json";
import language_ru from "../../language/language/ru.json";
import language_ky from "../../language/language/ky.json";
import axios from "axios";
import { useRef } from "react";

const Navbar = () => {
  const { line, changeLanguageGlobal, language } = useContext(pageContext);

  const { t } = useTranslation();

  const languagesObj = {
    en: language_en,
    ru: language_ru,
    ky: language_ky,
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [indexDropDown, setIndexDropDown] = useState(null);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchContent, setSearchContent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for the menu
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [dropDownProjects, setDropDownProjects] = useState(false);
  // ref
  const searchContainerRef = useRef(null);
  const projectsDropDown = useRef(null);
  const langRef = useRef(null);
  const dropDownContentRef = useRef(null);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleMenuLang = () => {
    startTransition(() => {
      setIsDropdownOpen(!isDropdownOpen); // Corrected line
    });
  };

  const handleToggleProjectsDropDown = () => {
    startTransition(() => {
      setDropDownProjects(!dropDownProjects);
    });
  };

  // Close the menu when the component unmounts
  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    };
  }, []);

  const handleToggleSearch = () => {
    startTransition(() => {
      setSearchOpen(!isSearchOpen);
    });
  };

  const handleClickOutsideDropdowns = event => {
    if (
      dropDownContentRef.current &&
      !dropDownContentRef.current.contains(event.target)
    ) {
      console.log(dropDownContentRef);
      toggleDropdown(indexDropDown);
    }
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchOpen(false);
    }
    if (
      projectsDropDown.current !== null &&
      !projectsDropDown.current.contains(event.target)
    ) {
      setDropDownProjects(false);
    }
    if (langRef.current && !langRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("click", handleClickOutsideDropdowns);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdowns);
    };
  }, []);

  // ...

  useEffect(() => {
    if (!isSearchOpen) {
      const timer = setTimeout(() => {
        setSearchOpen(false);
      }, 300); // Задержка соответствует времени анимации (300ms)
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleLanguageSelect = language => {
    // Здесь вы можете обработать выбор языка, например, отправить запрос на сервер или установить языковые настройки в приложении.

    localStorage.setItem("language", language);

    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      changeLanguageGlobal(storedLanguage);
    }

    // setIsDropdownOpen(false);
  };

  const debouncedSearchTerm = useDebounce(search, 1000);

  const handleSearchForm = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchHN = async () => {
      if (debouncedSearchTerm) {
        try {
          const searchResult = await axios(
            `https://jk-group-production.up.railway.app/${language}/main/?search=${debouncedSearchTerm}`
          );
          setSearchContent(searchResult.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    searchHN();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const navigate = useNavigate();

  const toggleDropdown = index => {
    startTransition(() => {
      setActiveDropdown(index === activeDropdown ? null : index);
      setIndexDropDown(indexDropDown);
    });
  };

  return (
    <>
      <div id="top"></div>
      <header>
        <div className="header_wrapper">
          <div
            id="header-logo"
            className="header-logo"
            onClick={() => {
              navigate("/");
              toggleDropdown(indexDropDown);
            }}>
            <img src={JKLogo} alt="" className="nav_logo_mobile" />
          </div>
          <div className="header-content">
            <ul className="header-list">
              {languagesObj[`${language}`].dropDownContent.map(
                (item, index) => (
                  <>
                    <li
                      key={index}
                      onClick={() => toggleDropdown(index)}
                      className={`header-list-item ${
                        activeDropdown === index ? "active" : ""
                      }`}>
                      {item.title}
                      <img
                        src={arrow}
                        alt=""
                        className="arrow_nav"
                        width={"25px"}
                      />
                    </li>
                    {activeDropdown === index && (
                      <DropdownContent
                        dropDownContentRef={dropDownContentRef}
                        toggleDropdown={toggleDropdown}
                        index={index}
                        line={line}
                        setIsMenuOpen={setIsMenuOpen}
                      />
                    )}
                  </>
                )
              )}
              <li
                className="header-list-item"
                onClick={() => {
                  // navigate("/products");
                  handleToggleProjectsDropDown();
                  toggleDropdown(indexDropDown);
                }}>
                {t("navbar.projects")}
                <img src={arrow} alt="" className="arrow_nav" width={"25px"} />
              </li>
              <li
                className="header-list-item"
                onClick={() => {
                  navigate("/team");
                  toggleDropdown(indexDropDown);
                }}>
                {t("navbar.team")}
                <img src={arrow} alt="" className="arrow_nav" width={"25px"} />
              </li>
              <li
                className="header-list-item"
                onClick={() => {
                  navigate("/news");
                  toggleDropdown(indexDropDown);
                }}>
                {t("navbar.news")}
                <img src={arrow} alt="" className="arrow_nav" width={"25px"} />
              </li>
              <li
                className="header-list-item"
                onClick={() => {
                  navigate("/career");
                  toggleDropdown(indexDropDown);
                }}>
                {t("navbar.career")}
                <img src={arrow} alt="" className="arrow_nav" width={"25px"} />
              </li>
            </ul>

            {dropDownProjects && (
              <div
                ref={projectsDropDown}
                className="projects_drop_down_wrapper">
                <ul>
                  {line.map(item => (
                    <li
                      className="header-list-item drop_down_projects"
                      onClick={() => {
                        navigate(`/products/${item.id}`);
                        setDropDownProjects(false);
                      }}>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={`header-btns ${
                isSearchOpen ? "closeSearch" : "openSearch"
              }`}>
              <div
                className={`search-container ${isSearchOpen ? "close" : ""}`}
                ref={searchContainerRef}>
                <div
                  className={`search-icon ${isSearchOpen ? "open" : "close"}`}
                  onClick={handleToggleSearch}>
                  <img src={searchIcon} alt="" />
                </div>
                <div
                  className={`search-input-container ${
                    isSearchOpen ? "closing" : "active"
                  }`}>
                  <input
                    className="search_input"
                    type="search"
                    placeholder={t("navbar.search")}
                    onChange={handleSearchForm}
                  />
                  <div>
                    {searchContent &&
                      searchContent.map(item => {
                        if (item.REFERS === "NEWS" || "PROJECT") {
                          return (
                            <p
                              onClick={() => {
                                navigate(`project/details/${item.id}`);
                                setSearchContent("");
                                setIsDropdownOpen(true);
                              }}>
                              {item[`title_${language}`]}
                            </p>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>

              <div
                style={
                  isSearchOpen ? { display: "none" } : { display: "block" }
                }
                onClick={() => navigate("/contacts")}
                className="header-btns-contacts">
                <img src={contactsIcon} alt="" />
              </div>

              <button
                style={
                  isSearchOpen ? { display: "none" } : { display: "block" }
                }
                onClick={handleToggleMenuLang}
                className="languages"
                // onClick={toggleDropdownLanguage}
              >
                <img src={languages} alt="" />
              </button>
              {isDropdownOpen && (
                <div ref={langRef} className="language-dropdown">
                  <ul>
                    <li onClick={() => handleLanguageSelect("ru")}>Ru</li>
                    <li onClick={() => handleLanguageSelect("en")}>En</li>
                    <li onClick={() => handleLanguageSelect("ky")}>Kg</li>
                    {/* Добавьте остальные языки по желанию */}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="burger_button_wrapper">
          <button onClick={handleToggleMenu}>
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                fill="#000000"
              />
            </svg>
          </button>
        </div>
      </header>
      {dropDownProjects && (
        <div ref={projectsDropDown} className="projects_drop_down_wrapper">
          <ul>
            {line.map(item => (
              <li
                className="header-list-item drop_down_projects"
                onClick={() => {
                  navigate(`/products/${item.id}`);
                  setDropDownProjects(false);
                  setIsMenuOpen(false);
                }}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`menu_mobile ${isMenuOpen ? "open" : "none"}`}>
        <ul className="mobile_list">
          {languagesObj[`${language}`].dropDownContent.map((item, index) => (
            <>
              <li
                key={index}
                onClick={() => {
                  toggleDropdown(index);
                  // setIsMenuOpen(false);
                }}
                className={`mobile_list_item ${
                  activeDropdown === index ? "active" : ""
                }`}>
                {item.title}
                <img src={arrow} alt="" className="arrow_nav" width={"15px"} />
              </li>
              {activeDropdown === index && (
                <DropdownContent
                  toggleDropdown={toggleDropdown}
                  index={index}
                  line={line}
                  setIsMenuOpen={setIsMenuOpen}
                />
              )}
            </>
          ))}
          <li
            className="mobile_list_item"
            onClick={() => {
              // navigate("/products");
              handleToggleProjectsDropDown();
              // setIsMenuOpen(false);
              toggleDropdown(indexDropDown);
            }}>
            {t("navbar.projects")}
            <img src={arrow} alt="" className="arrow_nav" width={"15px"} />
          </li>
          <li
            className="mobile_list_item"
            onClick={() => {
              navigate("/team");
              toggleDropdown(indexDropDown);
              setIsMenuOpen(false);
            }}>
            {t("navbar.team")}
            <img src={arrow} alt="" className="arrow_nav" width={"15px"} />
          </li>
          <li
            className="mobile_list_item"
            onClick={() => {
              navigate("/news");
              toggleDropdown(indexDropDown);
              setIsMenuOpen(false);
            }}>
            {t("navbar.news")}
            <img src={arrow} alt="" className="arrow_nav" width={"15px"} />
          </li>
          <li
            className="mobile_list_item"
            onClick={() => {
              navigate("/career");
              toggleDropdown(indexDropDown);
              setIsMenuOpen(false);
            }}>
            {t("navbar.career")}
            <img src={arrow} alt="" className="arrow_nav" width={"15px"} />
          </li>
          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
          <div
            className={`header-btns mobile_btns ${
              isSearchOpen ? "closeSearch" : "openSearch"
            }`}>
            <input
              className="search_input"
              type="search"
              placeholder={t("navbar.search")}
              onChange={handleSearchForm}
            />
            <div>
              {searchContent &&
                searchContent.map(item => {
                  if (item.REFERS === "NEWS" || "PROJECT") {
                    return (
                      <p
                        onClick={() => {
                          navigate(`project/details/${item.id}`);
                          setSearchContent("");
                          setIsDropdownOpen(true);
                        }}>
                        {item[`title_${language}`]}
                      </p>
                    );
                  }
                })}
            </div>

            <div className="language-dropdown">
              <ul>
                <li onClick={() => handleLanguageSelect("ru")}>Ru</li>
                <li onClick={() => handleLanguageSelect("en")}>En</li>
                <li onClick={() => handleLanguageSelect("ky")}>Kg</li>
                {/* Добавьте остальные языки по желанию */}
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
