import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ROUTE_URL } from "@/constant/routes.const";
import {
  deleteContainerRequest,
  fetchContainerRequest,
} from "@/store/action/container.action";
import { AppState } from "@/store/reducer/root.reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { AnyAction } from "redux-saga";
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
import { ContainerModel } from "@/interface/container";
import DataNotFound from "@/app/auth/dataNotFound/DataNotFound";
import { toast } from "react-toastify";

const ContainerListApp = () => {
   
  const pageSize = 10;

  //mention hooks

  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

  //mention selectors

  const container =
    useSelector((x: AppState) => x?.container?.list?.result) || [];


  // mention states

  const [qrCode, setQrCode] = useState("");
  console.log(qrCode);
  
  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredContainer, setFilteredContainer] = useState<ContainerModel[]>(
    []
  );

useEffect(() => {
  if (Array.isArray(container)) {
    const filteredData = container.filter((item) =>
      item.containerName.toLowerCase().includes(Search.toLowerCase())
    );
    setFilteredContainer(filteredData);
  } else {
    setFilteredContainer([]);
  }
}, [Search, container]);


const handleDelete = async (_id: string = "") => {
  try {
    await dispatch<any>(deleteContainerRequest(_id)); // cast dispatch as any or proper AppDispatch
    dispatch(fetchContainerRequest());
    toast.success("Deleted Successfully");
  } catch (error) {
    console.error("Failed to delete container:", error);
  }
};

  useEffect(() => {
    dispatch(
      fetchContainerRequest()
    );
  }, [dispatch, currentPage]);
  const paginatedData = filteredContainer.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/container") // Replace with your actual API
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.qrCode) {
          setQrCode(data.data.qrCode);
        }
      })
      .catch((error) => console.error("Error fetching QR Code:", error));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              💬
            </div>
            <span className="text-md font-semibold">Container</span>
          </div>
          {currentPage === 1 && (
            <Input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              placeholder="Search Container..."
              className="w-72"
            />
          )}
        </div>
        <Separator className="mt-4" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">LIST OF CONTAINER</h2>

          {/* <Separator className="flex-1 mx-4" /> */}

          <div className="flex gap-4">
            {currentPage === 1 && (
              <div>
                <Link to={`${ROUTE_URL.CONTAINER.ADD}`}>
                  <Button type="button" className="btn btn-primary btn-sm">
                    <i className="bi bi-plus-lg"></i> Create new container
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-left text-sm font font-semibold">
                Container Name
              </TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font font-semibold">
                Container Size
              </TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font font-semibold">
                In Stock
              </TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font font-semibold">
                Barcode
              </TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="px-4 py-3 font-medium">
                    {item.containerName}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {item.containerSize}
                  </TableCell>
                  <TableCell className="px-4 py-3">{item.inStock}</TableCell>
                  <TableCell className="px-4 py-3">
                    {item?.qrCode ? (
                      <img
                        src={item?.qrCode}
                        alt="QR Code"
                        style={{ width: 100, height: 100 }}
                      />
                    ) : (
                      <p>No QR Code</p>
                    )}
                  </TableCell>
                  <TableCell className="flex item-center px-4 py-3 gap-2">
                    <Link
                      to={`${ROUTE_URL.CONTAINER.LIST}/${item._id}`}
                      className="flex items-center"
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

      {filteredContainer.length > 0 && (
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
              {[...Array(Math.ceil(filteredContainer.length / pageSize))].map(
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
                  //   currentPage ===
                  //   Math.ceil(filteredContainer.length / pageSize)
                  // }
                  className={`${
                    currentPage ===
                    Math.ceil(filteredContainer.length / pageSize)
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

export default ContainerListApp;
