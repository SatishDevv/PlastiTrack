import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVendorTrendRequest } from "@/store/action/container.action";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppState } from "@/store/reducer/root.reducer";
import { AnyAction } from "redux-saga";

export function VendorTrendApp() {
  const [filter, setFilter] = useState("weekly");

  const vendorTrend = useSelector((x: any) => x.container.update.result);
  console.log(vendorTrend);
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(fetchVendorTrendRequest());
  }, [dispatch]);

  const chartData = vendorTrend?.[filter] || [];

  return (
    <Card>
      <div className="p-4 rounded-xl  w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Vendor Trend</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="containerCount"
              fill="#4ade80"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
