import { ENDPOINT } from "@/constant/endpoint.const";
import { TransactionModel } from "@/interface/transaction";
import { axiosInstance } from "@/utils/axios.util";

export default class AllotContainerService {
    
  static fetchAllotContainer = (param: TransactionModel) => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL +
        ENDPOINT.ALLOT_CONTAINER.API.FETCH_ALLOT_CONTAINER +
        "/" +
        param
    );
  };

    static addAssignmentContainer = (param: string) => {
      return axiosInstance.post(
        ENDPOINT.API_BASE_URL + ENDPOINT.ALLOT_CONTAINER.API.ADD_ASSIGNMENT,
        param
      );
    };

    static updateAssignmentContainer = (param: {id: string}) => {
      return axiosInstance.put(
        ENDPOINT.API_BASE_URL + ENDPOINT.ROLE.API.ADD_ROLE + "/" + param?.id,
        param
      );
    };
}
