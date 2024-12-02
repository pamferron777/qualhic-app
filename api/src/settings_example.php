<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],
        'jwt' => [
            'key' => '95NKl!XJyDeusemaisb5VIfalkeODgwA!*jt0kU3^AzyQualhic0nYC%T@tXt&AmemMTAR*&kH7u2'
        ],
        'bcrypt' => [
            'key' => '95NKl!XJyDeusemaisb5VIfalkeODgwA!*jt0kU3^AzyQualhic0nYC%T@tXt&AmemMTAR*&kH7u'
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
                ->write(json_encode(['status' => false, 'message' => 'pagina não existe']));
        };
    },
    'notAllowedHandler' => function ($container) {
        return function (\Slim\Http\Request $request, \Slim\Http\Response $response, $methods) {
            return $response->withStatus(405)
                ->withHeader('Allow', implode(', ', $methods))
                ->withHeader('Content-Type', 'application/json')
                ->write(json_encode(['status' => false, 'message' => 'O método deve ser um dos seguintes: ' . implode(', ', $methods)]));
        };
    },

];
