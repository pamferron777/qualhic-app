<?php

namespace Controllers;

abstract class Controller
{

    protected $container;

    public function __construct(\Slim\Container $container)
    {
        $this->container = $container;
    }

    public function __get($propriedade)
    {
        if ($this->container->{$propriedade})
            return $this->container->{$propriedade};
    }
}
