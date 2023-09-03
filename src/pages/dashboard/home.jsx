import React from "react";
import ConsultantDashboard from "@/components/Dashboard/ConsultantDashboard";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

export function Home() {
  if (localStorage.getItem("role") == "CONSULTANT") {
    return <ConsultantDashboard />;
  } else {
    return <AdminDashboard />;
  }
}

export default Home;
