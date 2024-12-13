CREATE TABLE Channels(
    id INT AUTO_INCREMENT,
    belongs_to VARCHAR(100) NOT NULL,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY(id),
    FOREIGN KEY(owner_id) REFERENCES Users(id),
    FOREIGN KEY(belongs_to) REFERENCES workspaces(name),
    CONSTRAINT not_duplicated_channelName_in_workspace  UNIQUE (belongs_to, name)
);