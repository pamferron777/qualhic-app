<?php
namespace Controllers\Colaboradores\Atividades;
use \Models\Atividade;
use Controllers\Controller;
use Services\ValidationInputs;
use Slim\Http\Request;
use Slim\Http\Response;

class AtividadesController extends Controller
{
    public function vincular(Request $request, Response $response)
    {
        $input = $request->getParsedBody();
        $formValidation = new ValidationInputs([
            'id_atividade|required'
        ], $input);
        if (!$formValidation->isValid())
            return $response->withJson(['status' => false, 'msg' => $formValidation->getErrorsStr()])->withStatus(400);
        $atividade = Atividade::where('id', $input['id_atividade'])->first();
        $atividade->id_colaborador = (\Services\Utils::getJwtDecode($request->getHeader('Authorization'), $this->jwt))->id;
        $atividade->save();
        return $response->withJson(['status' => true, 'msg' => "Vinculado com sucesso"]);
    }
    public function finalizar(Request $request, Response $response)
    {
        $id_user = (\Services\Utils::getJwtDecode($request->getHeader('Authorization'), $this->jwt))->id;
        $input = $request->getParsedBody();
        $formValidation = new ValidationInputs([
            'id_atividade|required'
        ], $input);
        if (!$formValidation->isValid())
            return $response->withJson(['status' => false, 'msg' => $formValidation->getErrorsStr()])->withStatus(400);
        $atividade = Atividade::where('id', $input['id_atividade'])->first();
        $atividade->id_colaborador = $id_user;
        $atividade->finalizado = '1';
        $atividade->save();
        return $response->withJson(['status' => true, 'msg' => "Vinculado com sucesso"]);
    }
    public function index(Request $request, Response $response)
    {
        $id_user = (\Services\Utils::getJwtDecode($request->getHeader('Authorization'), $this->jwt))->id;
        return $response->withJson(['status' => true, 'data' => Atividade::orderBy('id', 'desc')
            ->where(function ($query) use ($id_user) {
                $query->where('id_colaborador', null)->orWhere('id_colaborador', $id_user);
            })
            ->get()]);
    }
    public function getById(Request $request, Response $response, array $args)
    {
        return $response->withJson(['status' => true, 'data' => Atividade::where('id', intval($args['id']))->first()]);
    }
}
