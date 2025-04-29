import { ENDPOINT } from "@/constant/endpoint.const";
import { TransactionModel } from "@/interface/transaction";
import { axiosInstance } from "@/utils/axios.util";

export default class TransactionMasterService {

      static updateTransaction = (param: TransactionModel) => {
        return axiosInstance.put(
          ENDPOINT.API_BASE_URL + ENDPOINT.TRANSACTION_MASTER.API.UPDATE_TRANSACTION + "/" + param?._id,
          param
        );
      };
        static addTransaction = (param: TransactionModel) => {
          return axiosInstance.post(
            ENDPOINT.API_BASE_URL + ENDPOINT.TRANSACTION_MASTER.API.ADD_TRANSACTION,
            param
          );
        };

        static fetchContainerTransaction = () => {
            return axiosInstance.get(
              ENDPOINT.API_BASE_URL + ENDPOINT.ASSIGN_CONTAINER.API.FETCH_CONTAINER_TRANSACTION
            );
          };
  
          static deleteTransactionMasterById = (_id: any) => {
            return axiosInstance.delete(
              ENDPOINT.API_BASE_URL + ENDPOINT.TRANSACTION_MASTER.API.DELETE_TRANSACTION + "/" + _id
            );
          };

          static fetchTransactionMasterById = (param: String) => {
            return axiosInstance.get(
              ENDPOINT.API_BASE_URL + ENDPOINT.TRANSACTION_MASTER.API.FETCH_TRANSACTION_BY_ID + "/" + param
            );
          };
}