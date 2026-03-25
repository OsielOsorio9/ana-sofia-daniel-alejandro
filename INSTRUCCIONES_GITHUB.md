# 🚀 Instrucciones para Subir a GitHub

## Paso 1: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"New repository"** (o el **+** en la esquina superior derecha)
3. Nombre del repositorio: `ana-sofia-daniel-alejandro`
4. Descripción: `Web romántica para Ana Sofía y Daniel Alejandro`
5. Marca **"Public"** (para que sea visible)
6. **NO** marques "Add a README file" (ya tenemos uno)
7. Haz clic en **"Create repository"**

## Paso 2: Subir los Archivos

Una vez creado el repositorio, ejecuta estos comandos en tu terminal:

```bash
# Si estás en la carpeta Web-Novios
git remote add origin https://github.com/TU_USERNAME/ana-sofia-daniel-alejandro.git
git push -u origin master
```

Reemplaza `TU_USERNAME` con tu nombre de usuario de GitHub.

## Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (configuración)
2. En el menú izquierdo, busca **Pages**
3. En "Source", selecciona **"Deploy from a branch"**
4. Branch: **master**
5. Folder: **/(root)**
6. Haz clic en **"Save"**

## Paso 4: Acceder a tu Web

Tu web estará disponible en:
```
https://TU_USERNAME.github.io/ana-sofia-daniel-alejandro/
```

## 📝 Datos de la Web

La web está configurada con:

**Pareja:** Ana Sofía & Daniel Alejandro
**Fecha Inicio:** 15 de junio de 2021
**Fotos:** 6 imágenes románticas
**Fechas Especiales:** 8 momentos importantes
**Cartas:** 3 cartas de amor

## 🎨 Características

- ✅ Contador de tiempo juntos en tiempo real
- ✅ Galería de fotos con efectos hover
- ✅ Calendario de fechas especiales categorizadas
- ✅ Cartas de amor pre-escritas
- ✅ Modo oscuro/claro
- ✅ 100% responsive
- ✅ Solo lectura (los usuarios no pueden editar)
- ✅ Función para compartir en redes sociales

## 🔧 Para Personalizar

Si quieres cambiar los datos, edita el archivo `js/love-main.js`:

```javascript
const coupleData = {
    nombre1: 'Nombre 1',
    nombre2: 'Nombre 2', 
    fechaInicio: 'YYYY-MM-DD',
    // ... más datos
};
```

¡Listo para enamorar! 💕
