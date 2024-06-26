interface EnvConfig {
  environment: string;
  isUnderConstruction: boolean;
  title: string;
  ownerName: string;
  assetsPath: string;
  googleAnalyticsTrackingId: string;
  apiBaseUrl: string;
  appBaseUrl: string;
}

const {
  REACT_APP_NODE_ENV,
  REACT_APP_IS_UNDER_CONSTRUCTION,
  REACT_APP_TITLE,
  REACT_APP_OWNER_NAME,
  REACT_APP_ASSETS_PATH,
  REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  REACT_APP_API_BASE_URL,
  REACT_APP_BASE_URL,
} = process.env;

const env: Partial<EnvConfig> = {
  environment: REACT_APP_NODE_ENV,
  isUnderConstruction: REACT_APP_IS_UNDER_CONSTRUCTION == "true",
  title: REACT_APP_TITLE,
  ownerName: REACT_APP_OWNER_NAME,
  assetsPath: REACT_APP_ASSETS_PATH,
  googleAnalyticsTrackingId: REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  apiBaseUrl: REACT_APP_API_BASE_URL,
  appBaseUrl: REACT_APP_BASE_URL,
};

export default env;
