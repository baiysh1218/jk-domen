import React, { useContext, useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
import "./style/Projects.css";

import { pageContext } from "../../contexts/PageContext/PageContext";
import ProjectCard from "./ProjectCard";
import Loader from "../loader/Loader";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const { getPosts, posts, filteredPosts, category, projects, line } =
    useContext(pageContext);

  const [projectsFiltered, setProjectsFiltered] = useState(null);

  const { id } = useParams();

  const handleFilterProjects = () => {
    const [result] = line.filter(item => item.id === +id);
    console.log(result);
    setProjectsFiltered(result);
  };

  useEffect(() => {
    handleFilterProjects();
  }, [id]);

  return (
    <>
      <div style={{ paddingTop: "40px" }} className="projects_main_wrapper">
        <div className="products_wrapper">
          {projectsFiltered?.projects?.map(item => (
            <ProjectCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
