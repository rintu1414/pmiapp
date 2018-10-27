// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  authUrl: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/auth/signin',
  registerUrl: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/auth/signup',
  riskUrl: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/pmi/risk',
  addRiskURL: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/pmi/addRisk',
  userNameUrl: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/user/checkUsernameAvailability',
  emailAvailUrl: 'http://pmisra.us-east-2.elasticbeanstalk.com/api/user/checkEmailAvailability'
};
