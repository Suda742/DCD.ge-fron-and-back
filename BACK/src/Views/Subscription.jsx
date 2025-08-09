import React, { useEffect } from 'react';
import Authenticated from '../Contexts/Authenticated';
import SubscriptionItem from '../Components/SubscriptionItem';
import { useStateContext } from '../Contexts/ContextProvider';

function Subscription({ isClose = false }) {
  const { subscriptions, getSubscriptions, getFeatures } = useStateContext();

  useEffect(() => {
    getSubscriptions();
    getFeatures();
  }, []);

  return (
    <div className={`w-full mx-auto ${isClose ? 'mt-10 mb-20' : 'mt-28 mb-20'} px-0`}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full">
        {subscriptions.map(data => (
          <div key={data.id} className="w-full sm:w-auto">
            <SubscriptionItem data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscription;
