import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchLogin } from '../redux/authentication-slice';
import LoadingPage from 'dataworld/blocks/loading/loading-page.component';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetLoginAPI() {
      await fetchLogin(dispatch);
      setIsLoading(false);
    }
    fetLoginAPI();
  }, [dispatch]);

  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <Route
          {...rest}
          render={(props) =>
            user?.accountId !== '' ? (
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
