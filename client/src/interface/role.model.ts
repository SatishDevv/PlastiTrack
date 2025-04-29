export interface IRoleModel {
  _id?: string;
  roleName: string;
}

export class RoleModel {
  _id?: string;
  roleName: string;

  constructor() {
    this._id = undefined;
    this.roleName = "";
  }
}

export class RoleFormModel extends RoleModel {
  isError: {
    id: string;
    roleName: string;
  };
  fieldName: {
    _id: string;
    roleName: string;
  };

  constructor() {
    super();

    this.isError = {
      id: "",
      roleName: "",
    };
    this.fieldName = {
      _id: "_id",
      roleName: "roleName",
    };
  }
}

export interface IRoleRequestModel {
  roleName?: string;
  type?:string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class RoleAppStore {
  list: {
    result: IRoleModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: IRoleModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: IRoleModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: IRoleModel | null | undefined;
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
