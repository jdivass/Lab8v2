# PasswordStrengthMeter — Lab 8

Componente React que evalúa la fortaleza de una contraseña en tiempo real, construido siguiendo el flujo **Test Driven Development (TDD)** con Vite, Vitest y React Testing Library.

---

## Instalación

Asegúrate de tener [Bun](https://bun.sh/) instalado.

```bash
# Clonar el repositorio
git clone https://github.com/jdivass/Lab8v2.git
cd lab8v2

# Instalar dependencias
bun install
```

---

## Ejecutar los tests

```bash
bun test
```

También se puede correr en modo watch con UI:

```bash
bun run test:ui
```

---

## Correr el proyecto en modo desarrollo

```bash
bun run dev
```

Luego abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Lint

El proyecto tiene ESLint configurado con soporte para React Hooks y React Refresh:

```bash
bun run lint
```

---

## Descripción del flujo TDD seguido

Se siguió estrictamente el ciclo **red → green → refactor**:

1. **Red** — Se escribieron todos los tests primero en `PasswordStrengthMeter.test.jsx`, cubriendo renderizado, comportamiento y edge cases. En este punto todos los tests fallaban porque no existía implementación.

2. **Commit con tests fallando** — Se hizo un commit intermedio con los tests en rojo. Este commit es visible en el historial del repositorio y evidencia que los tests fueron escritos antes que el código.

3. **Green** — Se implementó `getPasswordStrength.js` y el componente `PasswordStrengthMeter.jsx` hasta que todos los tests pasaron.


## Arquitectura del proyecto

El proyecto separa claramente dos capas:

- **Lógica pura** → `src/components/PasswordStrengthMeter/getPasswordStrength.js`  
  Función pura que recibe un `string` y retorna uno de: `"vacía"`, `"débil"`, `"media"`, `"fuerte"`, `"muy fuerte"`.

- **Componente React** → `src/components/PasswordStrengthMeter/PasswordStrengthMeter.jsx`  
  Usa `getPasswordStrength` para mostrar el indicador en tiempo real mientras el usuario escribe.

- **Tests** → `src/components/PasswordStrengthMeter/PasswordStrengthMeter.test.jsx`  
  Cubre renderizado, comportamiento y edge cases usando React Testing Library con `userEvent`.

---

## Reglas de fortaleza

| Condición | Fortaleza |
|---|---|
| Contraseña vacía | `vacía` |
| Menos de 8 caracteres | `débil` |
| 8+ caracteres, sin números ni símbolos | `media` |
| 8+ caracteres con al menos un número | `fuerte` |
| 8+ caracteres con número y símbolo | `muy fuerte` |

Un **símbolo** es cualquier carácter que no sea letra ni número (incluye espacios, `!`, `@`, `#`, etc.).

---

## Implementaciones 

### Punteo base (100 pts)

| Criterio | Evidencia en el proyecto | Pts posibles | Pts estimados |
|---|---|:---:|:---:|
| Configuración correcta (Vite + Vitest + RTL) | `vite.config.js` configura Vitest con `environment: 'jsdom'` y `setupFiles`. `package.json` incluye `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, y tanto `jsdom` como `happy-dom` instalados. Script `bun test` funcional. | 25 | 25 |
| Evidencia del flujo TDD en historial de commits | Historial del repositorio muestra commit intermedio con tests en rojo antes de la implementación del componente. | 25 | 25 |
| Cobertura y calidad de tests | 9 tests cubriendo todos los casos requeridos: 2 de renderizado, 5 de comportamiento (débil, media, fuerte, muy fuerte, volver a vacía implícita), 3 de edge cases. Usa `userEvent` para simulación realista y `getByLabelText` para queries accesibles. | 25 | 25 |
| Implementación funcional que pasa todos los tests | `getPasswordStrength.js` implementa todas las reglas. `PasswordStrengthMeter.jsx` actualiza en tiempo real con `useState` y `onChange`. Todos los tests pasan. | 15 | 15 |
| Separación entre lógica pura y componente | `getPasswordStrength.js` es una función pura exportada independientemente. El componente la importa y la usa. Archivos separados con responsabilidades claras. | 10 | 10 |
| **Subtotal base** | | **100** | **100** |

### Puntos extra (35 pts disponibles)

| Criterio | Evidencia en el proyecto | Pts posibles | Pts estimados |
|---|---|:---:|:---:|
| Test de accesibilidad con query por rol/label | El primer test usa `screen.getByLabelText(/contrase/i)` para encontrar el input. El componente tiene `<label htmlFor="password">` vinculado al `<input id="password">`, haciendo la query por label completamente funcional. | 5 | 5 |
| Script de lint configurado y aplicado | `eslint.config.js` con `js.configs.recommended`, `reactHooks.configs.flat.recommended` y `reactRefresh.configs.vite`. Script `"lint": "eslint ."` en `package.json`. Plugins instalados: `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`. | 5 | 5 |


### Total estimado

| | Pts |
|---|:---:|
| Base | 100 |
| Extra | 10 |
| **Total** | **110 / 135** |
