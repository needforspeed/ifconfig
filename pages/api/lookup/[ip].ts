import type { NextApiRequest, NextApiResponse } from 'next'
import geoipLite from 'geoip-lite';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ip } = req.query
  const geo = geoipLite.lookup(ip as string)
  res.json(geo)
}
