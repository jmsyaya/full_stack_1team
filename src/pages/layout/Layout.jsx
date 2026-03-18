import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/layoutcomponents/Header";
import Footer from "../../components/layoutcomponents/Footer";

const Layout = () => {
  const navigate = useNavigate();

  const handleHeaderSearch = ({ keyword }) => {
    const q = keyword.trim();
    if (!q) return;

    navigate(`/communitymain?keyword=${encodeURIComponent(q)}&sort=latest`);
    // 검색과 덩렬이 둘 다 주소에 남아 새로고침 유지됨
  };

  return (
    <div>
      <Header onSearch={handleHeaderSearch} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;