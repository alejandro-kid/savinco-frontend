# Docker Compose - Savinco Frontend & Backend

Este archivo `docker-compose.yml` orquesta tanto el frontend como el backend de Savinco.

## 🚀 Uso Rápido

### Iniciar todos los servicios

```bash
docker-compose up -d
```

### Ver logs

```bash
# Todos los servicios
docker-compose logs -f

# Solo frontend
docker-compose logs -f savinco-front

# Solo backend
docker-compose logs -f financial-backend
```

### Detener servicios

```bash
docker-compose down
```

### Reconstruir servicios

```bash
docker-compose up -d --build
```

## 📋 Servicios

### financial-backend

- **Puerto**: `8080`
- **Health Check**: `http://localhost:8080/api/v1/health`
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **Imagen**: `ghcr.io/alejandro-kid/savinco-backend/financial-backend:d3c7eca`

### savinco-front

- **Puerto**: `3000` (mapeado al puerto 80 del contenedor)
- **URL**: `http://localhost:3000`
- **Imagen**: `ghcr.io/alejandro-kid/savinco-front/savinco-front:latest`

## 🔧 Configuración

### Variables de Entorno del Backend

Las variables de entorno del backend están configuradas en el `docker-compose.yml`. Para modificarlas, edita el archivo directamente o usa un archivo `.env`:

```bash
# Crear archivo .env (opcional)
cat > .env <<EOF
DATABASE_URL=jdbc:postgresql://tu-db:5432/savinco_financial
DATABASE_USERNAME=tu-usuario
DATABASE_PASSWORD=tu-password
EOF
```

### Variables de Entorno del Frontend

**🔒 Seguridad**: El frontend usa variables de entorno que se inyectan en **runtime** (no en build time). Esto significa que:

- ✅ Las imágenes Docker no contienen credenciales o URLs específicas
- ✅ Puedes usar la misma imagen en diferentes entornos
- ✅ Las variables se configuran al iniciar el contenedor

**Configuración en docker-compose.yml:**

```yaml
savinco-front:
  environment:
    - PUBLIC_API_BASE_URL=http://financial-backend:8080
    - PUBLIC_API_TIMEOUT=30000
    - PUBLIC_APP_NAME=Savinco Frontend
    - PUBLIC_APP_VERSION=1.0.0
```

**Para producción**, puedes usar la imagen pre-construida y solo cambiar las variables de entorno:

```yaml
savinco-front:
  image: ghcr.io/alejandro-kid/savinco-front/savinco-front:latest
  environment:
    - PUBLIC_API_BASE_URL=https://api.tu-dominio.com
    # ... otras variables
```

**Cómo funciona:**

1. El contenedor inicia con `docker-entrypoint.sh`
2. El script lee las variables de entorno del contenedor
3. Inyecta `window.__ENV__` en el HTML antes de servir
4. La aplicación lee las variables de `window.__ENV__` en runtime

## 🌐 Redes

Ambos servicios están en la misma red Docker (`savinco-network`), lo que permite que se comuniquen usando los nombres de los servicios:

- Frontend → Backend: `http://financial-backend:8080`
- Backend → Database: (configurado en variables de entorno)

## 🔍 Troubleshooting

### El frontend no se conecta al backend

1. Verifica que el backend esté saludable:
   ```bash
   curl http://localhost:8080/api/v1/health
   ```

2. Verifica los logs del backend:
   ```bash
   docker-compose logs financial-backend
   ```

3. Verifica que ambos servicios estén en la misma red:
   ```bash
   docker network inspect savinco-front_savinco-network
   ```

### El backend no se conecta a la base de datos

1. Verifica las variables de entorno en `docker-compose.yml`
2. Verifica que la base de datos sea accesible desde el contenedor
3. Revisa los logs del backend para errores de conexión

### Reconstruir solo un servicio

```bash
# Reconstruir solo el frontend
docker-compose up -d --build savinco-front

# Reconstruir solo el backend (si tienes build configurado)
docker-compose up -d --build financial-backend
```

## 📝 Notas

- El frontend espera a que el backend esté saludable antes de iniciar (usando `depends_on` con `condition: service_healthy`)
- El health check del backend se ejecuta cada 30 segundos
- Los servicios se reinician automáticamente a menos que se detengan manualmente (`restart: unless-stopped`)
