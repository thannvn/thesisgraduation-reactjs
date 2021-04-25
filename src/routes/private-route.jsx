import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useAppDispatch} from 'redux/hooks'
import { Redirect, Route } from 'react-router-dom';
import {fetchLogin} from '../redux/authentication-slice'

function PrivateRoute({ component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetLoginAPI() {
      await dispatch(fetchLogin)
      setIsLoading(false)
    }
    fetLoginAPI()
  }, [dispatch])
  
  const login = useSelector((state) => state.auth);
  return (
    <>
      {!isLoading && (
        <Route
          {...rest}
          render={(props) =>
            login.user.accountId !== '' ? (
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
