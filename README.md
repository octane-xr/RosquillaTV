# Random Simpsons Player

> Extensión para Chrome y Firefox que reproduce un episodio **aleatorio de *Los Simpson*** directamente desde [Disney+](https://www.disneyplus.com).  
> Ideal para los que no pueden decidir qué capítulo ver

---

##  Características

- Botón flotante en la página oficial de *Los Simpson*  
- Reproductor aleatorio con filtros por temporada o rango  
- Compatible con **Disney+ (es-419)**  
- Funciona tanto en **Chrome** como en **Firefox**  
- Código 100 % libre y sin trackers  

---

## Instalación (modo desarrollador)

### 🔹 Chrome
1. Cloná este repo y cambiá a la rama principal:
   ```bash
   git clone -b chrome https://github.com/tuusuario/random-simpsons-player.git
   ```
2. Abrí `chrome://extensions`
3. Activá **Modo desarrollador**
4. Clic en **“Cargar sin empaquetar”** → seleccioná la carpeta del proyecto
5. Entrá a la página de *Los Simpson* en Disney+ → ¡y listo!

---

### 🔹 Firefox
1. Cambiá a la rama de Firefox:
   ```bash
   git checkout firefox
   ```
2. Abrí `about:debugging#/runtime/this-firefox`
3. Clic en **“Cargar complemento temporal”** → seleccioná `manifest.json`
4. Entrá a Disney+ y probá el banner 🎬

---

## Estructura del proyecto

```
simpsons-random/
│
├── manifest.json                # Manifest MV3 (Chrome) o MV2 (Firefox)
├── background.js                # Manejador de peticiones y datos
├── banner.js                    # Inyecta el banner dentro de Disney+
├── popup.html / popup.js        # Interfaz del selector aleatorio
├── simpsons_todas_temporadas.json # Datos de todos los episodios
├── icons/                       # Iconos de la extensión
└── README.md
```

---

## Créditos

Proyecto creado por un fan, sin relación con Disney ni Fox.  
Inspirado por la nostalgia y misterio que proponia de prender la tele y no saber que capitulo venia. 

---

## Licencia

[MIT License](LICENSE)

---

