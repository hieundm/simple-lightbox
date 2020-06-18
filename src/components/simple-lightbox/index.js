import React from "react";

const data = [
    {
        url: "https://webneel.com/wallpaper/sites/default/files/images/08-2018/2-nature-wallpaper-grass.jpg",
        type: "photo",
        description: "abc"
    },
    {
        url: "https://sourcedigit.com/wp-content/uploads/2019/09/Ubuntu-19-10-Wallpaper.jpg",
        type: "photo",
        description: "efg"
    }
]

export default function SimpleLightbox({ canShow, onClose }) {

    const TOTAL_ITEM = (data || []).length;

    let xDown,
        yDown;

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [backgroundPosition, setBackgroundPosition] = React.useState('0% 0%');
    const [canZoom, setCanZoom] = React.useState(false);

    const resetPosition = () => {
        setBackgroundPosition('0% 0%');
    }

    const getTouches = (evt) => {
        return evt.touches ||
            evt.originalEvent.touches;
    }

    const handlePrevious = () => {
        if (currentIndex < 1) {
            setCurrentIndex(TOTAL_ITEM - 1);
        }
        else {
            setCurrentIndex((prevIndex) => {
                return prevIndex - 1;
            });
        }

        resetPosition();
    };

    const handleNext = () => {
        if (currentIndex < TOTAL_ITEM - 1) {
            setCurrentIndex((prevIndex) => {
                return prevIndex + 1;
            });
        }
        else {
            setCurrentIndex(0);
        }

        resetPosition();
    };

    const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const handleTouchMove = (event) => {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = event.touches[0].clientX;
        var yUp = event.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                handlePrevious();
            } else {
                /* right swipe */
                handleNext();
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }

    const handleMouseMove = (event) => {
        const { left, top, width, height } = event.target.getBoundingClientRect()

        const x = (event.pageX - left) / width * 100

        const y = (event.pageY - top) / height * 100

        setBackgroundPosition(`${x}% ${y}%`);
    }

    const onClickToogleZoom = () => {
        setCanZoom(prev => {
            return !prev;
        });
    };

    return (
        <div className={`lightbox ${canShow === true ? "lightbox--show" : ""}`}>
            <div className="lightbox__header">
                <div className="lightbox__item-count">
                    <div className="lightbox__current">{currentIndex + 1}</div>
                    <div className="lightbox__total">{TOTAL_ITEM}</div>
                </div>
                <div>
                    <button className="lightbox__button-zoom" onClick={() => onClickToogleZoom()}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 478.208 478.208">
                            <g>
                                <g>
                                    <path d="M473.418,449.285L303.28,279.148c59.759-73.087,48.954-180.779-24.132-240.538S98.369-10.344,38.61,62.742    S-10.344,243.521,62.742,303.28c62.953,51.473,153.453,51.473,216.406,0l170.138,170.138c6.78,6.548,17.584,6.36,24.132-0.42    C479.805,466.384,479.805,455.899,473.418,449.285z M171.218,307.751c-75.37-0.085-136.449-61.163-136.533-136.533    c0-75.405,61.128-136.533,136.533-136.533s136.533,61.128,136.533,136.533S246.623,307.751,171.218,307.751z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M256.551,154.151h-68.267V85.885c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v68.267H85.885    c-9.426,0-17.067,7.641-17.067,17.067s7.641,17.067,17.067,17.067h68.267v68.267c0,9.426,7.641,17.067,17.067,17.067    s17.067-7.641,17.067-17.067v-68.267h68.267c9.426,0,17.067-7.641,17.067-17.067S265.977,154.151,256.551,154.151z" />
                                </g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </svg>
                    </button>
                    <button className="lightbox__button-close" onClick={() => onClose()}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.29195 23.7079C6.48691 23.9029 6.74242 24 6.99794 24C7.25345 24 7.50897 23.9029 7.70393 23.7079L15 16.4115L22.2961 23.7079C22.4911 23.9029 22.7466 24 23.0021 24C23.2576 24 23.5131 23.9029 23.7081 23.7079C24.0973 23.318 24.0973 22.6859 23.7081 22.296L16.4116 14.9999L23.7076 7.70369C24.0975 7.31444 24.0975 6.68234 23.7076 6.29243C23.3176 5.90252 22.6862 5.90252 22.2962 6.29243L15 13.5883L7.7037 6.29243C7.31379 5.90252 6.68235 5.90252 6.29243 6.29243C5.90252 6.68167 5.90252 7.31378 6.29243 7.70369L13.5884 14.9999L6.29195 22.296C5.90268 22.6859 5.90268 23.318 6.29195 23.7079Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="lightbox__body">
                <div className="lightbox__list">
                    {
                        data.map((item, index) => (
                            <div key={index}
                                className={`lightbox__item ${currentIndex === index ? "lightbox__item--active" : ""}`}
                                onTouchStart={(event) => handleTouchStart(event)}
                                onTouchMove={(event) => handleTouchMove(event)}>
                                <img src={item.url} alt={index} />
                                {
                                    canZoom === true
                                    &&
                                    <figure onMouseMove={(event) => handleMouseMove(event)} style={{ backgroundImage: `url(${item.url})`, backgroundPosition: backgroundPosition }}>
                                    </figure>
                                }
                            </div>
                        ))
                    }
                    <button className="lightbox__button-prev" onClick={() => handlePrevious()}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.60024 10C7.69745 10 7.79465 9.9648 7.87185 9.8936C8.03386 9.74359 8.04386 9.49118 7.89385 9.32838L4.93535 6.12587L7.90425 2.65976C8.04786 2.49215 8.02826 2.23975 7.86025 2.09574C7.69265 1.95294 7.44024 1.97174 7.29623 2.13974L4.09613 5.87586C3.96412 6.02987 3.96852 6.25828 4.10653 6.40788L7.30663 9.8716C7.38544 9.9568 7.49264 10 7.60024 10Z" fill="white" />
                        </svg>
                    </button>
                    <button className="lightbox__button-next" onClick={() => handleNext()}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.40008 10C4.30287 10 4.20567 9.9648 4.12847 9.8936C3.96646 9.74359 3.95646 9.49118 4.10647 9.32838L7.06497 6.12587L4.09607 2.65976C3.95246 2.49215 3.97206 2.23975 4.14007 2.09574C4.30768 1.95294 4.56008 1.97174 4.70409 2.13974L7.90419 5.87586C8.0362 6.02987 8.0318 6.25828 7.89379 6.40788L4.69369 9.8716C4.61489 9.9568 4.50768 10 4.40008 10Z" fill="white" />
                        </svg>
                    </button>
                </div>
                <div className="lightbox__description">
                    {data[currentIndex].description}
                </div>
            </div>
        </div >
    );
}