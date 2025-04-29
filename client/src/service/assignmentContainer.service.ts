import { ENDPOINT } from "@/constant/endpoint.const";
import { AssignContainerModel } from "@/interface/assign.container";
import { axiosInstance } from "@/utils/axios.util";

export default class AssignmentContainerService {


  static updateAssignmentContainer = (param: {id:string}) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.ADD_ROLE + "/" + param?.id,
      param
    );
  };

  static fetchAssignContainer = (param : any) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER + "/" + param
    );
  };

  static fetchAssignContainerForUser = (param: any) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_ASSIGN_CONTAINER_FOR_USER + "/" + param
    );
  };

  static fetchAssignContainerById = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.GET_DETAIL_ASSIGNMENT +
        param
    );
  };

  static fetchAssignContainerByIdForUpdate = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.GET_ASSIGNMENT_BY_ID +
        "/" +
        param
    );
  };

  static fetchAssignedContainerToVendor = (param: AssignContainerModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_ASSIGN_TO_VENDOR +
        param
    );
  };

  static fetchAllAssignedContainerToVendor = (param: AssignContainerModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.FETCHALL_CONTAINER_ASSIGN_TO_VENDOR +
        param
    );
  };

  static addAssignContainerToVendor = (param: string) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.ASSIGN_CONTAINER_ASSIGN_TO_VENDOR,
      param
    );
  };

  static updateAssignContainerToVendor = (param: {id:string}) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.ADD_ROLE + "/" + param?.id,
      param
    );
  };

  static fetchAssignedContainerToCustomer = (param: AssignContainerModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_ASSIGN_TO_CUSTOMER + param
    );
  };

  static fetchAssignContainerToCustomerForDropdown = (param: AssignContainerModel) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_ASSIGN_TO_CUSTOMER_FOR_DROP + param
    );
  };

  static addAssignContainerToCustomer = (param: string) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.ASSIGN_ASSIGNMENT_TO_CUSTOMER,
      param
    );
  };

  static updateAssignContainerToCustomer = (param: {id:string}) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.ASSIGN_ASSIGNMENT_TO_CUSTOMER + "/" + param?.id,
      param
    );
  };

  static fetchAssignedContainerToCustomerForList = (param: AssignContainerModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.FETCH_ALL_CONTAINER_ASSIGN_TO_CUSTOMER +
        param
    );
  };

  // fetch api assign to admin ( for drop )

  static fetchAssignedContainerToCustomerForAdmin = (param: AssignContainerModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_ASSIGN_TO_CUSTOMER_FOR_ADMIN +
        param
    );
  };

  
  static fetchAssignedContainerCount = (param: AssignContainerModel) => {
    const { containerTransactionId, roleName, loginId } = param; // Destructure params
  
    return axiosInstance.get(
      `${ENDPOINT.API_BASE_URL}${ENDPOINT.ASSIGN_CONTAINER.API.FETCH_ASSIGNED_CONTAINER_COUNT}/${containerTransactionId}/${roleName}/${loginId}`
    );
  };
  

  static fetchContainerTransaction = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_TRANSACTION
    );
  };

  static fetchAllAlertLatestTransaction = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_ALL_ALERT_LATEST_TRANSACTION
    );
  };
  static fetchAllCountTransaction = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_COUNT
    );
  };

  static dispatchAssignmentForConsumer = (param: {_id:string}) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.DISPATCH_ASSIGNMENT +  param._id
    );
  };

  static receiveAssignmentForConsumer = (param: {_id:string}) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.RECEIVE_ASSIGNMENT +  param._id
    );
  };

  static fetchUserStock = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_USER_STOCK
    );
  };

  static deleteTransactionAssignmentById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.DELETE_ASSIGNMENT_TRANSACTION + "/" + _id
    );
  };

  static fetchAssignmentTransactionById = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ASSIGN_CONTAINER.API.FETCH_ASSIGNMENT_TRANSACTION_BY_ID +
        "/" +
        param
    );
  };

}
