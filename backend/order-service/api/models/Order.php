<?php

namespace api\models;

use yii\db\ActiveRecord;

class Order extends ActiveRecord
{
	public static function tableName()
	{
		return 'order';
	}

	public function rules()
	{
		return [
			[['customer_id', 'product_id', 'quantity'], 'required'],
			[['customer_id', 'product_id', 'quantity'], 'integer'],
		];
	}

	public function attributeLabels()
	{
		return [
			'id' => 'ID',
			'customer_id' => 'Khách Hàng',
			'product_id' => 'Sản Phẩm',
			'quantity' => 'Số Lượng',
		];
	}

	public function beforeSave($insert)
	{
		if ($insert) {
			$this->created_at = date('Y-m-d H:i:s');
		}
		return parent::beforeSave($insert);
	}
}
