import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { Redirect, Route } from 'react-router-dom';
import { fetchLogin } from '../redux/authentication-slice';

export default function CustomRoute({ component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetLoginAPI() {
      await dispatch(fetchLogin);
      setIsLoading(false);
    }
    fetLoginAPI();
  }, [dispatch]);

  const user = useSelector((state) => state.auth);
  return (
    <>
      {!isLoading && (
        <Route
          {...rest}
          render={(props) =>
            user.user.accountId === '' ? (
              <Component {...props}></Component>
            ) : (
              <Redirect to='/home'></Redirect>
            )
          }
        />
      )}
    </>
  );
}
