import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
  Settings,
  ClipboardMinus,
  Activity,
  UsersRound,
  Container,
  SquareTerminal,
  LayoutDashboard,
  ChartBar,
  Cuboid,
  FileUser,
  User,
  ContactRound,
  Contact,
  Boxes,
  Workflow,
  FileCheck,
  Truck,
  ChartLine,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ROUTE_URL } from "@/constant/routes.const";
import { useSelector } from "react-redux";
import { AppState } from "@/store/reducer/root.reducer";

const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: ROUTE_URL.DASHBOARD,
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Dashboard C",
      url: ROUTE_URL.DASHBOARD_CONSUMER,
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Transaction",
      url: ROUTE_URL.TRANSACTION_MASTER.LIST,
      icon: FileCheck,
    },
    {
      title: "Receive Container",
      url: ROUTE_URL.RECEIVEASSIGNCONTAINER.LIST,
      icon: SquareTerminal,
    },
    {
      title: "Allot Containers",
      url: ROUTE_URL.ASSIGNCONTAINER.LIST,
      icon: Boxes,
    },
    {
      title: "Dispatch Management",
      url: ROUTE_URL.DISPATCHCONTAINER.LIST,
      icon: Truck,
    },
    {
      title: "Assign To User",
      url: ROUTE_URL.ASSIGNTOVENDOR.LIST,
      icon: SquareTerminal,
    },
    {
      title: "Assign To Customer",
      url: ROUTE_URL.ASSIGNTOCUSTOMER.LIST,
      icon: SquareTerminal,
    },
    {
      title: "Assign To Admin",
      url: ROUTE_URL.ASSIGNTOADMIN.LIST,
      icon: SquareTerminal,
    },
    // {
    //   title: "View Transaction",
    //   url: ROUTE_URL.TRANSACTION.LIST,
    //   icon: ArrowRightLeft,
    // },

    {
      title: "Track Flow Status",
      url: ROUTE_URL.TRACK_FLOW_STATUS.LIST,
      icon: Workflow,
    },
    {
      title: "User Stock Management",
      url: ROUTE_URL.USER_STOCK_MANAGEMENT.LIST,
      icon: ChartLine,
    },
  ],
  settings: {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Status", url: ROUTE_URL.STATUS.LIST, icon: ChartBar },
      {
        title: "Container",
        url: ROUTE_URL.CONTAINER.LIST,
        icon: Cuboid,
      },
      { title: "Role", url: ROUTE_URL.ROLE.LIST, icon: FileUser },
      { title: "User", url: ROUTE_URL.USER.LIST, icon: User },
    ],
  },
  reports: {
    title: "reports",
    icon: ClipboardMinus,
    children: [
      {
        title: "Container Movement",
        url: ROUTE_URL.CONTAINERMOVEMENT.LIST,
        icon: Container,
      },
      {
        title: "Stock Container",
        url: ROUTE_URL.STOCKCONTAINER.LIST,
        icon: Activity,
      },
      {
        title: "Consumer Allotment ",
        url: ROUTE_URL.CONSUMERALLOTMENT.LIST,
        icon: UsersRound,
      },
      {
        title: "Vendor Allotment",
        url: ROUTE_URL.VENDORALLOTMENT.LIST,
        icon: ContactRound,
      },
      {
        title: "Customer Allotment ",
        url: ROUTE_URL.CUSTOMERALLOTMENT.LIST,
        icon: Contact,
      },
    ],
  },

  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const loginUser = useSelector((state: AppState) => state.auth.result);
  const userRole = loginUser?.roleName || "consumer";

  // Filter nav items based on role
  const filteredNavItems = data.navMain.filter((item) => {
    if (userRole === "admin")
      return (
        item.title !== "Assign To User" &&
        item.title !== "Dashboard C" &&
        item.title !== "Assign To Customer" &&
        item.title !== "Assign To Admin"
      );
    if (userRole === "consumer")
      return (
        item.title === "Receive Container" ||
        item.title === "Allot Containers" ||
        item.title === "Dispatch Management" ||
        item.title === "Track Flow Status" ||
        item.title === "Dashboard C"
      );
    if (userRole === "vendor")
      return (
        item.title === "Receive Container" ||
        item.title === "Allot Containers" ||
        item.title === "Dispatch Management" ||
        item.title === "Track Flow Status"
      );
    if (userRole === "customer")
      return (
        item.title === "Receive Container" ||
        item.title === "Allot Containers" ||
        item.title === "Dispatch Management" ||
        item.title === "Track Flow Status"
      );
    return false; // Hide all if role is undefined or unexpected
  });

  const userData = {
    name: loginUser?.firstName || "",
    email: loginUser?.email || "",
    avatar: "/avatars/shadcn.jpg",
  };

  // State to manage Settings toggle
  const [isSettingsExpanded, setIsSettingsExpanded] = React.useState(false);

  const handleSettingsClick = () => {
    setIsSettingsExpanded((prev) => !prev);
  };
  // State to manage Reports toggle
  const [isReportsExpanded, setIsReportsExpanded] = React.useState(false);

  const handleReportsClick = () => {
    setIsReportsExpanded((prev) => !prev);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {filteredNavItems.map((item) => (
          <NavMain
            key={item.title}
            items={[
              {
                title: item.title,
                url: item.url,
                icon: item.icon,
              },
            ]}
          />
        ))}

        {/* Render Settings Toggle only for Admin */}
        {userRole === "admin" && (
          <>
            <div
              onClick={handleSettingsClick}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
            >
              <Settings size={20} style={{ marginRight: "10px" }} />
              <span>Settings</span>
            </div>

            {/* Render Settings children if expanded */}
            {isSettingsExpanded && (
              <div style={{ paddingLeft: "30px" }}>
                {data.settings.children.map((child, index) => (
                  <NavMain
                    key={index}
                    items={[
                      {
                        title: child.title,
                        url: child.url,
                        icon: child.icon,
                      },
                    ]}
                  />
                ))}
              </div>
            )}
            {/* Render Reports Toggle */}
            <div
              onClick={handleReportsClick}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
            >
              <ClipboardMinus size={20} style={{ marginRight: "10px" }} />
              <span>Reports</span>
            </div>

            {isReportsExpanded && (
              <div style={{ paddingLeft: "30px" }}>
                {data.reports.children.map((child, index) => (
                  <NavMain
                    key={index}
                    items={[
                      { title: child.title, url: child.url, icon: child.icon },
                    ]}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
