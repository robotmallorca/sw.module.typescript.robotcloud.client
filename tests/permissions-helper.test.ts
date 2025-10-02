import { robotCloudPermissionsHelper } from "helpers";
import { projectsClient } from '../src/client/projects'
import { RobotCloudProjectDetails } from "index";

jest.mock("../src/client/projects", () => {
  return {
    projectsClient: {
      getProjectDetails: jest.fn(
        () =>
          new Promise((resolve, reject) => {
            resolve({ data: { access_level: "BASIC" } });
          })
      ),
    },
  };
});

describe('Check project access', () => {
  it("Has allowed access", async () => {
    const prjId = "prj-1";
    const reqProjectAccess = "RESTRICTED";

    const result = await robotCloudPermissionsHelper.checkProjectAccess(
      prjId,
      reqProjectAccess
    );
    expect(result).toBe(true);
  });

  it("Has forbidden access", async () => {
    const prjId = "prj-1";
    const reqProjectAccess = "ADVANCED";

    const result = await robotCloudPermissionsHelper.checkProjectAccess(
      prjId,
      reqProjectAccess
    );
    expect(result).toBe(false);
  });
})

describe('Has access level', () => {
  it('Has access', () => {
    const project: RobotCloudProjectDetails = { access_level: 'BASIC'} as RobotCloudProjectDetails
    const result = robotCloudPermissionsHelper.hasAccessLevel(project, 'RESTRICTED')

    expect(result).toBeTruthy()
  })
  it('Not has access', () => {
    const project: RobotCloudProjectDetails = { access_level: 'BASIC'} as RobotCloudProjectDetails
    const result = robotCloudPermissionsHelper.hasAccessLevel(project, 'ADVANCED')

    expect(result).toBeFalsy()
  })
})

describe('Has app access level', () => {
  it('Has access', () => {
    const project: RobotCloudProjectDetails = { app_access_level: 'STANDARD'} as RobotCloudProjectDetails
    const result = robotCloudPermissionsHelper.hasAppAccessLevel(project, 'STANDARD')

    expect(result).toBeTruthy()
  })
  it('Not has access', () => {
    const project: RobotCloudProjectDetails = { app_access_level: 'STANDARD'} as RobotCloudProjectDetails
    const result = robotCloudPermissionsHelper.hasAppAccessLevel(project, 'ADVANCED')

    expect(result).toBeFalsy()
  })
})
