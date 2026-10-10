# ANS · Last Asylum Plague · Servidor #233

## Qué incluye
Diseño medieval animado, dos temas persistentes, menú móvil, acceso de invitado,
tarjetas giratorias, niveles 1–30, seis días de Alliance Duel y nueve guías.
Código estático sin framework. El ZIP incorpora CSS y JavaScript en index.html.

La imagen y los emblemas son propuestas nuevas. Las reglas, artículos, rangos,
recursos, tiempos, fases, textos y capturas oficiales están pendientes:
no se han inventado datos del juego. No se pudo verificar ni migrar un sitio
anterior porque no se proporcionó su código.

## Publicación en GitHub Pages
1. Copia los archivos en la carpeta publicada que corresponda a /LAP/.
   Si tu repositorio se llama LAP, colócalos en su raíz, no en una segunda carpeta LAP.
2. Activa GitHub Pages y HTTPS. Abre https://TU-USUARIO.github.io/LAP/.
3. No abras index.html mediante file://: usa un servidor estático para probarlo.
4. No necesitas instalar dependencias ni ejecutar una compilación.

## Configuración en index.html
Busca `window.ANS_CONFIG`. Solo usa configuración pública de Firebase y el
App ID público de OneSignal. Nunca pegues cuentas de servicio ni claves REST privadas.

```js
window.ANS_CONFIG = {
  firebase: {
    apiKey: 'TU_API_KEY_PUBLICA',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    appId: 'TU_APP_ID'
  },
  oneSignalAppId: 'TU_APP_ID_PUBLICO_ONESIGNAL',
  youtubeShortId: 'ID_DE_11_CARACTERES',
  suggestionsEmail: 'TU_CORREO',
  memberCollection: 'members'
};
```

El enlace de un Short es youtube.com/shorts/ID: copia solo el ID.
Sin configuración, el sitio no simula que envió consejos o activó notificaciones.
Los invitados funcionan; no existe un botón para hacerse miembro sin aprobación.

## Firebase Authentication y Firestore
1. Activa el proveedor Email/Password en Firebase Authentication.
2. Añade TU-USUARIO.github.io a los dominios autorizados de Authentication.
3. Crea Firestore y publica firestore.rules desde la consola.
4. Para aprobar un miembro, crea members/UID con `{role: "member"}` desde la consola.
   El UID se obtiene en Authentication. Registrarse no concede permisos.
5. Los tips se guardan en tips con text, authorId, authorName y createdAt.
   Se actualizan en vivo; solo el autor puede editarlos y borrarlos.
6. Si usas colecciones o roles diferentes, adapta la consulta Y las reglas juntas.

IMPORTANTE: no reemplaces reglas de un proyecto existente sin compararlas.
Estas reglas son una propuesta para una instalación nueva. Proteger la pantalla
no protege datos incluidos en archivos públicos: para rangos confidenciales,
guárdalos en Firestore con lectura solo para miembros; no en ANS_CONTENT.
Las reglas aquí incluidas protegen los tips y la asignación de miembro.

## OneSignal · Android / iOS
1. Configura una aplicación Web Push con la URL HTTPS exacta.
2. Añade su App ID en ANS_CONFIG. El worker está en /LAP/OneSignalSDKWorker.js
   y su ámbito configurado es /LAP/. Conserva el archivo, aunque el resto sea un solo HTML.
3. Conserva manifest.json e icon-192.png / icon-512.png.
4. Android requiere navegador compatible, HTTPS y permiso de notificaciones.
5. En iOS/iPadOS 16.4 o superior, añade el sitio a la pantalla de inicio,
   ábrelo como aplicación y toca Enable notifications. Una pestaña normal no basta.
6. La entrega incluye el cableado, pero las notificaciones reales no se verificaron
   sin tu App ID, configuración del servicio y dispositivos reales.

## Contenido oficial
Busca `window.ANS_CONTENT` en index.html. Todos los textos se muestran como
texto seguro, no como HTML ejecutable.

```js
window.ANS_CONTENT = {
  rules: [{title: 'Tu regla oficial', text: 'Texto oficial'}],
  articles: [{title: 'Article 01', text: 'Texto oficial'}],
  ranks: [{rank: 'R5', name: 'Nombre oficial', text: 'Responsabilidades'}],
  sanctuary: {
    1: {resources: 'Tus recursos oficiales', time: 'Tiempo oficial', requirements: 'Requisitos oficiales'}
  },
  duel: [{title: 'Day 01 · Nombre oficial', text: 'Objetivos oficiales'}],
  guides: {
    profile: {
      author: 'Ann', avatar: 'capturas/ann.jpg', text: 'Texto de la guía',
      screenshots: [
        {src: 'capturas/perfil-1.jpg', caption: 'Pie de foto'},
        {src: 'capturas/perfil-2.jpg', caption: 'Pie de foto'}
      ]
    }
  }
};
```

Identificadores de las nueve guías: profile, minister, gift-codes, member-help,
elixir, thief, crystal, wisdom, survival.
Los carruseles permiten anterior/siguiente, ampliar, acercar/alejar, arrastrar,
rueda, pellizco y doble toque. Añade las capturas para usarlos.

## Logos y movimiento
Sustituye logo-monochrome.svg y logo-gold.svg por tus emblemas cuando los tengas.
Actualiza favicon e iconos si cambias la marca. Niebla, cenizas, cuervo y luces
usan animaciones ligeras. El ajuste del sistema “reducir movimiento” desactiva
las animaciones. La tipografía se carga de Google Fonts; sin conexión usa serif.

## Sugerencias
Any ideas? abre el formulario. Con suggestionsEmail abre el correo del visitante;
sin él permite descargar la sugerencia, sin fingir que fue enviada.

## Antes de reemplazar tu sitio
Haz una copia del sitio anterior. Compara tus IDs, colecciones, permisos y flujos.
Prueba inicio/cierre de sesión, aprobación de miembro, publicación/edición/borrado
de tips, notificaciones Android/iOS, Short, guías y temas en /LAP/.