export interface ITrackFlowModel {
    _id?: string;
    transactionId?: string;
    createdAt?: string;
    containerId: string;
    containerQuantity: string;
    createdBy : string;
    status?: string;
    transaction?: string;
  }
  
  export class TrackFlowModel {
    _id?: string;
    containerId: string;
    containerQuantity: string;
    containerName? : string;
    containerSize? : string;
    createdBy? : string;
    remainingStock? : string;
    createdAt? : string;
    transactionId?: string;
    isActive?: boolean;
    transaction?: string;
    isAssigned?: boolean;
  
    constructor() {
      this._id = undefined;
      this.containerId = "";
      this.containerQuantity = "";
      this.createdBy  = "";
    }
  }
  
  export class TrackFlowFormModel extends TrackFlowModel {
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
  
  export interface ITrackFlowRequestModel {
    Fields: string;
    OrderBy: string;
    PageSize: number;
    Skip: number;
    SearchQuery: string;
  }
  
  export class TrackFlowAppStore {
    list: {
      result: ITrackFlowModel[] | null | undefined;
      pending: boolean;
      error: any[];
    };
    view: {
      result: ITrackFlowModel[] | null | undefined;
      pending: boolean;
      error: any[];
    };
    update: {
      result: ITrackFlowModel | null | undefined;
      pending: boolean;
      error: any[];
    };
    delete: {
      result: ITrackFlowModel | null | undefined;
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

  