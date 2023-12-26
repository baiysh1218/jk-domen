import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../../assets/logo/JKLogoSecond.png";
import logoNav from "../../assets/icons/JKGroup_black_nav_logo.png";
import "./style/Loader.css";
import { pageContext } from "../../contexts/PageContext/PageContext";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval; // Объявляем переменную interval здесь

    const simulateProgress = () => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += 13; // Увеличиваем прогресс на 10% каждую секунду
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval); // Останавливаем интервал, когда достигнут максимальный прогресс
        }
      }, 600); // 6 секунд
    };

    simulateProgress();

    // Очистка интервала при размонтировании компонента (необязательно, но рекомендуется)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader_container">
      <div className="loader_img">
        <img src={logoNav} alt="" />
      </div>
      <Box sx={{ width: "50%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </div>
  );
}
