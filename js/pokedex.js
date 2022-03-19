var shiny = 0;

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            if(shiny == 0){
                let pokeImgF = data.sprites.front_default;
                pokeImage(pokeImgF,"pokeImgF");
                let pokeImgB = data.sprites.back_default;
                pokeImage(pokeImgB,"pokeImgB");
            }else if(shiny == 1){
                let pokeImgF = data.sprites.front_shiny;
                pokeImage(pokeImgF,"pokeImgF");
                let pokeImgB = data.sprites.back_shiny;
                pokeImage(pokeImgB,"pokeImgB");
            }

            let pokeImgO = data["sprites"]["other"]["official-artwork"]["front_default"];
            pokeImage(pokeImgO,"pokeImgOficial");

            //nombre pokemon
            document.getElementById('pokeNumber').innerHTML = data.id;
            document.getElementById('pokeNombre').innerHTML = data.name;
            document.getElementById('pokeAltura').innerHTML = data.height;
            document.getElementById('pokePeso').innerHTML = data.weight;

            var tipos = data["types"].length;
            var tiposS = "";
            for(var i=0;i<tipos;i++){
                tiposS += data["types"][i]["type"]["name"];
            }
            document.getElementById('pokeTipo').innerHTML = tiposS;

            var movimientos = data["moves"].length;
            var movimientosS = "";
            for(var j=0;j<5;j++){
                movimientosS += data["moves"][j]["move"]["name"] + " , ";
            }
            document.getElementById('pokeMovimientos').innerHTML = movimientosS;

            document.getElementById('pokeEstadisticas1V').innerHTML = + "  " + data["stats"][0]["base_stat"];
            document.getElementById('pokeEstadisticas2V').innerHTML = + "  " + data["stats"][1]["base_stat"];
            document.getElementById('pokeEstadisticas3V').innerHTML = + "  " + data["stats"][2]["base_stat"];
            document.getElementById('pokeEstadisticas4V').innerHTML = + "  " + data["stats"][3]["base_stat"];
            document.getElementById('pokeEstadisticas5V').innerHTML = + "  " + data["stats"][4]["base_stat"];
            document.getElementById('pokeEstadisticas6V').innerHTML = + "  " + data["stats"][5]["base_stat"];


        }
    });
}

const pokeImage = (url,id) => {
    const pokePhoto = document.getElementById(id);
    pokePhoto.src = url;
}


// método js
document.getElementById("pokeName").onkeydown = function(e){
    var ev = document.all ? window.event : e;
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;

    if(ev.keyCode==13 && pokeName != "") {
        shiny = 0;
        fetchPokemon();
    }

    if(ev.keyCode==39 && pokeName != "") {
        shiny = 1;
        fetchPokemon();
    }

    if(ev.keyCode==37 && pokeName != "") {
        shiny = 0;
        fetchPokemon();
    }
}
