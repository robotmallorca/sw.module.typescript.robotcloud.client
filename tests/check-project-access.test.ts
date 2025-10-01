import { robotCloudPermissionsHelper } from "helpers";

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

test("Allowed access", async () => {
  const prjId = "prj-1";
  const reqProjectAccess = "RESTRICTED";

  const result = await robotCloudPermissionsHelper.checkProjectAccess(
    prjId,
    reqProjectAccess
  );
  expect(result).toBe(true);
});

test("Forbidden access", async () => {
  const prjId = "prj-1";
  const reqProjectAccess = "ADVANCED";

  const result = await robotCloudPermissionsHelper.checkProjectAccess(
    prjId,
    reqProjectAccess
  );
  expect(result).toBe(false);
});
