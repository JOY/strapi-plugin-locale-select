import { Main, Link, Box, Typography, Stack, Button } from '@strapi/design-system';
import { Cog } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import TimezoneSelect from '../components/TimezoneSelect';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <Box padding={8} background="neutral100">
        <Stack spacing={4}>
          <Typography variant="alpha">
            {formatMessage({ id: getTranslation('plugin.name') })}
          </Typography>
          <Typography variant="epsilon">
            Manage locale and location-based settings for your content
          </Typography>
          <Box>
            <Button
              variant="secondary"
              startIcon={<Cog />}
              to="/admin/plugins/locale-select/settings"
              as={Link}
            >
              Configure Settings
            </Button>
          </Box>
        </Stack>
      </Box>
    </Main>
  );
};

export { HomePage };
