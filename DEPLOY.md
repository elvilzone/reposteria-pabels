# Guía de Despliegue - Repostería Don Pabel

¡Felicidades! Tu aplicación está lista para producción.

## 🚀 Despliegue Rápido en Vercel

### 1. Preparar el Repositorio (GitHub)

Si aún no has subido tu código, ejecuta estos comandos en tu terminal:

```bash
# 1. Iniciar git
git init
git branch -M main

# 2. Agregar archivos
git add .
git commit -m "Lanzamiento web Reposteria"

# 3. Conectar con GitHub (Crea primero un repo vacío en github.com)
git remote add origin https://github.com/TU_USUARIO/reposteria-pabels.git
git push -u origin main
```

### 2. Configurar en Vercel

1.  Ve a [vercel.com](https://vercel.com) y crea un "New Project".
2.  Importa tu repositorio de GitHub.
3.  En **Environment Variables**, añade:

| Variable | Valor |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://neondb_owner:npg_WPfpjTVUi97r@ep-autumn-heart-ahimryje-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require` |
| `ADMIN_PASSWORD` | `pabels2024!` |

4.  Haz clic en **Deploy**.

## 🛠 Comandos de Mantenimiento

*   **Ver datos:** `npx prisma studio`
*   **Actualizar base de datos:** Si cambias el modelo, ejecuta `npx prisma db push`.
*   **Resetear datos:** `npx prisma db seed` (¡Cuidado! Solo si quieres reiniciar productos).

## 🔐 Credenciales

*   **Usuario Admin:** (No requiere usuario, solo contraseña)
*   **Contraseña:** `pabels2024!`
