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

<<<<<<< HEAD
  const handlePageClick = (path: string) => {
=======
  const handlePageClick = (path:string) => {
>>>>>>> 14011d2ec8d0a335fba87db9b79867c880044dee
    setBarActive(path);
    navigate(path);
  };

  return { barActive, handlePageClick };
};

export default useBarActive;
