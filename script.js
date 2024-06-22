const menu = {
    /* Literal del menú, consta de varios properties sobre las etiquetas que forman
    el menu.
    
    * Dispone de dos métodos: toggleMenu y cambiarColor

    ** toggleMenu se encarga de mostrar y ocultar el desplegable

    ** cambiarColor se encarga de cambiar el color del fondo del botón de centrado
    durante un pequeño periodo
    */
    element: document.getElementById("menu"),
    cabecera: document.getElementById("menu_cabecera"),
    desplegable: document.getElementById("menu_desplegable"),
    desplagado: false,
    centrar: document.getElementById("centrar"),
    eliminar_mark: document.getElementById("eliminar_mark"),
    fijado: document.getElementById("fijar"),
    rango: document.getElementById("rango"),
    toggleMenu: function () {
        this.cabecera.addEventListener("touchend", () => {
            if (!this.desplagado) {
                this.desplegable.style.display = "block";
                this.desplagado = true;
            } else {
                this.desplegable.style.display = "none";
                this.desplagado = false;
            }
        });
    },
    cambiarColor: function () {
        this.centrar.addEventListener("touchend", () => {
            this.centrar.style.backgroundColor = "#3e8e41";
            setTimeout(() => {
                this.centrar.style.backgroundColor = "#4caf50";
            }, 1000);
        });
    },
};

menu.toggleMenu();
menu.cambiarColor();

