<?php

namespace Controllers\Admin\Atividades;

use \Models\Atividade;
use Controllers\Controller;
use Models\Usuarios;
use Services\ValidationInputs;
use Slim\Http\Request;
use Slim\Http\Response;

class DashboardController extends Controller
{
    public function index(Request $request, Response $response) {
        return $response->withJson([
           'data' => [
            '1' => true
           ] 
        ]);
    }   
}