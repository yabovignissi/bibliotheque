CREATE TABLE IF NOT EXISTS books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  release_date VARCHAR(10),
  entry_date VARCHAR(10)
)
