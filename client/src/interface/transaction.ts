export interface ITransactionModel {
    _id?: string;
    transactionId?: string;
    createdAt?: string;
    containerId?: string;
    containerQuantity: string;
    createdBy : string;
    status?: string;
    transaction?: string;
    isAssigned?: boolean;
    totalQuantity?: string;
    completedOn?: string;
  }
  
  export class TransactionModel {
    _id?: string;
    containerId?: string;
    containerQuantity?: string;
    containerName? : string;
    containerSize? : string;
    createdBy? : string;
    remainingStock? : number;
    createdAt? : string;
    transactionId?: string;
    isActive?: boolean;
    transaction?: string;
    isAssigned?: boolean;
    // totalQuantity?: string;
  
    constructor() {
      this._id = undefined;
      this.containerId = "";
      this.remainingStock= 0;
      this.containerQuantity = "";
      this.createdBy  = "";
      // this.totalQuantity = "";
    }
  }
  
  export class TransactionFormModel extends TransactionModel {
    isError: {
      id: string;
      containerId: string;
      containerQuantity: string;
      createdBy: string;
    };
    fieldName: {
      _id: string;
      containerId: string;
      containerQuantity: string;
      createdBy: string;
    };
  
    constructor() {
      super();
  
      this.isError = {
        id: "",
        containerId: "",
        containerQuantity: "",
        createdBy: "",
      };
      this.fieldName = {
        _id: "_id",
        containerId: "containerId",
        containerQuantity: "containerQuantity",
        createdBy: "createdBy",
      };
    }
  }
  
  export interface ITransactionRequestModel {
    Fields: string;
    OrderBy: string;
    PageSize: number;
    Skip: number;
    SearchQuery: string;
  }
  
  export class TransactionAppStore {
    list: {
      result: ITransactionModel[] | null | undefined;
      pending: boolean;
      error: any[];
    };
    view: {
      result: ITransactionModel[] | null | undefined;
      pending: boolean;
      error: any[];
    };
    update: {
      result: ITransactionModel | null | undefined;
      pending: boolean;
      error: any[];
    };
    delete: {
      result: ITransactionModel | null | undefined;
      pending: boolean;
      error: any[];
    };
  
    constructor() {
      this.list = {
        result: null,
        pending: false,
        error: [],
      };
      this.view = {
        result: null,
        pending: false,
        error: [],
      };
      this.update = {
        result: null,
        pending: false,
        error: [],
      };
      this.delete = {
        result: null,
        pending: false,
        error: [],
      };
    }
  }
  
  //#endregion
  