import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

// ? JWTs
const signatureFunction = crypto.createSign('RSA-SHA256');

const payloadObj = {
	sub: '1234567890',
	name: 'John Doe',
	admin: true,
	iat: 1516239022
};

const signedJWT = jwt.sign(
	payloadObj,
	{
		key: process.env.VITE_SECRET_ENCRYPTION_PRIVATE_KEY,
		passphrase: process.env.VITE_SECRET_ENCRYPTION_PASSPHRASE
	},
	{ algorithm: 'RS256' }
);

console.log(signedJWT);

jwt.verify(
	signedJWT,
	process.env.VITE_SECRET_ENCRYPTION_PUBLIC_KEY,
	{ algorithms: ['RS256'] },
	(err, payload) => {
		if (err?.name === 'TokenExpiredError') {
			console.log('Whoops, your token has expired!');
		}

		if (err?.name === 'JsonWebTokenError') {
			console.log('That JWT is malformed!');
		}

		if (err === null) {
			console.log('Your JWT was successfully validated!');
		}

		// Both should be the same
		console.log(payload);
		console.log(payloadObj);
	}
);

// const header = JWT.split('.')[0];
// const payload = JWT.split('.')[1];
// const signature = JWT.split('.')[2];

// verify.write(header + '.' + payload);
// verify.end();

// const signatureb64 = base64.toBase64(signature);
// const isValid = verify.verify(process.env.VITE_SECRET_ENCRYPTION_PUBLIC_KEY, signature, 'base64');

// console.log(isValid);

// ? Encrypting and decrypting items
// const encrypted = crypto.publicEncrypt(
// 	{
// 		key: process.env.VITE_SECRET_ENCRYPTION_PUBLIC_KEY,
// 		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
// 		oaepHash: 'sha256'
// 	},
// 	Buffer.from(data)
// );

// const decrypted = crypto
// 	.privateDecrypt(
// 		{
// 			key: process.env.VITE_SECRET_ENCRYPTION_PRIVATE_KEY,
// 			padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
// 			oaepHash: 'sha256',
// 			passphrase: process.env.VITE_SECRET_ENCRYPTION_PASSPHRASE
// 		},
// 		encrypted
// 	)
// 	.toString();

// console.log(decrypted)

// ? Generate new key pair
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
// 	// The standard secure default length for RSA keys is 2048 bits
// 	modulusLength: 2048,
// 	publicKeyEncoding: {
// 		type: 'spki',
// 		format: 'pem'
// 	},
// 	privateKeyEncoding: {
// 		type: 'pkcs8',
// 		format: 'pem',
// 		cipher: 'aes-256-cbc',
// 		passphrase: 'bananas'
// 	}
// });
