import { OrganizationAccessLevel, ProjectAccessLevel } from "./RobotCloudClient";

export interface TokenResponse {
  token: string;
  expiration: string; // ISO 8601 date string (YYYY-MM-DDTHH:MM:SS.SSSZ)
}
export interface SessionTokenResponse {
  access: TokenResponse;
  renew: TokenResponse;
}
export interface CheckTokenResponse {
  renewed: boolean;
  invalid: boolean;
  access: string;
  renew: string;
}

export interface RobotCloudJWTPayload {
  oac: OrganizationAccessLevel; // Organization Access Level
  sub: string; // username
  aud: string; // audience (app api key id)
  aac: ProjectAccessLevel; // Default project Access Level
  org: string; // organization
  exp: number;
}

export interface RobotCloudRenewJWTPayload {
  sub: string; // username
  aud: string; // audience (app api key id)
  exp: number;
}