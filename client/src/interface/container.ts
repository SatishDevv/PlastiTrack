export interface IContainerModel {
  _id?: string;
  containerName: string;
  containerSize: string;
  remainingStock?: number;
  inStock: string;
  adminName: string;
  containerId?: string;
  userId?: string | null;
}

export class ContainerModel {
  _id?: string;
  containerName: string;
  containerSize: string;
  inStock: string;
  remainingStock: string
  qrCode?: string;
 


  constructor() {
    this._id = undefined;
    this.containerName = "";
    this.containerSize = "";
    this.inStock = "";
    this.remainingStock = ""
  }
}

export class ContainerFormModel extends ContainerModel {
  isError: {
    id: string;
    containerName: string;
    containerSize: string;
    inStock: string;
    remainingStock: string

  };
  fieldName: {
    _id: string;
    containerName: string;
    containerSize: string;
    inStock: string;
    remainingStock: string

  };

  constructor() {
    super();

    this.isError = {
      id: "",
      containerName: "",
      containerSize: "",
      inStock: "",
      remainingStock: ""
    };
    this.fieldName = {
      _id: "_id",
      containerName: "containerName",
      containerSize: "containerSize",
      inStock: "inStock",
      remainingStock: "remainingStock"

    };
  }
}

export interface IContainerRequestModel {
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class ContainerAppStore {
  list: {
    result: ContainerModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: ContainerModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: ContainerModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: ContainerModel | null | undefined;
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
