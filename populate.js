
function populateJS(){
    for(let i=0; i<10; i++){
        fetch('/create-one',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `user${i}`,
                lines: `${i} How are you my Fellow?`
            })
        })
    }
}

populateJS();