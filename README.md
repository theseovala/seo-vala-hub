# SEO Vala

Production review investigation, policy analysis, reporting, and outcome tracking.

Owner: theseovala@gmail.com

## Development

You need Node.js and Bun.

```sh
bun install
bun run dev
```

Health check endpoint:

```sh
curl http://localhost:3000/api/health
```

## Configuration

All credentials are supplied through project secrets / environment variables — nothing is hardcoded. Keep a local `.env` file for development, but do not commit real secrets. Use `.env.example` as the template.

| Variable | Purpose |
| --- | --- |
| `LOVABLE_API_KEY` | Lovable AI Gateway, email and connector gateway (managed) |
| `GOOGLE_MAPS_API_KEY` | Google Maps connector key (linked via Connectors) |
| `GOOGLE_BUSINESS_CLIENT_ID` / `GOOGLE_BUSINESS_CLIENT_SECRET` | Google Business Profile OAuth client |
| `EMAIL_SENDER_DOMAIN` / `EMAIL_FROM_DOMAIN` | Verified transactional email domain |
| `VITE_APP_URL` | Public site URL used in notification emails |

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
