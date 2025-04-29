import { Card } from "@/components/ui/card";
import { IAssignContainerModel } from "@/interface/assign.container";
import { fetchAllCountTransactionRequest } from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Archive, Download, Package, Truck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux-saga";

const CardsApp = () => {
  // const dispatch = useDispatch();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const count = useSelector((x: AppState) => x.assignmentContainer.view.result) as IAssignContainerModel;

  useEffect(() => {
    dispatch(fetchAllCountTransactionRequest());
  }, []);

  const cards = [
    {
      title: "Total Containers in Stock",
      value: count?.totalContainer ?? "",
      icon: <Package className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Active Transactions",
      value: count?.activeTransactions ?? 0,
      icon: <Truck className="w-6 h-6 text-red-500" />,
      bg: "bg-red-50",
    },
    {
      title: "Completed Transactions",
      value: count?.totalInWord ?? 0,
      icon: <Download className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "In Stock",
      value: count?.totalInStock ?? 0,
      icon: <Archive className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`flex items-center gap-4 p-4 rounded-xl shadow hover:shadow-md transition ${card.bg}`}
          >
            <div className="p-3 rounded-full bg-white shadow-inner">
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-xl font-semibold text-gray-800">{card.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardsApp;
