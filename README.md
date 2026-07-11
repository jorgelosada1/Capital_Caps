# Capital Caps 🧢

Tienda de gorras streetwear con estética urbana. Construida con React + Vite.

## Instalación

```bash
npm install
npm run dev
```

## Cómo agregar nuevas gorras

1. Prepara la imagen de tu gorra (formatos: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`)
2. Decide el precio de la gorra:
   - **$65.000 COP** → Copia la imagen a `/public/images/65/`
   - **$75.000 COP** → Copia la imagen a `/public/images/75/`
   - **$85.000 COP** → Copia la imagen a `/public/images/85/`
3. El nombre del archivo se convierte en el nombre del producto:
   - `snapback-negra-dorada.png` → **Snapback Negra Dorada**
   - `fitted_roja_clasica.jpg` → **Fitted Roja Clasica**
4. Reinicia el servidor de desarrollo (`npm run dev`) para que la nueva gorra aparezca
5. ¡Listo! La gorra aparecerá automáticamente en la tienda

## Panel de Administración

- Accede a `/admin/login`
- **Usuario:** `Jorsh`
- **Clave:** `0729`

Desde el panel admin puedes:
- Ver un resumen del stock (total, disponibles, vendidas)
- Marcar gorras como **Vendida** o revertirlas a **Disponible**
- Eliminar gorras del stock

> ⚠️ La autenticación es de frontend para uso interno. No es un sistema de seguridad robusto.

## Estructura de carpetas de imágenes

```
public/
└── images/
    ├── 65/    ← Gorras de $65.000
    ├── 75/    ← Gorras de $75.000
    └── 85/    ← Gorras de $85.000
```

## Stack

- React 19 + Vite
- React Router v7
- Context API + useReducer
- CSS puro (estilo streetwear/urbano)
- localStorage para persistencia de estado
