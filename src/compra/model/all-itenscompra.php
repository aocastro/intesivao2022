<?php

    include('../../conexao/conn.php');

    $dados = array();

    $ID = $_REQUEST['ID'];

    $sql = "SELECT * FROM ITENSCOMPRA I, PRODUTO P WHERE I.PRODUTO_ID = P.ID AND COMPRA_ID = $ID";

    $resultado = $pdo->query($sql);

    if($resultado){
        
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map('utf8_encode', $row);
        }
        
    }

    echo json_encode($dados);