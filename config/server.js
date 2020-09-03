module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9867d76d936cabf46b7333c627425e40'),
    },
  },
  cron: {
    enabled: true,
  }
});
