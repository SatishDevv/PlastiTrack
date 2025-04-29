import { ENDPOINT } from "@/constant/endpoint.const";
import { RoleModel } from "@/interface/role.model";
import { axiosInstance } from "@/utils/axios.util";

export default class RoleService {
  static addRole = (param: RoleModel) => {
    return axiosInstance.post(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.ADD_ROLE,
      param
    );
  };
  static fetchRoleById = (param: String) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.FETCH_ROLE_BY_ID + "/" + param
    );
  };

  static updateRole = (param: RoleModel) => {
    return axiosInstance.put(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.UPDATE_ROLE + "/" + param?._id,
      param
    );
  };

  static deleteRoleById = (_id: any) => {
    return axiosInstance.delete(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.DELETE_ROLE + "/" + _id
    );
  };

  static fetchRole = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.FETCH_ROLES
    );
  };
}
