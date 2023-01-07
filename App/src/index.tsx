import React, {useEffect} from 'react';
import {getBundleId} from 'react-native-device-info';
import LandlordApp from '@src/owner/routes';
import TenantApp from '@tenant/routes';

const App: React.FC = () => {
  const bundleId = getBundleId();

  if (bundleId.includes('.landlord')) return <LandlordApp />;

  return <TenantApp />;
};

export default App;
