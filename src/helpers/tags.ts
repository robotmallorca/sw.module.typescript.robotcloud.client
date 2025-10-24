import { useLogger } from "utils/logger";;
import { ProjectTagRequestParams } from "../../types/RobotCloudClient";
import { tagsClient, TagsClient } from '../client/projects/tags';
import {
  ProjectTagTreeNode,
  ProjectTagsTree,
} from "../../types/ProjectTag";

const logger = useLogger("tags-helper");

export class TagsHelper {
  private tagsClient: TagsClient;

  constructor(tagsClient: TagsClient) {
    this.tagsClient = tagsClient;
  }

  public getTagsTree = async (
    prjId: string,
    maxDepth: number = 2,
    params?: ProjectTagRequestParams
  ): Promise<ProjectTagsTree> => {
    logger.info(`Get project ${prjId} tags tree`);
    if (!params) {
      params = {} as ProjectTagRequestParams;
    }
    params.no_parent = true;

    const tags = await this.getTagsChildren(
      prjId,
      0,
      undefined,
      undefined,
      maxDepth
    );
    return { root: tags } as ProjectTagsTree;
  };

  public getTagsChildren = async (
    prjId: string,
    level: number = 0,
    parent_id?: string,
    params?: ProjectTagRequestParams,
    maxDepth?: number
  ): Promise<ProjectTagTreeNode[]> => {
    logger.debug(`Get project ${prjId} tags children: ${parent_id}`);
    if (!params) {
      params = {} as ProjectTagRequestParams;
    }
    params.no_parent = !parent_id;
    params.parent_tag = parent_id;

    const tags = await this.tagsClient.getTags(prjId, params);
    if (tags.data.length == 0) {
      return [];
    }

    const response: ProjectTagTreeNode[] = [];
    const requests: any[] = [];
    for (let i = 0; i < tags.data.length; i++) {
      const element = tags.data[i];
      const node = {
        tag: element,
      } as ProjectTagTreeNode;
      response.push(node);
      if (maxDepth && level < maxDepth) {
        requests.push(
          this.getTagsChildren(prjId, level + 1, element.id, params, maxDepth)
        );
      }
    }

    const responses = await Promise.all(requests);
    let i = 0;
    responses.forEach((element) => {
      response[i].children = element;
      i++;
    });

    return response;
  };
}
