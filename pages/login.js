import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

/**
 * Login placeholder page.
 * Provides a mock auth experience until real authentication is wired up.
 *
 * @returns {JSX.Element} Login page view.
 */
export default function Login() {
  return (
    <>
      <Head>
        <title>Member Access | Guerrilla Social Club</title>
        <meta
          name="description"
          content="Sign in to preview premium creative experiments from Joseph Tabora."
        />
      </Head>

      <main className={styles.page}>
        <section className={styles.card} aria-labelledby="login-heading">
          <h1 id="login-heading" className={styles.title}>
            Guerrilla Social Club Members
          </h1>
          <p className={styles.subtitle}>
            Sign in to unlock premium demos, AI experiment logs, and future workshops.
          </p>

          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              window.alert('Future authentication flow coming soon!');
            }}
          >
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="you@creative.studio"
                required
              />
            </label>

            <label className={styles.label}>
              Password
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              Enter Club
            </button>
          </form>

          <div className={styles.links}>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => window.alert('Reset password flow coming soon!')}
            >
              Forgot password?
            </button>
            <Link href="/" className={styles.textLink}>
              Back to home
            </Link>
          </div>

          {/* Placeholder for future auth provider integration */}
          {/*
            TODO: Integrate authentication provider (e.g., Clerk, Supabase Auth, or Auth0).
            Steps:
            1. Install SDK and configure environment variables.
            2. Replace this form with a <SignIn /> component.
            3. Protect premium routes via middleware or server-side guards.
          */}
        </section>
      </main>
    </>
  );
}

