import { PaginableRequestParams } from "./RobotCloudClient";

export interface ProjectClassifiersRequestParams extends PaginableRequestParams {

}

export interface Classifier {
    id: string;
    name: string;
    description: string;
}

export interface ClassifierDetails extends Classifier {
}
