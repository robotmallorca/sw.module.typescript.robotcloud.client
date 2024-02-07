export interface ProjectTagTreeNode {
  tag: ProjectTag;
  children: ProjectTagTreeNode[];
}

export interface ProjectTagsTree {
  root: ProjectTagTreeNode[]
}

export interface ProjectTag {
  id: string;
  name: string;
  parent_id: string;
}
