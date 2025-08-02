let gap = 0 ;


/**
 * Aggiorna la data attuale del TimeMachine
 */
function updateCurrentDate(updatedDate) {
    gap = calculateGap(updatedDate);
}

/**
 * formato: YYYY-MM-DDTHH:mm:ss.sssZ
 * esempio: 2025-08-02T16:20:31.733Z
 */
function getCurrentDate() {
    return new Date(calculateCurrentTimestamp());
}


module.exports = { updateCurrentDate, getCurrentDate };



// PRIVATE

function calculateCurrentTimestamp() {
    return new Date() - gap;
}

function calculateGap(updatedDate) {
    console.log("Updated date:");
    console.log(updatedDate);
    console.log("Nuovo gap: ", new Date() - new Date(updatedDate));
    return new Date() - new Date(updatedDate);
}

