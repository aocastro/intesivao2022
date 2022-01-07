$(document).ready(function() {

    $('#table-compra').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let ID = `ID=${$(this).attr('id')}`

        Swal.fire({
            title: 'Sistema Para Gerenciamento de Cantina',
            text: 'Deseja realmente excluir esse registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: ID,
                    url: 'src/compra/model/delete-compra.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'Sistema Para Gerenciamento de Cantina',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-compra').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})