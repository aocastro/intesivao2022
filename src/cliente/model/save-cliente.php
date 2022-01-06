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
                $stmt = $pdo->prepare('INSERT INTO CLIENTE (NOME, CPF, RG, CEP, NUMERO, LOGRADOURO, BAIRRO, CIDADE, UF, EMAIL, CELULAR) VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i, :j, :l)');
                $stmt->execute(array(
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => md5($requestData['CPF']),
                    ':c' => md5($requestData['RG']),
                    ':d' => $requestData['CEP'],
                    ':e' => $requestData['NUMERO'],
                    ':f' => utf8_decode($requestData['LOGRADOURO']),
                    ':g' => utf8_decode($requestData['BAIRRO']),
                    ':h' => utf8_decode($requestData['CIDADE']),
                    ':i' => $requestData['UF'],
                    ':j' => $requestData['EMAIL'],
                    ':l' => $requestData['CELULAR']
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
                $stmt = $pdo->prepare('UPDATE CLIENTE SET NOME = :a, CPF = :b, RG = :c, CEP = :d, NUMERO = :e, LOGRADOURO = :f, BAIRRO = :g, CIDADE = :h, UF = :i, EMAIL = :j, CELULAR = :l WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => utf8_decode($requestData['NOME']),
                    ':b' => md5($requestData['CPF']),
                    ':c' => md5($requestData['RG']),
                    ':d' => $requestData['CEP'],
                    ':e' => $requestData['NUMERO'],
                    ':f' => utf8_decode($requestData['LOGRADOURO']),
                    ':g' => utf8_decode($requestData['BAIRRO']),
                    ':h' => utf8_decode($requestData['CIDADE']),
                    ':i' => $requestData['UF'],
                    ':j' => $requestData['EMAIL'],
                    ':l' => $requestData['CELULAR']
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