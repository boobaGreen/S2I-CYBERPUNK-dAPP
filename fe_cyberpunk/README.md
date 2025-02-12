# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


# Note di Sicurezza

### Utilizzo delle Chiavi API

Quando si utilizzano chiavi API in un'applicazione client-side, come in questo progetto, è importante essere consapevoli che le chiavi saranno esposte agli utenti. Questo può rappresentare un rischio di sicurezza, poiché le chiavi potrebbero essere utilizzate in modo improprio.

### Soluzione Raccomandata

Per una maggiore sicurezza, è consigliabile gestire le operazioni sensibili, come l'upload di file, su un server. Un server Node.js con Express può essere utilizzato per creare endpoint API che gestiscono le operazioni di upload e altre interazioni con servizi esterni come Pinata. In questo modo, le chiavi API rimangono sicure sul server e non vengono esposte al client.

Sure, here is the explanation in Markdown format for your README:

---

### Configuration for Fetching Contract Owner Address

In the `useUserRole` hook, we prioritize fetching the contract address from the deployed addresses in the development environment. If the deployed addresses are not found, we fall back to using environment variables. This approach ensures that the application can dynamically fetch the contract owner address both in development and production environments.

To achieve this, we use the following environment variables in the 

.env

 file:

- `VITE_CONTRACT_ADDRESS`: The address of the deployed contract.
- `VITE_VENDOR_ADDRESS`: The address of the vendor (contract owner).

Here is an example of the 

.env

 file:

```env
VITE_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NTgwY2YzNC01NmRiLTRkYWEtOTk3Ni1iMTQ2MzE3MzJlZjYiLCJlbWFpbCI6ImNsYXVkaW9kYWxsYXJhZGV2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4NTAzMDZiODU3YTQ3MjNmMTNjZCIsInNjb3BlZEtleVNlY3JldCI6ImI5MWYzOWMxY2NjYTYyM2I3Nzk1OGU3NTM3MjE5YzY5YjQ1YzFiZjY2NzcwNDE4M2U5NzRlMDYyMmI0N2JjNmYiLCJleHAiOjE3NzA4Mzg1NzF9.Z3DPe6_d8Sim7NszWXoqdFIqZJezYs1YceexQ43fgA8
VITE_GATEWAY_URL=brown-acceptable-heron-979.mypinata.cloud
VITE_WC_PROJECT_ID=8cb27d7709ddb02f3742496ba6218dea
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_VENDOR_ADDRESS=0xYourVendorAddress
```

In the `useUserRole` hook, we first attempt to load the contract address from the deployed addresses. If this fails, we log a warning and fall back to using the `VITE_CONTRACT_ADDRESS` environment variable. This ensures that the application can function correctly in both development and production environments without relying on hardcoded addresses.

---

This explanation should help users understand how the configuration works and how to set up the necessary environment variables for their own deployments.