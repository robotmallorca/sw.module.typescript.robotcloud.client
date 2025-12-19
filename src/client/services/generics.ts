import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import { ServiceInstanceConfigClient } from "../../../types/services";

////
// Alert status interfaces
////

export interface ServiceTypeAlertStatusResponse<T extends string> {
  instance: string;
  time_mark: string;
  alert_status: Record<T, ServiceTypeAlertStatus>;
}
export interface ServiceTypeAlertStatus {
  acknowledged: boolean;
  ack_time: string;
  ack_user: string; // username
  active_time: string;
  deactive_time: string;
  activation_count: number;
}


export class GenericInstanceConfigClient<T> implements ServiceInstanceConfigClient<T> {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  get(
    project_id: string,
    instance_id: string
  ): Promise<AxiosResponse<T>> {
    return robotcloudApi.get<T>(
      `/projects/${project_id}/services/${this.serviceName}/instances/${instance_id}/configuration`
    );
  }

  put(
    project_id: string,
    instance_id: string,
    new_config: T
  ): Promise<AxiosResponse<T>> {
    return robotcloudApi.put<T>(
      `/projects/${project_id}/services/${this.serviceName}/instances/${instance_id}/configuration`,
      new_config
    );
  }
}

// export interface ServiceInstanceConfigClient<T> {
//   getAll(): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>>;
//   get(instance_id: string): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>>;
//   put(instance_id: string, status: Record<T, boolean>): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>>;
// }
// export class GenericInstanceConfigClient<T extends string>
//   implements ServiceInstanceConfigClient<T>
// {
//   private readonly serviceName: string;

//   constructor(serviceName: string) {
//     this.serviceName = serviceName;
//   }
//   getAll(
//   ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
//     return robotcloudApi.get<ServiceTypeAlertStatusResponse<T>>(
//       `/services/${this.serviceName}/alertstatus`
//     );
//   }

//   get(
//     instance_id: string
//   ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
//     return robotcloudApi.get<ServiceTypeAlertStatusResponse<T>>(
//       `/services/${this.serviceName}/instances/${instance_id}/alertstatus`
//     );
//   }

//   put(
//     instance_id: string,
//     status: Record<T, boolean>
//   ): Promise<AxiosResponse<ServiceTypeAlertStatusResponse<T>>> {
//     return robotcloudApi.put<ServiceTypeAlertStatusResponse<T>>(
//       `/services/${this.serviceName}/instances/${instance_id}/alertstatus`,
//       { status }
//     );
//   }
// }