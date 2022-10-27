const node_parent = document.querySelector('.data-in-mongoDB');


node_parent.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    if(e.target.textContent !== 'Delete') return;
    fetch('/delete-one',{
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: e.target.id
          })
    })
        .then( () => {
            console.log('Client side request complete.');
            window.location.reload();
        });
    e.stopPropagation();
});
