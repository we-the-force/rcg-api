module.exports = {
    // POST /request
    req: async ctx => {
        let requestObject = ctx.request.body.requestObject;
        console.log('Ayayay test');
        console.log("request thing", ctx.request.body);

        console.log("Sending email");

        strapi.plugins['email'].services.email.send({
            to: "erfamel@gmail.com",
            from: "about@wetheforce.com",
            subject: requestObject.subject,
            text: requestObject.subject,
            html: `<h2>Alguien se ha intentado poner en contacto con ustedes</h2>
            <br>
            <p><b>Nombre:</b> ${requestObject.name}</p>
            <p><b>Correo:</b> ${requestObject.address}</p>
            <p><b>Asunto:</b> ${requestObject.subject}</p>
            <p><b>Mensaje:</b> ${requestObject.message}</p>`
        });
        return `Ayyy si se pudo como no`;

        /*
            <h2>Alguien se ha intentado poner en contacto con ustedes</h2>
            <br>
            <p><b>Nombre:</b> pedro</p>
            <p><b>Correo:</b> pedro@mail.com</p>
            <p><b>Asunto:</b> Quiero comprar pollo</p>
            <p><b>Mensaje:</b> Ira, pues es que la verdad nomas los contactaba porque me dijeron que podia comprar pollo ahi, cuando pollo puedo comprar? </p>
        */

    },
};