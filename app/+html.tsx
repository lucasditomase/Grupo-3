import { ScrollViewStyleReset } from 'expo-router/html';
import { PropsWithChildren } from 'react';

/**
 * The Root component serves as the HTML wrapper for the application.
 * It includes global styles, meta tags, and responsive background support.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Reset styles for ScrollView */}
        <ScrollViewStyleReset />

        {/* Responsive background styles */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

/**
 * Responsive background styles for light and dark modes.
 */
const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
