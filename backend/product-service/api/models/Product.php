<?php

namespace api\models;

use yii\db\ActiveRecord;

class Product extends ActiveRecord
{
	public static function tableName()
	{
		return 'product';
	}

	public function rules()
	{
		return [
			[['name', 'price'], 'required'],
			[['price'], 'number'],
		];
	}
}
