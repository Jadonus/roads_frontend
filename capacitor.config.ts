import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    LocalNotifications: {
      smallIcon: "/rounded.png",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
  appId: 'io.ionic.starter',
  appName: 'roads_frontend',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: "https://dashboard.roadsbible.com/login/",
    allowNavigation: [
    "*"
    ],

  }
};

export default config;
