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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-61966517-1', 'auto');
  ga('send', 'pageview');