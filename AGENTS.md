# AGENTS.md - Prode Mundial 2026 Mobile PWA

## Contexto del proyecto

Este repositorio corresponde a la app mobile/PWA del sistema **Prode Mundial 2026**.

La arquitectura del sistema está separada en dos proyectos:

1. **Proyecto web/PC**
   - Contiene la API principal.
   - Contiene Prisma.
   - Contiene la base de datos.
   - Contiene lógica de administración.
   - Expone endpoints como `/api/app-auth/login`, `/api/partidos`, `/api/pronosticos`, `/api/ranking`, etc.

2. **Proyecto mobile/PWA**
   - Este repositorio.
   - No debe conectarse directamente a la base de datos.
   - No debe usar Prisma.
   - No debe tener lógica pesada de backend.
   - Debe consumir la API del proyecto web/PC.
   - Debe estar optimizado para celular, experiencia táctil y uso como PWA.

## Objetivo principal

Construir una app mobile/PWA moderna, simple y rápida para que los usuarios puedan:

- Registrarse.
- Iniciar sesión.
- Ver partidos del Mundial 2026.
- Cargar pronósticos.
- Editar pronósticos mientras estén abiertos.
- Ver sus pronósticos.
- Ver ranking.
- Recibir feedback claro de estados, errores y cargas.
- Instalar la app como PWA en el celular.

## Stack esperado

Usar preferentemente:

- Next.js con App Router.
- TypeScript estricto.
- TailwindCSS.
- shadcn/ui.
- Radix UI.
- Lucide React.
- Zustand para estado global liviano.
- Axios para llamadas HTTP.
- Zod para validaciones.
- React Hook Form para formularios.
- Sonner para toasts.
- Serwist o configuración equivalente para PWA/service worker.

## Reglas importantes

### 1. No usar Prisma en mobile

No instalar ni importar:

```ts
@prisma/client
prisma
```

La PWA debe consumir endpoints HTTP.

Correcto:

```ts
await axiosInstance.get("/partidos");
```

Incorrecto:

```ts
await prisma.partido.findMany();
```

### 2. No acceder directo a Supabase/Postgres

No crear clientes de base de datos en mobile.

La PWA no debe tener:

- `DATABASE_URL`
- `DIRECT_URL`
- Prisma Client
- queries SQL
- lógica de seed
- migraciones

### 3. Mantener contratos de API

No cambiar endpoints, payloads ni nombres de campos sin revisar primero el uso actual.

Antes de modificar una llamada a API:

1. Buscar el service/hook relacionado.
2. Revisar el tipo TypeScript.
3. Revisar si ya existe un helper.
4. Hacer el cambio más chico posible.

### 4. Reutilizar antes de crear

Antes de crear un componente, hook, helper, schema o service nuevo, buscar si ya existe algo parecido.

Preferir esta estructura por features y responsabilidades:

```txt
src/
  app/
    login/
      page.tsx
    register/
      page.tsx
    inicio/
      page.tsx
  components/
    ui/
    shared/
      AppButton.tsx
      EmptyState.tsx
      ErrorState.tsx
      LoadingState.tsx
  features/
    auth/
      components/
      hooks/
      services/
      schemas/
      types/
      helpers/
      constants/
    home/
      components/
      hooks/
      services/
      types/
      helpers/
      constants/
    partidos/
      components/
      hooks/
      services/
      types/
      helpers/
      constants/
    pronosticos/
      components/
      hooks/
      services/
      schemas/
      types/
      helpers/
      constants/
    ranking/
      components/
      hooks/
      services/
      types/
      helpers/
      constants/
    fixture/
      components/
      hooks/
      services/
      types/
      helpers/
      constants/
  lib/
    axios.ts
    env.ts
    utils.ts
  stores/
    auth.store.ts
```

Regla base: si una pantalla empieza a crecer, separar por secciones visuales, lógica reutilizable, tipos, helpers y constantes antes de que se convierta en código sábana.

### 5. Hacer cambios chicos

No hacer refactors grandes salvo que se pidan explícitamente.

Cada tarea debe intentar tocar la menor cantidad de archivos posible.

Evitar:

- Cambiar arquitectura completa.
- Renombrar carpetas sin necesidad.
- Cambiar contratos de API.
- Cambiar estilos globales sin pedido.
- Reescribir componentes completos si alcanza con una modificación puntual.

### 6. Código listo para copiar y pegar

Cuando se genere código, entregar archivos completos si el usuario lo pide.

El usuario suele pedir:

- “dame el archivo completo”
- “para copiar y pegar”
- “paso a paso”

