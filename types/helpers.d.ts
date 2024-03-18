import { ProjectAccessLevel, RobotCloudProjectDetails } from "./RobotCloudClient";

export interface RobotCloudPermissionsHelper {
    checkProjectAccess(prjId: string, required_project_access: ProjectAccessLevel): Promise<boolean>;
    hasAccessLevel(project: RobotCloudProjectDetails, required_project_access: ProjectAccessLevel): boolean;
}
