import { ENDPOINT } from "@/constant/endpoint.const";
import {
  AuthenticationModel,
  IAuthenticationRequestModel,
} from "@/interface/auth.model";
import { axiosInstance } from "@/utils/axios.util";
import {
  AUTH_INFO_KEY,
  BEARER_TOKEN_KEY,
} from "../constant/global-contants/global-key.const";

export default class AuthService {
  static authenticateUser = (params: IAuthenticationRequestModel) => {
    console.log(params);
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.AUTH.API.login,
      params
    );
  };

  static getAccessToken = () => {
    return localStorage.getItem(BEARER_TOKEN_KEY);
  };

  /**
   * GET Auth
   */
  static getAuthDetail = (): AuthenticationModel => {
    const userDetail = localStorage.getItem(AUTH_INFO_KEY);
    if (userDetail) {
      return JSON.parse(userDetail);
    } else {
      return new AuthenticationModel();
    }
  };

  /**
   * SET Auth
   */
  static setAuthDetail = (response: any) => {
    console.log(response);
    
    localStorage.setItem(BEARER_TOKEN_KEY, response?.bearerToken);
    localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(response));
  };

    static forgetPassowrd = (param: AuthenticationModel) => {
      return axiosInstance.post(
        ENDPOINT.API_BASE_URL + ENDPOINT.AUTH.API.resetPassword,
        param
      );
    };

  static logoutUser = (): void => {
    return localStorage.clear();
  };
}
