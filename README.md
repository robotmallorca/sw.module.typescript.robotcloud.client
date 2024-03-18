# TYPESCRIPT ROBOTCLOUD API CLIENT

Typescript library to access robotcloud endpoints.

## Installation

```bash
yarn add @robotbas/robotcloud-client
```

## Configure authentication interceptor

Example used on a nuxtjs middleware to setup the RobotCloud API token.
```typescript
import { clientConfig } from "@robotbas/robotcloud-client";

const appConfigs = useRuntimeConfig().public; // Get aplication global configs
// Configure Robotcloud API
clientConfig.baseURL = appConfigs.robotCloudUrl
clientConfig.checkToken = async () => {
    const token = await checkToken()
    if (!token) {
        await navigateTo(appConfigs.loginUrl, { external: true })
        return ''
    }
    return token
}
clientConfig.tokenMinutesBeforeExpirationRenew = 10

```


