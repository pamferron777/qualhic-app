<?php

namespace Services;

class Utils
{
  public static function getJwtDecode($header, $jwtService)
  {
    return $jwtService->decode(trim(implode(str_replace("Bearer", "", $header))));
  }
  public static function generateNameFile($dir)
  {
    $bytes = random_bytes(5);
    $bytes = bin2hex($bytes);
    $nameFile = strtotime(date('d-m-YH:i:s')) . $bytes;
    $i = 0;
    while (
      is_file($dir . $nameFile . '.jpeg')
      || is_file($dir . $nameFile . '.jpg')
      || is_file($dir . $nameFile . '.png')
    ) {
      $i++;
      $nameFile = $nameFile . $i;
    }
    return $nameFile;
  }
  public static function formatBrToDecimal($valor)
  {
    return str_replace(',', '.', str_replace('.', '', $valor));
  }
  public static function formatDateToFormatDB($date)
  {
    return date("Y-m-d", strtotime(str_replace('/', '-', $date)));
  }
  public static function formatDecimalToBr($valor)
  {
    return number_format($valor, 2, ',', '.');
  }
  public static function formatDbToDate($date)
  {
    return date("d/m/Y", strtotime($date));
  }
  public static function formatCpf($cpf)
  {
    $cpf = preg_replace("/\D/", '', $cpf);
    return preg_replace("/(\d{3})(\d{3})(\d{3})(\d{2})/", "\$1.\$2.\$3-\$4", $cpf);
  }
  public static function formatCnpj($cnpj)
  {
    $cnpj = preg_replace("/\D/", '', $cnpj);
    return preg_replace("/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/", "\$1.\$2.\$3/\$4-\$5", $cnpj);
  }
  public static function removeFormatCnpj($cnpj)
  {
    $cnpj = preg_replace("/\D/", '', $cnpj);
    return $cnpj;
  }
}
