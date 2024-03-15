module.exports = {
    experimental: {
      outputFileTracingRoot: process.env.NODE_ENV === 'production' ? '/' : undefined,
    },
  }