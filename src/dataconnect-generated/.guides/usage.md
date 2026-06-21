# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getUserCommissions, createVolumeLog, updateCommissionStatus, deleteSystemConfig } from '@dataconnect/generated';


// Operation GetUserCommissions: 
const { data } = await GetUserCommissions(dataConnect);

// Operation CreateVolumeLog:  For variables, look at type CreateVolumeLogVars in ../index.d.ts
const { data } = await CreateVolumeLog(dataConnect, createVolumeLogVars);

// Operation UpdateCommissionStatus:  For variables, look at type UpdateCommissionStatusVars in ../index.d.ts
const { data } = await UpdateCommissionStatus(dataConnect, updateCommissionStatusVars);

// Operation DeleteSystemConfig:  For variables, look at type DeleteSystemConfigVars in ../index.d.ts
const { data } = await DeleteSystemConfig(dataConnect, deleteSystemConfigVars);


```