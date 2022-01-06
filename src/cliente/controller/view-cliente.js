$(document).ready(function() {

    $('#table-cliente').on('click', 'button.btn-view', function(e) {

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
            url: 'src/cliente/model/view-cliente.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/cliente/view/form-cliente.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#RG').val(dado.dados.RG)
                        $('#RG').attr('readonly', 'true')
                        $('#CPF').val(dado.dados.CPF)
                        $('#CPF').attr('readonly', 'true')
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
                        $('#EMAIL').val(dado.dados.EMAIL)
                        $('#EMAIL').attr('readonly', 'true')
                        $('#CELULAR').val(dado.dados.CELULAR)
                        $('#CELULAR').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-cliente').modal('show')
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