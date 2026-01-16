-- Tabla para almacenar los contactos del formulario
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Índice para búsquedas por fecha de creación
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones desde la API (anon key)
CREATE POLICY "Enable insert for authenticated users" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados (opcional)
-- Descomenta si quieres que solo usuarios autenticados puedan leer
-- CREATE POLICY "Enable read for authenticated users only" ON contacts
--   FOR SELECT
--   USING (auth.role() = 'authenticated');
