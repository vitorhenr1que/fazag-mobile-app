export const CALENDARIO_DATA = [];

export const STATUS_COLORS = {
    letivo: '#10b981', // green 500
    atencao: '#eab308', // yellow 500
    colacao: '#0ea5e9', // sky 500
    reuniao: '#f97316', // orange 500
    recesso: '#ef4444', // red 500
    normal: '#334155'  // slate 700
};

export const STATUS_LABELS = {
    letivo: 'Dia Letivo',
    atencao: 'Importante',
    colacao: 'Colação',
    reuniao: 'Reunião',
    recesso: 'Recesso/Feriado',
    normal: 'Evento'
};

const pad = (n) => n < 10 ? `0${n}` : n;

export const generateAllMarkedDates = (data = [], year = new Date().getFullYear()) => {
    const marked = {};

    data.forEach(month => {
        const monthNum = pad(month.monthIndex + 1);

        month.events.forEach(event => {
            const dayNum = pad(event.day);
            const dateString = `${year}-${monthNum}-${dayNum}`;
            const color = STATUS_COLORS[event.status] || STATUS_COLORS.normal;

            // Basic dot marking
            marked[dateString] = {
                marked: true,
                dotColor: color,
                // Add metadata for custom render if needed
                customStyles: {
                    container: {
                        backgroundColor: event.status === 'recesso' ? '#fee2e2' : undefined,
                        borderRadius: 8
                    },
                    text: {
                        color: event.status === 'recesso' ? '#ef4444' : undefined,
                        fontWeight: 'bold'
                    }
                }
            };
        });
    });

    return marked;
};

export const getEventsForDate = (data = [], dateString) => {
    if (!dateString || !data) return [];

    // dateString format YYYY-MM-DD
    const parts = dateString.split('-');
    const day = parseInt(parts[2], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;

    const monthData = data.find(m => m.monthIndex === monthIndex);
    if (!monthData) return [];

    return monthData.events.filter(e => e.day === day);
};
