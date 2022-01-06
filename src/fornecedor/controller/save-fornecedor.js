$(document).ready(function() {

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-fornecedor').modal('hide')
    })

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-fornecedor').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/fornecedor/model/save-fornecedor.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Sistema Para Gerenciamento de Cantina',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-fornecedor').modal('hide')
                $('#table-fornecedor').DataTable().ajax.reload()
            }
        })
    })

})