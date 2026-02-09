import {
  CoolHeatCons1AlertEventValue,
  CoolHeatCons1DataEventValue,
  HistoricAggregateFunction,
  ServiceDataMeasurement,
} from "../../../types/services";
import { CoolHeatConsConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class CoolHeatConsConfigClient extends GenericInstanceConfigClient<CoolHeatConsConfigurationParams> {
  constructor() {
    super("CoolHeatCons_1");
  }
}

export class CoolHeatConsDataClient extends GenericInstanceDataClient<CoolHeatCons1DataEventValue> {
  constructor() {
    super("CoolHeatCons_1");
  }
}

export class CoolHeatConsAlertClient extends GenericInstanceAlertClient<CoolHeatCons1AlertEventValue> {
  constructor() {
    super("CoolHeatCons_1");
  }
}

export class CoolHeatConsHistoricClient extends GenericInstanceHistoricClient<CoolHeatCons1DataEventValue> {
  constructor() {
    super("CoolHeatCons_1");
  }
}

export class CoolHeatConsClient  {
  private _configurationClient: CoolHeatConsConfigClient;
  private _dataClient: CoolHeatConsDataClient;
  private _alertClient: CoolHeatConsAlertClient;
  private _historicClient: CoolHeatConsHistoricClient;

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
    this._configurationClient = new CoolHeatConsConfigClient();
    this._dataClient = new CoolHeatConsDataClient();
    this._alertClient = new CoolHeatConsAlertClient();
    this._historicClient = new CoolHeatConsHistoricClient();
  }
}

export const coolHeatConsClient = new CoolHeatConsClient();

