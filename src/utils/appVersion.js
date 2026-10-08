// Comparação numérica: 1.10.0 é posterior a 1.9.0.
export function isOlderVersion(installed, latest) {
    const parse = value => {
        if (typeof value !== 'string' || !/^\d+(\.\d+){1,3}$/.test(value.trim())) return null;
        const parts = value.trim().split('.').map(Number);
        return parts.every(Number.isSafeInteger) ? parts : null;
    };
    const current = parse(installed);
    const available = parse(latest);
    if (!current || !available) return false;
    for (let i = 0; i < Math.max(current.length, available.length); i += 1) {
        const difference = (current[i] || 0) - (available[i] || 0);
        if (difference !== 0) return difference < 0;
    }
    return false;
}
