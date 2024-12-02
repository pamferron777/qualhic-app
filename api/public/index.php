<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    if (isset($url['path'])) {
        $file = __DIR__ . $url['path'];
        if (is_file($file)) {
            return false;
        }
    }
}

require __DIR__ . '/../vendor/autoload.php';
session_start();

require __DIR__ . '/../helpers/helpers.php';

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';




use Models\Bootstrap;

$container = $app->getContainer();

Bootstrap::load($container);


// Run app
$app->run();
