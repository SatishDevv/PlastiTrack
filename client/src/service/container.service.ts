import { ENDPOINT } from "@/constant/endpoint.const";
import { ContainerModel } from "@/interface/container";
import { axiosInstance } from "@/utils/axios.util";

export default class ContainerService {
  static addContainer = (param: ContainerModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.ADD_CONTAINER,
      param
    );
  };

  static fetchContainerById = (param: String) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.CONTAINER.API.FETCH_CONTAINER_BY_ID +
        "/" +
        param
    );
  };
  static deleteContainerById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.CONTAINER.API.DELETE_CONTAINER +
        "/" +
        _id
    );
  };

  static updateContainer = (param: ContainerModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.CONTAINER.API.UPDATE_CONTAINER +
        "/" +
        param?._id,
      param
    );
  };

  static fetchContainer = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_CONTAINER
    );
  };

  static fetchConsumerTrend = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_CONSUMER_TREND 
    );
  };

  static fetchVendorTrend = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_VENDOR_TREND 
    );
  };

  static fetchCustomerTrend = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_CUSTOMER_TREND 
    );
  };

  static fetchContainerCount = (containerId: string) => {
    console.log(containerId);
    
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.TRANSACTION_MASTER.API.FETCH_TRANSACTION_COUNT + containerId  
    );
  };

  static fetchContainerCountForAllocate = (transactionId: string, userId: string) => {
    console.log(transactionId, userId);
    
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.CONTAINER.API.FETCH_CONTAINER_COUNT_FOR_ALLOCATE + transactionId + "/" + userId 
    );
  };
}
