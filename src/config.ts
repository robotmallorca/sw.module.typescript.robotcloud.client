import robotcloudApi from "robotCloudApi";

export class RobotCloudClientConfig {
    private _baseUrl?: string;
    private _checkToken = async (): Promise<string> => { return ''}
    
    public tokenMinutesBeforeExpirationRenew: number = 20;
    

    set baseURL(value: string){
        robotcloudApi.defaults.baseURL = value
        this._baseUrl = value
    }
    
    get baseUrl(): string | undefined {
        return this._baseUrl
    }

    set checkToken(fun: () => Promise<string>) {
        this._checkToken = fun
    }

    get checkToken(): () => Promise<string> {
        return this._checkToken
    }
}

const clientConfig = new RobotCloudClientConfig()
export default clientConfig