Responder con:

1. Ruta del archivo.
2. Código completo.
3. Explicación breve de qué se cambió.
4. Comandos para probar.

### 7. UI mobile-first

Diseñar siempre pensando primero en celular.

Reglas de UI:

- Evitar tablas grandes en mobile.
- Preferir cards, accordions, tabs o listas.
- Botones grandes y fáciles de tocar.
- Inputs con buen espacio vertical.
- Estados claros: cargando, vacío, error, éxito.
- No saturar la pantalla con badges.
- Usar textos cortos.
- Mantener jerarquía visual clara.
- Priorizar rendimiento y simplicidad.

### 8. Estilo visual del proyecto

Mantener una estética moderna para Mundial 2026:

- Cards con bordes redondeados.
- Gradientes suaves.
- Sombras sutiles.
- Badges claros.
- Íconos Lucide.
- Buen uso de banderas.
- Colores vivos pero no saturados.
- Diseño limpio, deportivo y mobile.

No usar diseños genéricos sin identidad.

### 9. Auth mobile

La app mobile debe usar la API existente.

Flujo esperado:

- Login contra endpoint del proyecto web/PC.
- Guardar token/cookie según implementación existente.
- Mantener sesión en Zustand o cookie.
- Tener `/login`.
- Tener protección de rutas privadas.
- Redirigir al login si no hay sesión.
- Mostrar loader mientras se valida sesión.

No duplicar lógica de autenticación compleja si ya existe en backend.

### 10. Registro mobile

El registro mobile debe enviar:

```ts
{
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}
```

Los usuarios nuevos deben quedar en estado pendiente, por ejemplo:

```ts
estado: "PENDIENTE"
```

El usuario pendiente no debe poder iniciar sesión hasta que un administrador lo apruebe desde el sistema web/PC.

No implementar aprobación de usuarios en la PWA salvo que se pida explícitamente.

### 11. Pronósticos

Reglas funcionales importantes:

- El usuario puede crear o editar pronósticos hasta cierto tiempo antes del partido.
- Actualmente se usa como referencia el cierre 30 minutos antes del inicio.
- Si el partido está cerrado, no permitir edición.
- Mostrar estados claros:
  - “Abierto”
  - “Cierra pronto”
  - “Cerrado”
  - “Finalizado”

No confiar solo en validaciones del frontend. El backend debe seguir validando también.

### 12. Ranking

El ranking debe consumirse desde API.

No calcular ranking pesado en frontend si el backend ya lo provee.

La UI debe mostrar:

- Posición.
- Nombre del usuario.
- Puntos.
- Indicador visual para el usuario actual si está disponible.
- Estado vacío si todavía no hay datos.

### 13. Manejo de errores

No ocultar errores.

Usar mensajes claros:

- “No pudimos cargar los partidos.”
- “Tu sesión expiró. Volvé a iniciar sesión.”
- “No se pudo guardar el pronóstico.”
- “El pronóstico ya está cerrado para este partido.”

En consola se pueden loguear errores técnicos, pero al usuario mostrar mensajes entendibles.

### 14. Axios

Centralizar llamadas HTTP en `src/lib/axios.ts`.

No repetir baseURL en cada archivo.

Ejemplo esperado:

```ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
```

Los services deben usar `axiosInstance`.

### 15. Variables de entorno

Usar variables públicas solo cuando correspondan.

Ejemplo:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Prode Mundial 2026
```

No exponer secretos en variables `NEXT_PUBLIC_`.

### 16. Validaciones

Usar Zod para formularios importantes.

Ejemplo:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
```

### 17. TypeScript

Evitar `any`.

Si no hay tipo definido, crear uno simple y claro.

Preferir:

```ts
type Partido = {
  id: string;
  fecha: string;
};
```

Antes que:

```ts
const partido: any = data;
```

### 18. Componentes y modularización por defecto

Escribir código modular por defecto.

Evitar archivos grandes tipo “código sábana”. Una pantalla no debe tener todo junto: JSX extenso, lógica de datos, helpers, tipos, constantes, llamadas HTTP y componentes internos grandes.

Reglas:

