// Initialize Lucide icons
lucide.createIcons();

// Global Variables
let coupleData = {
    nombre1: 'Tu Nombre',
    nombre2: 'Mi Nombre',
    fechaInicio: '2023-01-15',
    fotos: [],
    fechasEspeciales: [],
    cartas: []
};

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosGuardados();
    iniciarContadores();
    setupEventListeners();
    actualizarInterfaz();
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('loveTheme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
}

function toggleTheme() {
    htmlElement.classList.toggle('dark');
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('loveTheme', currentTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Setup Event Listeners
function setupEventListeners() {
    // Edit form
    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarInformacion();
    });

    // Date form
    document.getElementById('fecha-form').addEventListener('submit', function(e) {
        e.preventDefault();
        agregarFechaEspecial();
    });

    // Auto-save carta
    document.getElementById('carta-amor').addEventListener('input', function() {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            localStorage.setItem('cartaTemporal', this.value);
        }, 1000);
    });
}

// Load saved data
function cargarDatosGuardados() {
    const savedData = localStorage.getItem('coupleData');
    if (savedData) {
        coupleData = JSON.parse(savedData);
    }
    
    // Load temporary carta
    const cartaTemporal = localStorage.getItem('cartaTemporal');
    if (cartaTemporal) {
        document.getElementById('carta-amor').value = cartaTemporal;
    }
}

// Save data to localStorage
function guardarDatos() {
    localStorage.setItem('coupleData', JSON.stringify(coupleData));
}

// Update interface with loaded data
function actualizarInterfaz() {
    document.getElementById('nombre1').textContent = coupleData.nombre1;
    document.getElementById('nombre2').textContent = coupleData.nombre2;
    document.getElementById('fecha-inicio').textContent = formatearFecha(coupleData.fechaInicio);
    
    // Update edit form
    document.getElementById('edit-nombre1').value = coupleData.nombre1;
    document.getElementById('edit-nombre2').value = coupleData.nombre2;
    document.getElementById('edit-fecha-inicio').value = coupleData.fechaInicio;
    
    // Load gallery
    cargarGaleria();
    
    // Load dates
    cargarFechasEspeciales();
    
    // Load letters
    cargarCartas();
}

// Time Counters
function iniciarContadores() {
    actualizarContadores();
    setInterval(actualizarContadores, 1000);
}

function actualizarContadores() {
    const fechaInicio = new Date(coupleData.fechaInicio);
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;
    
    // Calculate time differences
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const meses = Math.floor(dias / 30.44);
    const anos = Math.floor(dias / 365.25);
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia / (1000 * 60));
    const semanas = Math.floor(dias / 7);
    
    // Update main counters
    document.getElementById('contador-anios').textContent = anos;
    document.getElementById('contador-meses').textContent = meses;
    document.getElementById('contador-dias').textContent = dias;
    document.getElementById('contador-horas').textContent = horas;
    
    // Update detailed counters
    document.getElementById('dias-totales').textContent = dias.toLocaleString();
    document.getElementById('semanas-totales').textContent = semanas.toLocaleString();
    document.getElementById('horas-totales').textContent = horas.toLocaleString();
    document.getElementById('minutos-totales').textContent = minutos.toLocaleString();
    
    // Update full time description
    const tiempoCompleto = `${anos} años, ${meses % 12} meses, ${dias % 30} días`;
    document.getElementById('contador-tiempo-completo').textContent = tiempoCompleto;
    
    // Update anniversary countdown
    actualizarCuentaRegresivaAniversario(fechaInicio, anos);
}

function actualizarCuentaRegresivaAniversario(fechaInicio, anosActuales) {
    const proximoAniversario = new Date(fechaInicio);
    proximoAniversario.setFullYear(fechaInicio.getFullYear() + anosActuales + 1);
    
    const ahora = new Date();
    const diferencia = proximoAniversario - ahora;
    
    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('aniversario-cuenta-regresiva').textContent = 
            `${dias}d ${horas}h ${minutos}m`;
        document.getElementById('anios-proximo').textContent = `${anosActuales + 1} años`;
    } else {
        document.getElementById('aniversario-cuenta-regresiva').textContent = '¡Hoy es el día! 🎉';
    }
}

