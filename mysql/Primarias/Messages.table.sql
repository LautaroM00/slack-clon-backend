CREATE TABLE messages(
    id INT AUTO_INCREMENT,
    content TEXT NOT NULL,
    sender_id INT NOT NULL,
    channel_id INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(sender_id) REFERENCES users(id)
	);



DELIMITER $$

CREATE TRIGGER update_messages_active_after_channel_update
AFTER UPDATE ON Channels
FOR EACH ROW
BEGIN
    -- Verificar si el campo 'active' del canal ha cambiado a 0
    IF OLD.active = 1 AND NEW.active = 0 THEN
        -- Actualizar los mensajes que pertenecen a este canal y marcar 'active' a 0
        UPDATE Messages
        SET active = 0
        WHERE channel_id = NEW.id;  -- Suponiendo que 'channel_id' es la clave foránea en 'Messages'
    END IF;
END $$

DELIMITER ;
