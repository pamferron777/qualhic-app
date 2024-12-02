<?php

use Controllers\Leitos\LeitosController;

$app->post('/auth', '\Controllers\Auth\AuthController:auth');
$app->get('/test-token', '\Controllers\Auth\AuthController:testToken');

$app->get('/', '\Controllers\HomeController:index');

$app->group('/admin', function () use ($app) {
    $app->group('/atividades', function () use ($app) {
        $app->get('', '\Controllers\Admin\Atividades\AtividadesController:index');
        $app->post('', '\Controllers\Admin\Atividades\AtividadesController:save');
        $app->get('/{id}', '\Controllers\Admin\Atividades\AtividadesController:getById');
        $app->get('/dashboard', '\Controllers\Admin\Atividades\DashboardController:index');
    }); 
});

$app->group('/colab', function () use ($app) {
    $app->group('/atividades', function () use ($app) {
        $app->post('/vincular', '\Controllers\Colaboradores\Atividades\AtividadesController:vincular');
        $app->post('/finalizar', '\Controllers\Colaboradores\Atividades\AtividadesController:finalizar');
        $app->get('', '\Controllers\Colaboradores\Atividades\AtividadesController:index');
        $app->get('/{id}', '\Controllers\Colaboradores\Atividades\AtividadesController:getById');
    }); 
});