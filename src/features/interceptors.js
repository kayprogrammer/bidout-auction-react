import api from "./api";
import { refreshToken, resetUser } from '../features/auth/authSlice'

const setup = (store, navigate) => {
  let user = store.getState().auth.user;
  let guestUser = store.getState().auth.guestUser;


  const updateUserToken = () => {
    user = store.getState().auth.user;
    guestUser = store.getState().auth.guestUser;
  };
  
  const unsubscribe = store.subscribe(updateUserToken);

  api.interceptors.request.use(
    (config) => {
      const token = user?.access;
      const guestUserId = guestUser?.id;

      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      } else if (guestUserId) {
        config.headers["guestUserId"] = guestUserId;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/login/" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await api.post("/auth/refresh/", {
              refresh: user?.refresh,
            });

            const { data } = rs.data;

            dispatch(refreshToken(data));
            const updatedConfig = {
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: `Bearer ${data.access}`,
              },
            };
            return api(updatedConfig);
          } catch (_error) {
            dispatch(resetUser()).then(() => {
              navigate("/login")
            })
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );

  // Cleanup function to unsubscribe from the store
  const cleanup = () => {
    unsubscribe();
  };

  // Return cleanup function in case you want to unsubscribe later
  return cleanup;
};

export default setup;
