## Ce projet est un exercice pour le cours Développement Web.

### Le projet marche normalement sans l'utilisation de `npm install` et `npm run dev` ci-dessous. Or, sur le pc d'un proche, l'installation fut nécessaire.

# Installation #
```bash
git clone https://github.com/Alfas0/GabrielGASSI.git
cd GabrielGASSI/
npm install
npm run dev
```
# Compilation du css (optionel) #
```bash
npx @tailwindcss/cli -i ./src/css/input.css -o ./src/css/output.css --watch
```

# Arborescence du projet #

```
GabrielGASSI/
├── GabrielG/
│   ├── src/
│   │   ├── css/
│   │   │   ├── input.css
│   │   │   └── output.css
│   │   ├──images/
│   │   │  └── "All images and videos"
│   │   ├──js/
│   │   │  ├──calculatrice.js
│   │   │  ├──click.js
│   │   │  ├──clock.js
│   │   │  ├──contact.js
│   │   │  ├──quiz.js
│   │   │  ├──tailwind.config.js
│   │   │  ├──tilt_effect.js
│   │   │  └──transition.js
│   │   ├──static/
│   │   │  ├──Calculatrice.html
│   │   │  ├──contact.html
│   │   │  ├──home.html
│   │   │  ├──index.html
│   │   │  └──quiz.html
│   ├── package.json
│   └── package-lock.json
└──README.md
```
