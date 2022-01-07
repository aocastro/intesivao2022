$(document).ready(function() {

    $('.logout').click(function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            url: 'src/atendente/model/logout-atendente.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Sistema Para Gerenciamento de Cantina',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                if (dados.tipo === 'success') {
                    $(location).attr('href', 'index.html');
                }
            }
        })
    })
})