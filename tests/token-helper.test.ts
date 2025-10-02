import { decodeToken, needRenew, renewToken, validateToken } from "helpers/robotCloudToken";
import { RobotCloudJWTPayload } from "index";
import clientConfig from "config";
import axios from 'axios';

beforeEach(() => {
  jest.clearAllMocks();
})
const example_token = 
  "eyJraWQiOiJhc2stNjYwMjAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJvYWMiOiJNQVNURVIiLCJzdWIiOiJCZXJuYXRfbWFzdGVyIiwiYXVkIjoia2V5LTE0IiwiYWFjIjoiQURWQU5DRUQiLCJvcmciOiJvcmctMCIsInR5cCI6IkFDQ0VTUyIsImV4cCI6MTc1OTM5NDg5N30.lY5314qfC7yw0Z5QXU2G8GE0GEsfRHNhMaxZLfy9lKjoeDKzbD1aR2MHomRPTDGYDbGy6Kdf5UG_yWezg0Se4Q6XmMhDC3ckbJ5qxSYKxeI4WG1YukQv3c5gznq0egcLPVxMIMQZ4FEujRxpd7-vsNRr6SJ2V-NMD8TYrCQgiNODUq9pOEzjWqxzSzWdpRhzhHNjZfRcQjjfpSFIVWGad6vH6RCPJmZ3EOGdF15UdEnU5QDOA-s8f8i2osxng5uRzeMtVceu-uMWiqaEPYCKrZgeB3Y5zaDVN3ah7UZgeF1PWG1-CgQAVy8pfCHPIShHhZ7mm2KXgerHHA0FY0qthQ";

describe("Decode token", () => {
  it("Has expected values", () => {

    const payload = decodeToken(example_token);

    expect(payload).toBeDefined();

    expect(payload?.exp).toBe(1759394897);
    expect(payload?.sub).toBe("Bernat_master");
    expect(payload?.org).toBe("org-0");
  });
});

describe("Token need renew", () => {
  it('Is expired', () => {
    clientConfig.tokenMinutesBeforeExpirationRenew = 10
    // Expired 10 minutes ago
    const now = new Date();
    const tokenPayload: RobotCloudJWTPayload = {
      exp: new Date(now.getTime() - (10 * 60 * 1000)).getTime() / 1000,
      sub: '',
      org: ''
    } as RobotCloudJWTPayload;

    const result = needRenew(tokenPayload)
    expect(result).toBeTruthy()
  })
  
  it('Is not expired and do not need renew ', () => {
    clientConfig.tokenMinutesBeforeExpirationRenew = 10
    // Expires in 30 minutes
    const now = new Date();
    const tokenPayload: RobotCloudJWTPayload = {
      exp: new Date(now.getTime() + 30 * 60 * 1000).getTime() / 1000,
      sub: '',
      org: ''
    } as RobotCloudJWTPayload;

    const result = needRenew(tokenPayload)
    expect(result).toBeFalsy()
  })

  it('Is not expired, but need renew ', () => {
    clientConfig.tokenMinutesBeforeExpirationRenew = 20
    // Expires in 10 minutes
    const now = new Date();
    const tokenPayload: RobotCloudJWTPayload = {
      exp: new Date(now.getTime() + 10 * 60 * 1000).getTime() / 1000,
      sub: '',
      org: ''
    } as RobotCloudJWTPayload;

    const result = needRenew(tokenPayload)
    expect(result).toBeTruthy()
  })

});

describe("Renew token", () => {
  it('Is robotcloud endpoint called', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      'data': { 
        'access': {'token': 'access_token_value'}, 
        'renew': {'token': 'renew_token_value'}
      }
    })
    
    await renewToken('renew-token-value')
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('Return api tokens', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      'data': { 
        'access': {'token': 'access_token_value'}, 
        'renew': {'token': 'renew_token_value'}
      }
    })
    
    const tokens = await renewToken('renew-token-value')
    expect(tokens.renewed).toBe(true)
    expect(tokens.access).toBe('access_token_value')
    expect(tokens.renew).toBe('renew_token_value')
  })
});

describe("Validate token", () => {
  it('Is valid', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      'data': {}
    })

    const ret = await validateToken(example_token)

    expect(ret).toBeTruthy()
  })

  it('Is not valid', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue("Error")

    const ret = await validateToken(example_token)

    expect(ret).toBeFalsy()
  })
});