const miMapa = {
    /* Literal del mapa.
    *Consta de varias properties que almacenan los marcadores, el circulo de destino
    la distancia entre la ubicación del usuario y el marcador y el tiempo en ms en el
    que se comprueba la distancia. Además del icono de un corazón en dos tamaños
    
    * Dispone de varios métodos: inicializar(), actualizarPosición(), colocarMarcador()
    eliminarMarcador(), centrar(), actualizarCirculo(), elegirVibracion(), 3 métodos para 
    distintas vibraciones y cambiarIcono()
    
    ** inicializar() se encarga de cargar el mapa, y colocar el marcador de la posición
    del usuario
    
    ** actualizarPosicion() se encarga de actualizar la posición del usuario periódicamente
    
    ** colocarMarcador() se encarga de colocar un marcador y un círculo al tocar el mapa
    
    ** eliminarMarcador() se encarga de eliminar el marcador y el círculo si existía
    
    ** centrar() se encarga de colocar la vista del mapa en la posición del usuario
    
    ** actualizarCirculo se encarga de ajustar el radio al radio dado por el menu
    
    ** elegirVibracion se encarga de calcular la distancia entre marcadores y según la 
    distancia se elige una vibración
    
    ** 3 métodos de vibración se encargan fijar un patrón de vibrado y cuando se termina 
    el intervalo se vuelve a preguntar que vibración realizar
    
    ** cambiarIcono() se encarga de cambiar el icono del marcador del usuario
    */
    mymap: L.map("sample_map"),
    posicionActual: undefined,
    posicionDestino: undefined,
    circuloDestino: undefined,
    distancia: undefined,
    tiempo_comprobar: 1200,
    existeMarcador: false,
    iconoCorazon: L.icon({
        iconUrl: "./images/heart-solid.svg",
        iconSize: [38, 95],
        iconAnchor: [19, 47],
    }),
    iconoCorazonGrande: L.icon({
        iconUrl: "./images/heart-solid.svg",
        iconSize: [57, 144],
        iconAnchor: [28, 80],
    }),
    iconoGrande: false,
    inicializar: function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.mymap.setView(
                        [position.coords.latitude, position.coords.longitude],
                        15
                    );
                    if (this.posicionActual) {
                        this.posicionActual.remove();
                    }
                    this.posicionActual = L.marker(
                        [position.coords.latitude, position.coords.longitude],
                        {
                            title: "Tu Posicion",
                            draggable: false,
                            icon: this.iconoCorazon,
                        }
                    ).addTo(this.mymap);
                },
                () => {
                    alert("Error al obtener la posición");
                }
            );
        }
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18,
        }).addTo(this.mymap);
    },
    actualizarPosicion: function () {
        if ("geolocation" in navigator && !this.posicionActual) {
            navigator.geolocation.watchPosition(
                (position) => {
                    this.posicionActual.setLatLng([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                },
                () => {
                    alert("No se ha podido acceder a la posición");
                }
            );
        }
        if (this.circuloDestino) {
            this.distancia = L.distance(
                this.posicionActual.getLatLng(),
                this.circuloDestino.getLatLng()
            );
        }
    },
    colocarMarcador: function (elem_rango, checkbox) {
        this.mymap.on(
            "click",
            function (e) {
                if (!checkbox.checked) {
                    if (this.posicionDestino) {
                        this.posicionDestino.remove();
                    }
                    this.posicionDestino = L.marker(e.latlng, {
                        title: "Tu Destino",
                        draggable: true,
                    }).addTo(this.mymap);
                    if (this.circuloDestino) {
                        this.circuloDestino.remove();
                    }
                    this.circuloDestino = L.circle(e.latlng, {
                        color: "blue",
                        fillColor: "#E0FFFF",
                        fillOpacity: 0.5,
                        radius: elem_rango.value,
                    }).addTo(this.mymap);
                    this.existeMarcador = true;
                }
            }.bind(this)
        );
    },
    eliminarMarcador: function (element) {
        element.addEventListener("touchend", () => {
            if (this.posicionDestino && this.circuloDestino) {
                this.posicionDestino.remove();
                this.circuloDestino.remove();
                this.existeMarcador = false;
            }
        });
    },
    centrar: function (element) {
        element.addEventListener("touchend", () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.mymap.setView(
                            [
                                position.coords.latitude,
                                position.coords.longitude,
                            ],
                            15
                        );
                    },
                    () => {
                        alert("Error al obtener la posición");
                    }
                );
            }
        });
    },
    actualizarCirculo: function (element) {
        element.addEventListener("input", (rango) => {
            if (this.circuloDestino) {
                this.circuloDestino.setRadius(rango.target.value);
            }
        });
    },
    elegirVibracion: function () {
        if (
            "vibrate" in navigator &&
            this.circuloDestino &&
            this.posicionActual &&
            this.existeMarcador
        ) {
            let rango = this.circuloDestino.getRadius();
            this.distancia = this.posicionActual
                .getLatLng()
                .distanceTo(this.circuloDestino.getLatLng());

            if (this.distancia - rango <= 0) {
                this.vibracionLlegada();
            } else if (this.distancia - 2 * rango <= 0) {
                this.vibracionCerca();
            } else if (this.distancia - 3 * rango <= 0) {
                this.vibracionLejos();
            } else {
                window.navigator.vibrate(0);

                setTimeout(
                    this.elegirVibracion.bind(this),
                    this.tiempo_comprobar
                );
            }
        } else {
            setTimeout(this.elegirVibracion.bind(this), this.tiempo_comprobar);
        }
    },

    vibracionLlegada: function () {
        let tiempo = 0;
        let intervalos = [50, 50, 50, 50];
        this.cambiarIcono();
        while (tiempo < this.tiempo_comprobar) {
            window.navigator.vibrate(intervalos);
            tiempo += 200;
        }
        setTimeout(this.elegirVibracion.bind(this), this.tiempo_comprobar);
    },

    vibracionCerca: function () {
        let tiempo = 0;
        let intervalos = [100, 75, 125, 75];
        this.cambiarIcono();
        while (tiempo < this.tiempo_comprobar) {
            window.navigator.vibrate(intervalos);
            tiempo += 400;
        }
        setTimeout(this.elegirVibracion.bind(this), this.tiempo_comprobar);
    },

    vibracionLejos: function () {
        let tiempo = 0;
        let intervalos = [150, 150, 150, 150];
        this.cambiarIcono();
        while (tiempo < this.tiempo_comprobar) {
            window.navigator.vibrate(intervalos);
            tiempo += 600;
        }

        setTimeout(this.elegirVibracion.bind(this), this.tiempo_comprobar);
    },
    cambiarIcono: function () {
        if (this.iconoGrande) {
            this.posicionActual.setIcon(this.iconoCorazon);
            this.iconoGrande = false;
        } else {
            this.posicionActual.setIcon(this.iconoCorazonGrande);
            this.iconoGrande = true;
        }
    },
};

miMapa.inicializar();
miMapa.actualizarPosicion();
miMapa.elegirVibracion();
miMapa.colocarMarcador(menu.rango, menu.fijado);
miMapa.eliminarMarcador(menu.eliminar_mark);
miMapa.actualizarCirculo(menu.rango);
miMapa.centrar(menu.centrar);
