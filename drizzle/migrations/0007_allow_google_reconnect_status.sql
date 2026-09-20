ALTER TABLE public.google_business_connections
  DROP CONSTRAINT IF EXISTS google_business_connections_status_check;

ALTER TABLE public.google_business_connections
  ADD CONSTRAINT google_business_connections_status_check
  CHECK (status IN ('connected','reauthorization_required','needs_reconnect','revoked'));
