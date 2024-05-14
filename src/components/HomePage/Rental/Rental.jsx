import React from 'react';
import './Rental.css';
const Rental = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className="info-rental col-6">
                    <div className='title'>
                        Discover More About Property Rental
                    </div>
                    <div class="yellow-line"></div>
                    <div className="description">
                        <p>Find the perfect rental property for you. Whether you are looking for a rental house, condo, or apartment, every property is vetted by a ForRent.com rental industry expert. Put the power of experience and trusted customer service to work for you!</p>
                    </div>
                    <div >
                        <button className="button">Discover more</button>
                    </div>
                </div>
                <div className="img-rental col-6">
                    <img className='img' src="https://s3-alpha-sig.figma.com/img/40e1/6f05/e584e922cf1d2021067ac1b7b8a01ac4?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SHEu-gtrLOhVnjPiVcP165Ze0i8AGWKnGWMN5J0-TCqzs1ifebpP5cretG7QMlP4YexP75ut44fZgkRGUz2IibuOweE4msmExSw4E4~7jDoNFfQ93ZPJ7rT5mHpGYYsQh4ke2CiGtn4jfxOWBkbZ~M9rwb204vBcXU87kthYEsNN5LAyY10OlDrp3iLXKdm-uBFh~D-cFOOSrFsS0Caib19tVaKy11Ya-B4QqNAFME9VsLUbh~lyxA85LAcH9NrUt3hWcQkXBWkZMoOl61ahlvvuLNwqxyAVV5AHbZfuak45SZ7RHirenkPgSxMZ4xcCTaeYcGjdi3wCdmM4xl-~Gw__" alt="rental" />
                </div>
            </div>
        </div>
    );
}

export default Rental;
