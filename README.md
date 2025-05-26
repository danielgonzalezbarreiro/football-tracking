# Football Tracking App

## Descrición  
Aplicación web para seguimento de equipos e partidos de fútbol, desenvolvida con Nuxt 3 (frontend) e NestJS (backend), usando MongoDB como base de datos.

## Arquitectura

### Frontend  
- **Framework:** Nuxt 3 (Vue 3, Composition API, TypeScript)  
- **Estado:** Pinia (persistencia en localStorage)  
- **Compoñentes reutilizables:** NavBar, FavoriteTeamsList, TeamSearch, UpcomingMatchesList, ModalAddFavoriteTeam  
- **Composables:** useAuth (autenticación/sesión), useTeams (equipos e partidos)  
- **Rutas e middleware:** Sistema de rutas de Nuxt, middleware global para protexer rutas  
- **API:** Plugin Axios, configuración con runtimeConfig  
- **Estilos:** Tailwind CSS  

### Backend  
- **Framework:** NestJS (TypeScript)  
- **Base de datos:** MongoDB  
- **Módulos:** Auth, Users, Football Data  
- **API:** Endpoints REST para autenticación, equipos e partidos  

#### Decisións de deseño do backend  
- **Arquitectura modular:** Cada dominio (usuarios, auth, datos de fútbol) está separado en módulos para facilitar o mantemento e a escalabilidade.  
- **Validación e DTOs:** Uso de DTOs e pipes de validación para garantir a integridade dos datos recibidos.  
- **Autenticación JWT:** Seguridade baseada en tokens JWT para endpoints protexidos.  
- **Servizos desacoplados:** Os servizos de acceso a datos están desacoplados dos controladores, seguindo o principio de inversión de dependencias.  
- **Testing:** Estrutura preparada para probas unitarias e de integración con Jest.  

## Decisións de deseño xerais  
- Separación clara entre UI, lóxica e estado  
- Reactividade con Composition API e Pinia  
- Tipado forte
- Configuración flexible con runtimeConfig  
- HTML semántico
- Mantenibilidade: estrutura modular, testes unitarios e de integración

## Esquema da base de datos  

**¿Por que MongoDB?**  
- Esquema flexible 
- Bo rendemento para operacións frecuentes  

**Esquema da base de datos:**  
- **Usuario:**
  ```json
  {
    "_id": ObjectId,
    "username": String,
    "email": String,
    "passwordHash": String,
    "favoriteTeams": [Number]
  }

## Instrucións para executar con Docker Compose en local

1. Clona o repositorio:

2. Copia e edita as variables de entorno:
   ```bash
   cp backend/.env.template backend/.env
   cp frontend/.env.template frontend/.env

   # Edita backend/.env e frontend/.env

3. Construe e executa con Docker Compose:
   ```bash
   docker-compose up --build

4. Accede á aplicación
    Frontend: http://localhost:3000
    Backend API: http://localhost:3001
    MongoDB: mongodb://localhost:27017

## Instrucións para executar os tests de backend
1. Executa os tests con Jest:
   ```bash
   cd backend
   npm run test