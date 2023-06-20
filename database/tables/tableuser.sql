CREATE TABLE `biblihy`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `firstname` VARCHAR(255) NULL,
  `address` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `telephone` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
   `token` VARCHAR(255) NULL,
  `type` ENUM("Employee", "Subscriber") NOT NULL,
  `subscription` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_subscription_type` CHECK (
    (`type` = 'Subscriber' AND `subscription` IS NOT NULL)
    OR
    (`type` = 'Employee' AND `subscription` IS  NULL)
  )
);

