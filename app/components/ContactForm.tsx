'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
}

const countryCodes = [
  { code: '+1', country: 'Estados Unidos/Canadá' },
  { code: '+52', country: 'México' },
  { code: '+34', country: 'España' },
  { code: '+54', country: 'Argentina' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+51', country: 'Perú' },
  { code: '+58', country: 'Venezuela' },
  { code: '+593', country: 'Ecuador' },
  { code: '+591', country: 'Bolivia' },
  { code: '+598', country: 'Uruguay' },
  { code: '+595', country: 'Paraguay' },
  { code: '+55', country: 'Brasil' },
  { code: '+44', country: 'Reino Unido' },
  { code: '+49', country: 'Alemania' },
  { code: '+33', country: 'Francia' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+52',
    phone: '',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Enviando...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({
          name: '',
          email: '',
          countryCode: '+52',
          phone: '',
        });
      } else {
        setStatus({ type: 'error', message: data.error || 'Error al enviar el formulario' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión. Intenta de nuevo.' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Formulario de Contacto
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Déjanos tus datos y nos pondremos en contacto contigo
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                placeholder="juan@ejemplo.com"
              />
            </div>

            {/* Campo de Teléfono con selector de código de país */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Teléfono celular
              </label>
              <div className="flex gap-2 items-stretch">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10,14}"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="1234567890"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ingresa solo números, sin espacios ni guiones
              </p>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {status.type === 'loading' ? 'Enviando...' : 'Enviar formulario'}
            </button>

            {/* Mensaje de estado */}
            {status.message && (
              <div
                className={`p-4 rounded-lg ${
                  status.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : status.type === 'error'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
