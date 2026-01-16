# Formulario de Contacto

Formulario de contacto sencillo desarrollado con Next.js, TypeScript y Tailwind CSS.

## Características

- 📝 Formulario de contacto con validación
- 🌍 Selector de código de país para teléfonos
- 🎨 Diseño responsivo con Tailwind CSS
- ⚡ API serverless con Next.js
- 💾 Base de datos con Supabase
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
- **Base de datos**: Supabase
- **Deploy**: Vercel

## Configuración de Supabase

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice (toma 1-2 minutos)

### 2. Crear la tabla de contactos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase/schema.sql`
3. Ejecuta el SQL para crear la tabla `contacts`

O puedes crear la tabla manualmente:

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users" ON contacts
  FOR INSERT
  WITH CHECK (true);
```

### 3. Obtener las credenciales

1. Ve a **Settings** → **API**
2. Copia tu **Project URL**
3. Copia tu **anon/public key**

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

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
4. **Importante**: Antes de hacer deploy, configura las variables de entorno:
   - Ve a **Settings** → **Environment Variables**
   - Agrega `NEXT_PUBLIC_SUPABASE_URL` con tu URL de Supabase
   - Agrega `NEXT_PUBLIC_SUPABASE_ANON_KEY` con tu anon key de Supabase
5. Haz click en "Deploy"

O usa Vercel CLI:

```bash
npm install -g vercel
vercel
```

**Nota**: No olvides configurar las variables de entorno en Vercel antes del deploy, de lo contrario el formulario no podrá guardar los datos.

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
