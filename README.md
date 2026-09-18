# Shalyn Coffee — Tarjeta de sellos digital

## Qué contiene este proyecto
App web (React + Vite) conectada a Supabase (base de datos + login por correo).
Incluye: registro/login de clientes, tarjeta de sellos, avisos/anuncios, y panel
de empleado para sellar tarjetas y publicar avisos.

## Cómo subir esto a GitHub (sin usar la terminal)
1. Entra a github.com, crea un nuevo repositorio (botón "New").
2. Ponle de nombre `shalyn-coffee` y créalo vacío (sin README).
3. Dentro del repo, click en "uploading an existing file".
4. Arrastra TODOS los archivos y carpetas de este proyecto (respetando las
   carpetas `src`, `public`, etc.) y dale "Commit changes".
   Nota: el archivo `.env` NO debes subirlo a GitHub (contiene tus llaves).
   Solo sube `.env.example` como referencia.

## Cómo publicarlo con Vercel
1. Entra a vercel.com y da clic en "Add New… → Project".
2. Conecta tu cuenta de GitHub y selecciona el repositorio `shalyn-coffee`.
3. En "Environment Variables" agrega:
   - `VITE_SUPABASE_URL` = (tu Project URL de Supabase)
   - `VITE_SUPABASE_ANON_KEY` = (tu anon public key de Supabase)
4. Dale clic en "Deploy". En 1-2 minutos tendrás tu URL real, algo como
   `shalyn-coffee.vercel.app`.

## Cómo convertirte en empleado (dueño del negocio)
1. Regístrate en la web como cualquier cliente normal.
2. Ve a Supabase → Table Editor → tabla `profiles`.
3. Busca tu usuario (por tu nombre o correo) y cambia la columna `is_staff`
   de `false` a `true`.
4. Cierra sesión y vuelve a entrar en la web: ahora verás el panel de
   empleado en vez de la tarjeta de cliente.

## Pendientes para una versión más pulida (no bloquean el lanzamiento)
- Generar el QR real (se puede agregar la librería `qrcode.react`).
- Lectura real de QR con la cámara (librería `html5-qrcode` o similar).
- Íconos PNG reales para el manifest.json (192x192 y 512x512) — ahorita
  faltan esos dos archivos de imagen en `/public`.
- Personalizar la plantilla del correo de verificación desde
  Supabase → Authentication → Email Templates.
