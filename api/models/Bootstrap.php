<?php

namespace Models;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;




final class Bootstrap
{

    public static function load($container)
    {
        $settings = $container->get('settings');
        $capsule = new Capsule();

        //Conexão com o Banco
        $capsule->addConnection($settings['db_eloquent'], "default");
        $capsule->setEventDispatcher(new Dispatcher(new Container));
        $capsule->setAsGlobal();
        $capsule->bootEloquent();
    }
}
