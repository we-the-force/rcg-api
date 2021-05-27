// host: env("HOST", "0.0.0.0"),
// url: env("PUBLIC_URL", "http://149.28.252.152:1337"),

module.exports = ({ env }) => ({
    host: env("HOST", "localhost"),
    url: env("PUBLIC_URL", ""),
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