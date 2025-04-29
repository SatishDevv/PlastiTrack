import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import BaseLayout from "./layout/BaseLayout";
import { Login } from "./app/auth/login/login-form";
import Dashboard from "./app/feature/dashboard/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import StatusListApp from "./components/PlasticTrack/status/list/status.list";
import { Provider } from "react-redux";
import { store } from "./store/configure-store";
import { ROUTE_URL } from "./constant/routes.const";
import ContainerListApp from "./components/PlasticTrack/container/list/container.list";
import RoleListApp from "./components/PlasticTrack/role/list/role.list";
import RoleAddApp from "./components/PlasticTrack/role/add/role.add";
import StatusAddApp from "./components/PlasticTrack/status/add/status.add";
import ContainerAddApp from "./components/PlasticTrack/container/add/container.add";
import AssignContainerApp from "./components/PlasticTrack/assignContainer/list/assign.container";
import UserListApp from "./components/PlasticTrack/user/list/user.list";
import UserAddApp from "./components/PlasticTrack/user/add/user.add";

import { ToastContainer } from "react-toastify";
import AddAssignmentContainer from "./components/PlasticTrack/assignContainer/add/assign.container";
import AssignContainerViewApp from "./components/PlasticTrack/assignContainer/view/assign.container.view";
import TransactionListApp from "./components/PlasticTrack/transaction/list/transaction.list";
import ContainerMovementListApp from "./components/PlasticTrack/containerMovement/list/containerMovement.list";
import StockContainerListApp from "./components/PlasticTrack/stockContainer/list/stock.container.list";
import ConsumerAllotmentListApp from "./components/PlasticTrack/consumerAllotment/list/consumerAllotment.list";
import VendorAllotmentListApp from "./components/PlasticTrack/vendorAllotment/list/vendorAllotment.list";
import CustomerAllotmentListApp from "./components/PlasticTrack/customerAllotment/list/customerAllotment.list";
import ForgetPasswordApp from "./app/auth/forgetPassword/forgetPassword";
import TransactionMasterAddApp from "./components/transacationMaster/add/transaction.add";
import TransactionMasterListApp from "./components/transacationMaster/list/transaction.list";
import TrackFlowStatusListApp from "./components/PlasticTrack/TrackFlow/list/trackFlowStatus.list";
import DispatchManagementListApp from "./components/PlasticTrack/dispatchManagement/list/dispatchManagement.list";
import UserStockListApp from "./components/PlasticTrack/userStock/userStock.list";
import PageNotFound from "./app/auth/PageNotFound/PageNotFound";
import ReceiveAssignContainerListApp from "./components/PlasticTrack/receiveAssignContainer/list/receiveAssignContainer.list";
import DashboardConsumerApp from "./app/feature/dashboardConsumer/dashboardConsumer";

const router = createBrowserRouter([
  {
    path: ROUTE_URL.HOME,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTE_URL.DASHBOARD,
        element: <Dashboard />,
      },
       // DASHBOARD CONSUMER
       
       {
        path: ROUTE_URL.DASHBOARD_CONSUMER,
        element: <DashboardConsumerApp />,
      },
       
      //STATUS

      {
        path: ROUTE_URL.STATUS.LIST,
        element: <StatusListApp />,
      },
      {
        path: ROUTE_URL.STATUS.ADD,
        element: <StatusAddApp />,
      },
      {
        path: ROUTE_URL.STATUS.EDIT,
        element: <StatusAddApp />,
      },

      //CONTAINER

      {
        path: ROUTE_URL.CONTAINER.LIST,
        element: <ContainerListApp />,
      },
      {
        path: ROUTE_URL.CONTAINER.ADD,
        element: <ContainerAddApp />,
      },
      {
        path: ROUTE_URL.CONTAINER.EDIT,
        element: <ContainerAddApp />,
      },

      //ROLE

      {
        path: ROUTE_URL.ROLE.LIST,
        element: <RoleListApp />,
      },
      {
        path: ROUTE_URL.ROLE.ADD,
        element: <RoleAddApp />,
      },
      {
        path: ROUTE_URL.ROLE.EDIT,
        element: <RoleAddApp />,
      },

      //USER

      {
        path: ROUTE_URL.USER.LIST,
        element: <UserListApp />,
      },
      {
        path: ROUTE_URL.USER.ADD,
        element: <UserAddApp />,
      },

      //Container Movement

      {
        path: ROUTE_URL.CONTAINERMOVEMENT.LIST,
        element: <ContainerMovementListApp />,
      },
      //Stock Container
      {
        path: ROUTE_URL.STOCKCONTAINER.LIST,
        element: <StockContainerListApp />,
      },
      //Consumer Allotment
      {
        path: ROUTE_URL.CONSUMERALLOTMENT.LIST,
        element: <ConsumerAllotmentListApp />,
      },
      //Vendor Allotment
      {
        path: ROUTE_URL.VENDORALLOTMENT.LIST,
        element: <VendorAllotmentListApp />,
      },
      //Customer Allotment
      {
        path: ROUTE_URL.CUSTOMERALLOTMENT.LIST,
        element: <CustomerAllotmentListApp />,
      },
      //ASSIGN TO CONSUMER

      {
        path: ROUTE_URL.USER.EDIT,
        element: <UserAddApp />,
      },
      {
        path: ROUTE_URL.ASSIGNCONTAINER.LIST,
        element: <AssignContainerApp />,
      },
      {
        path: ROUTE_URL.ASSIGNCONTAINER.ADD,
        element: <AddAssignmentContainer />,
      },
      {
        path: ROUTE_URL.ASSIGNCONTAINER.DETAIL,
        element: <AssignContainerViewApp />,
      },
      {
        path: ROUTE_URL.ASSIGNCONTAINER.EDIT,
        element: <AddAssignmentContainer />,
      },

      //TRANSACTION

      {
        path: ROUTE_URL.TRANSACTION.LIST,
        element: <TransactionListApp />,
      },

      // TRANSACTION MASTER

      {
        path: ROUTE_URL.TRANSACTION_MASTER.LIST,
        element: <TransactionMasterListApp />,
      },
      {
        path: ROUTE_URL.TRANSACTION_MASTER.ADD,
        element: <TransactionMasterAddApp />,
      },
      {
        path: ROUTE_URL.TRANSACTION_MASTER.EDIT,
        element: <TransactionMasterAddApp />,
      },

      // TRACK FLOW STATUS

      {
        path: ROUTE_URL.TRACK_FLOW_STATUS.LIST,
        element: <TrackFlowStatusListApp />,
      },

      // DISPATCH CONTAINER

      {
        path: ROUTE_URL.DISPATCHCONTAINER.LIST,
        element: <DispatchManagementListApp />,
      },
      {
        path: ROUTE_URL.ASSIGNCONTAINER.EDIT,
        element: <AddAssignmentContainer />,
      },
      // USER STOCK MANAGEMENT

      {
        path: ROUTE_URL.USER_STOCK_MANAGEMENT.LIST,
        element: <UserStockListApp />,
      },

      //RECEIVE CONTAINER

      
      {
        path: ROUTE_URL.RECEIVEASSIGNCONTAINER.LIST,
        element: <ReceiveAssignContainerListApp />,
      },
    ],
  },
  {
    path: ROUTE_URL.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_URL.FORGET_PASSWORD,
    element: <ForgetPasswordApp />,
  },
  {
    path: ROUTE_URL.UNDEFINED,
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
