export interface containerAssignmentArray {
  _id: string;
  containerId: string;
  consumerId: string;
  vendorName: string;
  statusTypeId: string;
  status: string;
  quantity: string;
  inStock?: string;
  createdById: string;
  createdByName?: string;
  AssignContainerModel?:number;
}

export interface IAssignContainerModel {
  _id?: string;
  containerId: string;
  containerName: string;
  containerSize: string;
  consumerId: string;
  vendorId: string;
  vendorName: string;
  statusTypeId: string;
  status: string;
  quantity: string;
  createdById: string;
  createdByName: string;
  assignQuantity?: number;
  totalInStock?: string;
  totalInWord?: string;
  totalOutWord?: string;
  totalContainer?: string;
  activeTransactions?: string;
}

export class AssignContainerModel {
  _id?: string;
  fromUser?: string;
  toUser?: string;
  loginId?: string;
  consumerId?: string;
  containerId?: string;
  containerName?: string;
  containerSize?: string;
  firstName?: string;
  statusTypeId?: string;
  status?: string;
  quantity?: string;
  inStock?: string;
  createdById?: string;
  createdByName?: string;
  containerTransactionId?: string;
  assignQuantity?: number;
  roleName?: string;
  remainingStock?: string;
  transactionId?: string;
  createdAt?: string;
  isChecked?: boolean;
  uploadDocument?: string;
  ETA?: string;
  ETD?: string;
  comments?: string;
  modeOfTransport?: string;
  transportationName?: string;
  transactionName?: string;
  vehicleNumber?: string;
  POC_Name?: string;
  POC_MobileNumber?: string;
  returnDeadlineDate?: string;
  containerImages?: string;
  totalInStock?: string;
  totalInWord?: string;
  totalOutWord?: string;
  totalContainer?: string;
  isActive?: boolean;
  role?: string;
  activeTransactions?: string;
  constructor() {
    this._id = undefined;
    this.consumerId = "";
    this.containerId = "";
    this.containerName = "";
    this.containerSize = "";
    this.status = "";
    this.statusTypeId = "";
    this.quantity = "";
    this.createdById = "";
    this.createdByName = "";  
    this.uploadDocument = "";
    this.ETA = "";
    this.ETD = "";
    this.comments = "";
    this.modeOfTransport = "";
    this.transportationName = "";
    this.vehicleNumber = "";
    this.POC_Name = "";
    this.POC_MobileNumber = "";
    this.returnDeadlineDate = "";
    this.containerImages = "";
  }
}

export class AssignContainerFormModel extends AssignContainerModel {
  isError: {
    _id: string;
    containerId: string;
    containerName: string;
    status: string;
    statusTypeId: string;
    quantity: string;
    createdById: string;
    createdByName: string;
    isActive: boolean;
  };
  fieldName: {
    _id: string;
    containerId: string;
    containerName: string;
    status: string;
    statusTypeId: string;
    quantity: string;
    createdById: string;
    createdByName: string;
  };

  constructor() {
    super();

    this.isError = {
      _id: "",
      containerId: "",
      containerName: "",
      status: "",
      statusTypeId: "",
      quantity: "",
      createdById: "",
      createdByName: "",
      isActive: false,
    };
    this.fieldName = {
      _id: "id",
      containerId: "containerId",
      containerName: "containerName",
      status: "status",
      statusTypeId: "statusTypeId",
      quantity: "quantity",
      createdById: "createdById",
      createdByName: "createdByName",
    };
  }
}

export interface IAssignContainerRequestModel {
  tenantId?: string;
  name: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class AssignContainerAppStore {
  list: {
    result: AssignContainerModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: AssignContainerModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: AssignContainerModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: AssignContainerModel | null | undefined;
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
