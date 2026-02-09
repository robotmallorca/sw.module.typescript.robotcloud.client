import {
    CoolHeatTemperature1AlertEventValue,
    CoolHeatTemperature1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { CoolHeatTemperatureConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class CoolHeatTemperatureConfigClient extends GenericInstanceConfigClient<CoolHeatTemperatureConfigurationParams> {
    constructor() {
        super("CoolHeatTemperature_1");
    }
}

export class CoolHeatTemperatureDataClient extends GenericInstanceDataClient<CoolHeatTemperature1DataEventValue> {
    constructor() {
        super("CoolHeatTemperature_1");
    }
}

export class CoolHeatTemperatureAlertClient extends GenericInstanceAlertClient<CoolHeatTemperature1AlertEventValue> {
    constructor() {
        super("CoolHeatTemperature_1");
    }
}

export class CoolHeatTemperatureHistoricClient extends GenericInstanceHistoricClient<CoolHeatTemperature1DataEventValue> {
    constructor() {
        super("CoolHeatTemperature_1");
    }
}

export class CoolHeatTemperatureClient implements ServiceTypeClient<CoolHeatTemperature1DataEventValue, CoolHeatTemperature1AlertEventValue, CoolHeatTemperatureConfigurationParams> {
    private _configurationClient: CoolHeatTemperatureConfigClient;
    private _dataClient: CoolHeatTemperatureDataClient;
    private _alertClient: CoolHeatTemperatureAlertClient;
    private _historicClient: CoolHeatTemperatureHistoricClient;

    get configuration() {
        return this._configurationClient;
    }
    get data() {
        return this._dataClient;
    }
    get alerts() {
        return this._alertClient;
    }
    get historic() {
        return this._historicClient;
    }

    constructor() {
        this._configurationClient = new CoolHeatTemperatureConfigClient();
        this._dataClient = new CoolHeatTemperatureDataClient();
        this._alertClient = new CoolHeatTemperatureAlertClient();
        this._historicClient = new CoolHeatTemperatureHistoricClient();
    }
}

export const coolHeatTemperatureClient = new CoolHeatTemperatureClient();
