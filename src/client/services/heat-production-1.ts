import {
    HeatProduction1AlertEventValue,
    HeatProduction1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { HeatProductionConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class HeatProductionConfigClient extends GenericInstanceConfigClient<HeatProductionConfigurationParams> {
    constructor() {
        super("HeatProduction_1");
    }
}

export class HeatProductionDataClient extends GenericInstanceDataClient<HeatProduction1DataEventValue> {
    constructor() {
        super("HeatProduction_1");
    }
}

export class HeatProductionAlertClient extends GenericInstanceAlertClient<HeatProduction1AlertEventValue> {
    constructor() {
        super("HeatProduction_1");
    }
}

export class HeatProductionHistoricClient extends GenericInstanceHistoricClient<HeatProduction1DataEventValue> {
    constructor() {
        super("HeatProduction_1");
    }
}

export class HeatProductionClient implements ServiceTypeClient<HeatProduction1DataEventValue, HeatProduction1AlertEventValue, HeatProductionConfigurationParams> {
    private _configurationClient: HeatProductionConfigClient;
    private _dataClient: HeatProductionDataClient;
    private _alertClient: HeatProductionAlertClient;
    private _historicClient: HeatProductionHistoricClient;

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
        this._configurationClient = new HeatProductionConfigClient();
        this._dataClient = new HeatProductionDataClient();
        this._alertClient = new HeatProductionAlertClient();
        this._historicClient = new HeatProductionHistoricClient();
    }
}

export const heatProductionClient = new HeatProductionClient();
