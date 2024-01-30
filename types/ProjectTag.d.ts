interface ProjectTagTreeNode {
  tag: ProjectTag;
  children: ProjectTagTreeNode[];
}

interface ProjectTagsTree {
  root: ProjectTagTreeNode[]
}

interface ProjectTag {
  id: string;
  name: string;
  parent_id: string;
}