- Las `page.tsx` deben ser entry points simples.
- Si una pantalla tiene varias secciones visuales, separarla por componentes.
- Si hay lógica reutilizable de cliente, extraerla a `hooks/`.
- Si hay llamadas HTTP, moverlas a `services/`.
- Si hay funciones puras de formato, cálculo o fallback, moverlas a `helpers/` o `utils/`.
- Si hay tipos repetidos o compartidos, moverlos a `types/`.
- Si hay textos, opciones, items de menú, acciones rápidas o configuraciones fijas, moverlos a `constants/`.
- Si un componente supera aproximadamente 150-200 líneas o mezcla muchas responsabilidades, proponer dividirlo.
- Si una `page.tsx` supera aproximadamente 80-120 líneas por JSX/lógica visual, mover el contenido a un componente principal de feature.
- No duplicar código si puede reutilizarse de forma clara.
- No separar de más componentes mínimos si eso empeora la lectura. Separar cuando mejore mantenibilidad.

Estructura preferida para una pantalla grande:

```txt
page.tsx
components/
  PartidoCard.tsx
  PartidoList.tsx
  PronosticoForm.tsx
hooks/
  usePartidos.ts
services/
  partidos.service.ts
types/
  partido.types.ts
helpers/
  partido.helpers.ts
constants/
  partido.constants.ts
```

Ejemplo recomendado para `page.tsx`:

```tsx
import { MobileHomePage } from "@/features/home/components/mobile-home/mobile-home-page";

export default function Page() {
  return <MobileHomePage />;
}
```

### 19. Loading, empty y error states

Toda pantalla que consuma API debe contemplar:

- Loading.
- Error.
- Empty state.
- Estado correcto con datos.

No dejar pantallas en blanco.

### 20. PWA

La app debe prepararse para funcionar como PWA.

Tener en cuenta:

- `manifest.json`.
- Iconos.
- Nombre de app.
- Theme color.
- Service worker.
- Cache controlado.
- Experiencia instalable.
- Mobile viewport correcto.

No cachear datos sensibles sin criterio.

No cachear respuestas privadas de usuario si pueden quedar expuestas.

### 21. Performance

Priorizar:

- Componentes simples.
- Evitar renders innecesarios.
- No hacer polling global sin necesidad.
- No consultar endpoints repetidamente.
- Cachear datos estáticos cuando sea razonable.
- Separar datos públicos y privados.

Para partidos finalizados, se puede sugerir cache porque el resultado no debería cambiar.

Para partidos en vivo, evitar cache largo.

### 22. Seguridad

No guardar secretos en frontend.

No confiar en permisos del frontend.

No permitir acciones de admin desde mobile salvo pedido explícito.

No exponer tokens en logs.

No imprimir variables de entorno sensibles.

### 23. Accesibilidad

Mantener:

- Labels en formularios.
- Botones con texto claro.
- Estados disabled visibles.
- Contraste suficiente.
- Navegación táctil cómoda.
- Inputs con autocomplete cuando corresponda.

### 24. Convenciones de nombres

Usar español para dominio del negocio cuando ya esté en español:

- `partido`
- `pronostico`
- `ranking`
- `seleccion`
- `fase`

Usar inglés para conceptos técnicos comunes si ya están así:

- `hooks`
- `services`
- `types`
- `utils`
- `components`

### 25. Antes de modificar

Antes de tocar código:

1. Inspeccionar estructura del proyecto.
2. Buscar archivos relacionados.
3. Leer los tipos existentes.
4. Revisar services/hooks existentes.
5. Proponer o aplicar el cambio mínimo necesario.

### 26. Después de modificar

Después de cambiar código, correr cuando sea posible:

```bash
npm run lint
npm run build
```

Si el proyecto todavía está en etapa inicial y no compila por cosas ajenas al cambio, explicar qué falló y dónde.

### 27. No ejecutar comandos peligrosos

No ejecutar sin pedido explícito:

```bash
npm audit fix --force
rm -rf
npx prisma migrate reset
npx prisma db push --force-reset
```

No borrar archivos masivamente.

No modificar `.env` con secretos reales.

### 28. Respuesta esperada al usuario

Responder siempre en español.

El usuario prefiere explicaciones paso a paso y ejemplos de código.

Cuando haya errores, explicar:

1. Qué significa.
2. Por qué pasa.
3. Qué archivo tocar.
4. Qué código poner.
5. Qué comando correr para probar.

### 29. Prioridad del proyecto

La prioridad es construir una PWA usable y estable, no sobrediseñada.

Orden recomendado:

1. Base del proyecto.
2. Layout mobile.
3. Login.
4. Registro.
5. Sesión persistente.
6. Pantalla de partidos.
7. Carga de pronósticos.
8. Mis pronósticos.
9. Ranking.
10. PWA manifest/service worker.
11. Pulido visual.
12. Optimización.

### 30. Criterio general

Ante dudas:

