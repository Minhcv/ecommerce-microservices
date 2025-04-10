<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%product}}`.
 */
class m250227_090313_create_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp(): void
    {
        $this->createTable('product', [
            'id' => $this->primaryKey(),
            'name' => $this->string(255)->notNull(),
            'description' => $this->text(),
            'price' => $this->decimal(10,2)->notNull(),
            'created_at' => $this->timestamp(),
            'updated_at' => $this->timestamp(),
        ]);
        $this->execute("INSERT INTO product VALUES (997, 'Iphone11', 'Iphone11', 11000000, now(), now());");
        $this->execute("INSERT INTO product VALUES (998, 'Iphone12', 'Iphone12', 12000000, now(), now());");
        $this->execute("INSERT INTO product VALUES (999, 'Iphone13', 'Iphone12', 13000000, now(), now());");
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): void
    {
        $this->dropTable('product');
    }
}
