ALTER TABLE
    `order`
ADD
    `delivery_apt` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `delivery_time`,
ADD
    `delivery_state` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `delivery_apt`,
ADD
    `billing_state` VARCHAR(255) NOT NULL DEFAULT ' '
AFTER
    `delivery_state`;