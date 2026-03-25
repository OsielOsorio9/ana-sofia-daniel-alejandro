// Initialize Lucide icons
lucide.createIcons();

// Static Configuration - Administrator Only
const coupleData = {
    nombre1: 'Ana Sofía',
    nombre2: 'Daniel Alejandro',
    fechaInicio: '2021-06-15',
    fotos: [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519452575417-564c1401ecc7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1494790108755-2616b332c5ca?auto=format&fit=crop&w=800&q=80'
    ],
    fechasEspeciales: [
        {
            nombre: 'Primera Cita',
            fecha: '2021-06-15',
            categoria: 'romantica',
            descripcion: 'Nuestra primera cita en el restaurante "La Casa de los Abuelos". Fue mágico desde el primer momento.'
        },
        {
            nombre: 'Primer Beso',
            fecha: '2021-06-22',
            categoria: 'romantica',
            descripcion: 'Bajo la luz de la luna en el malecón, el beso que confirmó que éramos el uno para el otro.'
        },
        {
            nombre: 'Aniversario de Noviazgo',
            fecha: '2021-06-15',
            categoria: 'hitos',
            descripcion: 'El día que oficialmente comenzamos esta hermosa aventura juntos.'
        },
        {
            nombre: 'Viaje a Varadero',
            fecha: '2021-12-20',
            categoria: 'viajes',
            descripcion: 'Nuestras primeras vacaciones juntos, días de sol, playa y amor infinito.'
        },
        {
            nombre: 'Conocimiento de los Padres',
            fecha: '2022-01-15',
            categoria: 'familiar',
            descripcion: 'El día que nuestras familias se conocieron y aprobaron nuestra unión con una gran celebración.'
        },
        {
            nombre: 'Mudarse Juntos',
            fecha: '2022-07-01',
            categoria: 'hitos',
            descripcion: 'El inicio de nuestra vida juntos en nuestro primer hogar.'
        },
        {
            nombre: 'Viaje a París',
            fecha: '2023-05-10',
            categoria: 'viajes',
            descripcion: 'La ciudad del amor fue testigo de nuestro compromiso eterno.'
        },
        {
            nombre: 'Propuesta Matrimonio',
            fecha: '2023-12-25',
            categoria: 'hitos',
            descripcion: 'La noche más especial de mi vida, cuando dije "Sí" a para siempre.'
        }
    ],
    cartas: [
        {
            texto: `Mi amor Daniel,

Hoy quiero recordarte lo mucho que significas para mí. Desde el 15 de junio de 2021, mi vida cambió por completo. Cada día a tu lado es un regalo que valoro inmensamente.

Recuerdo nuestra primera cita como si fuera ayer. Tu sonrisa iluminó el restaurante y desde ese momento supe que eras especial. Gracias por tu paciencia, tu apoyo incondicional y por hacerme reír incluso en los días más difíciles.

Eres mi compañero de vida, mi confidente, mi mejor amigo y el amor de mi vida. Cada momento contigo es una aventura que no cambiaría por nada.

Te amo más de lo que las palabras pueden expresar, más de lo que el corazón puede sentir.

Con todo mi amor eterno,
Ana Sofía ❤️`,
            fecha: '2024-01-15',
            id: 1
        },
        {
            texto: `A mi Ana Sofía maravillosa,

En este camino del amor que recorremos juntos, he descubierto que la felicidad tiene tu nombre. Tu sonrisa ilumina mis días más grises, tu abrazo es mi refugio seguro y tu amor es el motor que me impulsa a ser mejor cada día.

Desde que te conocí, aprendí lo que significa amar de verdad. Aprendí que el amor no es solo palabras, es acciones, es apoyo incondicional, es estar presente en los buenos y malos momentos.

Gracias por cada detalle, por cada momento compartido, por cada lágrima que has secado y cada risa que hemos compartido. Gracias por ser tú, única, especial e irrepetible.

Prometo amarte por siempre, en las buenas y en las malas, en salud y en enfermedad, hasta que el último aliento nos separe.

Eres mi presente, mi futuro y mi sueño hecho realidad.

Para siempre tuyo,
Daniel 💕`,
            fecha: '2024-02-14',
            id: 2
        },
        {
            texto: `Mi vida,

Han pasado casi tres años desde que nuestras vidas se cruzaron, y siento que te conozco desde siempre. Cada día descubro algo nuevo que me enamora de ti: la forma en que arrugas la nariz cuando ríes, cómo te preocupas por los demás, tu pasión por la vida, tu fuerza ante las dificultades.

Quiero que sepas que no hay nadie más en este mundo que me haga sentir como tú me haces. Contigo puedo ser yo mismo, sin máscaras, sin miedo. Contigo me siento en casa.

Gracias por enseñarme el verdadero significado del amor, por mostrarme que vale la pena esperar a la persona correcta, por demostrarme que el amor real existe.

Eres mi todo, mi razón de sonreír cada mañana, mi fuerza en los días difíciles, mi cómplice en las aventuras y mi refugio en las tormentas.

Te amo más allá de las palabras, más allá del tiempo, más allá de la distancia.

Eres mi hogar,
Ana Sofía 🌹`,
            fecha: '2024-06-15',
            id: 3
        }
    ]
};

