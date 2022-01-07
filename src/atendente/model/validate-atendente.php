<?php

    session_start(); //Inicio a sessão PHP

    // Verifico se existe sessão aberta com as seguintes informações --- ID e NOME
    if(!isset($_SESSION['ID']) && !isset($_SESSION['NOME'])){
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Você não está autenticado para utilizar o sistema, por favor realize o login.'
        );
    }else{
        $dados = array(
            'tipo' => 'success',
            'mensagem' => $_SESSION['NOME']
        );
    }

    echo json_encode($dados);