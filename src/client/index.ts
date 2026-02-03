import robotcloudApi from "robotCloudApi";
import { LoginClient, LoginClientImpl } from "./login";
import { AlertsClientImpl } from "./alerts";
import { OrganizationsClient } from "./organizations";
import { UsersClient } from "./users";
import { AlertsClient } from "../../types/alerts";
import { ApplicationsClient } from "./applications";

export * from "./services"
export * from "./projects"
export { OrganizationsClient } from "./organizations"
export { UsersClient } from "./users"
export { LoginClient } from "./login"
export { ApplicationsClient } from "./applications"

export const applicationsClient: ApplicationsClient = new ApplicationsClient(robotcloudApi);
export const loginClient: LoginClient = new LoginClientImpl(robotcloudApi);
export const alertsClient: AlertsClient = new AlertsClientImpl(robotcloudApi);
export const organizationsClient: OrganizationsClient = new OrganizationsClient(robotcloudApi);
export const usersClient: UsersClient = new UsersClient(robotcloudApi);
