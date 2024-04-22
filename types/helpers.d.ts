import { AppAccessLevel, ProjectAccessLevel, RobotCloudProjectDetails } from "./RobotCloudClient";

export interface RobotCloudPermissionsHelper {
    checkProjectAccess(prjId: string, required_project_access: ProjectAccessLevel): Promise<boolean>;
    hasAccessLevel(project: RobotCloudProjectDetails, required_project_access: ProjectAccessLevel): boolean;
    hasAppAccessLevel(project: RobotCloudProjectDetails, required_application_access: AppAccessLevel): boolean;
}
