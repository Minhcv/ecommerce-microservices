<?php

namespace api\modules\v1\controllers;

use api\models\Customer;
use Yii;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\Response;

class CustomerController extends Controller
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
		$productList = Customer::find()->all();
        return $productList;
	}

	public function actionCreate()
	{
		$params = Yii::$app->request->post();
		$model = new Customer();

		if ($model->load($params, '') && $model->save()) {
			return ['status' => 'success', 'data' => $model];
		}

		return ['status' => 'error', 'errors' => $model->errors];
	}
}
