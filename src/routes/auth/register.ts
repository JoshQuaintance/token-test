import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { Cookies, Users } from './schemas';

export const post = async ({ body }) => {
	const user = await Users.findOne({ email: body.email }).exec();

	if (user) {
		return {
			status: 409,
			body: {
				message: 'User with that email already exists'
			}
		};
	}

	Users.create(
		{
			email: body.email,
			username: body.username,
			password: body.password
		},
		(err, _data) => {
			if (err) throw err;
		}
	);

	const cookieId = uuid();
	Cookies.create(
		{
			cookieId,
			email: body.email
		},
		(err, _data) => {
			if (err) throw err;
		}
	);

	// Set cookie
	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 26 * 7,
			sameSite: 'strict',
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: {
			message: 'Success'
		}
	};
};
