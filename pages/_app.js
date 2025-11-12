/**
 * Custom App component to initialize pages.
 * Imports global styles so they apply across the entire app.
 */
import '../styles/globals.css';

/**
 * The MyApp component wraps every page allowing us to share layout/state.
 * @param {Object} props - Component props provided by Next.js.
 * @param {React.ComponentType} props.Component - Active page.
 * @param {Object} props.pageProps - Page-specific properties.
 * @returns {JSX.Element} Rendered page component.
 */
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


