const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getResourcePath: () => process.resourcesPath
});
