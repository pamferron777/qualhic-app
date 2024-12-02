<?php

namespace Services;

use \Firebase\JWT\JWT;

class JwtService
{
  private $key;
  public function __construct($key)
  {
    $this->key = $key;
  }
  public function generate(array $dados)
  {
    $dados['exp'] = time() + 3600;
    $key = $this->key;
    $payload = $dados;
    $jwt = JWT::encode($payload, $key);
    return $jwt;
  }
  public function decode($jwt)
  {
    try {
      $decoded = JWT::decode($jwt, $this->key, array('HS256'));
      return $decoded;
    } catch (\Exception $ex) {
      return false;
    }
  }
  public function testJwt($jwt){
    try {      
      JWT::decode($jwt, $this->key, array('HS256'));
      return true;
    } catch (\Exception $ex) {
      return false;
    }
  }
}
