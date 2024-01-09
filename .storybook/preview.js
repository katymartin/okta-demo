// Import necessary functions from '@storybook/react'
import { addDecorator, addParameters } from '@storybook/react';

// Import your ThemeProvider component
import { ThemeProvider } from './ThemeProvider';

// Import global styles and other CSS files
import '../public/css/global-styles.css';
import '../public/css/okta-theme.css';
import '../src/stories/css/okta-light-stories.css';

// Add the ThemeProvider as a decorator
addDecorator((Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
));

// Add additional parameters if needed
addParameters({
  // Your parameters
});

// Export the necessary configurations
export const parameters = {
  // Your parameters
};
