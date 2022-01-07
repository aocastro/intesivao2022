<?php

    // Instância do banco de dados
    include("../../conexao/conn.php");

    // Coleta do ID que será excluído do nosso banco de dados que está sendo enviado pelo FORM
    $ID = $_REQUEST['ID'];

    // Obter as quantidades cadastradas com a compra para atualizar o estoque
    $sql = $pdo->query("SELECT * FROM ITENSCOMPRA WHERE COMPRA_ID = $ID");

    // Executando uma varredura no array encotrado para atualizar o estoque
    while($resultado = $sql->fetch(PDO::FETCH_ASSOC)){

        $PRODUTO_ID = $resultado['PRODUTO_ID'];

        // Obter a quantidade atual em estoque para realizar a atualização
        $sqlEstoque = $pdo->query("SELECT QTDE FROM ESTOQUE WHERE PRODUTO_ID = $PRODUTO_ID");
        while($resultEstoque = $sqlEstoque->fetch(PDO::FETCH_ASSOC)){
            $QTDE = $resultEstoque['QTDE'];
        }

        // Gera a atualização do estoque a partir do que se tem o do que irá ser excluído
        $QTDE -= $resultado['QTDE'];

        // EXECUTAR A ATUALIZAÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ESTOQUE
        $stmt = $pdo->prepare('UPDATE ESTOQUE SET QTDE = :b WHERE PRODUTO_ID = :a');
        $stmt->execute(array(
            ':a' => $resultado['PRODUTO_ID'],
            ':b' => $QTDE
        ));

    }

    // Obter os itens da compra cadastradas para exclui-las
    $sql = $pdo->query("SELECT * FROM ITENSCOMPRA WHERE COMPRA_ID = $ID");

    // Executando a exclusão dos itens de compra referente a compra selecionada
    while($resultado = $sql->fetch(PDO::FETCH_ASSOC)){
        
        // EXECUTAR A ATUALIZAÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ESTOQUE
        $stmt = $pdo->prepare('DELETE FROM ITENSCOMPRA WHERE COMPRA_ID = :id');
        $stmt->execute(array(
            ':id' => $ID
        ));

    }

    // Criar a nossa querie para interação com o banco de dados
    $sql = "DELETE FROM COMPRA WHERE ID = $ID";

    // Executar a nossa querie
    $resultado = $pdo->query($sql);

    // Testaremos o retorno do resultado da nossa querie
    if($resultado){
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Registro excluído com sucesso!'
        );
    } else {
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível excluir o registro'
        );
    }

    echo json_encode($dados);