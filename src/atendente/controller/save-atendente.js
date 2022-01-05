$(document).ready(function() {

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-atendente').modal('hide')
    })

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-atendente').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/atendente/model/save-atendente.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Sistema Para Gerenciamento de Cantina',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-atendente').modal('hide')
                $('#table-atendente').DataTable().ajax.reload()
            }
        })
    })

})