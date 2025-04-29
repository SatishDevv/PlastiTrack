import { Button } from "@/components/ui/button";
import { ROUTE_URL } from "@/constant/routes.const";
import { Link } from "react-router";
import { ChartNoAxesCombined, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AppState } from "@/store/reducer/root.reducer";
import {
  deleteRoleRequest,
  fetchRoleRequest,
  resetDeleteRole,
} from "@/store/action/role.action";
import { IRoleModel, RoleModel } from "@/interface/role.model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { toast } from "react-toastify";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const RoleListApp = () => {
  const pageSize = 10;

  //mention hooks
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors
  const role = useSelector((x: AppState) => x?.role) || [];

  //mention states
  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRole, setFilteredRole] = useState<IRoleModel[]>([]);
 
  useEffect(() => {
    const filteredData =
      role.list.result?.filter((item) =>
        item.roleName.toLowerCase().includes(Search.toLowerCase())
      ) || [];
    setFilteredRole(filteredData);
  }, [Search, role]);

  const handleDelete = (_id: string = "") => {
    dispatch(deleteRoleRequest(_id));
  };

  useEffect(() => {
    dispatch(
      fetchRoleRequest()
    );
  }, [dispatch]);
  const paginatedData = filteredRole?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    if (role.delete?.result) {
      // Or role.deleteMessage if you’re using that
      dispatch(fetchRoleRequest());
      dispatch(resetDeleteRole());
      toast.success("Role deleted successfully");

    }
  }, [role.delete.result, dispatch]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Content Wrapper */}
      <div className="p-4 flex-grow">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <ChartNoAxesCombined size={20} strokeWidth={3} />
            </div>
            <span className="text-md font-semibold">Role</span>
          </div>
          {currentPage === 1 && (
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Role..."
              className="w-72"
            />
          )}
        </div>
        <Separator className="mt-4" />

        {/* Table Section */}
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">LIST OF ROLES</h2>
          {currentPage === 1 && (
            <div className="flex gap-4">
              <Link to={`${ROUTE_URL.ROLE.ADD}`}>
                <Button type="button" className="btn btn-primary btn-sm">
                  <i className="bi bi-plus-lg"></i> Create new Role
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Role Name
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((item: RoleModel, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="px-4 py-3 font-medium">
                    {item.roleName}
                  </TableCell>
                  <TableCell className="flex px-4 py-3 gap-4">
                    <Link to={`${ROUTE_URL.ROLE.LIST}/${item._id}`}>
                      <Pencil size={20} strokeWidth={2.25} />
                    </Link>
                    <Trash2
                      size={20}
                      strokeWidth={2.25}
                      onClick={() => handleDelete(item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-3">
                  <DataNotFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredRole.length > 0 && (
        <div className="sticky bottom-0 left-0 w-full shadow-md py-3">
          <Pagination className="flex justify-center">
            <PaginationContent className="flex">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  // disabled={currentPage === 1}
                  className={`${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </PaginationItem>

              {[...Array(Math.ceil(filteredRole.length / pageSize))].map(
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  // disabled={
                  //   currentPage === Math.ceil(filteredRole.length / pageSize)
                  // }
                  className={`${
                    currentPage === Math.ceil(filteredRole.length / pageSize)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RoleListApp;
