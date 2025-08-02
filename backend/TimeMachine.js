let gap = 0 ;



function setGap(newGap) {
    gap = newGap;
}

/**
 * formato: YYYY-MM-DDTHH:mm:ss.sssZ
 * esempio: 2025-08-02T16:20:31.733Z
 */
function getCurrentDate() {
    return new Date(calculateCurrentTimestamp());
}


module.exports = { setGap, getCurrentDate };



// PRIVATE

function calculateCurrentTimestamp() {
    return new Date() - gap;
}

