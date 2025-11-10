# Troubleshooting Guide

## Issue: "react-scripts: command not found"

If you encounter this error when running `npm start`, try the following solutions:

### Solution 1: Clean Reinstall (Recommended)
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Solution 2: Use npx (Alternative)
If Solution 1 doesn't work, you can modify `client/package.json` scripts to use `npx`:

```json
"scripts": {
  "start": "npx react-scripts start",
  "build": "npx react-scripts build",
  "test": "npx react-scripts test",
  "eject": "npx react-scripts eject"
}
```

### Solution 3: Use Full Path
You can also run react-scripts directly:
```bash
cd client
./node_modules/.bin/react-scripts start
```

### Solution 4: Check Node/npm Version
Make sure you have a compatible Node.js version (v14 or higher):
```bash
node -v
npm -v
```

### Solution 5: Clear npm Cache
```bash
npm cache clean --force
cd client
npm install
npm start
```

## Current Setup Status

✅ react-scripts is installed in `client/node_modules/`
✅ package.json scripts are configured correctly
✅ Dependencies are up to date

The application should work now. If you still encounter issues, try restarting your terminal or IDE.

