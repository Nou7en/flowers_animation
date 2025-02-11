import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Extraemos los datos de la solicitud
    const { fecha, hora, actividad, lugar, descripcion, flores } =
      await request.json();

    // Configuración del transporte SMTP usando variables de entorno
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true si usas puerto 465, false para otros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const chofer = "Weijie Chen"; // Nombre del chofer asignado

    const mailOptions = {
      from: `"Cita de San Valentín" <${process.env.SMTP_USER}>`,
      to: "tomh.tc89@gmail.com", // Reemplaza con el destinatario real
      subject: "Confirmación de Cita de San Valentín",
      text: `Detalles de la cita:
Fecha: ${fecha}
Hora: ${hora}
Actividad: ${actividad}
Lugar: ${lugar}
Descripción: ${descripcion}
Flores: ${flores}

El chofer asignado es ${chofer}, y se acercará en la fecha y hora acordada a recogerte.

Esperamos que tengas una velada inolvidable. ¡Disfruta de este día especial! ❤️`,
      html: `
        <p>🌹 <strong>Hola Martina,</strong></p>
        <p>Tu cita especial de San Valentín ha sido confirmada. Aquí están los detalles:</p>
        <ul>
          <li>📅 <strong>Fecha:</strong> ${fecha}</li>
          <li>⏰ <strong>Hora:</strong> ${hora}</li>
          <li>💘 <strong>Actividad:</strong> ${actividad}</li>
          <li>📍 <strong>Lugar:</strong> ${lugar}</li>
          <li>📖 <strong>Descripción:</strong> ${descripcion}</li>
          <li>🌸 <strong>Flores:</strong> ${flores}</li>
        </ul>
        <p>🚗 <strong>El chofer asignado es ${chofer}, y se acercará en la fecha y hora acordada a recogerte.</strong></p>
        <p>💕 Esperamos que tengas una velada inolvidable. ¡Disfruta de este día especial! ❤️</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar email:", error);
    return NextResponse.json(
      { error: "Error al enviar email" },
      { status: 500 }
    );
  }
}
