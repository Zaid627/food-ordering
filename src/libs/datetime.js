export function dbTimeForHuman(str){
    if (!str || typeof str !== 'string') return '';
    return str.replace('T', ' ').substring(0, 16);
}