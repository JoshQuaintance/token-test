import { Users } from '../auth/schemas';
import mongoose from 'mongoose';

export const get = async (context) => {
	if (!context.locals.user.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized'
			}
		};
	}

	const user = await Users.findOne({ email: context.locals.user.email }).exec();

	if (!user) {
		return {
			status: 404,
			body: {
				message: 'User not found'
			}
		};
	}

	delete user.password;

	return {
		status: 200,
		body: user
	};
};
