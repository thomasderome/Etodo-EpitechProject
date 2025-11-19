import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.etodo.com',
  appName: 'etodo',
  webDir: 'out',
    server: {
        androidScheme: 'https'
    }
};

export default config;
