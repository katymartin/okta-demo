/** @type { import('@storybook/react').Preview } */

import '../public/css/global-styles.css';
import '../public/css/okta-light-theme.css';
import '../src/stories/css/okta-light-stories.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
