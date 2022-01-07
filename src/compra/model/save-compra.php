<?php

    // Obter a nossa conexão com o banco de dados
    include('../../conexao/conn.php');

    // Obter os dados enviados do formulário via $_REQUEST
    $requestData = $_REQUEST;

    // Verificação de campo obrigatórios do formulário
    if(empty($requestData['DATA'])){
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

            $atendente = 1;

            try{
                $stmt = $pdo->prepare('INSERT INTO COMPRA (DATA, VALORTOTAL, FORMAPGTO, VENCIMENTO, FORNECEDOR_ID, ATENDENTE_ID) VALUES (:a, :b, :c, :d, :e, :f)');
                $stmt->execute(array(
                    ':a' => $requestData['DATA'],
                    ':b' => $requestData['VALORTOTAL'],
                    ':c' => $requestData['FORMAPGTO'],
                    ':d' => $requestData['VENCIMENTO'],
                    ':e' => $requestData['FORNECEDOR_ID'],
                    ':f' => $atendente
                ));


                // OBTER O ID DA ÚLTIMA COMPRA SALVA...

                // EXECUTAR A INSERÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ITENSCOMPRA

                // VERIFICAÇÃO PARA A TABELA ESTOQUE - SE O PRODUTO JÁ TIVER ESTOQUE SOMENTE ATUALIZAREMOS, SENÃO IREMOS CADASTRAR O PRODUTO NA TABELA ESTOQUE E ARMAZENAREMOS A QUANTIDADE EM ESTOQUE.


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
                $stmt = $pdo->prepare('UPDATE COMPRA SET DATA = :a, VALORTOTAL = :b, FORMAPGTO = :c, VENCIMENTO = :d, FORNECEDOR_ID = :e, ATENDENTE_ID = :f WHERE ID = :id');
                $stmt->execute(array(
                    ':id' => $ID,
                    ':a' => $requestData['DATA'],
                    ':b' => $requestData['VALORTOTAL'],
                    ':c' => $requestData['FORMAPGTO'],
                    ':d' => $requestData['VENCIMENTO'],
                    ':e' => $requestData['FORNECEDOR_ID'],
                    ':f' => $atendente
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