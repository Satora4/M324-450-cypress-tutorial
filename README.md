# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Pipelines
Die Pipelines unter `.github/workflows/` builden das Projekt und führen alle Tests automatisch aus. Ausserdem wird mit hilfe von esLint die CodeQualität überptüft. Falls alles druchläuft wird zum schluss ein Docker-Image erstellt und deployed.