// Edit Information
function editarInformacion() {
    document.getElementById('edit-modal').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

function guardarInformacion() {
    coupleData.nombre1 = document.getElementById('edit-nombre1').value;
    coupleData.nombre2 = document.getElementById('edit-nombre2').value;
    coupleData.fechaInicio = document.getElementById('edit-fecha-inicio').value;
    
    guardarDatos();
    actualizarInterfaz();
    cerrarModal();
    
    mostrarNotificacion('¡Información actualizada con éxito! 💕', 'success');
}

// Gallery Functions
function cargarGaleria() {
    const galeria = document.getElementById('galeria-fotos');
    galeria.innerHTML = '';
    
    // Add existing photos
    coupleData.fotos.forEach((foto, index) => {
        const photoCard = crearPhotoCard(foto, index);
        galeria.appendChild(photoCard);
    });
    
    // Add upload button
    const uploadCard = crearUploadCard();
    galeria.appendChild(uploadCard);
}

function crearPhotoCard(foto, index) {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group';
    div.innerHTML = `
        <div class="relative aspect-square">
            <img src="${foto}" alt="Foto ${index + 1}" class="w-full h-full object-cover gallery-image">
            <button onclick="eliminarFoto(${index})" class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    return div;
}

function crearUploadCard() {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer';
    div.onclick = agregarFoto;
    div.innerHTML = `
        <div class="aspect-square bg-gradient-to-br from-pink-100 to-accent/20 dark:from-pink-900/20 dark:to-accent/10 flex items-center justify-center">
            <div class="text-center">
                <i data-lucide="plus-circle" class="w-16 h-16 mx-auto text-primary mb-4"></i>
                <p class="font-semibold text-primary">Agregar Foto</p>
            </div>
        </div>
    `;
    return div;
}

function agregarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                coupleData.fotos.push(e.target.result);
                guardarDatos();
                cargarGaleria();
                lucide.createIcons();
                mostrarNotificacion('¡Foto agregada con éxito! 📸', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function eliminarFoto(index) {
    if (confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
        coupleData.fotos.splice(index, 1);
        guardarDatos();
        cargarGaleria();
        lucide.createIcons();
        mostrarNotificacion('Foto eliminada', 'info');
    }
}

// Calendar Functions
function cargarFechasEspeciales() {
    const lista = document.getElementById('fechas-lista');
    lista.innerHTML = '';
    
    if (coupleData.fechasEspeciales.length === 0) {
        lista.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i data-lucide="calendar" class="w-12 h-12 mx-auto mb-4 text-gray-400"></i>
                <p>Aún no hay fechas especiales agregadas</p>
            </div>
        `;
    } else {
        // Sort dates by date
        const sortedDates = [...coupleData.fechasEspeciales].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        sortedDates.forEach((fecha, index) => {
            const dateCard = crearDateCard(fecha, index);
            lista.appendChild(dateCard);
        });
    }
    
    lucide.createIcons();
}

function crearDateCard(fecha, index) {
    const div = document.createElement('div');
    div.className = `date-card ${fecha.categoria} bg-white dark:bg-dark-card rounded-2xl p-4 border border-gray-100 dark:border-gray-800`;
    
    const categoriaIcon = {
        romantica: '🌹',
        hitos: '🎯',
        familiar: '👨‍👩‍👧‍👦',
        viajes: '✈️'
    }[fecha.categoria];
    
    div.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg">${categoriaIcon}</span>
                    <h4 class="font-bold text-primary">${fecha.nombre}</h4>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${formatearFecha(fecha.fecha)}</p>
                ${fecha.descripcion ? `<p class="text-sm text-gray-700 dark:text-gray-300">${fecha.descripcion}</p>` : ''}
            </div>
            <button onclick="eliminarFecha(${index})" class="text-red-500 hover:text-red-700 p-1">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    
    return div;
}

function agregarFechaEspecial() {
    const nombre = document.getElementById('evento-nombre').value;
    const fecha = document.getElementById('evento-fecha').value;
    const categoria = document.getElementById('evento-categoria').value;
    const descripcion = document.getElementById('evento-descripcion').value;
    
    if (!nombre || !fecha) {
        mostrarNotificacion('Por favor completa el nombre y la fecha', 'error');
        return;
    }
    
    const nuevaFecha = {
        nombre,
        fecha,
        categoria,
        descripcion
    };
    
    coupleData.fechasEspeciales.push(nuevaFecha);
    guardarDatos();
    cargarFechasEspeciales();
    
    // Reset form
    document.getElementById('fecha-form').reset();
    
    mostrarNotificacion('¡Fecha especial agregada! 📅', 'success');
}

function eliminarFecha(index) {
    if (confirm('¿Estás seguro de que quieres eliminar esta fecha?')) {
        coupleData.fechasEspeciales.splice(index, 1);
        guardarDatos();
        cargarFechasEspeciales();
        mostrarNotificacion('Fecha eliminada', 'info');
    }
}

