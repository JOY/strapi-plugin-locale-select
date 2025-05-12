import React, { useState, useEffect } from 'react';
import {
  Main,
  Box,
  Typography,
  TextInput,
  Button,
  Flex,
  Alert,
} from '@strapi/design-system';
import { Check, Play } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import { PLUGIN_ID } from '../pluginId';
// Import helper functions for API requests
const request = async (url: string, options?: any) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const Settings = () => {
  const { formatMessage } = useIntl();
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Load existing settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await request(`/${PLUGIN_ID}/settings`, {
        method: 'GET',
      });
      if (data && data.googleMapsApiKey) {
        setGoogleMapsApiKey(data.googleMapsApiKey);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      console.log('Saving settings to API...');
      await request(`/${PLUGIN_ID}/settings`, {
        method: 'POST',
        body: { googleMapsApiKey },
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Main>
      <Box padding={8} background="neutral100">
        <Typography variant="alpha">
          {formatMessage({ id: getTranslation('settings.title') })}
        </Typography>
        <Box paddingTop={4}>
          <Typography variant="epsilon">
            {formatMessage({ id: getTranslation('settings.googleMaps.title') })}
          </Typography>
          <Box paddingTop={2}>
            <TextInput
              name="googleMapsApiKey"
              label={formatMessage({
                id: getTranslation('settings.googleMaps.apiKey'),
              })}
              placeholder="AIza..."
              hint={formatMessage({
                id: getTranslation('settings.googleMaps.apiKey.hint'),
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoogleMapsApiKey(e.target.value)}
              value={googleMapsApiKey}
            />
          </Box>
          <Box paddingTop={4}>
            <Flex gap={2}>
              <Button
                onClick={saveSettings}
                loading={isSaving}
                startIcon={<Check />}
              >
                {formatMessage({ id: getTranslation('settings.save') })}
              </Button>
              <Button
                variant="tertiary"
                startIcon={<Play />}
                onClick={() => window.location.reload()}
              >
                {formatMessage({ id: getTranslation('settings.restart') })}
              </Button>
            </Flex>
          </Box>
          {showAlert && (
            <Box paddingTop={4}>
              <Alert closeLabel="Close" title="Success" variant="success">
                {formatMessage({ id: getTranslation('settings.saved') })}
              </Alert>
            </Box>
          )}
          <Box paddingTop={4}>
            <Flex direction="column" gap={2}>
              <Typography variant="delta">
                {formatMessage({ id: getTranslation('settings.googleMaps.help.title') })}
              </Typography>
              <Typography variant="omega">
                {formatMessage({ id: getTranslation('settings.googleMaps.help.description') })}
              </Typography>
              <Typography variant="omega">
                - {formatMessage({ id: getTranslation('settings.googleMaps.help.step1') })}
              </Typography>
              <Typography variant="omega">
                - {formatMessage({ id: getTranslation('settings.googleMaps.help.step2') })}
              </Typography>
              <Typography variant="omega">
                - {formatMessage({ id: getTranslation('settings.googleMaps.help.step3') })}
              </Typography>
              <Typography variant="omega">
                - {formatMessage({ id: getTranslation('settings.googleMaps.help.step4') })}
              </Typography>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export { Settings };
