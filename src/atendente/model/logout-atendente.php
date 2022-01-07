<?php

    session_start(); //Inicio a sessão para coletar das as informações existentes na sessão do navegador

    session_destroy(); //Destruo todas as informações da sessão e também a encerro

    $dados = array(
        'tipo' => 'success',
        'mensagem' => 'Sua sessão foi encerrada.'
    );

    echo json_encode($dados);