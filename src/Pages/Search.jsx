import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Search = () => {
    const [upozillas, setUpozillas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState([])
    const [upozilla, setUpozilla] = useState([])
    const axiosInstance = useAxios();
    const [searched, setSearched] = useState(false);
    const [donors, setDonors] = useState([]);
    useEffect(() => {
        axios.get('/Upozilla.json')
            .then(res => {
                setUpozillas(res.data.upazilas)
            })

        axios.get('/District.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.bloodGroup.value;

        axiosInstance.get(`/search?bloodGroup=${bloodGroup}&district=${district}&upozilla=${upozilla}`)
            .then(res => {
                setDonors(res.data);
                setSearched(true);
                console.log(res.data)
            })
    };

    return (
        <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-3 md:max-w-5xl md:mx-auto my-10 "
        >
            <h1 className="text-3xl font-bold text-center my-6">Search Here for Donor</h1>
            {/* Blood Group */}
            <select
                name="bloodGroup"


                className="select select-bordered w-full mb-5"
                required
                defaultValue="Choose Blood Group">
                <option disabled={true}>Choose Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>

            </select>


            {/* District */}
            <select
                name="recipientDistrict"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="select  select-bordered w-full mb-5">
                <option disabled selected value=''> Select Your Disrict</option>
                {
                    districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                }
            </select>

            {/* Upazila */}
            <select
                name="recipientUpozilla"
                value={upozilla}
                onChange={(e) => setUpozilla(e.target.value)}
                className="select  select-bordered w-full mb-5">
                <option disabled selected value=''> Select Your Upazila</option>
                {
                    upozillas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                }
            </select>

            {/* Search Button */}
            <button type="submit" className="btn btn-primary w-full">
                Search
            </button>
            {/* 📋 Search Result */}
            {searched && (
                donors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                        {donors.map(donor => (
                            <div key={donor._id} className="card bg-base-100 shadow p-4">
                                <h3 className="font-semibold">{donor.name}</h3>
                                <p>Blood: {donor.bloodGroup}</p>
                                <p>District: {donor.recipientDistrict}</p>
                                <p>Upazila: {donor.recipientUpozilla}</p>


                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No donors found
                    </p>
                )
            )}
        </form>
    );
};

export default Search;
