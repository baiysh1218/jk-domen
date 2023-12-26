import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";
import PageNotFound from "../pageNotFound/PageNotFound";

const ProjectDetails = () => {
  const { getOneProduct, onePost, postAll, language } = useContext(pageContext);

  const [isLoader, setIsLoader] = useState(false);

  const [content, setContent] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id);
    const timer = setTimeout(() => {
      setIsLoader(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  console.log(isLoader);

  return isLoader ? (
    <>
      <div>
        <div className="details_wrapper">
          <div className="details_img_wrapper">
            <img src={onePost?.image} alt="" />
          </div>
          <div className="details_content">
            <h3>{onePost[`sub_title_${language}`]}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: onePost[`content_${language}`],
              }}></p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
};

export default ProjectDetails;
