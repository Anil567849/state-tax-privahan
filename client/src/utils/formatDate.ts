export function formatDate(isoDate: Date) {
    const date = new Date(isoDate);

    // Extract components from the Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const isAM = hours < 12; // Determine AM or PM
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time

    // Format time period (AM/PM)
    const period = isAM ? 'AM' : 'PM';
    
    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes}${period}`;
    
    return formattedDate;
}