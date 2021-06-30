module.exports = ({ env }) => ({
    host: env("HOST", "127.0.0.1"),
    url: env("PUBLIC_URL", "https://api.rcgmedia.mx"),
    port: env.int("PORT", 1337),
    admin: {
        auth: {
            secret: env("ADMIN_JWT_SECRET", "9867d76d936cabf46b7333c627425e40"),
        },
    },
    cron: {
        enabled: true,
    },
});