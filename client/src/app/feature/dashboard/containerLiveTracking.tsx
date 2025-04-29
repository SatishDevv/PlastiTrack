import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/reducer/root.reducer";
import { fetchCustomerTrendRequest } from "@/store/action/container.action";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

export function CotainerLiveTrackingApp() {

  const consumerTrend = useSelector((x: AppState) => x.container.list.result);
  console.log(consumerTrend);
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerTrendRequest());
  }, []);

  const chartData = consumerTrend || [];
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
    //     <CardDescription>January - June 2024</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart accessibilityLayer data={chartData}>
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="month"
    //           tickLine={false}
    //           tickMargin={10}
    //           axisLine={false}
    //           tickFormatter={(value) => value.slice(0, 3)}
    //         />
    //         <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    //         <ChartLegend content={<ChartLegendContent />} />
    //         <Bar
    //           dataKey="desktop"
    //           stackId="a"
    //           fill="var(--color-desktop)"
    //           radius={[0, 0, 4, 4]}
    //         />
    //         <Bar
    //           dataKey="mobile"
    //           stackId="a"
    //           fill="var(--color-mobile)"
    //           radius={[4, 4, 0, 0]}
    //         />
    //       </BarChart>
    //     </ChartContainer>
    //   </CardContent>
    //   {/* <CardFooter className="flex-col items-start gap-2 text-sm">
    //     <div className="flex gap-2 font-medium leading-none">
    //       Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    //     </div>
    //     <div className="leading-none text-muted-foreground">
    //       Showing total visitors for the last 6 months
    //     </div>
    //   </CardFooter> */}
    // </Card>
    <Card>
      <div className="p-4 rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Customer Trend</h2>
          <select
            // onChange={(e) => setFilter(e.target.value)}
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

export default CotainerLiveTrackingApp;
