<?php
return [
    'settings' => [
        'displayErrorDetails' => true,
        'addContentLengthHeader' => false,
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        'jwt' => [
            'key' => '95NKl!XJyDeusemaisb5VIfalkeODgwA!*jt0kU3^AzyGenya0nYC%T@tXt&JesusTeAmaDemaisMTAR*&kH7u2'
        ],
        'bcrypt' => [
            'key' => '95NKl!XJyDeusemaisb5VIfalkeODgwA!*jt0kU3^AzyGenya0nYC%T@tXt&JesusTeAmaDemaisMTAR*&kH7u'
        ],
        'db_eloquent' =>  [
            'driver' => 'mysql',
            'host' => 'db',
            'port' => 3306,
            'username' => 'root',
            'password' => 'root',
            'database' => 'qualhic',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => ''
        ]
    ],
    'notFoundHandler' => function ($container) {
        return function (\Slim\Http\Request $request, \Slim\Http\Response $response) {
            return $response->withStatus(404)
                ->withHeader('Content-Type', 'application/json')
                ->withJson((['message' => 'Página não encontrada']));
        };
    }

];