// Load page
document.addEventListener('DOMContentLoaded', function() {
    iniciarContadores();
    actualizarInterfaz();
    setupEventListeners();
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
}

// Update interface with static data
function actualizarInterfaz() {
    document.getElementById('nombre1').textContent = coupleData.nombre1;
    document.getElementById('nombre2').textContent = coupleData.nombre2;
    document.getElementById('fecha-inicio').textContent = formatearFecha(coupleData.fechaInicio);
    
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

// Gallery Functions (Read-only)
function cargarGaleria() {
    const galeria = document.getElementById('galeria-fotos');
    galeria.innerHTML = '';
    
    // Add pre-configured photos
    coupleData.fotos.forEach((foto, index) => {
        const photoCard = crearPhotoCard(foto, index);
        galeria.appendChild(photoCard);
    });
    
    lucide.createIcons();
}

function crearPhotoCard(foto, index) {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group';
    div.innerHTML = `
        <div class="relative aspect-square">
            <img src="${foto}" alt="Foto ${index + 1}" class="w-full h-full object-cover gallery-image">
        </div>
    `;
    return div;
}

// Calendar Functions (Read-only)
function cargarFechasEspeciales() {
    const lista = document.getElementById('fechas-lista');
    lista.innerHTML = '';
    
    // Sort dates by date
    const sortedDates = [...coupleData.fechasEspeciales].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    sortedDates.forEach((fecha, index) => {
        const dateCard = crearDateCard(fecha, index);
        lista.appendChild(dateCard);
    });
    
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
        <div class="flex items-start gap-3">
            <span class="text-2xl">${categoriaIcon}</span>
            <div class="flex-1">
                <h4 class="font-bold text-primary mb-1">${fecha.nombre}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${formatearFecha(fecha.fecha)}</p>
                ${fecha.descripcion ? `<p class="text-sm text-gray-700 dark:text-gray-300">${fecha.descripcion}</p>` : ''}
            </div>
        </div>
    `;
    
    return div;
}

// Letter Functions (Read-only)
function cargarCartas() {
    const contenedor = document.getElementById('cartas-mostradas');
    contenedor.innerHTML = '';
    
    if (coupleData.cartas.length > 0) {
        const titulo = document.createElement('h3');
        titulo.className = 'text-2xl font-bold text-primary mb-6 font-dancing';
        titulo.textContent = 'Nuestras Cartas de Amor';
        contenedor.appendChild(titulo);
        
        coupleData.cartas.forEach(carta => {
            const cartaDiv = document.createElement('div');
            cartaDiv.className = 'letter-paper bg-white dark:bg-dark-card rounded-2xl p-6 border border-pink-100 dark:border-pink-900/30';
            cartaDiv.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="text-sm text-gray-500">${formatearFecha(carta.fecha)}</span>
                </div>
                <p class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">${carta.texto}</p>
            `;
            contenedor.appendChild(cartaDiv);
        });
    }
    
    lucide.createIcons();
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
