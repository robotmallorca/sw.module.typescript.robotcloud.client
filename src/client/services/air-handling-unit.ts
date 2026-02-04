import type { AxiosResponse } from "axios";

import robotcloudApi from "robotCloudApi";
import {
  AirHandlingUnit1AlertEventValue,
  AirHandlingUnit1DataEventValue,
  HistoricAggregateFunction,
  ServiceDataMeasurement,
} from "../../../types/services";
import { AirHandlingUnitConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class AirHandlingUnitConfigClient extends GenericInstanceConfigClient<AirHandlingUnitConfigurationParams> {
  constructor() {
    super("AirHandlingUnit_1");
  }
}

export class AirHandlingUnitDataClient extends GenericInstanceDataClient<AirHandlingUnit1DataEventValue> {
  constructor() {
    super("AirHandlingUnit_1");
  }
}

export class AirHandlingUnitAlertClient extends GenericInstanceAlertClient<AirHandlingUnit1AlertEventValue> {
  constructor() {
    super("AirHandlingUnit_1");
  }
}

export class AirHandlingUnitHistoricClient extends GenericInstanceHistoricClient<AirHandlingUnit1DataEventValue> {
  constructor() {
    super("AirHandlingUnit_1");
  }
}

export class AirHandlingUnitClient  {
  private _configurationClient: AirHandlingUnitConfigClient;
  private _dataClient: AirHandlingUnitDataClient;
  private _alertClient: AirHandlingUnitAlertClient;
  private _historicClient: AirHandlingUnitHistoricClient;

  get configuration() {
    return this._configurationClient;
  }
  get data() {
    return this._dataClient;
  }
  get alert() {
    return this._alertClient;
  } 
  get historic() {
    return this._historicClient;
  }

  constructor() {
    this._configurationClient = new AirHandlingUnitConfigClient();
    this._dataClient = new AirHandlingUnitDataClient();
    this._alertClient = new AirHandlingUnitAlertClient();
    this._historicClient = new AirHandlingUnitHistoricClient();
  }
}

export const airHandlingUnitClient = new AirHandlingUnitClient();

