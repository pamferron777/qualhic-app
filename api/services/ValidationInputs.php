<?php


namespace Services;

class ValidationInputs
{
    private $errors = [];
    private $input;
    private $isInt;
    private $isFloat;
    public function __construct(array $campos, $input)
    {
        foreach ($campos as $row) {
            $exploded = explode('|', $row);
            $campo = $exploded[0];
            $required = false;
            $maxLength = false;
            $minLength = false;
            $isArray = false;
            $this->isInt = false;
            $this->isFloat = false;
            foreach ($exploded as $exp) {
                $ind = explode(':', $exp);
                switch ($ind[0]) {
                    case 'required':
                        $required = true;
                        break;
                    case 'max':
                        if (isset($ind[1]) && is_numeric($ind[1]))
                            $maxLength = $ind[1];
                        break;
                    case 'min':
                        if (isset($ind[1]) && is_numeric($ind[1]))
                            $minLength = $ind[1];
                        break;
                    case 'isInt':
                        $this->isInt = true;
                        break;
                    case 'isFloat':
                        $this->isFloat = true;
                        break;
                    case 'isArray':
                        $isArray = true;
                        break;
                }
            }

            if ($maxLength) {
                if (isset($input[$campo]) && !empty($input[$campo]))
                    $this->max($input[$campo], $campo, $maxLength);
            }

            if ($minLength) {
                if (isset($input[$campo]) && !empty($input[$campo]))
                    $this->min($input[$campo], $campo, $minLength);
            }

            if ($required) {
                if (!empty($input[$campo]) && $isArray && is_array($input[$campo]))
                    $input[$campo] = $input[$campo];
                else if (!isset($input[$campo])) {
                    $this->errors[] = ucfirst($campo) . " é requerido";
                } else {
                    $input[$campo] = $this->validateField($input[$campo]);
                }
            } else {
                if (!empty($input[$campo]) && $isArray && is_array($input[$campo])) {
                    $input[$campo] = $input[$campo];
                } else {

                    if (isset($input[$campo]))
                        $input[$campo] = $this->validateField($input[$campo]);
                    else
                        $input[$campo] = null;
                }
            }
        }
        $this->input = $input;
    }


    public function max($input, $campo, $maxLength)
    {
        if (empty($input))
            return;
        if (strlen($input) > $maxLength)
            $this->errors[] = ucfirst($campo) . " passou do limite de " . $maxLength . " caracteres";
    }
    public function min($input, $campo, $minLength)
    {
        if (empty($input))
            return;
        if (strlen($input) < $minLength)
            $this->errors[] = ucfirst($campo) . " precisa  de  no mínimo: " . $minLength . " caracteres";
    }

    public function validateField($input)
    {
        if ($this->isFloat) {
            $input = filter_var($input, FILTER_SANITIZE_NUMBER_FLOAT);
        } else if ($this->isInt) {
            $input = filter_var($input, FILTER_SANITIZE_NUMBER_INT);
        } else {
            $input = filter_var($input, FILTER_SANITIZE_STRING);
        }
        return $input;
    }

    public function getInput()
    {
        return $this->input;
    }
    public function getErrors()
    {
        return $this->errors;
    }
    public function getErrorsStr() {
        return implode(', ', $this->errors);
    }
    public function isValid()
    {
        return empty($this->errors);
    }
}
