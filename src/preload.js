// Ensures that the resource folder path can be accessed elsewhere
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getResourcePath: () => process.resourcesPath,
    getExePath: () => process.env.PORTABLE_EXECUTABLE_DIR
});
