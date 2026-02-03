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
  exp: number;
  sub: string; // username
  org: string; // organization
}