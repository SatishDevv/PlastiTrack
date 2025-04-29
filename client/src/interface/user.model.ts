export interface IUserModel {
  _id?: string;
  firstName?: string;
  lastName?: string;
  contactNo?: string;
  email?: string;
  password?: string;
  city?: string;
  state?: string;
  GSTNO?: string;
  responsiblePersonName?: string;
  responsiblePersonContactNo?: string;
  responsiblePersonEmailId?: string;
  roleId?: string;
  roleName?: string;
  consumerId?: string;
}

export class UserModel {
  _id?: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  roleId: string;
  roleName: string;
  password?: string;
  city?: string;
  state?: string;
  GSTNO?: string;
  responsiblePersonName?: string;
  responsiblePersonContactNo?: string;
  responsiblePersonEmailId?: string;
  consumerId?: string;

  constructor() {
    this._id = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.city = "";
    this.state = "";
    this.GSTNO = "";
    this.responsiblePersonName = "";
    this.responsiblePersonContactNo = "";
    this.responsiblePersonEmailId = "";
    this.roleId = "";
    this.roleName = "";
    this.consumerId = "";
    this.contactNo = "";
  }
}

export class UserFormModel extends UserModel {
  isError: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    state: string;
    GSTNO: string;
    responsiblePersonName: string;
    responsiblePersonContactNo: string;
    responsiblePersonEmailId: string;
    roleId: string;
    roleName: string;
    consumerId: string;
    contactNo: string;
  };
  fieldName: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    state: string;
    GSTNO: string;
    responsiblePersonName: string;
    responsiblePersonContactNo: string;
    responsiblePersonEmailId: string;
    roleId: string;
    roleName: string;
    consumerId: string;
    contactNo: string;
  };

  constructor() {
    super();

    this.isError = {
      id: "",
      firstName: "",
      lastName: "",
      password: "",
      responsiblePersonEmailId: "",
      email: "",
      responsiblePersonContactNo: "",
      responsiblePersonName: "",
      GSTNO: "",
      city: "",
      state: "",
      consumerId: "",
      contactNo: "",
      roleId: "",
      roleName: "",
    };
    this.fieldName = {
      _id: "_id",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      password: "password",
      GSTNO: "GSTNO",
      responsiblePersonContactNo: "responsiblePersonContactNo",
      responsiblePersonEmailId: "responsiblePersonEmailId",
      responsiblePersonName: "responsiblePersonName",
      consumerId: "consumerId",
      contactNo: "contactNo",
      city: "city",
      state: "state",
      roleId: "roleId",
      roleName: "roleName",
    };
  }
}

export interface IUserRequestModel {
  statusCode?: string;
  type: string;
  Fields: string;
  OrderBy: string;
  PageSize: number;
  Skip: number;
  SearchQuery: string;
}

export class UserAppStore {
  list: {
    result: UserModel[] | null | undefined;
    pending: boolean;
    error: any[];
  };
  view: {
    result: UserModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  update: {
    result: UserModel | null | undefined;
    pending: boolean;
    error: any[];
  };
  delete: {
    result: UserModel | null | undefined;
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
