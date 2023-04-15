document.addEventListener("click", (e) => {
    if (e.target.dataset.type === "remove") {
        const id = e.target.dataset.id
        remove(id).then(() => {
            e.target.closest("li").remove()
        })
    } else if (e.target.dataset.type === "edit") {
        const id = e.target.dataset.id
        e.target.closest("li").classList.remove("d-flex")
        e.target.closest("li").innerHTML =
           ` <form class="d-flex justify-content-between align-items-center">
                <div className="form-group mb-2">
                    <input id=${id} type="text" className="form-control" name="title">
                </div>
                <div>
                    <button class="btn btn-success" data-id=${id} data-type="save">Save</button>
                    <button class="btn btn-danger" data-id=${id} data-type="cancel">Cancel</button>
                </div>
            </form>`
    } else if (e.target.dataset.type === "save") {
        e.preventDefault()
        const id = e.target.dataset.id
        const input = document.getElementById(id)
        if (input.value) {
            const data = {id: id, title: input.value}
            rename(data).then(() => {
                e.target.closest("li").classList.add("d-flex")
                e.target.closest("li").id = input.value
                e.target.closest("li").innerHTML =
                    `<p>${input.value}</p>
                        <div>
                            <button class="btn btn-primary" data-type="edit" data-id=${id}>Edit</button>
                            <button class="btn btn-danger" data-type="remove" data-id=${id}>&times;</button>
                        </div>`
            })
            }
    } else if (e.target.dataset.type === "cancel") {
        e.preventDefault()
        const id = e.target.dataset.id
        const lastTitle = e.target.closest("li").id

        e.target.closest("li").classList.add("d-flex")
        e.target.closest("li").innerHTML =
            `<p>${lastTitle}</p>
                <div>
                    <button class="btn btn-primary" data-type="edit" data-id=${id}>Edit</button>
                    <button class="btn btn-danger" data-type="remove" data-id=${id}>&times;</button>
                </div>`
    }


})

async function remove(id) {
    await fetch(`${id}`, {method: "DELETE"})
}

async function get() {
    await fetch(``, {method: "GET"})
}

async function rename(data) {
    await fetch(JSON.stringify(data), {method: "PUT"})
}
