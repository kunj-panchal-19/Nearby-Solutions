import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import markerPic from 'leaflet/dist/images/marker-icon.png';
import { useState } from 'react';
import SearchBar from '../components/Searchbar';
import { MapContainer, TileLayer, useMap,Marker,Popup} from 'react-leaflet'
const Map = () =>{
    let index=0;
    useEffect(()=>{
      gettingCoardinates();
    },[]);
    // const Center=()=>{
        
    //     const newCenter=[latitude,longitude];
    //     map.setView(newCenter,13);
    // }
    // useEffect(()=>{
    //   Center();
    // },[latitude,longitude]);
    // const map=useMap();
    const [load,setLoad]=useState(false);
    const [latitude,setLatitude]= useState(null);
    const [longitude,setLongitude] = useState(null);
    const [markers,setMarkers] = useState([]);
    const gettingCoardinates=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude}=position.coords;
            const {longitude}=position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            // setMarkers([...markers,{latitude:latitude,longitude : longitude}]);
            // console.log(markers[0].latitude)
            setLoad(true);
        },()=>{
                alert("can not get location!!");
                })};
        const handleSearch=(searchTerm)=>{
            console.log(searchTerm);
        }

    return(
        <>
                {load?<>
                    <div className='flex-col w-full'>
                        <div className='flex justify-center'>
                <div className='w-2/3'>
         
                    <MapContainer className='h-96 rounded-md border-4 border-blue-950' center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
                    
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    <Marker key={index} position={[latitude,longitude]} >
                    <Popup>
                        Marker {index + 1}
                    </Popup>
                    </Marker>
                    {/* {markers.map((marker,index)=>{
                    <Marker key={index} position={[marker.latitude,marker.longitude]}>
                    <Popup>
                        Marker {index + 1}
                    </Popup>
                    </Marker>})} */}
                
                </MapContainer>
                </div>
                </div>
                </div>
                </>:<main>Loading...</main>}
        </>
    );
}
export default Map;


