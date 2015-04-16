function run(){
    var success = document.getElementsByClassName('success');
    for(var i=0; i < success.length; i++){
        success[i].addEventListener('click',onSuccessClick);
    }
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

function onSuccessClick(e){
    var ref = e.currentTarget.getElementsByTagName('a')[0].getAttribute('href');
    window.location.href = ref;
}