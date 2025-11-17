CREATE TABLE user (
    id varchar(36) PRIMARY KEY NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(100) NOT NULL,
    firstname varchar(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATE NOT NULL,
    status ENUM('todo', 'in progress', 'done') NOT NULL DEFAULT 'todo',
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('todo', 'in progress', 'done') NOT NULL DEFAULT 'todo',
    todo_id INT NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todo(id) ON DELETE CASCADE
)