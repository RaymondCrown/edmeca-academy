const BRIDGE_URL = process.env.EDMECA_BRIDGE_URL || '__BRIDGE_URL__';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (BRIDGE_URL === '__BRIDGE_URL__') {
    return res.status(503).json({ ok: false, configured: false, error: 'EDMECA_BRIDGE_URL is not configured' });
  }

  try {
    const url = new URL(BRIDGE_URL);
    if (req.method === 'GET') {
      Object.entries(req.query || {}).forEach(([key, value]) => url.searchParams.set(key, value));
    }
    const response = await fetch(url, {
      method: req.method === 'GET' ? 'GET' : 'POST',
      headers: req.method === 'GET' ? undefined : { 'Content-Type': 'application/json' },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body || {}),
      redirect: 'follow',
    });
    const text = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (error) {
    res.status(502).json({ ok: false, error: String(error) });
  }
}
