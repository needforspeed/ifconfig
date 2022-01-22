// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip';
import geoipLite from 'geoip-lite';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip = requestIp.getClientIp(req) as string
  const geo = geoipLite.lookup(ip)
  res.json(geo)
}
