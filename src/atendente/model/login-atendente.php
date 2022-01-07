<?php

    // Obter a nossa conexão com o banco de dados
    include('../../conexao/conn.php');

    // Gerar uma consulta em banco de dados com as informações digitadas no formulário de login
    $sql = $pdo->query("SELECT *, count(ID) as achou FROM ATENDENTE WHERE LOGIN = '".$_REQUEST['LOGIN']."' AND SENHA = '".md5($_REQUEST['SENHA'])."'");

    // Gero as devidas comparações
    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        if($resultado['achou'] == 1){
            session_start(); // Inicio uma sessão --> é um local onde eu guardo informações para serem utilizadas posteriormente
            $_SESSION['ID'] = $resultado['ID'];
            $_SESSION['NOME'] = $resultado['NOME'];
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'Login correto!'
            );
        }else{
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Nome de usuário ou senha errado.'
            );
        }
    }

    echo json_encode($dados);