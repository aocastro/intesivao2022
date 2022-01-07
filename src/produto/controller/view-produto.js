$(document).ready(function() {

    $('#table-produto').on('click', 'button.btn-view', function(e) {

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
            url: 'src/produto/model/view-produto.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/produto/view/form-produto.html', function() {
                        $('#CODIGOBARRAS').val(dado.dados.CODIGOBARRAS)
                        $('#CODIGOBARRAS').attr('readonly', 'true')
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#MARCA').val(dado.dados.MARCA)
                        $('#MARCA').attr('readonly', 'true')
                        $('#VLRCOMPRA').val(dado.dados.VLRCOMPRA)
                        $('#VLRCOMPRA').attr('readonly', 'true')
                        $('#VLRVENDA').val(dado.dados.VLRVENDA)
                        $('#VLRVENDA').attr('readonly', 'true')
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
                    })
                    $('.btn-save').hide()
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