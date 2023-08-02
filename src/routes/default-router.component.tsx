import { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { fetchLogin } from '../redux/authentication-slice';
import { useAppDispatch } from 'redux/hooks';
import LoadingPage from 'dataworld/blocks/loading/loading-page.component';

interface DefaultRouteProps extends RouteProps {
  component: any;
}

export default function DefaultRoute(props: DefaultRouteProps) {
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

  return (
    <>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <Route
          {...rest}
          render={(props) => <Component {...props}></Component>}
        />
      )}
    </>
  );
}
