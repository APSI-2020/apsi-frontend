import { useCallback, useMemo } from 'react';

import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

export const useRedirect = () => {
  const history = useHistory();
  const {
    location: { search },
  } = history;
  const parsed = queryString.parse(search);

  const redirect = useMemo(() => {
    return {
      to: typeof parsed.redirect !== 'undefined' ? parsed.redirect : '/',
      search: search,
    };
  }, [parsed.redirect, search]);
  const redirectTo = useCallback(
    (redirectUrl) => {
      if (typeof redirectUrl === 'undefined') redirectUrl = redirect.to;
      history.push(redirectUrl);
    },
    [history, redirect.to],
  );

  return [redirect, redirectTo];
};
