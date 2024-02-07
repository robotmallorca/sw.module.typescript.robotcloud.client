import { ServiceInstanceRead } from "./ServiceInstanceRead";

export interface ServiceDataMeasurement<T> extends ServiceInstanceRead<T> {
    status: "GOOD"|"NOT_MEASURED"|"INVALID_VALUE"|"DEVICE_ERROR";
}