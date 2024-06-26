import '../scss/Amentites.scss';

const Amentites = ({ data }) => {
    return (
        <div className='amentites-section-wrapper'>
            <p className='about-hotel-title'>Amentites</p>
            <div className='hotel-conveniences'>
                {data?.conveniences && data?.conveniences?.length > 0 ? (
                    data?.conveniences.map((convenience, index) => {
                        const trueConveniences = [];
                        if (convenience.bar) trueConveniences.push("Bar");
                        if (convenience.free_breakfast) trueConveniences.push("Breakfast");
                        if (convenience.free_internet) trueConveniences.push("Internet");
                        if (convenience.laundry) trueConveniences.push("Laundry");
                        if (convenience.pick_up_drop_off) trueConveniences.push("Pick-Up / Drop-Off");
                        if (convenience.pool) trueConveniences.push("Pool");
                        if (convenience.reception_24h) trueConveniences.push("24h Reception");
                        if (convenience.restaurant) trueConveniences.push("Restaurant");
                        return (
                            <>
                                {trueConveniences.map((item, idx) => (
                                    <span key={idx} className="convenience-item">{item}{idx < trueConveniences.length - 1 ? ', ' : ''}</span>
                                ))}
                            </>
                        );
                    })
                ) : (
                    <p className="no-conveniences">No conveniences available</p>
                )}
            </div>
        </div>
    );
};

export default Amentites;
