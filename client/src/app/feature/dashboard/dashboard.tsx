import  { useEffect } from "react";
import { useDispatch, } from "react-redux";
import CardsApp from "./cards";
// import { Calendar } from "@/components/ui/calendar";
import AlertLatestActivitiesApp from "./alertLatestActivities";
import ContainerTypeStockList from "./containerType";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: STATUS_REQUEST });  // Ensure this is fired when component mounts
  }, [dispatch]);

  return (
    <div>
      <CardsApp />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
      </div>
      <AlertLatestActivitiesApp />
      <ContainerTypeStockList/>

    </div>
  );
};

export default Dashboard;
