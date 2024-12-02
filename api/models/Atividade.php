<?php

namespace Models;


use Illuminate\Database\Eloquent\Model as Eloquent;
use Models\Usuarios;

class Atividade extends Eloquent
{
    // Nome da tabela
    protected $table = 'atividades';

    // Chave primária
    protected $primaryKey = 'id';

    // Indica se a chave primária é incrementada automaticamente
    public $incrementing = true;


    // Colunas que podem ser atribuídas em massa
    protected $fillable = [
        'nome_atividade',
        'id_usuario',
        'data',
        'produto',
        'quantidade',
        'descricao',
        'id_colaborador',
        'finalizada'
    ];

    // Colunas que devem ser tratadas como datas
    protected $dates = [
        'data',
        'created_at',
        'updated_at',
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'id_usuario');
    }

    public function colaborador()
    {
        return $this->belongsTo(Usuarios::class, 'id_colaborador');
    }
}
