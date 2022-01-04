<?php

    // Declarar as variáveis necessárias para a conexão com o banco de dados........
    $hostname = "sql304.epizy.com"; //Nome do servidor que se encontra nosso banco de dados
    $dbname = "epiz_30728937_CANTINA"; //Nome do nosso banco de dados
    $username = "epiz_30728937"; //Nome do usuário para acesso ao banco de daddos
    $password = "k3LFZYKXIJ"; //Senha de acesso ao nosso banco de daddos

    try {
        $pdo = new PDO('mysql:host='.$hostname.';dbaname='.$dbname, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo 'Conexão com banco de dados, realizado com sucesso!!!';
    }catch(PDOException $e) {
        echo 'Erro: '.$e->getMessage();
    }