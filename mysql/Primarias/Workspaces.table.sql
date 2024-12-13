CREATE TABLE Workspaces(
    id INT AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL UNIQUE,
    image_base64 LONGTEXT,
    owner_id INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 1,
    PRIMARY KEY(id),
    FOREIGN KEY(owner_id) REFERENCES Users(id)
);