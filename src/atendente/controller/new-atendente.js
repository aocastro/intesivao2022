$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo atendente')

        $('.modal-body').load('src/atendente/view/form-atendente.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-atendente').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-atendente').modal('hide')
    })
})