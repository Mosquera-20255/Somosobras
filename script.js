document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // 1. GENERADOR DE POLÍGONOS (FONDO TECH)
    // =============================================================
    const createPolygons = () => {
        const containerId = 'polygons-container';
        let polygonContainer = document.getElementById(containerId);

        if (!polygonContainer) {
            polygonContainer = document.createElement('div');
            polygonContainer.id = containerId;
            document.body.prepend(polygonContainer);
        }

        const polygonCount = 25;
        const colors = [
            'rgba(122, 49, 138, 0.4)',
            'rgba(255, 215, 0, 0.4)',
            'rgba(255, 255, 255, 0.2)'
        ];
        const shapes = [
            'polygon(50% 0%, 100% 100%, 0% 100%)', // Triángulo
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexágono
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Rombo
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' // Cuadrado
        ];

        for (let i = 0; i < polygonCount; i++) {
            const polygon = document.createElement('div');
            polygon.classList.add('polygon-shape');

            const size = Math.random() * 40 + 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 20;

            polygon.style.width = `${size}px`;
            polygon.style.height = `${size}px`;
            polygon.style.left = `${left}%`;
            polygon.style.borderColor = color;
            polygon.style.clipPath = shape;

            if (Math.random() > 0.5) {
                polygon.style.background = color;
            }

            polygon.style.animationDuration = `${duration}s`;
            polygon.style.animationDelay = `-${delay}s`;

            polygonContainer.appendChild(polygon);
        }
    };

    createPolygons();


    // =============================================================
    // 2. LÓGICA DEL FORMULARIO
    // =============================================================
    const form = document.getElementById('registroForm');

    if (form) {
        const tipoOrigenSelect = document.getElementById('tipo_origen');
        const grupoJac = document.getElementById('grupo-jac');
        const selectJac = document.getElementById('seleccion_jac');
        const grupoPh = document.getElementById('grupo-ph');
        const selectPh = document.getElementById('seleccion_ph');
        const grupoOtro = document.getElementById('grupo-otro');
        const inputOtro = document.getElementById('otro_origen');
        const submitButton = form.querySelector('button[type="submit"]');

        const listaJAC = [
            "Altos de Santa Ana", "Bremen 2 Sector", "Bremen", "Cartagenita y Minipilla", "Centro Histórico",
            "Conjunto Residencial Serrezuelita", "Diamante Occidental", "Diamante Oriental", "El Carmen", "El Dorado",
            "El Laurel", "El Paraiso", "El Portal del Cerrito", "El Porvenir 2 Sector (Porvenir Río 2)", "El Rubi",
            "El Rubi 2", "La Cumbre II", "La Esperanza", "La Sabana", "Los Puentes", "Lucero", "Urbanización Maipore",
            "Orinso", "Planadas", "Planadas II Sector", "Praderas de Mosquera 2", "Santa Ana", "Serrezuelita",
            "Urbanización Torres de San Felipe", "Unidad Residencial El Cabrero", "Urbanización Alicante",
            "Urbanización Altos de San Juan", "Urbanización El Condado del Duque", "Urbanización El Poblado",
            "Urbanización El Porvenir Centro", "Urbanización El Remanso", "Urbanización Iregui 1", "Urbanización Iregui 2",
            "Urbanización La Arboleda", "Urbanización La Cabaña", "Urbanización La Cartuja", "Urbanización Las Villas",
            "Urbanización Nueva Castilla", "Urbanización Praderas", "Urbanización San Sebastián", "Urbanización San Telmo",
            "Urbanización Villa Daniela", "Urbanización Villa Del Rocío", "Urbanización Villa Lady", "Urbanización Villa Yenny",
            "Vereda Balsillas - Sector El Pencal", "Vereda El Cerrito", "Vereda El Cerrito - Sector Managua",
            "Vereda San Francisco", "Vereda San Francisco -Sector El Porvenir (Porvenir Rio I)", "Vereda San José - Sector La Majada",
            "Vereda San Jose - Sector Parcelas", "Vereda Siete Trojes", "Vereda Siete Trojes - Sector El Charquito",
            "Vereda Siete Trojes - Sector El Charquito 2", "Villa Cetty", "Villa del Sol", "Villa Marcela",
            "Villa Maria I", "Villa Maria II", "Urbanización Villa Maria III Etapa cambio de presidente",
            "Villa Maria IV Etapa", "Villa Nueva", "Villa Sajonia"
        ];

        const listaPH = [
            "CONJUNTO RESIDENCIAL EL TREBOL SUPERMANZANA 2", "CONJUNTO RESIDENCIAL EL TREBOL II ETAPA SUPERMANZANA 3",
            "CONJUNTO RESIDENCIAL EL TREBOL MANZANA 5", "CONJUNTO RESIDENCIAL EL TREBOL MANZANA 6",
            "CONJUNTO RESIDENCIAL EL TREBOL QUINTA ETAPA SUPERMANZANA 7", "CONJUNTO RESIDENCIAL EL TREBOL MANZANA 8",
            "CONJUNTO RESIDENCIAL EL TREBOL SUPERMANZANA 9", "CONJUNTO RESIDENCIAL QUINTAS DEL TREBOL SUPERMANZANA 10",
            "CONJUNTO RESIDENCIAL QUINTAS DEL TREBOL SUPERMANZANA 11", "CONJUNTO RESIDENCIAL QUINTAS DEL TREBOL SUPERMANZANA 12",
            "CONJUNTO RESIDENCIAL EL TREBOL SUPERMANZANA 12, SEGUNDA ETAPA", "CONJUNTO RESIDENCIAL EL TREBOL TERCERA ETAPA SUPERMANZANA 13",
            "URBANIZACION RESERVA DE ALCALA", "CONJUNTO RESIDENCIAL RINCON DE LOS VIRREYES", "ALEJANDRIA REAL PARQUE RESIDENCIAL",
            "ALEJANDRIA REAL PARQUE RESIDENCIAL ETAPA II", "ALEJANDRIA REAL PARQUE RESIDENCIAL ETAPA III",
            "ALEJANDRIA REAL PARQUE RESIDENCIAL ETAPA IV", "ALEJANDRIA REAL PARQUE RESIDENCIAL V",
            "ALEJANDRIA REAL PARQUE RESIDENCIAL ETAPA VI MANZANA 8", "ALEJANDRIA PARQUE RESIDENCIAL ETAPA VII MANZANA 2",
            "ALEJANDRIA PARQUE RESIDENCIAL ETAPA VIII MANZANA 9", "TOLEDO APARTAMENTOS MANZANA 1",
            "CONJUNTO RESIDENCIAL BELVERDE 1", "CONJUNTO RESIDENCIAL BELVERDE II", "CONJUNTO RESIDENCIAL SENDERO DE SAN ISIDRO",
            "PARQUE RESIDENCIAL PARQUE DE SAN ISIDRO", "PARQUE RESIDENCIAL PUERTO VALLARTA", "PARQUE RESIDENCIAL PUERTO MADERO",
            "PARQUE RESIDENCIAL PUERTO LUNA", "PARQUE RESIDENCIAL PUERTO PLATA", "PARQUE RESIDENCIAL PUERTO NUEVO",
            "PARQUE RESIDENCIAL PUERTO ALEGRE", "PARQUE RESIDENCIAL PUERTO AZUL", "CONJUNTO RESIDENCIAL EL JARDIN",
            "EDIFICIO URBANIZACION TORRES DE SAN FELIPE (BLOQUES 1-10)", "CONDOMINIO PALO ALTO",
            "CONJUNTO RESIDENCIAL CAMPIÑA DE SAN GABRIEL", "URBANIZACION VILLA DANIELA II - EL DORADO",
            "CONJUNTO RESIDENCIAL EVA ALAMEDA ETAPA 1", "URBANIZACION SANTILLANA", "AGRUPACION DE VIVIENDA TINGUA",
            "AGRUPACION DE VIVIENDA COLIBRI", "AGRUPACION DE VIVIENDA TORCAZA", "AGRUPACION DE VIVIENDA TURPIAL",
            "AGRUPACION DE VIVIENDA HALCONES", "AGRUPACION DE VIVIENDA PETREL", "CONJUNTO RESIDENCIAL SENDEROS DE SIETE TROJES",
            "AGRUPACION DE VIVIENDA AZULEJO", "CONJUNTO ATTALEA CLUB RESIDENCIAL", "PARQUE RESIDENCIAL CAMPIÑAS DEL SOL",
            "PARQUE RESIDENCIAL SOL DE LA SABANA", "AGRUPACION BALCONES DE TOSCANA PH", "CONJUNTO RESIDENCIAL PANORAMA DEL CAMPO",
            "CONJUNTO RESIDENCIAL QUINTAS DEL MARQUEZ", "CONJUNTO RESIDENCIAL QUINTAS DEL MARQUEZ TRES ETAPA",
            "CONJUNTO RESIDENCIAL RESERVA CAMPESTRE CASAS", "AGRUPACION DE VIVIENDA QUINTAS DE SERREZUELA",
            "PARQUE RESIDENCIAL SOL CRECIENTE ETAPA 1", "PARQUE RESIDENCIAL SOL NACIENTE ETAPA 1",
            "PARQUE RESIDENCIAL PUERTA DEL SOL ETAPA 1", "PARQUE RESIDENCIAL RESERVA DEL SOL",
            "CONJUNTO RESIDENCIAL RODAMONTE ETAPA 1", "CONJUNTO RESIDENCIAL ROBLE ETAPA 1",
            "CONJUNTO RESIDENCIAL SAUCE FASE A ETAPA 1", "CONJUNTO CEREZO POR ETAPAS - ETAPAS 1 Y 2",
            "CONDOMINIO RURAL LOS PINOS", "CONJUNTO PARQUE RESIDENCIAL NOGAL DE NOVATERRA",
            "CONJUNTO PARQUE RESIDENCIAL CIPRES DE NOVATERRA", "CONJUNTO MIXTO PARQUE RESIDENCIAL ARRAYAN DE NOVATERRA",
            "CONJUNTO RESIDENCIAL CANELO DE NOVATERRA", "CONJUNTO MIXTO ROBLE DE NOVATERRA ETAPA 1",
            "CONJUNTO RESIDENCIAL ZAPAN DE NOVATERRA ETAPA 1", "CONJUNTO MIXTO GUAYACAN DE NOVATERRA",
            "CONJUNTO MIXTO CEREZO DE NOVATERRA", "CONJUNTO RESIDENCIAL PORTON DE MALLORCA",
            "CONJUNTO RESIDENCIAL RESERVA DE MALLORCA (I, II, III)", "CONJUNTO RESIDENCIAL LA ESTANCIA (I, II, III, 4)",
            "CONJUNTO RESIDENCIAL CORTIJO DE SERREZUELA", "CONJUNTO RESIDENCIAL BALCONES DE SERREZUELA",
            "CONJUNTO RESIDENCIAL LABRANTI RESERVADO (ETAPAS 1, 2, 3)", "AGRUPACION VIVIENDA TREBOL DEL GUALI (ETAPAS 1, 2)",
            "CONJUNTO RESIDENCIAL AMBROSÍA", "CONJUNTO RESIDENCIAL VERONÉS", "CONJUNTO RESIDENCIAL LIMA",
            "EDIFICIO MULTIFAMILIAR Y COMERCIAL EL ROMANO", "CONJUNTO RESIDENCIAL RESERVA DE USCA",
            "CONJUNTO RESIDENCIAL PARQUES DEL DIAMANTE", "CONJUNTO RESIDENCIAL CAMPOBELO (1-6)",
            "CONJUNTO RESIDENCIAL CAMELIAS DEL DIAMANTE", "CONJUNTO RESIDENCIAL ZARASOTA",
            "CONJUNTO RESIDENCIAL CAMINOS DE BELEN", "CONDOMINIO SAINZ DE BARANDA", "EDIFICIO ICANTI",
            "CONJUNTO RESIDENCIAL RESERVA DE SAN ALEJO", "CONJUNTO RESIDENCIAL VILLA SOFIA", "CONJUNTO RESIDENCIAL ANDRIA CASAS",
            "PARQUES DE PORVENIR ETAPA 1", "CONJUNTO RESIDENCIAL ACANTO - RESERVA DE MOSQUERA",
            "CONJUNTO INDUSTRIAL EL PORVENIR (I, II)", "AGRUPACION INDUSTRIAL MONTANA", "PARQUE INDUSTRIAL PUERTO VALLARTA",
            "PARQUE AGROINDUSTRIAL DE LA SABANA", "TERMINAL METROPOLITANO DE CARGA Y PARQUE INDUSTRIAL SAN JORGE",
            "PARQUE LOGISTICO, INDUSTRIAL Y COMERCIAL SANTO DOMINGO", "AGRUPACION ZONA FRANCA DE OCCIDENTE",
            "CONJUNTO DE BODEGAS NUEVO, INTERIOR 34 ZONA FRANCA", "CONJUNTO DE BODEGAS ZONA FRANCA ETAPA III",
            "PARQUE INDUSTRIAL TECPLAS", "EL PORTAL CENTRO LOGISTICO Y EMPRESARIAL", "PARQUE CENTRAL CENTRO DE NEGOCIOS",
            "PARQUE INDUSTRIAL OCCIDENTE", "CENTRO EMPRESARIAL COMERCIAL Y DE SERVICIOS CLOPATOSKY HNOS",
            "PARQUE INDUSTRIAL Y COMERCIAL RAGO 24", "PARQUE INDUSTRIAL SAN NICOLAS", "CENTRO COMERCIAL HACIENDA VILLANUEVA",
            "CENTRO COMERCIAL BALCONES DE SERREZUELA", "CENTRO COMERCIAL EL TREBOL", "MALL COMERCIAL Y EMPRESARIAL MERIDIANO NOVATERRA",
            "CONJUNTO RESIDENCIAL CEDRO DE NOVATERRA", "CONJUNTO DE USO MIXTO CAOBA DE NOVATERRA",
            "CONJUNTO CERRADO BREZZA", "CONJUNTO RESIDENCIAL ZÉFIRO P.H.", "CONJUNTO RESIDENCIAL ACANTO 2 RESERVA MOSQUERA",
            "CONJUNTO DE USO MIXTO BRISAS DE LA SABANA", "EDIFICIO INFINITO 1111 COMERCIO VECINAL",
            "CONJUNTO DE USO MIXTO PACÍFIKA", "CONJUNTO RESIDENCIAL MACADAMIA", "CONJUNTO URBAN 17-40",
            "CONJUNTO RESIDENCIAL RINCON DEL POBLADO PH"
        ];

        const llenarSelect = (selectElement, dataArray) => {
            while (selectElement.options.length > 1) { selectElement.remove(1); }
            dataArray.sort((a, b) => a.localeCompare(b));
            dataArray.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                selectElement.appendChild(option);
            });
        };

        llenarSelect(selectJac, listaJAC);
        llenarSelect(selectPh, listaPH);

        tipoOrigenSelect.addEventListener('change', () => {
            const seleccion = tipoOrigenSelect.value;
            grupoJac.style.display = 'none'; selectJac.required = false; selectJac.value = "";
            grupoPh.style.display = 'none'; selectPh.required = false; selectPh.value = "";
            grupoOtro.style.display = 'none'; inputOtro.required = false; inputOtro.value = "";

            if (seleccion === 'JAC') {
                grupoJac.style.display = 'block'; selectJac.required = true;
                grupoJac.style.animation = 'fadeInUp 0.5s ease-out';
            } else if (seleccion === 'PH') {
                grupoPh.style.display = 'block'; selectPh.required = true;
                grupoPh.style.animation = 'fadeInUp 0.5s ease-out';
            } else if (seleccion === 'Ciudadano') {
                grupoOtro.style.display = 'block';
                grupoOtro.style.animation = 'fadeInUp 0.5s ease-out';
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // --- URL ORIGINAL RESTAURADA ---
            const GOOGLE_SHEET_API_URL = 'https://script.google.com/a/macros/mosquera-cundinamarca.gov.co/s/AKfycbyuz97f4ePF5XwktWIHyI_RIM2CkcRmSQ__d8Yg6O0oweXmkwHdF00o17xFbIG44w2Epw/exec';

            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            let lugarRepresentacion = "";
            if (data.tipo_origen === 'JAC') lugarRepresentacion = data.seleccion_jac;
            else if (data.tipo_origen === 'PH') lugarRepresentacion = data.seleccion_ph;
            else lugarRepresentacion = data.otro_origen || "Ciudadano / No especifica";

            data.lugar_representacion = lugarRepresentacion;
            data.acepta_terminos = form.elements.acepta_terminos.checked ? "Sí" : "No";

            delete data.seleccion_jac; delete data.seleccion_ph; delete data.otro_origen;

            try {
                await fetch(GOOGLE_SHEET_API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                window.location.href = 'exito.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema de conexión.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});