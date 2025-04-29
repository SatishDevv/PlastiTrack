export interface IStatusModel {
  _id?: string;
  statusType: string;
  statusCode: string;
}

export class StatusModel {
  _id?: string;
  statusCode: string;
  statusType: string;

  constructor() {
    this._id = undefined;
    this.statusType = "";
    this.statusCode = "";
  }
}

export class StatusFormModel extends StatusModel {
  isError: {
    id: string;
    statusCode: string;
    statusType: string;
  };
  fieldName: {
    _id: string;
    statusCode: string;
    statusType: string;
  };

  constructor() {
    super();

    this.isError = {
      id: "",
      statusCode: "",
      statusType: "",
    };
    this.fieldName = {
      _id: "_id",
      statusCode: "statusCode",
      statusType: "statusType",
    };
  }
}

export interface IStatusRequestModel {
  statusCode?: string;
  type: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class StatusAppStore {
  list: {
    result: StatusModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: StatusModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: StatusModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: StatusModel | null | undefined;
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
