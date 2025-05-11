import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import { Box, Main } from '@strapi/design-system';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { HomePage } from './HomePage';
import { Settings } from './Settings';
import { getTranslation } from '../utils/getTranslation';

const App = () => {
  const { formatMessage } = useIntl();
  
  return (
    <Main>
      <Helmet title={formatMessage({ id: getTranslation('plugin.name') })} />
      <Box paddingBottom={4}>
        <Box paddingLeft={6} paddingTop={6} paddingBottom={2}>
          <h1>{formatMessage({ id: getTranslation('plugin.name') })}</h1>
          <p>{formatMessage({ id: getTranslation('plugin.name') })}</p>
        </Box>
      </Box>
      <Box paddingLeft={6} paddingRight={6}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </Box>
    </Main>
  );
};

export { App };
