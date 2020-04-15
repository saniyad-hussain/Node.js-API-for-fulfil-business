ALTER TABLE
    `order`
ADD
    `delivery_method` VARCHAR(255) NULL DEFAULT ' '
AFTER
    `delivery_country`;