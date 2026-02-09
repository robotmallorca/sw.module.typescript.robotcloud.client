import {
    EnergyProduction1AlertEventValue,
    EnergyProduction1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { EnergyProductionConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class EnergyProductionConfigClient extends GenericInstanceConfigClient<EnergyProductionConfigurationParams> {
    constructor() {
        super("EnergyProduction_1");
    }
}

export class EnergyProductionDataClient extends GenericInstanceDataClient<EnergyProduction1DataEventValue> {
    constructor() {
        super("EnergyProduction_1");
    }
}

export class EnergyProductionAlertClient extends GenericInstanceAlertClient<EnergyProduction1AlertEventValue> {
    constructor() {
        super("EnergyProduction_1");
    }
}

export class EnergyProductionHistoricClient extends GenericInstanceHistoricClient<EnergyProduction1DataEventValue> {
    constructor() {
        super("EnergyProduction_1");
    }
}

export class EnergyProductionClient implements ServiceTypeClient<EnergyProduction1DataEventValue, EnergyProduction1AlertEventValue, EnergyProductionConfigurationParams> {
    private _configurationClient: EnergyProductionConfigClient;
    private _dataClient: EnergyProductionDataClient;
    private _alertClient: EnergyProductionAlertClient;
    private _historicClient: EnergyProductionHistoricClient;

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
        this._configurationClient = new EnergyProductionConfigClient();
        this._dataClient = new EnergyProductionDataClient();
        this._alertClient = new EnergyProductionAlertClient();
        this._historicClient = new EnergyProductionHistoricClient();
    }
}

export const energyProductionClient = new EnergyProductionClient();
