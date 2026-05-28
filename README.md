# Sistema Market Backend 🚀

Backend de un mini e-commerce desarrollado con Node.js, Express y PostgreSQL.

Este proyecto incluye autenticación con JWT, rutas protegidas, conexión a base de datos y testing con Jest + Supertest.

---

## 🛠 Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* JWT
* bcrypt
* Jest
* Supertest
* Nodemon

---

## 📦 Instalación

Clonar repositorio:

```bash
git clone https://github.com/TU-USUARIO/Sistema-market-backend.git
```

Entrar al proyecto:

```bash
cd Sistema-market-backend
```

Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Variables necesarias

Crear archivo `.env`

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sistema_market
DB_PASSWORD=tu_password
DB_PORT=5432
JWT_SECRET=secreto
```

---

## ▶️ Ejecutar servidor

```bash
npm run dev
```

Servidor:

```bash
http://localhost:3000
```

---

## 🔐 Endpoints principales

### Registrar usuario

```http
POST /api/users/register
```

### Login usuario

```http
POST /api/users/login
```

### Ruta protegida

```http
GET /api/users/profile
```

---

## 🧪 Ejecutar tests

```bash
npm test
```

---

## 📚 Proyecto realizado como práctica Full Stack

Este proyecto fue desarrollado para practicar backend con Express, PostgreSQL, autenticación JWT y testing de APIs REST.
