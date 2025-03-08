import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard on home page load
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-lg">جاري التحميل...</p>
    </div>
  );
}

export default Home;
