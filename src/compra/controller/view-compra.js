$(document).ready(function() {

    $('#table-compra').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/compra/model/view-compra.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/compra/view/form-compra.html', function() {
                        $('#FORNECEDOR_ID').empty()
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'src/fornecedor/model/all-fornecedor.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    if (dado.dados.FORNECEDOR_ID == result.ID) {
                                        $('#FORNECEDOR_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                                    }
                                }
                            }
                        })
                        $('#FORNECEDOR_ID').attr('readonly', 'true')
                        $('#DATA').val(dado.dados.DATAFORMATADA)
                        $('#DATA').attr('readonly', 'true')
                        $('#VENCIMENTO').val(dado.dados.DATAVCTO)
                        $('#VENCIMENTO').attr('readonly', 'true')
                        $('#VALORTOTAL').val(dado.dados.VALORTOTAL)
                        $('#VALORTOTAL').attr('readonly', 'true')
                        $('#FORMAPGTO').empty()
                        switch (dado.dados.FORMAPGTO) {
                            case '1':
                                $('#FORMAPGTO').append(`<option>Dinheiro</option>`);
                                break;
                            case '2':
                                $('#FORMAPGTO').append(`<option>Cartão de crédito</option>`);
                                break;
                            case '3':
                                $('#FORMAPGTO').append(`<option>Cartão de débito</option>`);
                                break;
                            case '4':
                                $('#FORMAPGTO').append(`<option>Boleto</option>`);
                                break;
                            case '5':
                                $('#FORMAPGTO').append(`<option>PIX</option>`);
                                break;
                        }
                        $('#FORMAPGTO').attr('readonly', 'true')

                        $('#buscaProdutos').hide();

                        let ID = `ID=${dado.dados.ID}`

                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            data: ID,
                            url: 'src/compra/model/all-itenscompra.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    $('#result').append(`
                                    <div class="form-group row result">
                                        <div class="col-12 col-sm-10 col-md-10">
                                            <input type="text" class="form-control" value="${result.NOME}" readonly>
                                        </div>
                                        <div class="col-12 col-sm-2 col-md-2">
                                            <input type="text" class="form-control" value="${result.QTDE}" readonly>
                                        </div>
                                    </div>
                                    `)
                                }
                            }
                        })

                    })
                    $('.btn-save').hide()
                    $('#modal-compra').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'Sistema Para Gerenciamento de Cantina', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})