export const ENDPOINT = {
  BASE_URL: "http://localhost:3000",
  API_BASE_URL: "http://159.65.155.83/api/v1",
  AUTH: {
    API: {
      login: "/user/login",
      signup: "/auth/user",
      pages: "/api/pages",
      actions: "/api/action",
      sendOtp: "/auth/sendOtp",
      verifyotp: "/auth/verifyOTP",
      resetPassword: "/user/forgotPassword",
    },
  },
  USER: {
    API: {
      // FETCH_USERS: "/user",
      FETCH_USER_BY_ID: "/user",
      FETCH_USER: "/user",
      FILTER_FETCH_USER: "/assignAssignment/user/role/",
      FILTER_FETCH_CONSUMER: "/assignassignment/user/",
      ADD_USER: "/user",
      UPDATE_USER: "/user",
      DELETE_USER: "/user",

      UPDATE_USER_CLAIM: "/api/userClaim",
    },
  },
  ROLE: {
    API: {
      FETCH_ROLES: "/role",
      FETCH_ROLE_BY_ID: "/role",
      ADD_ROLE: "/role",
      UPDATE_ROLE: "/role",
      DELETE_ROLE: "/role",
    },
  },
  STATUS: {
    API: {
      FETCH_STATUS: "/status",
      FETCH_STATUS_BY_ID: "/status",
      ADD_STATUS: "/status",
      UPDATE_STATUS: "/status",
      DELETE_STATUS: "/status",
    },
  },
  CONTAINER: {
    API: {
      FETCH_CONTAINER: "/container",
      FETCH_CONTAINER_BY_ID: "/container",
      ADD_CONTAINER: "/container",
      UPDATE_CONTAINER: "/container",
      DELETE_CONTAINER: "/container",
      FETCH_COUNT: "/dashboard",
      FETCH_CONSUMER_TREND: "/dashboard/all",
      FETCH_VENDOR_TREND: "/dashboard/vendor/all",
      FETCH_CUSTOMER_TREND: "/dashboard/customer/all",
      FETCH_CONTAINER_COUNT: "/assignAssignment/",
      FETCH_CONTAINER_COUNT_FOR_ALLOCATE: "/count/",
    },
  },
  ASSIGN_CONTAINER: {
    API: {
      FETCH_CONTAINER: "/assignAssignment/allotedAssignments",
      FETCH_ASSIGN_CONTAINER_FOR_USER: "/receiveAssignment",
      FETCH_CONTAINER_ASSIGN_TO_VENDOR: "/consumerTransaction/",
      FETCHALL_CONTAINER_ASSIGN_TO_VENDOR: "/assignAssignment/",//
      FETCH_CONTAINER_ASSIGN_TO_CUSTOMER: "/consumerTransaction/",
      FETCH_ALL_CONTAINER_ASSIGN_TO_CUSTOMER: "/vendorTransaction/assign-by-me/",
      FETCH_CONTAINER_ASSIGN_TO_CUSTOMER_FOR_ADMIN : "/customerTransaction/",
      FETCH_ASSIGNED_CONTAINER_COUNT : "/assignAssignment/",
      FETCH_CONTAINER_ASSIGN_TO_CUSTOMER_FOR_DROP: "/vendorTransaction/",
      ASSIGN_CONTAINER_ASSIGN_TO_VENDOR: "/assignAssignment",
      DISPATCH_ASSIGNMENT: "/assignAssignment/dispatch/",
      RECEIVE_ASSIGNMENT: "/receiveAssignment/assignment/",
      GET_DETAIL_ASSIGNMENT: "/assignment/allAssignments/",
      GET_ASSIGNMENT_BY_ID: "/assignment/get",
      UPDATE_STATUS: "/api/status",
      DELETE_STATUS: "/api/status",
      ASSIGN_ASSIGNMENT_TO_CUSTOMER: "/api/",
      FETCH_CONTAINER_TRANSACTION: "/transaction/getAll",
      FETCH_ALL_ALERT_LATEST_TRANSACTION: "/assignAssignment/getAll/assignment",
      FETCH_USER_STOCK: "/user-stock",
      DELETE_ASSIGNMENT_TRANSACTION: "/assignment",
      FETCH_ASSIGNMENT_TRANSACTION_BY_ID: "/assignment",
    },
  },

  ALLOT_CONTAINER:{
    API: {
      FETCH_ALLOT_CONTAINER: "/transaction/allot-container",
      ADD_ASSIGNMENT: "/assignAssignment/assign",
    }
  },

  TRACKFLOW:{
    API:{
      FETCH_TRACK_FLOW: "/track/flow",
    }
  },
  TRANSACTION_MASTER : {
    API: {
      ADD_TRANSACTION: "/transaction",
      UPDATE_TRANSACTION: "/transaction",
      FETCH_CONTAINER_TRANSACTION: "/transaction/getAll",
      DELETE_TRANSACTION: "/transaction/" ,
      FETCH_TRANSACTION_BY_ID: "/transaction/", 
      FETCH_TRANSACTION_COUNT: "/transaction/count/" 
    }
  }
};
