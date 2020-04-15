ALTER TABLE
    `order`
ADD
    `billing_apartment` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `billing_country`,
ADD
    `delivery_name` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `billing_apartment`,
ADD
    `delivery_country` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `delivery_name`;