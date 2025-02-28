<?php

namespace api\models;

use yii\db\ActiveRecord;

class Customer extends ActiveRecord
{
	public static function tableName()
	{
		return 'customer';
	}

	public function rules()
	{
		return [
			[['name', 'email'], 'required'],
			[['email'], 'email'],
			[['phone', 'address'], 'string'],
			[['created_at'], 'safe'],
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
