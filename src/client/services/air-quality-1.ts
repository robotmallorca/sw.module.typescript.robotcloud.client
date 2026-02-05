import {
  AirQuality1AlertEventValue,
  AirQuality1DataEventValue,
  ServiceTypeClient
} from "../../../types/services";
import { AirQualityConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class AirQualityConfigClient extends GenericInstanceConfigClient<AirQualityConfigurationParams> {
  constructor() {
    super("AirQuality_1");
  }
}

export class AirQualityDataClient extends GenericInstanceDataClient<AirQuality1DataEventValue> {
  constructor() {
    super("AirQuality_1");
  }
}

export class AirQualityAlertClient extends GenericInstanceAlertClient<AirQuality1AlertEventValue> {
  constructor() {
    super("AirQuality_1");
  }
}

export class AirQualityHistoricClient extends GenericInstanceHistoricClient<AirQuality1DataEventValue> {
  constructor() {
    super("AirQuality_1");
  }
}

export class AirQualityClient implements ServiceTypeClient<AirQuality1DataEventValue, AirQuality1AlertEventValue, AirQualityConfigurationParams> {
  private _configurationClient: AirQualityConfigClient;
  private _dataClient: AirQualityDataClient;
  private _alertClient: AirQualityAlertClient;
  private _historicClient: AirQualityHistoricClient;

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
    this._configurationClient = new AirQualityConfigClient();
    this._dataClient = new AirQualityDataClient();
    this._alertClient = new AirQualityAlertClient();
    this._historicClient = new AirQualityHistoricClient();
  }
}

export const airQualityClient = new AirQualityClient();

