/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			issuer: { and: [/\.(js|ts|md)x?$/] },
			type: "asset/resource",
		});

		// Optimize for Vercel serverless environment
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
			};
		}

		return config;
	},
	env: {
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		BUCKET_NAME: process.env.BUCKET_NAME,
	},
};

export default nextConfig;
