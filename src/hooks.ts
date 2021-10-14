import * as cookie from 'cookie';
import mongoose from 'mongoose';
import { Cookies } from './routes/auth/schemas';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.user = cookies;

	if (!cookies.session_id) {
		request.locals.user.authenticated = false;
	}

	const userSession = await Cookies.findOne({ cookieId: cookies.session_id }).exec();

	if (userSession) {
		request.locals.user.authenticated = true;
		request.locals.user.email = userSession.email;
	} else {
		request.locals.user.authenticated = false;
	}

	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers
		}
	};
};

export const getSession = async (request) => {
	return request.locals.user
		? {
				user: {
					authenticated: true,
					email: request.locals.user.email
				}
		  }
		: {};
};
