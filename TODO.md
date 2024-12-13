# Tareas

## USER:
- [X] Registrar
- [X] Logear
- [X] Validar email
- [X] Enviar email de recuperación de contraseña
- [X] Cambiar contraseña

## WORKSPACE:
- [X] Crear
- [X] Obtener todos por usuario
- [X] Eliminar
- [X] Crear controladores para manipular tabla Workspace_members
- [X] Agregar funciones en repositorio para manipular tabla Workspace_members
- [] Agregar que solo los usuarios validados puedan crear workspaces (incluir el is_validated en el accessToken de logueo)

## Channel:
- [-] Crear (a medias: no deberías poder crear un canal en un workspace con active = false)
- [-] Eliminar (a medias: no deberías poder eliminar un canal en un workspace con active = false)
- [X] Obtener todos por usuario
- [] Crear controladores para manipular tabla Channel_members
- [] Agregar funciones en repositorio para manipular tabla Channel_members


## Message:
- [-] Crear (a medias: no deberías poder crear un mensaje en un canal con active = false)
- [-] Eliminar (a medias: no deberías poder eliminar un mensaje en un canal con active = false)
- [X] Obtener todos por canal
