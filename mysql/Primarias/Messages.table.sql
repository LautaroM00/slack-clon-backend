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