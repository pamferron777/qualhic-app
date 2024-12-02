<?php

use Slim\Http\Response;
use Slim\Http\Request;

$app->add(function (Request $request, Response $response, $next) {
  //Options tem que sempre liberar.
  if ($request->getOriginalMethod() == 'OPTIONS')
    return $next($request, $response);

  $route = '/' . ltrim($request->getUri()->getPath(), '/');
  $ignoreRoutes = ['/auth', '/send-notification', '/'];
  if (!in_array($route, $ignoreRoutes)) {
    $header = $request->getHeader('Authorization');
    if (isset($header)) {
      $jwt = $header;
      if ($this->jwt->testJwt(trim(implode(str_replace("Bearer", "", $jwt)))))
        return $next($request, $response);
      else
        return $response->withStatus(401)->withJson(['status' => false, 'msg' => 'Token não válido']);
    } else
      return $response->withStatus(401)->withJson(['status' => false, 'msg' => 'Token não informado']);
  } else
    return $next($request, $response);
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
