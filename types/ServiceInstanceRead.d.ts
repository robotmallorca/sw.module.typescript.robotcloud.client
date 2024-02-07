export interface ServiceInstanceRead<T> {
    instance: string;
    time_mark: string;
    value: T;
}