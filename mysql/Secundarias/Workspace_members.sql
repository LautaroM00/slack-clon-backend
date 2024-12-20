CREATE TABLE Workspace_members(
    belongs_to VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    role BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY(belongs_to) REFERENCES Workspaces(name),
    FOREIGN KEY(user_id) REFERENCES Users(id),
    CONSTRAINT already_member UNIQUE(belongs_to, user_id)
    )