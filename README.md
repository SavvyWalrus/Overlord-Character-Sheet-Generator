# Usage
- File Locations:
    - Character setting presets: `resources/user-files/saved-presets`
    - Character images: `resources/user-files/saved-images`
    - Templates: `resources/user-files/templates`
- Settings are saved by name and will overwrite in the case of a naming conflict.
- User templates can be used but ones for humanoids must include 'Humanoid' in the file name.


# Development
**Note: This app was not designed to work in WSL**
## Setup
- Install [Node.js](https://nodejs.org/en)
- Open terminal and navigate to project root
- Run `npm install` in root project directory

## Commands
- `npm run dev`: Opens both browser and electron window for development / Automatically opens the express server on `port 3001`
- `npm start`: Opens browser and server on `port 3001` ; Requires uncommenting of last code block in `server.js`
- `npm run start-react`: Opens the browser without the server
- `npm run start-server`: Opens the server on `port 3001` without the browser ; Requires uncommenting of last code block in `server.js`

## Build from source
1. Open a terminal in administrator mode
2. Navigate to the root project directory
3. Run `npm run build` to build the production react app
4. When the build is finished, run `npm run dist` to build the final electron app
    - The finished app will be located in the `dist` directory
