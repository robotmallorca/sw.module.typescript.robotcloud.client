# TYPESCRIPT ROBOTCLOUD API CLIENT

Python library to access robotcloud endpoints.

## Installation

```bash
yarn add robotcloud-client
```

## Configure authentication interceptor

Example used on a nuxtjs middleware to setup the RobotCloud API token.
```typescript
import robotcloudApi, { setCheckTokenFunction } from "~/utils/robotCloudApi";

const appConfigs = useRuntimeConfig().public; // Get aplication global configs
robotcloudApi.defaults.baseURL = appConfigs.robotCloudUrl
setCheckTokenFunction(async () => {
    const token = await getAccessToken()
    if (!token) {
        await navigateTo(appConfigs.loginUrl, { external: true })
        return ''
    }
    return token
})

```


