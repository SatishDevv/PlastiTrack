import { UsersRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ConsumerAllotmentListApp = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <UsersRound size={20} strokeWidth={3} />
            </div>
            <span className="text-md font-semibold">Consumer Allotment</span>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">LIST OF CONSUMER ALLOTMENT</h2>
        </div>
        <Table className="mt-4">
          <TableHeader></TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="text-center py-3">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConsumerAllotmentListApp;
