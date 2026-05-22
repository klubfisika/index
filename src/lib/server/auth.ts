import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { admin } from 'better-auth/plugins/admin';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { profiles } from '$lib/server/db/tables/profiles';

const isDev = env.ORIGIN?.includes('localhost');

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,

	database: drizzleAdapter(db, { provider: 'pg' }),

	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		sendResetPassword: async ({ user, url }) => {
			console.log(`Reset password for ${user.email}: ${url}`);
		}
	},

	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID || '',
			clientSecret: env.GITHUB_CLIENT_SECRET || '',
			enabled: Boolean(env.GITHUB_CLIENT_ID),
			mapProfileToUser: (profile) => ({
				email: profile.email,
				name: profile.name || profile.login,
				image: profile.avatar_url
			})
		}
	},

	session: {
		expiresIn: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60
		}
	},

	advanced: {
		cookiePrefix: 'kf13',
		crossSubDomainCookies: {
			enabled: !isDev,
			domain: isDev ? undefined : '.klubfisika.or.id'
		},
		defaultCookieAttributes: {
			secure: !isDev,
			httpOnly: true,
			sameSite: 'lax'
		}
	},

	trustedOrigins: [
		env.ORIGIN || 'http://localhost:5173',
		'https://index.klubfisika.or.id',
		'https://klubfisika.or.id',
		'https://platform.klubfisika.or.id'
	],

	databaseHooks: {
		user: {
			create: {
				after: async (newUser) => {
					await db.insert(profiles).values({
						userId: newUser.id,
						level: 'SMA',
						language: 'id',
						visibility: 'public'
					}).onConflictDoNothing();
				}
			}
		}
	},

	user: {
		changeEmail: { enabled: true },
		deleteUser: { enabled: true },
		additionalFields: {
			role: {
				type: 'string',
				required: false,
				defaultValue: 'student',
				input: false
			}
		}
	},

	plugins: [
		admin({
			defaultRole: 'student',
			adminRole: 'admin',
			defaultBanReason: 'Violation of terms',
			impersonationSessionDuration: 60 * 60
		}),
		sveltekitCookies(getRequestEvent)
	]
});
