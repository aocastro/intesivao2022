$(document).ready(function() {

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-cliente').modal('hide')
    })

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-cliente').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/cliente/model/save-cliente.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Sistema Para Gerenciamento de Cantina',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-cliente').modal('hide')
                $('#table-cliente').DataTable().ajax.reload()
            }
        })
    })

})