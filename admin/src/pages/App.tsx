import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import { HeaderLayout, ContentLayout, Layout } from '@strapi/design-system';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { HomePage } from './HomePage';
import { Settings } from './Settings';
import { getTranslation } from '../utils/getTranslation';

const App = () => {
  const { formatMessage } = useIntl();
  
  return (
    <Layout>
      <Helmet title={formatMessage({ id: getTranslation('plugin.name') })} />
      <HeaderLayout
        title={formatMessage({ id: getTranslation('plugin.name') })}
        subtitle={formatMessage({ id: getTranslation('plugin.name') })}
      />
      <ContentLayout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </ContentLayout>
    </Layout>
  );
};

export { App };
