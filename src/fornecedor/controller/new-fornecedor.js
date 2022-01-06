$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo fornecedor')

        $('.modal-body').load('src/fornecedor/view/form-fornecedor.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-fornecedor').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-fornecedor').modal('hide')
    })
})