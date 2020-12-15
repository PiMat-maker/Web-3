$(document).ready( () => {
        let clock = document.getElementById("clock");

        function time(){
            clock.innerHTML = new Date().toLocaleTimeString();
            let t = setTimeout(function(){
                time()}, 13000);
        }

        time();
    }
);
