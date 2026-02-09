import { ServiceTypeClient } from "../../../types/services";
import { RoomDiagnosticsConfigurationParams } from "../../../types/services-configuration";
import { RoomDiagnostics1Data, RoomDiagnostics1AlertEventValue } from "../../../types/services";
import { GenericInstanceAlertClient, GenericInstanceConfigClient, GenericInstanceDataClient, GenericInstanceHistoricClient } from "./generics";

export class RoomDiagnosticsConfigClient extends GenericInstanceConfigClient<RoomDiagnosticsConfigurationParams> {
    constructor() {
        super("RoomDiagnostics_1");
    }
}

export class RoomDiagnosticsDataClient extends GenericInstanceDataClient<RoomDiagnostics1Data> {
    constructor() {
        super("RoomDiagnostics_1");
    }
}

export class RoomDiagnosticsAlertClient extends GenericInstanceAlertClient<RoomDiagnostics1AlertEventValue> {
    constructor() {
        super("RoomDiagnostics_1");
    }
}

export class RoomDiagnosticsHistoricClient extends GenericInstanceHistoricClient<RoomDiagnostics1Data> {
    constructor() {
        super("RoomDiagnostics_1");
    }
}

export class RoomDiagnosticsClient implements ServiceTypeClient<RoomDiagnostics1Data, RoomDiagnostics1AlertEventValue, RoomDiagnosticsConfigurationParams> {
    private _configurationClient: RoomDiagnosticsConfigClient;
    private _dataClient: RoomDiagnosticsDataClient;
    private _alertClient: RoomDiagnosticsAlertClient;
    private _historicClient: RoomDiagnosticsHistoricClient;

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
        this._configurationClient = new RoomDiagnosticsConfigClient();
        this._dataClient = new RoomDiagnosticsDataClient();
        this._alertClient = new RoomDiagnosticsAlertClient();
        this._historicClient = new RoomDiagnosticsHistoricClient();
    }
}

export const roomDiagnosticsClient = new RoomDiagnosticsClient();
