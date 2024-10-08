import * as robotCloudClient from "robotCloudClient";
import { RobotCloudPermissionsHelper } from "../../types/helpers";
import { 
    AppAccessLevel, 
    ProjectAccessLevel, 
    RobotCloudProjectDetails 
} from "../../types/RobotCloudClient";

/**
 * Helper of robotcloud permissions
 * 
 * > IMPORTANT! Don't place here any important logic. Only functions that might be used in frontend.
 */
class RobotCloudPermissionsHelperImpl implements RobotCloudPermissionsHelper {

    public async checkProjectAccess(prjId: string, required_project_access: ProjectAccessLevel): Promise<boolean> {

        const { data: project} = await robotCloudClient.getProjectDetails(prjId)
        if (project.access_level == required_project_access) {
            return true
        }
        
        return this.hasAccessLevel(project, required_project_access)
    }

    public hasAccessLevel(project: RobotCloudProjectDetails, required_project_access: ProjectAccessLevel) {

        switch (required_project_access) {
            case 'ADVANCED':
                return project.access_level == 'ADVANCED'
            case 'BASIC':
                return project.access_level == 'BASIC' || project.access_level == 'ADVANCED'
            case 'RESTRICTED':
                return project.access_level == 'RESTRICTED' || project.access_level == 'BASIC' || 
                        project.access_level == 'ADVANCED'
            case 'BLOCKED':
                return true   
            default:
                return false
        }
    }

    public hasAppAccessLevel(project: RobotCloudProjectDetails, required_application_access: AppAccessLevel): boolean {
        switch (required_application_access) {
            case 'ADMIN':
                return project.app_access_level == 'ADMIN'
            case 'ADVANCED':
                return project.app_access_level == 'ADVANCED' || project.app_access_level == 'ADMIN'
            case 'STANDARD':
                return project.app_access_level == 'STANDARD' || project.app_access_level == 'ADVANCED' || 
                        project.app_access_level == 'ADMIN'
            case 'BLOCKED':
                return true   
            default:
                return false
        }
    }
}

export const robotCloudPermissionsHelper: RobotCloudPermissionsHelper = new RobotCloudPermissionsHelperImpl()