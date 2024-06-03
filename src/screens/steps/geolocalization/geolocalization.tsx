import React, { useState, useEffect, useRef } from 'react';
import './geolocalization.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import { CurrentUser } from '../../../interface/userInterface';
import userService from '../../../services/userService';
import geolocalizationService from '../../../services/geolocalizationService';
import Modal from '../../../components/Modal';

/// <reference types="@types/google.maps" />

interface GeolocationData {
    latitude: number;
    longitude: number;
    address: string;
}

const Geolocation: React.FC = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState(false);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [circle, setCircle] = useState<google.maps.Circle | null>(null);

    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [geolocationData, setGeolocationData] = useState<GeolocationData | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await userService.getCurrentUser();
            if (response) {
                setCurrentUser(response);
            }else{
                navigate('/login');
            }
        }catch(e){
            navigate('/login');
        }
        };

        fetchData();
    }, []);

    
    useEffect(() => {
    console.log(currentUser?.user?.receiptConfirmed)
if(currentUser?.user?.receiptConfirmed == 0){
    navigate('/step/waiting_aproval');
}else if(currentUser?.user.receiptConfirmed == 1){
    navigate('/step/supplier_document');
}else if(   currentUser?.user.receiptConfirmed == 2){
    navigate('/step/technician');
}
}, [currentUser]);



    // Inicialize o mapa apenas uma vez
    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = new google.maps.Map(mapRef.current, {
                center: { lat: -23.55052, lng: -46.633308 },
                zoom: 15,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
            });
            setMap(mapInstance);
        }
    }, []);

    useEffect(() => {
        if (addressInputRef.current && map) {
            const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
                types: ['address'],
                componentRestrictions: { country: 'br' },
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    setAddressError(true);
                    return;
                }

                const addressComponents = place.address_components;
                const streetNumber = addressComponents?.find(component => component.types.includes('street_number'));

                if (!streetNumber) {
                    setAddressError(true);
                    return;
                }

                setAddressError(false);
                setAddress(place.formatted_address || '');
                if (place.geometry.location) {
                    map.setCenter(place.geometry.location);
                    if (marker) marker.setMap(null);
                    if (circle) circle.setMap(null);

                    const newMarker = new google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });

                    map.setZoom(13);

                    const newCircle = new google.maps.Circle({
                        map,
                        center: place.geometry.location,
                        radius: 2000,
                        fillColor: '#FF0000',
                        fillOpacity: 0.2,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    });

                    setMarker(newMarker);
                    setCircle(newCircle);

                    setGeolocationData({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        address: place.formatted_address || '',
                    });
                }
            });
        }
    }, [map]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleAddressFocus = () => {
        setAddressError(false);
    };

    const handleNext = () => {
        if (geolocationData && currentUser) {
            const fetchData = async () => {
                const response = await geolocalizationService.createGeolocation(geolocationData);
                if (response) {
                    setShowModal(true);
                }
            };

            fetchData();
        }
    };

    const handleCloseModal = (parameter:any) => {
        setShowModal(false);
        if(parameter === 'home'){
            navigate('/home');
        }else{
            navigate('/step/inauguration');
        }
    };

    return (
        <div>
            <Menu />
            <main>
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-12">
                            <div className="welcome-section-geolocalization mt-4">
                                <ul>
                                    <li>
                                        <div className="mb-4">
                                            <h5>Geolocalização</h5>
                                        </div>
                                        <div className="w-100 rounded">
                                            <p className="py-1 mx-2 text-center">
                                                Nossa equipe técnica realizará uma análise para determinar a localização mais apropriada com base nos critérios selecionados.
                                            </p>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${addressError ? 'is-invalid' : ''}`}
                                                id="address"
                                                placeholder="Digite o endereço completo"
                                                value={address}
                                                onChange={handleAddressChange}
                                                onFocus={handleAddressFocus}
                                                ref={addressInputRef}
                                            />
                                            <label htmlFor="address">Endereço completo</label>
                                            {addressError && <div className="invalid-feedback">Por favor, insira um endereço válido com número.</div>}
                                        </div>
                                    </li>
                                </ul>
                                <div ref={mapRef} className="map-container my-5"></div>
                                <div className='d-flex justify-content-center align-items-center'>
                                <button
                                className="mb-3 py-3 btn btn-request-confirm-steps text-center"
                                onClick={handleNext}
                            >
                                Confirmar
                            </button>
                            </div>
                            <Modal show={showModal} handleClose={handleCloseModal}>
                <p>Parabéns, você concluiu a etapa atual. Agora você pode passar para a próxima etapa do projeto.</p>
            </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Geolocation;
