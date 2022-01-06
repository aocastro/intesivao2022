$(document).ready(function() {

    $('#table-fornecedor').on('click', 'button.btn-edit', function(e) {

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
            url: 'src/fornecedor/model/view-fornecedor.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/fornecedor/view/form-fornecedor.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#CNPJ').val(dado.dados.CNPJ)
                        $('#IESTADUAL').val(dado.dados.IESTADUAL)
                        $('#CEP').val(dado.dados.CEP)
                        $('#LOGRADOURO').val(dado.dados.LOGRADOURO)
                        $('#NUMERO').val(dado.dados.NUMERO)
                        $('#BAIRRO').val(dado.dados.BAIRRO)
                        $('#CIDADE').val(dado.dados.CIDADE)
                        $('#UF').val(dado.dados.UF)
                        $('#TELEFONE').val(dado.dados.TELEFONE)
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('.btn-save').show()
                    $('#modal-fornecedor').modal('show')
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