import React, { useContext, useMemo } from "react";
import { pageContext } from "../../contexts/PageContext/PageContext";
import "./style/RunningText.css";

const RunningText = () => {
  const { partners } = useContext(pageContext);

  const doubledPartners = useMemo(() => {
    return [
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
      ...partners,
    ];
  }, [partners]);

  return (
    <div className="overflow-hidden">
      <div className="flex img-ticker">
        {doubledPartners.map((item, index) => (
          <img
            key={index}
            className="w-64 self-start flex-none"
            src={item.main_picture}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default RunningText;
