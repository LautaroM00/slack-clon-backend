/* CREATE TABLE Channel_members(
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(channel_id) REFERENCES Channels(id),
    FOREIGN KEY(user_id) REFERENCES Users(id),
    CONSTRAINT already_member UNIQUE(channel_id, user_id)
    ) 
    
    No será implementado en un principio
    */