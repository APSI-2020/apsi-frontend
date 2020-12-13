// unified access to env variables across environments

export const getEnv = (name) => {
  // during development we use Create React App mechanism to supply us with env variables
  // in environments closer to production, env vars are taken from config.js file generated when service starts
  let envSource =
    process.env.NODE_ENV === 'development' ? process.env : window.__env__;
  if (!envSource) {
    envSource = {};
  }
  let exceptions = ['PUBLIC_URL', 'BUILD_META']; // these envs are taken from process.env at build time
  if (exceptions.indexOf(name) > -1) {
    envSource = process.env;
  }
  return envSource[name];
};
