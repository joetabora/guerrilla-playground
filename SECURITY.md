# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please report it responsibly:

1. **DO NOT** open a public GitHub issue
2. Email: [Your contact email]
3. Include detailed information about the vulnerability
4. Allow 48 hours for initial response

We take security seriously and will respond promptly to legitimate reports.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Measures

### 1. No Secrets in Code
- All API keys, tokens, and credentials are stored in Vercel environment variables
- `.env` files are gitignored and never committed
- No sensitive data in the codebase

### 2. Deployment Security
- Production deployments are controlled through Vercel
- Only authorized team members can deploy to production
- Branch protection rules prevent unauthorized changes

### 3. Dependencies
- Regular security audits via `npm audit`
- Automated dependency updates through Dependabot
- Minimal dependency footprint to reduce attack surface

### 4. Client-Side Only
- This is a static Next.js site with no backend
- No database connections or server-side secrets
- All code runs in the user's browser

## For Contributors

### Safe Contributions
When contributing, please:
- ✅ Never commit API keys, tokens, or credentials
- ✅ Use environment variables for any sensitive configuration
- ✅ Follow secure coding practices
- ✅ Run `npm audit` before submitting PRs

### What You CAN'T Do (Even with Repo Access)
- Deploy to the production Vercel instance
- Access production environment variables
- Modify the live site without PR approval
- Access domain or hosting credentials

## Open Source Security Model

This repository being open source does **not** compromise security because:

1. **Separation of Concerns**: Code is public, deployment credentials are private
2. **Review Process**: All changes go through PR review before merging
3. **Protected Branches**: Main branch requires review and passing checks
4. **Vercel Integration**: Only authorized Vercel accounts can deploy

## Security Best Practices We Follow

- ✅ Principle of least privilege
- ✅ Defense in depth
- ✅ Secure by default
- ✅ Regular security audits
- ✅ Transparent disclosure process
- ✅ Community security reviews

## Updates

This security policy is reviewed quarterly and updated as needed.

**Last Updated:** December 26, 2025

