const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'smartbankingsystem',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const getUserCommissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserCommissions');
}
getUserCommissionsRef.operationName = 'GetUserCommissions';
exports.getUserCommissionsRef = getUserCommissionsRef;

exports.getUserCommissions = function getUserCommissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getUserCommissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createVolumeLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateVolumeLog', inputVars);
}
createVolumeLogRef.operationName = 'CreateVolumeLog';
exports.createVolumeLogRef = createVolumeLogRef;

exports.createVolumeLog = function createVolumeLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createVolumeLogRef(dcInstance, inputVars));
}
;

const updateCommissionStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCommissionStatus', inputVars);
}
updateCommissionStatusRef.operationName = 'UpdateCommissionStatus';
exports.updateCommissionStatusRef = updateCommissionStatusRef;

exports.updateCommissionStatus = function updateCommissionStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCommissionStatusRef(dcInstance, inputVars));
}
;

const deleteSystemConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSystemConfig', inputVars);
}
deleteSystemConfigRef.operationName = 'DeleteSystemConfig';
exports.deleteSystemConfigRef = deleteSystemConfigRef;

exports.deleteSystemConfig = function deleteSystemConfig(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteSystemConfigRef(dcInstance, inputVars));
}
;
