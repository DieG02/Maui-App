import { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

export default function useRefresh(
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    if (!refetch) return;
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  };
  return { refreshing, handleRefresh };
}
