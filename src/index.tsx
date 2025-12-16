import './index.css';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { POSTHOG_CONFIG } from './shared/config/env';
import { store } from './shared/redux/store';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  
  // Only initialize PostHog if properly configured
  const appContent = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  root.render(
    <React.StrictMode>
      {POSTHOG_CONFIG.isEnabled ? (
        <PostHogProvider
          apiKey={POSTHOG_CONFIG.apiKey}
          options={{
            ...POSTHOG_CONFIG.options,
            defaults: '2025-05-24',
          }}
        >
          {appContent}
        </PostHogProvider>
      ) : (
        appContent
      )}
    </React.StrictMode>
  );
}
