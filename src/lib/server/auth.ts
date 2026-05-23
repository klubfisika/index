import type { User, Session } from 'better-auth';
import { env } from '$env/dynamic/private';

const AUTH_ORIGIN = env.AUTH_ORIGIN || 'https://platform.klubfisika.or.id';

export interface AuthResult {
  user: User | null;
  session: Session | null;
}

export async function getSessionFromCommunity(headers: Headers): Promise<AuthResult> {
  try {
    const response = await fetch(`${AUTH_ORIGIN}/api/auth/get-session`, {
      headers: {
        cookie: headers.get('cookie') || ''
      }
    });

    if (!response.ok) return { user: null, session: null };

    const data = await response.json();
    return {
      user: data?.user ?? null,
      session: data?.session ?? null
    };
  } catch {
    return { user: null, session: null };
  }
}
