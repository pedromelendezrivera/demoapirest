
USE tienda;

-- Crear usuario si no existe
-- username: user
-- password: user123
INSERT INTO usuarios (username, password)
VALUES ('admin', '$2b$10$hRM4AJekidslmIYWxdeaW.7L.4wv.pGJSkrMIwbAtvIKyjOQqsZBm')
ON DUPLICATE KEY UPDATE password = '$2b$10$hRM4AJekidslmIYWxdeaW.7L.4wv.pGJSkrMIwbAtvIKyjOQqsZBm';
