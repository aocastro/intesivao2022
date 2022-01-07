$(document).ready(function() {
    $('#table-compra').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/compra/model/list-compra.php",
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
                "data": 'DATA',
                "className": 'text-center'
            },
            {
                "data": 'FORNECEDOR_ID',
                "className": 'text-center'
            },
            {
                "data": 'VENCIMENTO',
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