# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserCommissions*](#getusercommissions)
- [**Mutations**](#mutations)
  - [*CreateVolumeLog*](#createvolumelog)
  - [*UpdateCommissionStatus*](#updatecommissionstatus)
  - [*DeleteSystemConfig*](#deletesystemconfig)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserCommissions
You can execute the `GetUserCommissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserCommissions(options?: ExecuteQueryOptions): QueryPromise<GetUserCommissionsData, undefined>;

interface GetUserCommissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserCommissionsData, undefined>;
}
export const getUserCommissionsRef: GetUserCommissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserCommissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserCommissionsData, undefined>;

interface GetUserCommissionsRef {
  ...
  (dc: DataConnect): QueryRef<GetUserCommissionsData, undefined>;
}
export const getUserCommissionsRef: GetUserCommissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserCommissionsRef:
```typescript
const name = getUserCommissionsRef.operationName;
console.log(name);
```

### Variables
The `GetUserCommissions` query has no variables.
### Return Type
Recall that executing the `GetUserCommissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserCommissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserCommissionsData {
  commissions: ({
    amount: number;
    status: string;
    periodEndDate: DateString;
  })[];
}
```
### Using `GetUserCommissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserCommissions } from '@dataconnect/generated';


// Call the `getUserCommissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserCommissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserCommissions(dataConnect);

console.log(data.commissions);

// Or, you can use the `Promise` API.
getUserCommissions().then((response) => {
  const data = response.data;
  console.log(data.commissions);
});
```

### Using `GetUserCommissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserCommissionsRef } from '@dataconnect/generated';


// Call the `getUserCommissionsRef()` function to get a reference to the query.
const ref = getUserCommissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserCommissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.commissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.commissions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateVolumeLog
You can execute the `CreateVolumeLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVolumeLog(vars: CreateVolumeLogVariables): MutationPromise<CreateVolumeLogData, CreateVolumeLogVariables>;

interface CreateVolumeLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVolumeLogVariables): MutationRef<CreateVolumeLogData, CreateVolumeLogVariables>;
}
export const createVolumeLogRef: CreateVolumeLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVolumeLog(dc: DataConnect, vars: CreateVolumeLogVariables): MutationPromise<CreateVolumeLogData, CreateVolumeLogVariables>;

interface CreateVolumeLogRef {
  ...
  (dc: DataConnect, vars: CreateVolumeLogVariables): MutationRef<CreateVolumeLogData, CreateVolumeLogVariables>;
}
export const createVolumeLogRef: CreateVolumeLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVolumeLogRef:
```typescript
const name = createVolumeLogRef.operationName;
console.log(name);
```

### Variables
The `CreateVolumeLog` mutation requires an argument of type `CreateVolumeLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateVolumeLogVariables {
  amount: number;
  side: string;
}
```
### Return Type
Recall that executing the `CreateVolumeLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVolumeLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVolumeLogData {
  volumeLog_insert: VolumeLog_Key;
}
```
### Using `CreateVolumeLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVolumeLog, CreateVolumeLogVariables } from '@dataconnect/generated';

// The `CreateVolumeLog` mutation requires an argument of type `CreateVolumeLogVariables`:
const createVolumeLogVars: CreateVolumeLogVariables = {
  amount: ..., 
  side: ..., 
};

// Call the `createVolumeLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVolumeLog(createVolumeLogVars);
// Variables can be defined inline as well.
const { data } = await createVolumeLog({ amount: ..., side: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVolumeLog(dataConnect, createVolumeLogVars);

console.log(data.volumeLog_insert);

// Or, you can use the `Promise` API.
createVolumeLog(createVolumeLogVars).then((response) => {
  const data = response.data;
  console.log(data.volumeLog_insert);
});
```

### Using `CreateVolumeLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVolumeLogRef, CreateVolumeLogVariables } from '@dataconnect/generated';

// The `CreateVolumeLog` mutation requires an argument of type `CreateVolumeLogVariables`:
const createVolumeLogVars: CreateVolumeLogVariables = {
  amount: ..., 
  side: ..., 
};

// Call the `createVolumeLogRef()` function to get a reference to the mutation.
const ref = createVolumeLogRef(createVolumeLogVars);
// Variables can be defined inline as well.
const ref = createVolumeLogRef({ amount: ..., side: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVolumeLogRef(dataConnect, createVolumeLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.volumeLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.volumeLog_insert);
});
```

## UpdateCommissionStatus
You can execute the `UpdateCommissionStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCommissionStatus(vars: UpdateCommissionStatusVariables): MutationPromise<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;

interface UpdateCommissionStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommissionStatusVariables): MutationRef<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;
}
export const updateCommissionStatusRef: UpdateCommissionStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCommissionStatus(dc: DataConnect, vars: UpdateCommissionStatusVariables): MutationPromise<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;

