import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";
import FormConnect from "../formConnect/FormConnect";
import CardAnimation from "../layout/cardAnimation/CardAnimation";
import Loader from "../loader/Loader";
import CareerCTab from "./CareerCTab";
import "./style/Career.css";

const Career = () => {
  const { career, language, vacancies, vacanciesAll, line } =
    useContext(pageContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [fileUrl, setFileUrl] = useState("");
  const [massage, setMassage] = useState(null);

  const { t } = useTranslation();

  console.log(career);

  const navigate = useNavigate();

  const initialAccordionState = vacanciesAll.results?.map(() => false);
  const [isOpenAccardion, setIsOpenAccardion] = useState(initialAccordionState);

  const toggleAccardion = index => {
    const updatedState = [...isOpenAccardion];
    updatedState[index] = !updatedState[index];
    setIsOpenAccardion(updatedState);
  };

  const handleNextPage = () => {
    if (!vacanciesAll.next) {
      return;
    }
    const result = vacanciesAll.next?.split("?")[1].split("&");
    const paramsObject = {};
    result.forEach(item => {
      const [key, value] = item.split("=");
      if (key === "limit" || key === "offset") {
        paramsObject[key] = value;
      }
    });
    setSearchParams(paramsObject);
  };

  const handlePrevPage = () => {
    if (!vacanciesAll.previous) {
      setSearchParams({ limit: 5, offset: 0 }); // Устанавливаем значения по умолчанию
      return;
    }
    const result = vacanciesAll.previous?.split("?")[1].split("&");
    const paramsObject = {};
    result.forEach(item => {
      const [key, value] = item.split("=");
      if (key === "limit" || key === "offset") {
        paramsObject[key] = value;
      }
    });
    setSearchParams(paramsObject);
  };

  useEffect(() => {
    setSearchParams({ limit: 5 });
  }, []);

  useEffect(() => {
    vacancies();
  }, [window.location.search]);

  console.log(line);

  const handleFileUpload = async (file, id) => {
    try {
      const formData = new FormData();
      formData.append("cv", file, "line", +id);
      const response = await axios.post(
        "https://jk-group-production.up.railway.app/en/vacancies/upload/",
        formData
      );

      setFileUrl(URL.createObjectURL(file));

      setMassage(t("successResume"));
    } catch (error) {
      console.log(t("rejectedResume"));
    }
  };

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    handleFileUpload(file, id);
  };

  return (
    <>
      <div className="career">
        <div className="career_first_block">
          <div className="career_first_block_headers">
            <h2>{t("footer.career")}</h2>
          </div>
          <div className="career_first_block_content">
            <h2>{career[`title_${language}`]}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: career[`description_${language}`],
              }}></p>
          </div>
        </div>
        <div className="career_main_wrapper">
          <div className="media_content">
            {career?.main_video ? (
              <video muted loop autoPlay id="career-video">
                <source src={career?.main_video} type="video/mp4" />
              </video>
            ) : (
              <img src={career.main_picture} alt={career.title} />
            )}
          </div>
        </div>
        <div className="career_first_block_content career_content_block">
          <h3>Join us and help shape the future</h3>
          <p>
            Do you want your work to make a difference? Then Sweco is the place
            to be. At Sweco there is no distant future. We design it right now,
            ensuring that everything we need in society – from clean water and
            warm homes to efficient transportation and modern hospitals –
            becomes a natural part of tomorrow.
            <br />
            <br />
            Success requires a close collaboration with our clients and a deep
            understanding of their needs. A typical Sweco employee is
            approachable, committed to his or her clients, and has a recognised
            expertise.
          </p>
        </div>
        <div className="career_img_block_wrapper">
          <img
            src="https://www.swecogroup.com/wp-content/uploads/sites/2/2022/11/Sweco-Employees-Marieberg-Stockholm-office-1260x750.jpg"
            alt=""
          />
          <div className="career_img_block_content">
            <h3>We build sustainable societies together with our clients</h3>
            <p>
              If you want to help build the societies of tomorrow, then Sweco is
              the place to be. A successful Sweco employee is approachable,
              committed to the customers, and has a recognised expertise.
              Success requires a close collaboration with our clients and a deep
              understanding of their needs. Together, we work on projects that
              help build societies that are sustainable for the long-term.
            </p>
          </div>
        </div>
        <div className="principles_wrapper">
          <div className="principles_main_info__block">
            <h3>Career paths at Sweco</h3>
            <p>
              The primary career paths at Sweco are as line manager, specialist
              and project manager. Sweco has solid processes in place to ensure
              that recruitment is based on competence and that ensures
              continuous development. They include:
            </p>
          </div>
          <ul className="principles_item_wrapper">
            <li>
              The Sweco Employee Survey: This annual survey measures how
              satisfied the employees are and how well the managers help them in
              their development.
            </li>
            <li>
              Sweco Academy: A comprehensive collection of training programmes.
              It includes everything from introductory training for new
              employees to leadership programmes.
            </li>
            <li>
              Sweco Talk: This is our process for guaranteeing that each
              employee’s work and personal development are monitored carefully
              and thoroughly every year.
            </li>
            <li>
              Talent Review: Our process for identifying Sweco employees who
              have the potential to take on greater responsibility.
            </li>
            <li>
              The Sweco Employee Survey: This annual survey measures how
              satisfied the employees are and how well the managers help them in
              their development.
            </li>
            <li>
              Sweco Academy: A comprehensive collection of training programmes.
              It includes everything from introductory training for new
              employees to leadership programmes.
            </li>
            <li>
              Sweco Talk: This is our process for guaranteeing that each
              employee’s work and personal development are monitored carefully
              and thoroughly every year.
            </li>
            <li>
              Talent Review: Our process for identifying Sweco employees who
              have the potential to take on greater responsibility.
            </li>
            <li>
              Sweco Academy: A comprehensive collection of training programmes.
              It includes everything from introductory training for new
              employees to leadership programmes.
            </li>
            <li>
              Sweco Talk: This is our process for guaranteeing that each
              employee’s work and personal development are monitored carefully
              and thoroughly every year.
            </li>
            <li>
              Talent Review: Our process for identifying Sweco employees who
              have the potential to take on greater responsibility.
            </li>
          </ul>
        </div>
        <div className="vacancies_wrapper">
          <h3>Актуальные вакансии</h3>
          <table class="iksweb">
            {/* <thead>
              <td>{t("vacancies.title")}</td>
              <td>{t("vacancies.role")}</td>
              <td>{t("vacancies.line")}</td>
            </thead> */}
            <tbody>
              {vacanciesAll?.results?.map((item, index) => {
                const matchingLine = line.find(
                  lineItem => lineItem.id === +item.line
                );
                const lineTitle = matchingLine ? matchingLine.title : "null";

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`tr_table ${
                        isOpenAccardion[index] ? "open" : ""
                      }`}
                      onClick={() => toggleAccardion(index)}>
                      <td>{item.title ? item.title : "null"}</td>
                      <td>{item.job ? item.job : "null"}</td>
                      <td>{lineTitle}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50%"
                          height="50%"
                          fill="currentColor"
                          className={`bi bi-arrow-right accardion_icon ${
                            isOpenAccardion[index] ? "active" : ""
                          }`}
                          viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          />
                        </svg>
                      </td>
                    </tr>
                    <div
                      className={`accardion_tab ${
                        isOpenAccardion[index] ? "open" : ""
                      }`}>
                      <h4>{item.title}</h4>
                      <p className="accardioin_item_p">
                        {item.job ? item.job : "null"}
                      </p>
                      <p className="accardioin_item_p">{lineTitle}</p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}></p>
                      {/* <input type="file"> {t("vacancies.resume")} /> */}
                      <label
                        htmlFor={`fileInput-${item.id}`}
                        className="input-type-file">
                        {massage ? massage : t("vacancies.resume")}
                      </label>
                      <input
                        id={`fileInput-${item.id}`}
                        // value={t("vacancies.resume")}
                        style={{ display: "none" }}
                        type="file"
                        onChange={e => handleFileChange(e, item.id)}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevPage}>Prev</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>

        <div className="career_img_wrapper">
          <div className="img_item">
            <div className="img_wrapper">
              <img src={career.images[0].picture} alt="" />
            </div>
            <div className="img_item_content_block">
              <h3>Dit is wat jij meebrengt</h3>
              <ul>
                <li>
                  Hbo-/wo-opleiding studerend in de richting van civiele
                  techniek;
                </li>
                <li>Proactieve en zelfstandige houding;</li>
                <li>Nieuwsgierigheid en leergierigheid;</li>
                <li>Vloeiende beheersing van de Nederlandse taal.</li>
              </ul>
            </div>
          </div>
          <div className="img_item">
            <div className="img_wrapper">
              <img src={career.images[1].picture} alt="" />
            </div>
            <div className="img_item_content_block">
              <h3>Dit is wat jij meebrengt</h3>
              <ul>
                <li>
                  Hbo-/wo-opleiding studerend in de richting van civiele
                  techniek;
                </li>
                <li>Proactieve en zelfstandige houding;</li>
                <li>Nieuwsgierigheid en leergierigheid;</li>
                <li>Vloeiende beheersing van de Nederlandse taal.</li>
              </ul>
            </div>
          </div>
          <div className="img_item">
            <div className="img_wrapper">
              <img src={career.images[2].picture} alt="" />
            </div>
            <div className="img_item_content_block">
              <h3>Dit is wat jij meebrengt</h3>
              <ul>
                <li>
                  Hbo-/wo-opleiding studerend in de richting van civiele
                  techniek;
                </li>
                <li>Proactieve en zelfstandige houding;</li>
                <li>Nieuwsgierigheid en leergierigheid;</li>
                <li>Vloeiende beheersing van de Nederlandse taal.</li>
              </ul>
            </div>
          </div>
        </div>

        <FormConnect />
      </div>
    </>
  );
};

export default Career;
