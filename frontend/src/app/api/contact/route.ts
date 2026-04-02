import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { nombre, email, mensaje } = data;

        // Validación básica
        if (!nombre || !email || !mensaje) {
            return NextResponse.json(
                { error: 'Por favor, completa todos los campos.' },
                { status: 400 }
            );
        }

        // Aquí integrarías el envío de email (Resend, SendGrid, etc.)
        console.log('Mensaje de contacto recibido:', { nombre, email, mensaje });

        return NextResponse.json({
            success: true,
            message: '¡Gracias por contactarme! Te responderemos a la brevedad.'
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al procesar la solicitud.' },
            { status: 500 }
        );
    }
}
