$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        url: 'src/atendente/model/validate-atendente.php',
        success: function(dados) {
            if (dados.tipo === 'error') {
                $(location).attr('href', 'index.html');
            } else {
                $('#user').append(dados.mensagem)
            }
        }
    })
})