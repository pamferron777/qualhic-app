<?php

namespace Controllers\Auth;

use Controllers\Controller;
use Models\Usuarios;
use Services\ValidationInputs;
use Slim\Http\Request;
use Slim\Http\Response;

class AuthController extends Controller
{

  public function auth(Request $request, Response $response)
  {
    $input = $request->getParsedBody();
    $formValidation = new ValidationInputs([
      'usuario|required|max:255',
      'password|required|max:255|min:3'
    ], $input);
    if (!$formValidation->isValid())
      return $response->withJson(['status' => false, 'msg' => $formValidation->getErrorsStr()])->withStatus(400);

    $data = Usuarios::where('status', '1')
      ->whereRaw('LOWER(usuario) = ?', [strtolower($input['usuario'])])
      ->where('status', '1')
      ->whereIn('usuarios_funcoes_id', [1, 2])->first();

    if (!isset($data->usuario))
      return $response->withJson(['status' => false, 'msg' => 'Credencial invalida!'])->withStatus(400);


    return $response->withJson([
      'token' => $this->jwt->generate([
        'id' => $data->id,
        'nome' => $data->nome,
        'usuario' => $data->usuario
      ]),
      'id' => $data->id,
      'nome' => $data->nome,
      'status' => true,
      'tipo_usuario' => $data->tipo_usuario
    ]);
  }
  public function testToken(Request $request, Response $response)
  {
    return $response->withJson(['msg' => 'OK', 'status' => true]);
  }
}
