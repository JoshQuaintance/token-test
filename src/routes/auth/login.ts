import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { Users, Cookies } from './schemas';

export const post = async ({ body }) => {
	const user = await Users.findOne({ email: body.email }).exec();

	if (!user) {
		return {
			status: 401,
			body: {
				message: 'Incorrect email or password'
			}
		};
	}

	if (user.password !== stringHash(body.password)) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized'
			}
		};
	}

	const cookieId = uuid();

	const duplicateUser = await Cookies.findOne({ email: body.email }).exec();

	if (duplicateUser) {
		await Cookies.findOneAndUpdate({ email: body.email }, { cookieId }).exec();
	} else {
		Cookies.create(
			{
				cookieId,
				email: body.email
			},
			(err, _data) => {
				if (err) throw err;
			}
		);
	}

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
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
