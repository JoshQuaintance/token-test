import mongoose from 'mongoose';

mongoose.connect(import.meta.env.VITE_SECRET_MONGO_URI as string);

export const UserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
});

export const CookieSchema = new mongoose.Schema({
	cookieId: { type: String, required: true },
	email: { type: String, required: true }
});

export const Cookies = mongoose.models.cookies || mongoose.model('cookies', CookieSchema);
export const Users = mongoose.models.users || mongoose.model('users', UserSchema);

export default {
	cookie: CookieSchema,
	user: UserSchema
};
