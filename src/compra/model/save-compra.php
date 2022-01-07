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

            session_start();
            $atendente = $_SESSION['ID'];

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
                // QUERIE DE CONSULTA DO ÚLTIMO REGISTRO SALVO NA TABELA COMPRA
                $sql = $pdo->query('SELECT * FROM COMPRA ORDER BY ID DESC LIMIT 1');

                // ATRIBUINDO O RESULTADO ENCONTRADO A UMA VARIÁVEL PARA USO NA QUERIE DE INSERT DOS ITENSCOMPRA
                while($resultado = $sql->fetch(PDO::FETCH_ASSOC)){
                    $COMPRA_ID = $resultado['ID'];
                }

                // OBTER A QUANTIDADE DE PRODUTOS QUE SERÃO CADASTRADOS, A PARTIR DO QUE FOI ENVIADO PELO FORMULÁRIO
                $indice = count(array_filter($requestData['PRODUTO_ID']));

                // GERAÇÃO DE UMA LAÇO DE REPETIÇÃO PARA PERCORRER TODOS OS PRODUTOS E ASSIM IR CADASTRANDO OS MESMOS NA TABELA ITENSCOMPRA
                for($i=0; $i < $indice; $i++) {
                    // EXECUTAR A INSERÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ITENSCOMPRA
                    $stmt = $pdo->prepare('INSERT INTO ITENSCOMPRA (PRODUTO_ID, COMPRA_ID, QTDE) VALUES (:a, :b, :c)');
                    $stmt->execute(array(
                        ':a' => $requestData['PRODUTO_ID'][$i],
                        ':b' => $COMPRA_ID,
                        ':c' => $requestData['QTDE'][$i]
                    ));
                }

                // VERIFICAÇÃO PARA A TABELA ESTOQUE - SE O PRODUTO JÁ TIVER ESTOQUE SOMENTE ATUALIZAREMOS, SENÃO IREMOS CADASTRAR O PRODUTO NA TABELA ESTOQUE E ARMAZENAREMOS A QUANTIDADE EM ESTOQUE.

                for($i=0; $i < $indice; $i++) {

                    // QUERIE PARA VERIFICAÇÃO DA EXISTÊNCIA DO PRODUTO NO ESTOQUE OU NÃO
                    $sql = $pdo->query('SELECT COUNT(PRODUTO_ID) as FIND FROM ESTOQUE WHERE PRODUTO_ID = '.$requestData['PRODUTO_ID'][$i].'');
                    
                    // CONTAGEM DE QUANTOS REGISTROS FORAM ENCONTRADOS 0(ZERO) OU 1(HUM)
                    while($resultado = $sql->fetch(PDO::FETCH_ASSOC)){
                        $encontrado = $resultado['FIND'];
                    }

                    if($encontrado == '0'){
                        
                        // EXECUTAR A INSERÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ESTOQUE
                        $stmt = $pdo->prepare('INSERT INTO ESTOQUE (PRODUTO_ID, QTDE) VALUES (:a, :b)');
                        $stmt->execute(array(
                            ':a' => $requestData['PRODUTO_ID'][$i],
                            ':b' => $requestData['QTDE'][$i]
                        ));

                    }else{

                        // EXECUTAR A ATUALIZAÇÃO DAS INFORMAÇÕES DOS PRODUTOS NA TABELA ESTOQUE
                        $stmt = $pdo->prepare('UPDATE ESTOQUE SET QTDE = QTDE + :b WHERE PRODUTO_ID = :a');
                        $stmt->execute(array(
                            ':a' => $requestData['PRODUTO_ID'][$i],
                            ':b' => $requestData['QTDE'][$i]
                        ));

                    }
                }

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
        }
    }

    // Converter um array ded dados para a representação JSON
    echo json_encode($dados);