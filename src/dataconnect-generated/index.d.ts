import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Commission_Key {
  id: UUIDString;
  __typename?: 'Commission_Key';
}

export interface CreateVolumeLogData {
  volumeLog_insert: VolumeLog_Key;
}

export interface CreateVolumeLogVariables {
  amount: number;
  side: string;
}

export interface DeleteSystemConfigData {
  systemConfig_delete?: SystemConfig_Key | null;
}

export interface DeleteSystemConfigVariables {
  id: UUIDString;
}

export interface GetUserCommissionsData {
  commissions: ({
    amount: number;
    status: string;
    periodEndDate: DateString;
  })[];
}

export interface NodePlacement_Key {
  id: UUIDString;
  __typename?: 'NodePlacement_Key';
}

export interface SystemConfig_Key {
  id: UUIDString;
  __typename?: 'SystemConfig_Key';
}

export interface UpdateCommissionStatusData {
  commission_update?: Commission_Key | null;
}

export interface UpdateCommissionStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VolumeLog_Key {
  id: UUIDString;
  __typename?: 'VolumeLog_Key';
}

interface GetUserCommissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserCommissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserCommissionsData, undefined>;
  operationName: string;
}
export const getUserCommissionsRef: GetUserCommissionsRef;

export function getUserCommissions(options?: ExecuteQueryOptions): QueryPromise<GetUserCommissionsData, undefined>;
export function getUserCommissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserCommissionsData, undefined>;

interface CreateVolumeLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVolumeLogVariables): MutationRef<CreateVolumeLogData, CreateVolumeLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateVolumeLogVariables): MutationRef<CreateVolumeLogData, CreateVolumeLogVariables>;
  operationName: string;
}
export const createVolumeLogRef: CreateVolumeLogRef;

export function createVolumeLog(vars: CreateVolumeLogVariables): MutationPromise<CreateVolumeLogData, CreateVolumeLogVariables>;
export function createVolumeLog(dc: DataConnect, vars: CreateVolumeLogVariables): MutationPromise<CreateVolumeLogData, CreateVolumeLogVariables>;

interface UpdateCommissionStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommissionStatusVariables): MutationRef<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCommissionStatusVariables): MutationRef<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;
  operationName: string;
}
export const updateCommissionStatusRef: UpdateCommissionStatusRef;

export function updateCommissionStatus(vars: UpdateCommissionStatusVariables): MutationPromise<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;
export function updateCommissionStatus(dc: DataConnect, vars: UpdateCommissionStatusVariables): MutationPromise<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;

interface DeleteSystemConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSystemConfigVariables): MutationRef<DeleteSystemConfigData, DeleteSystemConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSystemConfigVariables): MutationRef<DeleteSystemConfigData, DeleteSystemConfigVariables>;
  operationName: string;
}
export const deleteSystemConfigRef: DeleteSystemConfigRef;

export function deleteSystemConfig(vars: DeleteSystemConfigVariables): MutationPromise<DeleteSystemConfigData, DeleteSystemConfigVariables>;
export function deleteSystemConfig(dc: DataConnect, vars: DeleteSystemConfigVariables): MutationPromise<DeleteSystemConfigData, DeleteSystemConfigVariables>;

