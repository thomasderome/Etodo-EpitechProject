CREATE TABLE users (
    id varchar(36) PRIMARY KEY NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(100) NOT NULL,
    firstname varchar(100) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE todo (
    id PRIMARY KEY AUTOINCREMENT,
    title varchar(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    due_time DATE NOT NULL,
    status DEFAULT 'not started' CHECK(status IN ('todo', 'in progress', 'done')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);