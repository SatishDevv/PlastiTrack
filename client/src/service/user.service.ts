import { ENDPOINT } from "@/constant/endpoint.const";
import { UserModel } from "@/interface/user.model";
import { axiosInstance } from "@/utils/axios.util";

export default class UserService {
  static addUser = (param: UserModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.ADD_USER,
      param
    );
  };
  static fetchUserById = (param: string) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.FETCH_USER_BY_ID + "/" + param
    );
  };

  static updateUser = (param: UserModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.UPDATE_USER + "/" + param?._id,
      param
    );
  };

  static filterUserBaseOnRole = (param: UserModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.FILTER_FETCH_USER + param
    );
  };

  static filterConsumer = (param: UserModel) => {
    // console.log(param);

    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.FILTER_FETCH_CONSUMER + param
    );
  };

  static fetchUser = () => {
    // console.log(param);
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.FETCH_USER
    );
  };

  static deleteUserById = (id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.USER.API.DELETE_USER + "/" + id
    );
  };
}
