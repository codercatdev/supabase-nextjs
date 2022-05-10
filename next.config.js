module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: process.env.JWT_SECRET,
  },
  publicRuntimeConfig: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
};
