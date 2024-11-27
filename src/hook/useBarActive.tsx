import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useBarActive = () => {
  const [barActive, setBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname;
    setBarActive(currentPage);
  }, [location.pathname]);

  const handlePageClick = (path:string) => {
    setBarActive(path);
    navigate(path);
  };

  return { barActive, handlePageClick };
};

export default useBarActive;
