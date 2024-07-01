import '../scss/Amentites.scss';
import { icons } from '../../../../../utils/icons';

const Amentites = ({ data }) => {
    return (
        <div className='amentites-section-wrapper'>
            <p className='about-hotel-title'>Amentites</p>
            <div className='hotel-conveniences'>
                {data?.conveniences && data?.conveniences?.length > 0 ? (
                    data?.conveniences.map((convenience, index) => {
                        const trueConveniences = [];
                        const iconConveniences = [];
                        if (convenience.bar) {
                            trueConveniences.push("Bar")
                            iconConveniences.push("bar")
                        };
                        if (convenience.free_breakfast) {
                            trueConveniences.push("Breakfast");
                            iconConveniences.push("free_breakfast")
                        }
                        if (convenience.free_internet) {
                            trueConveniences.push("Internet");
                            iconConveniences.push("free_internet")
                        }
                        if (convenience.laundry) {
                            trueConveniences.push("Laundry");
                            iconConveniences.push("laundry");
                        }
                        if (convenience.pick_up_drop_off) {
                            trueConveniences.push("Pick-Up / Drop-Off");
                            iconConveniences.push("pick_up_drop_off");
                        }
                        if (convenience.pool) {
                            trueConveniences.push("Pool");
                            iconConveniences.push("pool");
                        }
                        if (convenience.reception_24h) {
                            trueConveniences.push("24h Reception");
                            iconConveniences.push("reception_24h");
                        }
                        if (convenience.restaurant) {
                            trueConveniences.push("Restaurant");
                            iconConveniences.push("restaurant");
                        }
                        return (
                            <span key={index} className="convenience-item">
                                {trueConveniences.map((item, idx) => (
                                    <span key={idx} >{icons[iconConveniences[idx]]()}{item}</span>
                                ))}
                            </span>
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
