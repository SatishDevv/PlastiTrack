import { ROUTE_URL } from "@/constant/routes.const"
import { Link } from "react-router"

const QuickActionsApp = () => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {[
          {
            title: "Create Assign",
            icon: "bi-file-earmark-plus",
            to: ROUTE_URL.ASSIGNCONTAINER.ADD,
            bg: "bg-gradient-to-r from-blue-500 to-blue-300",
          },
          {
            title: "Receive",
            icon: "bi-box-arrow-in-down",
            to: ROUTE_URL.RECEIVEASSIGNCONTAINER.LIST,
            bg: "bg-gradient-to-r from-green-500 to-green-300",
          },
          {
            title: "Allot to Customer",
            icon: "bi-person-check",
            to: ROUTE_URL.RECEIVEASSIGNCONTAINER.LIST,
            bg: "bg-gradient-to-r from-yellow-500 to-yellow-200",
          },
          {
            title: "Receive from Customer",
            icon: "bi-arrow-bar-left",
            to: ROUTE_URL.RECEIVEASSIGNCONTAINER.LIST,
            bg: "bg-gradient-to-r from-red-500 to-red-300",
          },
        ].map((card, index) => (
          <Link
            key={index}
            to={card.to}
            className={`group rounded-xl text-white ${card.bg} p-6 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between">
              {/* Left icon */}
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <i className={`bi ${card.icon} text-2xl`}></i>
                </div>
                <div>
                  <p className="text-sm opacity-80">Action</p>
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                </div>
              </div>
      
              {/* Right arrow */}
              <i className="bi bi-arrow-right-circle-fill text-2xl opacity-70 group-hover:opacity-100 transition" />
            </div>
          </Link>
        ))}
      </div>
      
      
      
      
      
      
    )
}

export default QuickActionsApp