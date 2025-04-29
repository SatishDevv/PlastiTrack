import { Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";

const StockContainerListApp = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <Activity size={20} strokeWidth={3} />
            </div>
            <span className="text-md font-semibold">Stock Container</span>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">LIST OF STOCK CONTAINER</h2>
        </div>
        <Table className="mt-4">
          <TableHeader></TableHeader>
          <TableBody>
          <TableRow>
                <TableCell colSpan={6} className="text-center py-3">
                  <DataNotFound />
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockContainerListApp;
