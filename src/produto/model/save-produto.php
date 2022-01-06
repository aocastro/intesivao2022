<?php

    // Obter a nossa conexão com o banco de dados
    include('../../conexao/conn.php');

    // Obter os dados enviados do formulário via $_REQUEST
    $requestData = $_REQUEST;

    // Verificação de campo obrigatórios do formulário
    if(empty($requestData['NOME'])){
        // Caso a variável venha vazia eu gero um retorno de erro do mesmo
        $dados = array(
            "tipo" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    } else {
        // Caso não exista campo em vazio, vamos gerar a requisição
        $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
        $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

        // Verifica se é para cadastra um nvo registro
        if($operacao == 'insert'){
            // Prepara o comando INSERT para ser executado
            try{
                $stmt = $pdo->prepare('INSERT INTO PRODUTO (CODIGOBARRAS, NOME, MARCA, VLRCOMPRA, VLRVENDA, FORNECEDOR_ID) VALUES (:a, :b, :c, :d, :e, :f)');
                $stmt->execute(array(
                    ':a' => $requestData['CODIGOBARRAS'],
                    ':b' => utf8_decode($requestData['NOME']),
                    ':c' => utf8_decode($requestData['MARCA']),
                    ':d' => $requestData['VLRCOMPRA'],
                    ':e' => $requestData['VLRVENDA'],
                    ':f' => $requestData['FORNECEDOR_ID']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro salvo com sucesso.'
                );
            } catch(PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível salvar o registro: .'.$e
                );
            }
        } else {
            // Se minha variável operação estiver vazia então devo gerar os scripts de update
            try{
                $stmt = $pdo->prepare('UPDATE PRODUTO SET CODIGOBARRAS = :a, NOME = :b, MARCA = :c, VLRCOMPRA = :d, VLRVENDA = :e, FORNECEDOR_ID = :f WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => $requestData['CODIGOBARRAS'],
                    ':b' => utf8_decode($requestData['NOME']),
                    ':c' => utf8_decode($requestData['MARCA']),
                    ':d' => $requestData['VLRCOMPRA'],
                    ':e' => $requestData['VLRVENDA'],
                    ':f' => $requestData['FORNECEDOR_ID']
                ));
                $dados = array(
                    "tipo" => 'success',
                    "mensagem" => 'Registro atualizado com sucesso.'
                );
            } catch (PDOException $e) {
                $dados = array(
                    "tipo" => 'error',
                    "mensagem" => 'Não foi possível efetuar o alteração do registro.'.$e
                );
            }
        }
    }

    // Converter um array ded dados para a representação JSON
    echo json_encode($dados);