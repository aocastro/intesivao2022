function buscaProduto(find) {

    let produto = `NOME=${find}`

    $('#result').show()

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: produto,
        url: 'src/produto/model/all-produto.php',
        success: function(dados) {
            $('.result').empty()
            for (const result of dados) {
                $('#result').append(`
                    <div class="form-group row result" id="PRODUTO${result.ID}">
                        <div class="col-12 col-sm-10 col-md-10">
                            <input type="text" name="PRODUTO" id="PRODUTO" class="form-control" value="${result.NOME}" readonly>
                            <input type="hidden" name="PRODUTO_ID[]" id="PRODUTO_ID" value="${result.ID}"/>
                        </div>
                        <div class="col-12 col-sm-2 col-md-2">
                            <button id="${result.ID}" class="btn btn-primary btn-block btn-selected">Selecionar</button>
                            <input type="text" name="QTDE[]" id="QTDE${result.ID}" class="form-control d-none" placeholder="Quantidade">
                        </div>
                    </div>
                `)
            }

            $('.btn-selected').click(function(e) {
                e.preventDefault()
                let div = `#PRODUTO${$(this).attr('id')}`
                $(div).removeClass('result')
                $('#' + $(this).attr('id')).hide()
                $('#QTDE' + $(this).attr('id')).removeClass('d-none')
            })
        }
    })
}

$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo compra')

        $('.modal-body').load('src/compra/view/form-compra.html', function() {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'src/fornecedor/model/all-fornecedor.php',
                success: function(dados) {
                    for (const result of dados) {
                        $('#FORNECEDOR_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                    }

                    $('#result').hide()

                    $('.btn-find').click(function(e) {
                        e.preventDefault()
                        let find = $('#find').val()
                        buscaProduto(find)
                    })
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-compra').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-compra').modal('hide')
    })
})