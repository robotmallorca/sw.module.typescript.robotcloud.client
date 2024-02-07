import { ProjectAccessLevel } from "./RobotCloudClient";

export interface RobotCloudPermissionsHelper {
    checkProjectAccess(prjId: string, required_project_access: ProjectAccessLevel): Promise<boolean>;
}
