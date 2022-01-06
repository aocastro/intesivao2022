<?php

    include('../../conexao/conn.php');

    $dados = array();


    $sql = "SELECT * FROM FORNECEDOR ORDER BY NOME";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);