import { NextRequest } from 'next/server';
import UAParser from 'ua-parser-js';

export default function isMobile(req: NextRequest) { 
    const parser = new UAParser();
    const userAgent = req ? req.headers.get('user-agent'): navigator.userAgent;
    const result = parser.setUA(userAgent as string).getResult();
    return result.device.type === 'mobile';
}