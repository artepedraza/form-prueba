import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
}

// Función para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar teléfono
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10,14}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validación de campos requeridos
    if (!body.name || !body.email || !body.phone || !body.countryCode) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación del nombre (mínimo 2 caracteres)
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }

    // Validación del email
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'El correo electrónico no es válido' },
        { status: 400 }
      );
    }

    // Validación del teléfono
    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { error: 'El teléfono debe contener entre 10 y 14 dígitos numéricos' },
        { status: 400 }
      );
    }

    // Aquí es donde procesarías los datos del formulario
    // Por ejemplo: guardar en base de datos, enviar email, etc.

    // Por ahora, solo registramos en consola
    console.log('Nuevo contacto recibido:', {
      name: body.name,
      email: body.email,
      phone: `${body.countryCode}${body.phone}`,
      timestamp: new Date().toISOString(),
    });

    // Respuesta exitosa
    return NextResponse.json(
      {
        message: '¡Formulario enviado exitosamente! Nos pondremos en contacto pronto.',
        data: {
          name: body.name,
          email: body.email,
          phone: `${body.countryCode}${body.phone}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor, intenta de nuevo más tarde.' },
      { status: 500 }
    );
  }
}

// Método GET para verificar que la API está funcionando
export async function GET() {
  return NextResponse.json(
    {
      message: 'API de contacto funcionando correctamente',
      endpoints: {
        POST: '/api/contact - Enviar formulario de contacto',
      },
    },
    { status: 200 }
  );
}
