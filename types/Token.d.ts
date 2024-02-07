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