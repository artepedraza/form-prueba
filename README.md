# Formulario de Contacto

Formulario de contacto sencillo desarrollado con Next.js, TypeScript y Tailwind CSS.

## Características

- 📝 Formulario de contacto con validación
- 🌍 Selector de código de país para teléfonos
- 🎨 Diseño responsivo con Tailwind CSS
- ⚡ API serverless con Next.js
- 🚀 Listo para deploy en Vercel

## Campos del formulario

- **Nombre completo**: Campo de texto requerido
- **Correo electrónico**: Campo con validación de email
- **Teléfono celular**: Campo numérico con selector de código de país (lada)

## Stack Tecnológico

- **Frontend**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: API Routes (serverless)
- **Deploy**: Vercel

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Deploy en Vercel

Este proyecto está optimizado para Vercel. Para hacer deploy:

1. Sube el repositorio a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente que es un proyecto Next.js
4. Haz click en "Deploy"

O usa Vercel CLI:

```bash
npm install -g vercel
vercel
```

## API

### POST /api/contact

Endpoint para enviar el formulario de contacto.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "countryCode": "+52",
  "phone": "1234567890"
}
```

**Respuesta exitosa:**
```json
{
  "message": "¡Formulario enviado exitosamente!",
  "data": {
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "phone": "+521234567890"
  }
}
```

## Códigos de país disponibles

- 🇺🇸 Estados Unidos/Canadá (+1)
- 🇲🇽 México (+52)
- 🇪🇸 España (+34)
- 🇦🇷 Argentina (+54)
- 🇨🇱 Chile (+56)
- 🇨🇴 Colombia (+57)
- 🇵🇪 Perú (+51)
- Y más...
