$(document).ready(function() {

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-compra').modal('hide')
    })

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-compra').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/compra/model/save-compra.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Sistema Para Gerenciamento de Cantina',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-compra').modal('hide')
                $('#table-compra').DataTable().ajax.reload()
            }
        })
    })

})