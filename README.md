# SEO Vala

Production review investigation, policy analysis, reporting, and outcome tracking.

Owner: theseovala@gmail.com

## Development

You need Node.js and Bun.

```sh
bun install
bun run dev
```

## Configuration

All credentials are supplied through project secrets / environment variables — nothing is hardcoded.

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