// Letter Functions
function guardarCarta() {
    const cartaTexto = document.getElementById('carta-amor').value;
    
    if (!cartaTexto.trim()) {
        mostrarNotificacion('Por favor escribe algo en tu carta', 'error');
        return;
    }
    
    const carta = {
        texto: cartaTexto,
        fecha: new Date().toISOString(),
        id: Date.now()
    };
    
    coupleData.cartas.push(carta);
    guardarDatos();
    cargarCartas();
    
    // Clear temporary carta
    localStorage.removeItem('cartaTemporal');
    document.getElementById('carta-amor').value = '';
    
    mostrarNotificacion('¡Carta guardada con éxito! 💌', 'success');
}

function cargarCartas() {
    const contenedor = document.getElementById('cartas-guardadas');
    contenedor.innerHTML = '';
    
    if (coupleData.cartas.length > 0) {
        const titulo = document.createElement('h3');
        titulo.className = 'text-xl font-bold text-primary mb-4';
        titulo.textContent = 'Cartas Guardadas';
        contenedor.appendChild(titulo);
        
        coupleData.cartas.slice().reverse().forEach(carta => {
            const cartaDiv = document.createElement('div');
            cartaDiv.className = 'letter-paper bg-white dark:bg-dark-card rounded-2xl p-6 border border-pink-100 dark:border-pink-900/30';
            cartaDiv.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="text-sm text-gray-500">${formatearFecha(carta.fecha)}</span>
                    <button onclick="eliminarCarta(${carta.id})" class="text-red-500 hover:text-red-700">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
                <p class="whitespace-pre-wrap text-gray-700 dark:text-gray-300">${carta.texto}</p>
            `;
            contenedor.appendChild(cartaDiv);
        });
    }
    
    lucide.createIcons();
}

function eliminarCarta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta carta?')) {
        coupleData.cartas = coupleData.cartas.filter(carta => carta.id !== id);
        guardarDatos();
        cargarCartas();
        mostrarNotificacion('Carta eliminada', 'info');
    }
}

function generarPoema() {
    const poemas = [
        `En tus ojos encuentro el universo,
        En tu sonrisa mi razón de existir,
        Cada día a tu lado es una aventura,
        Que no cambiaría por nada del vivir.

        ${coupleData.nombre1} y ${coupleData.nombre2},
        Dos almas que se encontraron,
        Y en el amor se transformaron,
        En la historia más hermosa del mundo.`,

        `Como el sol que ilumina el día,
        Tú iluminas mi existencia,
        Como la luna que guía la noche,
        Tú guías mi conciencia.

        Juntos hemos construido,
        Un amor sin medida,
        ${coupleData.nombre1} y ${coupleData.nombre2},
        Siempre unidos en la vida.`,

        `En el calendario de mi vida,
        Cada día marca tu presencia,
        Eres la más bella experiencia,
        Mi amor, mi dulce esencia.

        ${coupleData.nombre1} te amo,
        ${coupleData.nombre2} te adoro,
        Y en este nuestro amor,
        Encuentro mi mayor tesoro.`
    ];
    
    const poemaAleatorio = poemas[Math.floor(Math.random() * poemas.length)];
    document.getElementById('carta-amor').value = poemaAleatorio;
    
    mostrarNotificación('¡Poema generado! ✨', 'success');
}

// Utility Functions
function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const colores = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-20 right-4 ${colores[tipo]} text-white px-6 py-3 rounded-2xl shadow-lg z-50 success-bounce`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Share Functions
function compartirHistoria() {
    const url = window.location.href;
    const texto = `Mira nuestra historia de amor ❤️ ${coupleData.nombre1} & ${coupleData.nombre2}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Nuestra Historia de Amor',
            text: texto,
            url: url
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${texto} ${url}`);
        mostrarNotificacion('¡Enlace copiado al portapapeles! 📋', 'success');
    }
}

function descargarMemories() {
    const datos = {
        pareja: {
            nombre1: coupleData.nombre1,
            nombre2: coupleData.nombre2,
            fechaInicio: coupleData.fechaInicio
        },
        fechasEspeciales: coupleData.fechasEspeciales,
        cartas: coupleData.cartas,
        fechaExportacion: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuestra-historia-de-amor-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificación('¡Memorias descargadas! 💾', 'success');
}

function resetearTodo() {
    if (confirm('¿Estás seguro de que quieres eliminar toda la información? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        coupleData = {
            nombre1: 'Tu Nombre',
            nombre2: 'Mi Nombre',
            fechaInicio: '2023-01-15',
            fotos: [],
            fechasEspeciales: [],
            cartas: []
        };
        actualizarInterfaz();
        mostrarNotificación('Todo ha sido reiniciado', 'info');
    }
}

// Add smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
