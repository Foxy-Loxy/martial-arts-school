import appConfig from './config/app';
import appPromise from './app';

appPromise.then((app) => {
    app.listen(appConfig.http.port, () => {
        console.log(`server started on port ${appConfig.http.port}`);
    });
});
