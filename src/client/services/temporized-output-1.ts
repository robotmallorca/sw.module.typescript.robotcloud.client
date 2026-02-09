import { TemporizedOutputConfigurationParams } from "../../../types/services-configuration";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";
import { TemporizedOutput1Data ,TemporizedOutput1AlertEventValue, ServiceTypeClient } from "../../../types/services";



export class TemporizedOutputConfigClient extends GenericInstanceConfigClient<TemporizedOutputConfigurationParams> {
    constructor() {
        super("TemporizedOutput_1");
    }
}

export class TemporizedOutputDataClient extends GenericInstanceDataClient<TemporizedOutput1Data> {
    constructor() {
        super("TemporizedOutput_1");
    }
}

export class TemporizedOutputAlertClient extends GenericInstanceAlertClient<TemporizedOutput1AlertEventValue> {
    constructor() {
        super("TemporizedOutput_1");
    }
}

export class TemporizedOutputHistoricClient extends GenericInstanceHistoricClient<TemporizedOutput1Data> {
    constructor() {
        super("TemporizedOutput_1");
    }
}

export class TemporizedOutputClient implements ServiceTypeClient<TemporizedOutput1Data, TemporizedOutput1AlertEventValue, TemporizedOutputConfigurationParams> {
    private _configurationClient: TemporizedOutputConfigClient;
    private _dataClient: TemporizedOutputDataClient;
    private _alertClient: TemporizedOutputAlertClient;
    private _historicClient: TemporizedOutputHistoricClient;

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
        this._configurationClient = new TemporizedOutputConfigClient();
        this._dataClient = new TemporizedOutputDataClient();
        this._alertClient = new TemporizedOutputAlertClient();
        this._historicClient = new TemporizedOutputHistoricClient();
    }
}

export const temporizedOutputClient = new TemporizedOutputClient();
