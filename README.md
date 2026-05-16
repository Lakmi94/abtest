# AB Test Shop Portal

This is a [Next.js](https://nextjs.org) project with A/B test instrumentation. Events are logged in Supabase for `page_load`, `search`, and `add_to_cart` actions.

## Local Setup

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Set the following values in `.env.local`:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

Create a Supabase project and add a table named `experiment_events` with the following schema:

- `id`: bigint, primary key, generated identity
- `created_at`: timestamptz, default `now()`
- `participant_id`: text
- `session_id`: text
- `condition`: integer
- `event_type`: text
- `client_timestamp`: timestamptz
- `server_timestamp`: timestamptz
- `time_since_page_load`: integer
- `page`: text, nullable
- `search_query`: text, nullable
- `product_id`: text, nullable
- `product_name`: text, nullable
- `product_price`: numeric, nullable
- `product_label`: text, nullable
- `raw_event`: jsonb

## Environment Variables

Use `.env.local` for local secrets. Do not commit `.env.local`.

Required variables:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Deployment on Vercel

1. Push your project to GitHub.
2. Create a new Vercel project from the repository.
3. Add the environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy the app.

## Testing Event Collection

1. Open the deployed website or local app.
2. Search for `mouse`.
3. Click `Add to Cart` on a product.
4. Verify the `experiment_events` table in Supabase.

Collected events include:

- `page_load`
- `search`
- `add_to_cart`

Each event includes `participantId`, `sessionId`, `condition`, `timestamp`, and `timeSincePageLoad`.
