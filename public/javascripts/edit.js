const edit_parent = document.querySelector('.data-in-mongoDB');

edit_parent.addEventListener('click', (e) => {
    if(e.target.textContent !== 'Edit') return;    
    const idName = e['target']['className'].split(' ')[1];
    console.log(idName);

    fetch(`/edit-${idName}`,{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: idName,
          })
    })
    .then( (res) => res.json() )
    .then( (data) => {
            // console.log('Client side put request complete.');
            const {redirectTo, editTarget} = data;
            console.log(redirectTo, editTarget);
            if(redirectTo){
                location.assign(redirectTo);
            }
            // window.location.reload();
        });
    e.stopPropagation();

});