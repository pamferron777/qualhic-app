<?php

namespace Controllers\Admin\Atividades;

use \Models\Atividade;
use Controllers\Controller;
use Models\Usuarios;
use Services\ValidationInputs;
use Slim\Http\Request;
use Slim\Http\Response;

class AtividadesController extends Controller
{
    public function save(Request $request, Response $response)
    {
        $input = $request->getParsedBody();
        $formValidation = new ValidationInputs([
            'produto',
            'quantidade',
            'descricao|required',
            'data|required',
            'id_colaborador',
            'id_atividade'
        ], $input);
        if (!$formValidation->isValid())
            return $response->withJson(['status' => false, 'msg' => $formValidation->getErrorsStr()])->withStatus(400);
        if (!empty($input['id_atividade']))
            $atividade = Atividade::where('id', $input['id_atividade'])->first();
        else
            $atividade = new Atividade();
        $atividade->produto = $input['produto'];
        $atividade->quantidade = $input['quantidade'];
        $atividade->descricao = $input['descricao'];
        $atividade->data = $input['data'];
        $atividade->id_colaborador = $input['id_colaborador'];
        $atividade->id_usuario = (\Services\Utils::getJwtDecode($request->getHeader('Authorization'), $this->jwt))->id;
        $atividade->save();
        return $response->withJson(['status' => true, 'msg' => "Cadastrada com sucesso"]);
    }
    public function index(Request $request, Response $response)
    {
        return $response->withJson(['status' => true, 'data' => Atividade::orderBy('id', 'desc')->get()]);
    }
    public function getById(Request $request, Response $response, array $args)
    {
        return $response->withJson(['status' => true, 'data' => Atividade::where('id', intval($args['id']))->first()]);
    }
}
