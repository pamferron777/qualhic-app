<?php

namespace Models;

use Illuminate\Database\Eloquent\Model as Eloquent;

class Usuarios extends Eloquent
{
    protected $table = "usuarios";
    protected $fillable = [
        'email', 'password', 'nome', 'foto', 'id', 'usuarios_funcoes_id', 'usuario',
        'id_usuario_tasy',
        'token'
    ];
    protected $primaryKey = 'id';
    protected $appends = [
        'tipo_usuario'
    ];
    public function getTipoUsuarioAttribute()
    {
        switch ($this->attributes['usuarios_funcoes_id']) {
            case '1':
                return 'Administrador';
            case '2':
                return 'Colaborador';
            default:
                return 'N/A';
        }
    }
}
