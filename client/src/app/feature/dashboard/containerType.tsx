import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchContainerRequest } from "@/store/action/container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { BadgeCheck, Cuboid, FileText } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux-saga";

const ContainerTypeStockList = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  const container =
    useSelector((x: AppState) => x?.container?.list?.result) || [];

  useEffect(() => {
    dispatch(fetchContainerRequest());
  }, [dispatch]);

  const renderActivityCard = (item: any, index: number) => (
    <div key={item._id + index} className="w-full">
      <div
        className={`flex flex-wrap items-center justify-between gap-4 px-4 py-3 rounded-md border relative w-full ${
          index === 0 ? "bg-green-100 border-green-300" : "bg-white"
        } hover:bg-green-50 transition`}
      >
        <div className="flex items-center gap-2 text-sm">
          <Cuboid className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-gray-800">
            {item.containerName || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {/* <BadgeCheck className="h-4 w-4 text-green-500" /> */}
          <span className="capitalize text-green-700">
            {item.remainingStock}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>
            {typeof item.containerId === "string"
              ? item.containerId
              : item.containerId?.createdAt ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="shadow-md rounded-xl border border-gray-200 mt-4">
      <CardHeader>
        <CardTitle>Stock By Container Type</CardTitle>
        {/* Optional: Add a subtitle below the title */}
        {/* <CardDescription>Here’s what’s happening lately</CardDescription> */}
      </CardHeader>

      <CardContent className="p-4">
        {/* Header Row */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700 border-b bg-gray-50">
          <div className="w-1/2 flex items-center gap-1">
            <Cuboid className="h-4 w-4 text-gray-500" />
            <span>Container Name</span>
          </div>
          <div className="w-1/2 flex items-center gap-1">
            <BadgeCheck className="h-4 w-4 text-gray-500" />
            <span>Remaining Stock</span>
          </div>
          <div className=" flex items-center ml-10 gap-1">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>Date</span>
          </div>
        </div>
        <div id="scroll-container" className="w-full">
          <div id="scroll-content" className="w-full">
            <div className="space-y-2 w-full">
              {Array?.isArray(container) && container?.map(renderActivityCard)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerTypeStockList;
