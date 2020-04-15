
CREATE TABLE webhooksettings (
  `id` INT NOT NULL AUTO_INCREMENT,
  `webhook_url` VARCHAR(500) NULL,
  `webhook_event` VARCHAR(256) NOT NULL,
  `api_key` VARCHAR(256) NOT NULL,
  `updatedAt` BIGINT(20) NULL
  `createdAt` BIGINT(20) NULL
  PRIMARY KEY (`id`));


alter table adminuser
add column secret_key  varchar(256)

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='381/ca26dfcbddb-613c1b376c19f5b525='
where api_key='889a68d7-c7e8-4625-9ed3-d49a6e356209'

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='4d878_5a2d7e42d0a-1674b359e89b03ba='
where api_key='c0d5a688-660d-42b2-b6b6-ba3019fd02c9'

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='adceb6f3/6c39ba3e-5475a027a8030301='
where api_key='3e8535a5-054d-4012-8883-1c0f83592aa4'

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='ec7-d400b3574d-6fabdb9cd9_70b1040bf='
where api_key='3178ec3e-b5df-4946-9757-e37ae00f5a9f'

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='fd8-e400b3574e-7fabdb9cd0_80b1040bf='
where api_key='db2d240b-f958-441c-a9b8-fee4bcdaf596'

SET SQL_SAFE_UPDATES = 0;
update adminuser
set secret_key ='ge9-f511c4685f-8fbcec0de1_91c2151ce='
where api_key='9a38c58b-6986-4fcd-bea7-d56e62c8a517'
