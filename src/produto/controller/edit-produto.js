$(document).ready(function() {

    $('#table-produto').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/produto/model/view-produto.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/produto/view/form-produto.html', function() {
                        $('#CODIGOBARRAS').val(dado.dados.CODIGOBARRAS)
                        $('#NOME').val(dado.dados.NOME)
                        $('#MARCA').val(dado.dados.MARCA)
                        $('#VLRCOMPRA').val(dado.dados.VLRCOMPRA)
                        $('#VLRVENDA').val(dado.dados.VLRVENDA)
                        $('#FORNECEDOR_ID').empty()
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'src/fornecedor/model/all-fornecedor.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    if (dado.dados.FORNECEDOR_ID == result.ID) {
                                        $('#FORNECEDOR_ID').append(`<option value="${result.ID}" selected>${result.NOME}</option>`)
                                    } else {
                                        $('#FORNECEDOR_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                                    }
                                }
                            }
                        })
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('.btn-save').show()
                    $('#modal-produto').modal('show')
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