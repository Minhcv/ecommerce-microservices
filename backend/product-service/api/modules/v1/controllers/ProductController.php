<?php

namespace api\modules\v1\controllers;

use api\models\Product;
use Yii;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\Response;

class ProductController extends Controller
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

	// API lấy danh sách sản phẩm
	public function actionList()
	{
		$productList = Product::find()->all();
        return $productList;
	}

	// API thêm sản phẩm
	public function actionCreate()
	{
		$request = Yii::$app->request->post();
		$product = new Product();
		$product->name = $request['name'];
		$product->price = $request['price'];

		if ($product->save()) {
			return $product;
		} else {
			return ['error' => 'Không thể thêm sản phẩm'];
		}
	}
}
