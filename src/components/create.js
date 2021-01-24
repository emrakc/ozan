import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const Create = (props) => {
    const [priortyList, setPriortyList] = useState([])
    const { register, errors, handleSubmit, reset } = useForm();

    useEffect(() => {
        getPriorty()
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
  
    const onSubmit = (data, e) => {
        axios.post('http://localhost:5000/jops/add', { jop: data })
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    props.onSuccess(data)
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.log(error);
            })

    };

    const priorityOptions = () => {
        return priortyList.map(item => {
            return <option key={item.key} value={item.key}>{item.value}</option>
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="plase enter jop"
                    ref={register({
                        required: { value: true, message: "required" },
                        maxLength: { value: 70, message: "max length 70 carachter" },
                        pattern: { value: /^[a-zA-Z0-9 !&*();':"\\|,.<>\/?]*$/, message: "only -latin character & number & some special characters- you can use" },
                    })}

                />
                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <span className="error"  >*{message}</span>}
                /> 
            </div>

            <div className="form-field">
                <select
                    name="priority"
                    className="input"
                    ref={register({
                        required: { value: true, message: "required" },
                    })}
                >
                    <option value="" disabled selected hidden>Choose a priority </option>

                    {
                        priorityOptions()
                    }
                </select>
                <ErrorMessage
                    errors={errors}
                    name="priority"
                    render={({ message }) => <span className="error"  >*{message}</span>}
                />
            </div>
            <div className="form-button">
                <input type="submit" value="CREATE" />
            </div>
        </form>
    ) 
}
export default Create;




// prefix=C:\Program Files\nodejs