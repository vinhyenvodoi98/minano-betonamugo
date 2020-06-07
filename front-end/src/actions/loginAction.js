import axios from 'axios';

export const LOGIN = 'LOGIN';
export const ISLOADING = 'ISLOADING';

export const login = (token) => async (dispatch) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  await axios
    .get('api check oauth')
    .then((response) => {
      // handle success
      dispatch({
        type: LOGIN,
        isLogin: true,
        name: response.data.name,
        position: response.data.position,
        token
      });
      dispatch({
        type: ISLOADING,
        isLoading: false
      });
    })
    .catch((error) => {
      // handle error
      localStorage.removeItem('token');
      dispatch({
        type: ISLOADING,
        isLoading: false
      });
    });

  //  isLogin will save in store and can be called from any view
};

export const isloading = () => async (dispatch) => {
  dispatch({
    type: ISLOADING,
    isLoading: false
  });
};
