const appConfig = {
    http: {
        port: Number.parseInt(process.env.APP_HTTP_PORT || '0', 10) || 3000,
    },
};

export default appConfig;
