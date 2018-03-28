export const handleScroll = (e) => {
    let bodyCoords = document.querySelector('body').getBoundingClientRect();
    let lastCard = document.querySelector('.card-container .card:last-child');
    let lastCardId = lastCard.getAttribute('id');
    let cardContLast = lastCard.getBoundingClientRect();
    console.log('scroll lastCard -> ', lastCardId);
    console.log('scroll lastCard -> ', cardContLast.bottom);
    console.log('scroll lastCard -> ', bodyCoords.bottom);

    if (cardContLast.bottom <= bodyCoords.bottom) {
        console.log('last elemet -> ', lastCardId);
        // console.log('last elemet -> ', loadMoreAction);
        loadMoreOnce(lastCardId);
    }
}