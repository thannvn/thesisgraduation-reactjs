import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../store';
import { Redirect, Route } from 'react-router-dom';
import {fetchLogin} from '../redux/authentication'

function PrivateRoute({ component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetLoginAPI() {
      await store.dispatch(fetchLogin)
      setIsLoading(false)
    }
    fetLoginAPI()
  }, [])
  
  const login = useSelector((state) => state.auth);
  return (
    <>
      {!isLoading && (
        <Route
          {...rest}
          render={(props) =>
            login.user !== null ? (
              <Component {...props}></Component>
            ) : (
              <Redirect to='/auth/login'></Redirect>
            )
          }
        />
      )}
    </>
  );
}

export default PrivateRoute;
