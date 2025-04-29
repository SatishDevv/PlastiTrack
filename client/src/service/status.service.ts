import { ENDPOINT } from "@/constant/endpoint.const";
import { StatusModel } from "@/interface/status.model";
import { axiosInstance } from "@/utils/axios.util";

export default class StatusService {
  static addStatus = (param: StatusModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.STATUS.API.ADD_STATUS,
      param
    );
  };
    static fetchStatusById = (param: String) => {
      return axiosInstance.get(
        ENDPOINT.API_BASE_URL +
          ENDPOINT.STATUS.API.FETCH_STATUS_BY_ID +
          "/" +
          param
      );
    };

  static updateStatus = (param: StatusModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.STATUS.API.UPDATE_STATUS +
        "/" +
        param?._id,

      param
    );
  };
  static fetchStatus = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.STATUS.API.FETCH_STATUS
    );
  };

  static deleteStatusById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.STATUS.API.DELETE_STATUS + "/" + _id
    );
  };
}