- No inventar contratos de API.
- No asumir campos si no existen.
- Buscar primero en el código.
- Hacer cambios pequeños.
- Mantener mobile-first.
- Mantener el proyecto simple.
- Priorizar experiencia de usuario.


### 31. Regla obligatoria para pantallas nuevas

Cuando se cree una pantalla nueva, no armar todo dentro de `page.tsx`.

La `page.tsx` debe limitarse a:

- Validar si corresponde renderizar la pantalla.
- Leer parámetros de ruta si hace falta.
- Renderizar un componente principal de feature.

Ejemplo:

```tsx
import { MobileHomePage } from "@/features/home/components/mobile-home/mobile-home-page";

export default function InicioPage() {
  return <MobileHomePage />;
}
```

El componente principal de feature puede encargarse de componer secciones, hooks y estados.

### 32. Separación de responsabilidades

Usar esta separación por defecto:

```txt
components/  -> UI y secciones visuales
hooks/       -> estado/lógica reutilizable del cliente
services/    -> llamadas HTTP con axiosInstance
schemas/     -> validaciones Zod
types/       -> tipos e interfaces compartidas
helpers/     -> funciones puras de formato, cálculo o fallback
constants/   -> textos, rutas, acciones, opciones fijas y configuraciones
```

No mezclar en un mismo archivo:

- JSX grande.
- Fetching de datos.
- Formateo de fechas.
- Tipos complejos.
- Constantes largas.
- Componentes auxiliares extensos.

Si un archivo necesita varias de esas cosas, dividirlo.

### 33. Refactor seguro por módulos

No refactorizar todo el sistema en una sola tarea.

Orden recomendado para ordenar código:

1. Identificar una pantalla o módulo concreto.
2. Revisar imports, hooks, services, types y helpers existentes.
3. Separar primero componentes visuales.
4. Extraer helpers puros.
5. Extraer types si están repetidos.
6. Extraer constants si hay textos, rutas o acciones repetidas.
7. Probar que la pantalla siga funcionando igual.

No cambiar comportamiento funcional mientras se refactoriza UI, salvo que se pida explícitamente.

### 34. Reglas específicas para Home mobile

La pantalla de inicio mobile debe sentirse como una app de juego/competencia, no como un dashboard administrativo.

Priorizar:

- Hero corto y motivacional.
- CTA principal claro: “Cargar predicción” o “Pronosticar ahora”.
- Próximo partido visible.
- Próximo cierre visible.
- Accesos rápidos a `Mis predicciones`, `Ranking` y `Fixture`.
- Resumen al final, sin competir con el CTA principal.

Evitar:

- Textos largos.
- Demasiadas cards con el mismo peso visual.
- Badges excesivos.
- Palabras partidas.
- Horas partidas en dos líneas.
- Nombres de selecciones truncados de forma fea.

Para layouts mobile usar correctamente:

```txt
min-w-0
truncate
whitespace-nowrap
shrink-0
flex-1
```

### 35. Reglas específicas para banderas y selecciones

Cuando se muestren selecciones:

- Mantener proporción de banderas.
- Evitar contenedores innecesarios que deformen o redondeen demasiado las banderas.
- Usar fallback con código de selección si la imagen falla.
- Evitar que los nombres largos rompan el layout.
- En mobile, preferir layouts compactos como:

```txt
Bandera + País   VS   País + Bandera
```

o una versión vertical si no entra bien.

### 36. Reglas para textos de UX

Usar textos cortos, claros y motivacionales.

Preferir:

- “Cada partido cuenta.”
- “Cargá tus predicciones, sumá puntos y competí por llegar a lo más alto del ranking.”
- “Tu camino al ranking empieza ahora.”
- “Pronosticá los próximos partidos y seguí tu posición.”

Evitar repetir demasiado la palabra “Prode” dentro de párrafos largos. Usarla principalmente como marca, badge o título.

Ejemplo:

```txt
PRODE MUNDIAL 2026
Hola, Admin
Cada partido cuenta
Cargá tus predicciones, sumá puntos y competí por llegar a lo más alto del ranking.
```

### 37. Criterio para pedir confirmación

Pedir confirmación antes de:

- Cambiar rutas.
- Cambiar contratos de API.
- Cambiar auth, middleware, permisos o stores.
- Cambiar estructura de carpetas global.
- Instalar dependencias.
- Eliminar archivos.
- Modificar configuración PWA/service worker.
- Cambiar `.env`.

No pedir confirmación para cambios chicos de UI, correcciones de TypeScript, extracción de componentes dentro del mismo módulo o mejoras de legibilidad que no alteren comportamiento.
