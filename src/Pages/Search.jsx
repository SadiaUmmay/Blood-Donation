import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Search = () => {
    const [upozillas, setUpozillas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState([])
    const [upozilla, setUpozilla] = useState([])
    const axiosInstance = useAxios();

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
        .then(res=>{
            console.log(res.data)
        })
    };

    return (
        <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-3 md:max-w-5xl md:mx-auto my-10 "
        >
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
        </form>
    );
};

export default Search;
