import { TiTick } from "react-icons/ti";
import React from 'react';
import {toast} from 'react-toastify';
const UpdateLocation = () => {
    const update=(e)=>{
        const address=document.getElementById("address").value;
        // saveAddress(address)
        e.preventDefault();
    }
    const Caliber=(e)=>{
        let long,lat;
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((x)=>{
                long=x.coords.longitude;
                lat=x.coords.latitude;
                // saveLocation(long, lat);
                toast.success("Location has been saved successfully");
            })
        }
        else{
            toast.error("Location services not supported by browser")
        }
        e.preventDefault();
    }
    return (
        <div className=" top-0 left-0  flex justify-center items-center   ">
            <div className="bg-gray-100 bg-opacity-100 rounded-lg p-8 w-3/6 shadow-2xl max-w-md">
                <form>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
                        <div className="flex">
                            <input type="text" id="address" className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  " placeholder="Your address" />
                            <button type="button" onClick={update} className="inline-flex items-center px-3 text-sm text-gray-900 bg-green-100 border hover:bg-green-300 border-e-0 border-gray-300 rounded-e-md" data-tooltip-id="my-tooltip" data-tooltip-content="Update">
                                <TiTick className="h-8 w-8 "/>
                                
                            </button>
                        </div> </div>
                    <div className="mb-6 relative">
                        <label htmlFor="caliber" className="block text-gray-700 font-bold mb-2">Caliberate Location:</label>

                    </div>
                    <a data-tooltip-id="my-tooltip" data-tooltip-content="You will need to provide location access">
  
                    <button type="button" onClick={Caliber} className="bg-blue-950 text-white font-bold px-3 py-1 rounded hover:bg-blue-700">Caliber</button>
</a>
                </form>
            </div>
        </div>
    );
}

export default UpdateLocation;
