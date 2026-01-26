export interface Classifier {
    id: string;
    name: string;
    description?: string;
}

export interface ClassifierCreate {
    name: string
    description?: string
}

export interface ClassifierModify {
    name?: string
    description?: string
}

export interface ClassifierDetails extends Classifier {
}
