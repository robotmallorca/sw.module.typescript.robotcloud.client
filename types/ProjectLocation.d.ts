export interface ProjectLocations {
    id: string
    name: string
}

export interface RobotCloudLocationCreate {
  name: string
  description?: string;
  tags?: string[];
}

export interface RobotCloudLocationModify {
  name?: string
  description?: string;
  tags?: string[];
}

export interface RobotCloudLocationDetails {
  id: string;
  name: string;
  description?: string;
  project: string;
  tags?: string[];
}