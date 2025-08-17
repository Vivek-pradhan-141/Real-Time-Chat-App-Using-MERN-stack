function ConvertDateFormat(createdAt) {
    const date = new Date(createdAt);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // e.g., "July"
    const year = date.getFullYear();

    return `${day} ${month} - ${year}`;
}

export default ConvertDateFormat