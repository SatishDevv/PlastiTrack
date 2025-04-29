import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { ROUTE_URL } from "@/constant/routes.const";
import { IUserModel } from "@/interface/user.model";
import {
  deleteUserRequest,
  fetchUserRequest,
  resetDeleteUser,
} from "@/store/action/user.action.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ChartNoAxesCombined, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";

const UserListApp = () => {
  const pageSize = 10;

  //mention hooks
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors
  const user = useSelector((a: AppState) => a.user) || [];

  //mention states

  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUser, setFiltereUser] = useState<IUserModel[]>([]);


  useEffect(() => {
    const filteredData =
      user?.list?.result?.filter((item) =>
        item.firstName.toLowerCase().includes(Search.toLowerCase())
      ) || [];
    setFiltereUser(filteredData);
  }, [Search, user]);

  useEffect(() => {
    dispatch(
      fetchUserRequest({ Skip: (currentPage - 1) * pageSize })
    );
  }, [dispatch, currentPage]);

  const paginatedData = filteredUser?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    dispatch(
      fetchUserRequest({  Skip: (currentPage - 1) * pageSize })
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (user?.delete.error) {
      // Or role.deleteMessage if you’re using that
      dispatch(
        fetchUserRequest({ Skip: (currentPage - 1) * pageSize })
      );
      dispatch(resetDeleteUser());
      // toast.success("Status deleted successfully");
    }
  }, [user.delete.result, dispatch]);

  // const handleDelete = (id: string = "") => {
  //   dispatch(deleteUserRequest(id));
  //   toast.success("User Delete Successfully ")
  // };

  const handleDelete = ( id: string = "" ) => {
    dispatch(deleteUserRequest(id));
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              <ChartNoAxesCombined size={20} strokeWidth={3} />
            </div>
            <span className="text-md font-semibold">Users</span>
          </div>
          {currentPage === 1 && (
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              placeholder="Search User..."
              className="w-72"
            />
          )}
        </div>
        <Separator className="mt-4" />
        {currentPage === 1 && (
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-sm font-semibold">LIST OF USER</h2>
            <div className="flex gap-4">
              <Link to={`${ROUTE_URL.USER.ADD}`}>
                <Button type="button" className="btn btn-primary btn-sm">
                  <i className="bi bi-plus-lg"></i>Create new User
                </Button>
              </Link>
            </div>
          </div>
        )}

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                Name
              </TableHead>

              <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                Role Name
              </TableHead>
              <TableHead className="px-4 py-2 text-left  text-sm font-semibold ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="px-4 py-3 font-medium ">
                    {item.firstName}
                  </TableCell>
                  <TableCell className="px-4 py-3">{item.roleName}</TableCell>
                  <TableCell className="flex px-4 py-3">
                    <Link
                      to={`${ROUTE_URL.USER.LIST}/${item._id}`}
                      className="mr-4"
                    >
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
      {/* Fixed Pagination */}
      {filteredUser.length > 0 && (
        <div className="sticky bottom-0 left-0 w-full border-gray-300 shadow-md py-3">
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
              {[...Array(Math.ceil(filteredUser.length / pageSize))].map(
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
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  // disabled={
                  //   currentPage === Math.ceil(filteredUser.length / pageSize)
                  // }
                  className={`${
                    currentPage === Math.ceil(filteredUser.length / pageSize)
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

export default UserListApp;
