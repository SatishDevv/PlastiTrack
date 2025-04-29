import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppState } from "@/store/reducer/root.reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  FileText,
  Calendar1,
  Clock,
  FileCheck,
} from "lucide-react";
import "./alertLatestActivities.css"; // ensure this is imported
import { fetchTransactionMasterRequest } from "@/store/action/transaction.master.action";
import { AnyAction } from "redux-saga";
import { ThunkDispatch } from "@reduxjs/toolkit";

const AlertLatestActivitiesApp = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  const latestActivities = useSelector(
    (x: AppState) => x.transaction.list.result
  );

  useEffect(() => {
    dispatch(fetchTransactionMasterRequest());
  }, []);

  const renderActivityCard = (item: any, index: number) => (
    <div key={item._id + index} className="w-full">
      <div
        className={`flex flex-wrap items-center justify-between gap-4 px-4 py-3 rounded-md border relative w-full ${
          index === 0 ? "bg-green-100 border-green-300" : "bg-white"
        } hover:bg-green-50 transition`}
      >
        <div className="flex items-center gap-2 text-sm">
          <FileCheck className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-gray-800">
            {item.transactionId || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {item.status === "completed" ? (
            <BadgeCheck className="h-4 w-4 text-green-500" />
          ) : (
            <Clock className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`capitalize ${
              item.status === "completed" ? "text-green-700" : "text-red-700"
            }`}
          >
            {item.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar1 className="h-4 w-4" />
          <span>
            {typeof item.createdAt === "string"
              ? new Date(item.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="shadow-md rounded-xl border border-gray-200 mt-4">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {/* Header Row */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700 border-b bg-gray-50">
          <div className="w-1/2 flex items-center gap-1">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>Transaction ID</span>
          </div>
          <div className="w-1/2 flex items-center gap-1">
            <BadgeCheck className="h-4 w-4 text-gray-500" />
            <span>Status</span>
          </div>
          <div className=" flex items-center ml-10 gap-1">
            <Calendar1 className="h-4 w-4 text-gray-500" />
            <span>Date</span>
          </div>
        </div>
        <div
          id="scroll-container"
          className="w-full max-h-[400px] overflow-y-auto rounded-md"
        >
          <div id="scroll-content" className="w-full">
            {/* List of activities */}
            <div className="space-y-2 w-full">
              {latestActivities?.map(renderActivityCard)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertLatestActivitiesApp;
