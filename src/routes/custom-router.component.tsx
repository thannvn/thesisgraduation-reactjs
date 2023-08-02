import LoadingPage from 'dataworld/blocks/loading/loading-page.component';
import addToast from 'dataworld/parts/toast/add-toast.component';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { fetchLogin } from 'redux/authentication-slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface CustomRouteProps extends RouteProps {
  component: any;
}

export default function CustomRoute(props: CustomRouteProps) {
  const { component: Component, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
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
          render={(props) =>
            user?.accountId === '' ? (
              <Component {...props}></Component>
            ) : (
              <>
                {addToast({ message: 'Bạn đang đăng nhập', type: 'error' })}
                <Redirect to='/home' />
              </>
            )
          }
        />
      )}
    </>
  );
}
