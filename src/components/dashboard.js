import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './create';
import Update from './update';
import Modal from './helper/modal';

const Dashboard = (props) => {
    const [jops, setJops] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [updateJop, setUpdateJop] = useState({ showModal: false, updateId: null })

    useEffect(() => {
        getJops()
    }, [])

    const getJops = () => {
        axios.get('http://localhost:5000/jops/')
            .then(response => {
                setJops(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getList = () => {
        let data = jops;
        if (searchValue)
            data = data.filter((item) => { return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 || item.priorityName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 })
        data.sort((a, b) => { return a.priority - b.priority })
        return data.map(item => {
            return <JopRow jop={item} onDeleteJop={handleDeleteJop} onUpdateJop={handleUpdateJop} key={item.id} />;
        })
    }

    const handleDeleteJop = (id) => {
        axios.delete('http://localhost:5000/jops/' + id)
            .then(response => {
                if (response.data.success) {
                    setJops(jops.filter(t => t.id !== id))
                }
            });
    }

    const handleUpdateJop = (id) => {
        setUpdateJop({ showModal: true, updateId: id })
    }  

    const handleSuccess = () => {
        getJops();
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    } 

    return (
        <div>
            <div className="card">
                <Create onSuccess={handleSuccess} />
            </div>
            <Modal
                isOpen={updateJop.showModal}
                onClose={() => {
                    setUpdateJop({ showModal: false, updateId: '' })
                }}
            >
                <Update onSuccess={() => { handleSuccess(); setUpdateJop({ showModal: false, updateId: '' }) }} id={updateJop.updateId} />
            </Modal>
            <div className="card">
                <h3>jops</h3>
                <div className="form-field">
                    <input
                        type="text"
                        name="name"
                        className="input table-search"
                        placeholder="search"
                        onChange={handleSearch}
                    />
                </div>
                <table className="table">
                    <thead >
                        <tr>
                            <th>name</th>
                            <th>priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getList()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const JopRow = ({ jop, onUpdateJop, onDeleteJop }) => {
    return (
        <tr className={`priority-${jop.priorityName}`}>
            <td>{jop.name}</td>
            <td>{jop.priorityName}</td>
            <td>
                <a href="#" onClick={() => { onUpdateJop(jop.id) }}>edit</a> | <a href="#" onClick={() => { onDeleteJop(jop.id) }}>delete</a>
            </td>
        </tr>
    )
}

export default Dashboard