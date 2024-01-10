// Import necessary functions from '@storybook/react'
import { Preview } from '@storybook/react';

// Import your ThemeProvider component
import { ThemeProvider } from './ThemeProvider';

// Import global styles and other CSS files
import '../public/css/global-styles.css';
import '../public/css/okta-theme.css';
import '../src/stories/css/okta-stories.css';

// Export the necessary configurations
export const parameters = {
  // Your parameters
};

const preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="default">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
