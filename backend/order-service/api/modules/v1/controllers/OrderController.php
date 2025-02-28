<?php

namespace api\modules\v1\controllers;

use api\models\Customer;
use api\models\Order;
use Yii;
use yii\db\Query;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\Response;

class OrderController extends Controller
{
	public function behaviors()
	{
		return [
			'contentNegotiator' => [
				'class' => ContentNegotiator::class,
				'formats' => [
					'application/json' => Response::FORMAT_JSON,
				],
			],
			'corsFilter' => [
				'class' => Cors::class,
				'cors' => [
					'Origin' => ['*'], // Hoặc thay * bằng frontend URL cụ thể để bảo mật hơn
					'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
					'Access-Control-Request-Headers' => ['*'],
				],
			],
		];
	}

	public function beforeAction($action)
	{
		$this->response->getHeaders()->set('Access-Control-Allow-Origin', '*');
		return parent::beforeAction($action);
	}

	public function actionList()
	{
		$orders = (new Query())
			->select([
				'o.id',
				'o.quantity',
				'c.name AS customer_name',
				'p.name AS product_name',
				'o.created_at AS created_at'
			])
			->from('order o')
			->leftJoin('customer c', 'o.customer_id = c.id')
			->leftJoin('product p', 'o.product_id = p.id')
			->all();
		return $orders;
	}

	public function actionCreate()
	{
		$params = Yii::$app->request->post();
		$model = new Order();
		if ($model->load($params, '') && $model->save()) {
			return [
				'status' => 'success',
				'message' => 'Đơn hàng đã được tạo thành công',
				'data' => $model,
			];
		}

		return [
			'status' => 'error',
			'message' => 'Tạo đơn hàng thất bại',
			'errors' => $model->getErrors(),
		];
	}
}
