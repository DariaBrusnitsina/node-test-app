document.addEventListener("click", (e) => {
    if (e.target.dataset.type === "remove") {
        const id = e.target.dataset.id
        remove(id).then(() => {
            e.target.closest("li").remove()
        })
    } else if (e.target.dataset.type === "edit") {
        let newTitle = prompt("New title:", '');
        const id = e.target.dataset.id
        if (newTitle) {
            const data = {id: id, title: newTitle}
            rename(data).then(() => {
                e.target.closest("div").previousElementSibling.innerHTML = newTitle
            })
        }
    }
} )

async function remove(id) {
    await fetch(`${id}`, {method: "DELETE"})
}

async function rename(data) {
    await fetch(JSON.stringify(data), {method: "PUT"})
}
