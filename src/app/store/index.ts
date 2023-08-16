import { configureStore } from '@reduxjs/toolkit';

import { userModel } from 'entities/user/model';
import { taskModel } from 'entities/task/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import { usersApi } from 'services/user-api';
import { tasksApi } from 'services/tasks-api';

export const store = configureStore({
  reducer: {
    user: userModel.reducer,
    tasks: taskModel.reducer,
    createRequest: createRequestModel.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
