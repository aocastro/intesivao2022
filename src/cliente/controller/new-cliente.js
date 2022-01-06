$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo cliente')

        $('.modal-body').load('src/cliente/view/form-cliente.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-cliente').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-cliente').modal('hide')
    })
})