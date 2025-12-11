export const envVariables = {
    frontendPort: process.env.EXPO_PUBLIC_FRONTEND_PORT!,
    localIP: process.env.EXPO_PUBLIC_LOCAL_IP!,
    port: process.env.EXPO_PUBLIC_PORT!,

    jwtSecretKey: process.env.JWT_SECRET!
}

export const SERVER_URL = `http://${envVariables.localIP}:${envVariables.port}`;