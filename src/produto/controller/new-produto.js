$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo produto')

        $('.modal-body').load('src/produto/view/form-produto.html', function() {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'src/fornecedor/model/all-fornecedor.php',
                success: function(dados) {
                    for (const result of dados) {
                        $('#FORNECEDOR_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-produto').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-produto').modal('hide')
    })
})