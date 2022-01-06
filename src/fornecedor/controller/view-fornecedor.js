$(document).ready(function() {

    $('#table-fornecedor').on('click', 'button.btn-view', function(e) {

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
            url: 'src/fornecedor/model/view-fornecedor.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/fornecedor/view/form-fornecedor.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#CNPJ').val(dado.dados.CNPJ)
                        $('#CNPJ').attr('readonly', 'true')
                        $('#IESTADUAL').val(dado.dados.IESTADUAL)
                        $('#IESTADUAL').attr('readonly', 'true')
                        $('#CEP').val(dado.dados.CEP)
                        $('#CEP').attr('readonly', 'true')
                        $('#LOGRADOURO').val(dado.dados.LOGRADOURO)
                        $('#LOGRADOURO').attr('readonly', 'true')
                        $('#NUMERO').val(dado.dados.NUMERO)
                        $('#NUMERO').attr('readonly', 'true')
                        $('#BAIRRO').val(dado.dados.BAIRRO)
                        $('#BAIRRO').attr('readonly', 'true')
                        $('#CIDADE').val(dado.dados.CIDADE)
                        $('#CIDADE').attr('readonly', 'true')
                        $('#UF').val(dado.dados.UF)
                        $('#UF').attr('readonly', 'true')
                        $('#TELEFONE').val(dado.dados.TELEFONE)
                        $('#TELEFONE').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
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