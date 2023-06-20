CREATE TABLE IF NOT EXISTS loans (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idUsers INT ,
  idBooks INT,
  Date_loans VARCHAR(10) NULL,
  Return_date VARCHAR(10) NULL,
  INDEX `idLivres_idx` (`idBooks` ASC),
  CONSTRAINT `idMembers`
    FOREIGN KEY (`idUsers`)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idLivres`
    FOREIGN KEY (`idBooks`)
    REFERENCES books (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
