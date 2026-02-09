import {
    GenericTemperature1AlertEventValue,
    GenericTemperature1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { GenericTemperatureConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class GenericTemperatureConfigClient extends GenericInstanceConfigClient<GenericTemperatureConfigurationParams> {
    constructor() {
        super("GenericTemperature_1");
    }
}

export class GenericTemperatureDataClient extends GenericInstanceDataClient<GenericTemperature1DataEventValue> {
    constructor() {
        super("GenericTemperature_1");
    }
}

export class GenericTemperatureAlertClient extends GenericInstanceAlertClient<GenericTemperature1AlertEventValue> {
    constructor() {
        super("GenericTemperature_1");
    }
}

export class GenericTemperatureHistoricClient extends GenericInstanceHistoricClient<GenericTemperature1DataEventValue> {
    constructor() {
        super("GenericTemperature_1");
    }
}

export class GenericTemperatureClient implements ServiceTypeClient<GenericTemperature1DataEventValue, GenericTemperature1AlertEventValue, GenericTemperatureConfigurationParams> {
    private _configurationClient: GenericTemperatureConfigClient;
    private _dataClient: GenericTemperatureDataClient;
    private _alertClient: GenericTemperatureAlertClient;
    private _historicClient: GenericTemperatureHistoricClient;

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
        this._configurationClient = new GenericTemperatureConfigClient();
        this._dataClient = new GenericTemperatureDataClient();
        this._alertClient = new GenericTemperatureAlertClient();
        this._historicClient = new GenericTemperatureHistoricClient();
    }
}

export const genericTemperatureClient = new GenericTemperatureClient();
