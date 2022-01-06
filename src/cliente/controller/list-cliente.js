$(document).ready(function() {
    $('#table-cliente').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/cliente/model/list-cliente.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/dataTables/pt_br.json"
        },
        "columns": [{
                "data": 'ID',
                "className": 'text-center'
            },
            {
                "data": 'NOME',
                "className": 'text-center'
            },
            {
                "data": 'CELULAR',
                "className": 'text-center'
            },
            {
                "data": 'ID',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit"><i class="mdi mdi-pencil"></i></button>
                    `
                }
            }
        ]
    })
})