interface UpdateCommissionStatusRef {
  ...
  (dc: DataConnect, vars: UpdateCommissionStatusVariables): MutationRef<UpdateCommissionStatusData, UpdateCommissionStatusVariables>;
}
export const updateCommissionStatusRef: UpdateCommissionStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCommissionStatusRef:
```typescript
const name = updateCommissionStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateCommissionStatus` mutation requires an argument of type `UpdateCommissionStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCommissionStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateCommissionStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCommissionStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCommissionStatusData {
  commission_update?: Commission_Key | null;
}
```
### Using `UpdateCommissionStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCommissionStatus, UpdateCommissionStatusVariables } from '@dataconnect/generated';

// The `UpdateCommissionStatus` mutation requires an argument of type `UpdateCommissionStatusVariables`:
const updateCommissionStatusVars: UpdateCommissionStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateCommissionStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCommissionStatus(updateCommissionStatusVars);
// Variables can be defined inline as well.
const { data } = await updateCommissionStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCommissionStatus(dataConnect, updateCommissionStatusVars);

console.log(data.commission_update);

// Or, you can use the `Promise` API.
updateCommissionStatus(updateCommissionStatusVars).then((response) => {
  const data = response.data;
  console.log(data.commission_update);
});
```

### Using `UpdateCommissionStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCommissionStatusRef, UpdateCommissionStatusVariables } from '@dataconnect/generated';

// The `UpdateCommissionStatus` mutation requires an argument of type `UpdateCommissionStatusVariables`:
const updateCommissionStatusVars: UpdateCommissionStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateCommissionStatusRef()` function to get a reference to the mutation.
const ref = updateCommissionStatusRef(updateCommissionStatusVars);
// Variables can be defined inline as well.
const ref = updateCommissionStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCommissionStatusRef(dataConnect, updateCommissionStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.commission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.commission_update);
});
```

## DeleteSystemConfig
You can execute the `DeleteSystemConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSystemConfig(vars: DeleteSystemConfigVariables): MutationPromise<DeleteSystemConfigData, DeleteSystemConfigVariables>;

interface DeleteSystemConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSystemConfigVariables): MutationRef<DeleteSystemConfigData, DeleteSystemConfigVariables>;
}
export const deleteSystemConfigRef: DeleteSystemConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSystemConfig(dc: DataConnect, vars: DeleteSystemConfigVariables): MutationPromise<DeleteSystemConfigData, DeleteSystemConfigVariables>;

interface DeleteSystemConfigRef {
  ...
  (dc: DataConnect, vars: DeleteSystemConfigVariables): MutationRef<DeleteSystemConfigData, DeleteSystemConfigVariables>;
}
export const deleteSystemConfigRef: DeleteSystemConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSystemConfigRef:
```typescript
const name = deleteSystemConfigRef.operationName;
console.log(name);
```

### Variables
The `DeleteSystemConfig` mutation requires an argument of type `DeleteSystemConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSystemConfigVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSystemConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSystemConfigData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSystemConfigData {
  systemConfig_delete?: SystemConfig_Key | null;
}
```
### Using `DeleteSystemConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSystemConfig, DeleteSystemConfigVariables } from '@dataconnect/generated';

// The `DeleteSystemConfig` mutation requires an argument of type `DeleteSystemConfigVariables`:
const deleteSystemConfigVars: DeleteSystemConfigVariables = {
  id: ..., 
};

// Call the `deleteSystemConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSystemConfig(deleteSystemConfigVars);
// Variables can be defined inline as well.
const { data } = await deleteSystemConfig({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSystemConfig(dataConnect, deleteSystemConfigVars);

console.log(data.systemConfig_delete);

// Or, you can use the `Promise` API.
deleteSystemConfig(deleteSystemConfigVars).then((response) => {
  const data = response.data;
  console.log(data.systemConfig_delete);
});
```

### Using `DeleteSystemConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSystemConfigRef, DeleteSystemConfigVariables } from '@dataconnect/generated';

// The `DeleteSystemConfig` mutation requires an argument of type `DeleteSystemConfigVariables`:
const deleteSystemConfigVars: DeleteSystemConfigVariables = {
  id: ..., 
};

// Call the `deleteSystemConfigRef()` function to get a reference to the mutation.
const ref = deleteSystemConfigRef(deleteSystemConfigVars);
// Variables can be defined inline as well.
const ref = deleteSystemConfigRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSystemConfigRef(dataConnect, deleteSystemConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.systemConfig_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.systemConfig_delete);
});
```

