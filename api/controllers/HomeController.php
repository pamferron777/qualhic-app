<?php

namespace Controllers;

use Controllers\Controller;
use Models\Usuarios;
use Services\CriptoPasswordTasy;
use Slim\Http\Request;
use Slim\Http\Response;

class HomeController extends Controller
{
    public function index(Request $request, Response $response) {
        return $response->withJson(['msg' => 'Bem vindo a API da Qualhic', 'status' => true]);
    }
}
