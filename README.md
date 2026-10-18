# IEEE BRAC University Student Branch Website (Vercel Edition)

This is the standard **Next.js 15 (App Router)** edition of the IEEE BRAC University Student Branch official web platform, architected for deployment on **Vercel** while maintaining seamless integration with **Cloudflare D1** (SQLite database via REST API) and **Cloudflare R2** (media storage via AWS S3 SDK).

---

## Architecture Overview

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Server Actions)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite) accessed over HTTP using `drizzle-orm/sqlite-proxy`
* **Media Storage**: [Cloudflare R2](https://developers.cloudflare.com/r2/) object storage accessed via `@aws-sdk/client-s3`
* **Authentication**: [Better Auth](https://www.better-auth.com/) with Drizzle SQLite adapter
* **Hosting**: Optimized for **Vercel** serverless and edge networks

---

## Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your Cloudflare credentials and secrets in `.env.local`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `BETTER_AUTH_SECRET` | 32+ character random secret for session encryption | `openssl rand -hex 32` |
| `BETTER_AUTH_URL` | Canonical origin of your app | `http://localhost:3000` |
| `WEBMASTER_EMAIL` | Email granted access to `/admin` | `abir4dev@gmail.com` |
| `NEXT_PUBLIC_CURRENT_YEAR` | Active executive year | `2026` |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID | *(From Cloudflare Dashboard)* |
| `CLOUDFLARE_D1_DATABASE_ID` | Database ID of `ieeebracu-db` | `ee26fed4-2154-427c-b890-74d09c73f3d1` |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token with `D1:Edit` permission | *(From Cloudflare API Tokens)* |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 S3 Access Key ID | *(From Cloudflare R2 API Tokens)* |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 S3 Secret Access Key | *(From Cloudflare R2 API Tokens)* |
| `R2_BUCKET_NAME` | R2 Bucket Name | `ieeebracu-media` |
| `R2_PUBLIC_URL` *(Optional)* | Custom domain or public dev URL for R2 bucket | `https://media.ieeebracu.com` |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: standard Next.js Vercel edition"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import into Vercel**:
   * Navigate to [Vercel Dashboard](https://vercel.com/new).
   * Click **Import** next to your GitHub repository.
   * Vercel automatically detects Next.js (no custom build command needed).

3. **Add Environment Variables**:
   * Under **Settings > Environment Variables**, add the environment variables listed in `.env.example`.
   * For production, set `BETTER_AUTH_URL` to your production URL (e.g. `https://ieee-bracu.vercel.app` or your custom domain).

4. **Deploy**:
   * Click **Deploy**. Vercel will build and launch your application globally.

---

## Cloudflare D1 & R2 Setup Notes

### Cloudflare API Token (for D1)
1. Go to **Cloudflare Dashboard** > **My Profile** > **API Tokens**.
2. Click **Create Token** > **Create Custom Token**.
3. Name: `IEEE BRACU Vercel D1 Access`.
4. Permissions: `Account` > `D1` > `Edit`.
5. Copy the generated token into `CLOUDFLARE_API_TOKEN`.

### Cloudflare R2 S3 Credentials
1. Go to **Cloudflare Dashboard** > **R2** > **Manage R2 API Tokens**.
2. Click **Create API Token**.
3. Permissions: **Object Read & Write**.
4. Specify bucket: `ieeebracu-media` (or all buckets).
5. Copy the **Access Key ID** and **Secret Access Key** into `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`.

---

## Project Scripts

* `npm run dev`: Starts local Next.js development server
* `npm run build`: Builds the production bundle for Vercel
* `npm run start`: Runs production server locally
* `npm run lint`: Runs ESLint checks
* `npm run db:generate`: Generates Drizzle migrations
* `npm run seed:webmaster`: Interactive script to generate webmaster seed SQL
* `npm run reset:webmaster`: Interactive script to generate password reset SQL
