<?php
// DIC configuration
use \Firebase\JWT\JWT;
use Services\TasyApi;
use Services\Telegram;

$container = $app->getContainer();
$container['telegram'] = function ($c)  {
    $conf = $c['settings']['telegram'];
    return (new Telegram($conf));
};
$container['db_tasy'] = function ($c) use ($container) {
    $db = $c['settings']['db_tasy'];
    return (new DbTasy($db, $container->telegram));
};
$container['jwt'] = function ($c) {
    $jwt = new Services\JwtService($c['settings']['jwt']['key']);
    return $jwt;
};
$container['tasy_api'] = function ($c) {
    $tasyApi = new TasyApi($c['settings']['tasy_api']);
    return $tasyApi;
};

$container['bcrypt'] = function ($c) {
    $jwt = new Services\BcryptService($c['settings']['bcrypt']['key']);
    return $jwt;
};

$container['view'] = function ($c) {
    $rootTemplate = PHP_SAPI == 'cli-server' ? "../templates" : "../templates";

    $view = new \Slim\Views\Twig($rootTemplate, [
        'cache' => false
    ]);
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $c['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new \Slim\Views\TwigExtension($c['router'], $basePath));
    $view->getEnvironment()->addGlobal("base_admin", $c["request"]->getUri()->getPath() . "");
    $view->getEnvironment()->addGlobal("base_url", $c["request"]->getUri()->getBaseUrl() . "");

    $view->getEnvironment()->addGlobal('session', $_SESSION);
    $view->getEnvironment()->addGlobal('_get', $_GET);
    $view->getEnvironment()->addGlobal('cookie', $_COOKIE);



    return $view;
};