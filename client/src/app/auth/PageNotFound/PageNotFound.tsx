import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
// import {} from "";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 "
    >
      <img
        src="../../../../public/Error.svg"
        alt="404 Not Found"
        className="w-[320px] h-auto mb-6 drop-shadow-xl"
      />

      <h1 className="text-3xl font-bold ">Page Not Found</h1>
      <p className=" mt-2">
        You'll be redirected to the home page in 5 seconds.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700  font-semibold rounded-xl transition duration-300"
      >
        Go Home Now
      </Button>
    </motion.div>
  );
};

export default PageNotFound;
