import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = (props) => {
    const [priortyList, setPriortyList] = useState([])
    const [jop, setJop] = useState(null)

    useEffect(() => {
        getPriorty();
        getJop();
    }, [])

    const getPriorty = async () => {
        try {
            axios.get('http://localhost:5000/priority/')
                .then(response => {
                    setPriortyList(response.data);
                    reset({ name: '', priority: '' })
                })
                .catch((error) => {
                    console.log(error);
                })

        } catch (err) {
            console.error(err.message);
        }
    };

    const getJop = async () => {
        try {
            axios.get(`http://localhost:5000/jops/${props.id}`)
                .then(response => {
                    setJop(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })

        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmit = (data, e) => {
        axios.post('http://localhost:5000/jops/update', jop)
            .then(response => {
                if (response.data.success) {
                    props.onSuccess(data)
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.log(error);
            })

    };

    const handlePriorityChange = (e) => {
        setJop({ ...jop, priority: e.target.value })
    }

    const priorityOptions = () => {
        return priortyList.map(item => {
            return <option key={item.key} value={item.key}>{item.value}</option>
        })
    }

    return (
        <div >
            <div className="form-field">
                <p>{jop?.name}</p>
            </div>

            <div className="form-field">
                <select
                    name="priority"
                    className="input"
                    value={jop?.priority}
                    onChange={handlePriorityChange}
                >
                    {
                        priorityOptions()
                    }
                </select>
            </div>
            <button onClick={onSubmit}>UPDATE</button>
        </div>
    )
}
export default Update;

