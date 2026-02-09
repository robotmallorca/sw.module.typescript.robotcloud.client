import {
    CoolHeatProd1AlertEventValue,
    CoolHeatProd1DataEventValue,
    ServiceTypeClient
} from "../../../types/services";
import { CoolHeatProdConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceAlertClient, GenericInstanceHistoricClient } from "./generics";


export class CoolHeatProdConfigClient extends GenericInstanceConfigClient<CoolHeatProdConfigurationParams> {
    constructor() {
        super("CoolHeatProd_1");
    }
}

export class CoolHeatProdDataClient extends GenericInstanceDataClient<CoolHeatProd1DataEventValue> {
    constructor() {
        super("CoolHeatProd_1");
    }
}

export class CoolHeatProdAlertClient extends GenericInstanceAlertClient<CoolHeatProd1AlertEventValue> {
    constructor() {
        super("CoolHeatProd_1");
    }
}

export class CoolHeatProdHistoricClient extends GenericInstanceHistoricClient<CoolHeatProd1DataEventValue> {
    constructor() {
        super("CoolHeatProd_1");
    }
}

export class CoolHeatProdClient implements ServiceTypeClient<CoolHeatProd1DataEventValue, CoolHeatProd1AlertEventValue, CoolHeatProdConfigurationParams> {
    private _configurationClient: CoolHeatProdConfigClient;
    private _dataClient: CoolHeatProdDataClient;
    private _alertClient: CoolHeatProdAlertClient;
    private _historicClient: CoolHeatProdHistoricClient;

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
        this._configurationClient = new CoolHeatProdConfigClient();
        this._dataClient = new CoolHeatProdDataClient();
        this._alertClient = new CoolHeatProdAlertClient();
        this._historicClient = new CoolHeatProdHistoricClient();
    }
}

export const coolHeatProdClient = new CoolHeatProdClient();
