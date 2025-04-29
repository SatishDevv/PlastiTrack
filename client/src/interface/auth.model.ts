/**
 * @Rulebook
 * Interface name should have prefix - `I` & suffix - `Model`.
 * example: IClaimModel
 */
export interface IClaimModel {
  claimType: string;
  claimValue: boolean;
}

export class AuthenticationModel {
  _id: string;
  email?: string;
  success?: boolean;
  firstName: string;
  lastName: string;
  roleId: string;
  roleName: string;
  bearerToken: string;
  isAuthenticated: boolean;

  /**
   *
   */
  constructor() {
    this._id = "";
    this.email = "";
    this.lastName = "";
    this.firstName = "";
    this.roleId = "";
    this.roleName = "";
    this.bearerToken = "";
    this.isAuthenticated = false;
  }
}

export interface IAuthenticationRequestModel {
  email?: string;
  password?: string;
  success?: boolean;
}
