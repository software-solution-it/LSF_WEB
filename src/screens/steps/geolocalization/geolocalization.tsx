import React, { useState, useEffect, useRef } from 'react';
import './geolocalization.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import geolocalizationService from '../../../services/geolocalizationService';
import Modal from '../../../components/Modal';
import { User } from '../../../interface/userInterface';
import loading from '../../../assets/loading.gif';

interface GeolocationData {
    latitude: number;
    longitude: number;
    address: string;
    projectId: any;
}

const Geolocation: React.FC = () => {
    const location = useLocation();
    const { projectId } = location.state || {};
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState(false);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [circle, setCircle] = useState<google.maps.Circle | null>(null);

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [geolocationData, setGeolocationData] = useState<GeolocationData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response.user);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

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
                        projectId: projectId
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
                setIsLoading(true);
                const response = await geolocalizationService.createGeolocation(geolocationData);
                setIsLoading(false);
                if (response) {
                    setShowModal(true);
                }
            };

            fetchData();
        }
    };

    const handleCloseModal = (parameter: any) => {
        setShowModal(false);
        if (parameter === 'home') {
            navigate('/home', { state: { projectId } });
        } else {
            navigate('/step/electric', { state: { projectId } });
        }
    };

    return (
        <div>
            
            <Menu user={currentUser} projectId={projectId} setRefresh={setRefresh} />
            <main>
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-12" style={{ marginTop: 80 }}>
                            <div className="welcome-section-geolocalization mt-4">
                                <ul>
                                    <li>
                                        <div className="mb-4">
                                            <h3 className='text-center'>Geolocalização</h3>
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
                                                disabled={isLoading}
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
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <img style={{width:25}} src={loading} alt="Loading" className="loading-gif" />
                                        ) : (
                                            'Confirmar'
                                        )}
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
