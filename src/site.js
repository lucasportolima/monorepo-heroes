var selectedHero = ''
var selectHero = (index) => {
  selectedHero = table.api().data()[index]
  form = document.querySelector('#editHero')
  form.name.value = selectedHero.name
  form.team.value = selectedHero.team
}
var table

async function onLoad() {
  table = $('#myTable').dataTable({
    ajax: {
      url: 'http://localhost:3000/heroes',
      dataSrc: ''
    },
    retrieve: true,
    columns: [
      { data: 'id', title: 'Id' },
      { data: 'name', title: 'Nome' },
      { data: 'team', title: 'Time' },
      {
        title: "Ações",
        "render": function (data, type, row, meta) {
          return `
            <div class="d-flex">
              <button type="button" class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-dismiss="modal" onclick="selectHero(${meta.row})">
                Editar
              </button>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="modal" onclick="selectHero(${meta.row})">
                Excluir
              </button>
            </div>
          `
        }
      }
    ]
  });
}

async function deleteHero() {
  await api.delete('hero', { id: selectedHero.id })
  table.api().data().ajax.reload()
}

async function editHero() {
  form = document.querySelector('#editHero')
  await api.put('hero', { id: selectedHero.id, name: form.name.value, team: form.team.value })
  table.api().data().ajax.reload()
}

async function newHero() {
  form = document.querySelector('#newHero')
  await api.post('hero', { name: form.name.value, team: form.team.value })
  table.api().data().ajax.reload()
}