<?php

session_start();
require_once 'config.php';

$conn->query("INSERT INTO alunos (nome, tamanho_pe) VALUES ('rapaz', 32)")

?>