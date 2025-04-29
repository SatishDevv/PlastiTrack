
import { Separator } from "@/components/ui/separator";
import {
  fetchContainerAssignContainerByIdRequest,
} from "@/store/action/assign.container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router";
import { AnyAction } from "redux-saga";

const AssignContainerViewApp = () => {
  const { id } = useParams();

  const assignContainer = useSelector(
    (x: any) => x.assignmentContainer.list.result
  );
  console.log(id);
  console.log(assignContainer);

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();


  useEffect(() => {
    if (id) {
    dispatch(fetchContainerAssignContainerByIdRequest(id)); // Fetch data for this consumer
    }
  }, [id]);

  return (
    <div className="p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            💬
          </div>
          <span className="text-lg font-semibold">View Transaction</span>
        </div>
       
      </div>

      <Separator className="mb-4" />

      {/* Container List */}
      <div className="space-y-4">
        {assignContainer && assignContainer.length > 0 ? (
          assignContainer.map((item: any, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="text-md font-semibold">
                  {item?.containerTransactionId?.containerId?.containerName ||
                    "No Container Name"}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item?.status || "No Status"}
                </span>
              </div>

              {/* Details */}
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">
                    Consumer Name:
                  </span>
                  <span className="font-medium">
                    {item.consumerId
                      ? `${item.consumerId.firstName} ${item.consumerId.lastName}`
                      : "No Consumer Name"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">
                    Assigned Quantity:
                  </span>
                  <span className="font-medium">
                    {item?.quantity || "No Assign Quantity"}
                  </span>
                </div>
              
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6 border rounded-lg bg-gray-50">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignContainerViewApp;
