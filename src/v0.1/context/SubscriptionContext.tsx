import React, { createContext, useEffect, useState } from 'react';
import useGetSuscriptionCapabilities, {
  ISubscriptionCapabilities,
} from '../services/SuscriptionCapabilities/useGetCapabilities';

interface IGeneralContext {
  subscriptionCapabilities: ISubscriptionCapabilities[];
}

const defaultValue: IGeneralContext = {
  subscriptionCapabilities: [],
};

export const SubscriptionContext = createContext<IGeneralContext>(defaultValue);

interface Props {
  children: React.ReactNode;
}

export enum Capabilities {
  WEB_ACCESS = 'web_access',
  MULTIPLE_FINANCIAL_ACCOUNTS = 'multiple_financial_accounts',
}

const SubscriptionProvider = ({ children }: Props) => {
  const [subscriptionCapabilities, setSubscriptionCapabilities] = useState<ISubscriptionCapabilities[]>([]);

  const { data, isLoading } = useGetSuscriptionCapabilities();
  console.log('SUBSCRIPTION CONTEXT', data);

  useEffect(() => {
    if (data && data.length > 0) {
      setSubscriptionCapabilities(data);
    }
  }, [isLoading, data]);

  return <SubscriptionContext.Provider value={{ subscriptionCapabilities }}>{children}</SubscriptionContext.Provider>;
};
export default SubscriptionProvider;
