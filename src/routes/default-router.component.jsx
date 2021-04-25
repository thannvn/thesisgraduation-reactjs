import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { fetchLogin } from '../redux/authentication-slice';
import {useAppDispatch} from 'redux/hooks';

export default function DefaultRoute({ component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetLoginAPI() {
      await dispatch(fetchLogin)
      setIsLoading(false)
    }
    fetLoginAPI()
  }, [dispatch])
  
  return (
    <>
      {!isLoading && (
        <Route
          {...rest}
          render={(props) =>
              <Component {...props}></Component>
          }
        />
      )}
    </>
  );
}

