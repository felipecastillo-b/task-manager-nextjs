'use client';
import { useGlobalState } from '@/app/context/globalProvider';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../button/Button';
import { plus } from '@/app/utils/Icons';

function CreateContent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const {theme, allTasks, closeModal} = useGlobalState();

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
            case 'completed':
                setCompleted(e.target.checked);
                break;
            case 'important':
                setImportant(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important,
        };      

        try {
            const res = await axios.post('/api/tasks', task);

            if(res.data.error) {
                toast.error(res.data.error);
            }
            if(!res.data.error) {
                toast.success('Task created successfully.');
                allTasks();
                closeModal();
            }
        } catch (error) {
            toast.error('Something went error.');
            console.log(error);
        }
    };

    return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a Task</h1>
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input type="text" id='title' value={title} name='title' onChange={handleChange('title')} placeholder='Write a Title...' />
        </div>
        <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea value={description} name='description' id='description' rows={4} onChange={handleChange('description')} placeholder='Write a Description...' ></textarea>
        </div>
        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input type="date" id='date' value={date} name='date' onChange={handleChange('date')} placeholder='Choose a Date...' />
        </div>
        <div className="input-control toggler">
            <label htmlFor="completed">Toggle Completed</label>
            <input type="checkbox" id='completed' value={completed.toString()} name='completed' onChange={handleChange('completed')} />
        </div>
        <div className="input-control toggler">
            <label htmlFor="important">Toggle Important</label>
            <input type="checkbox" id='important' value={important.toString()} name='important' onChange={handleChange('important')} />
        </div>
        <div className="submit-btn flex justify-end">
            <Button type='submit' name='Create Task' icon={plus} padding={'0.8rem 2rem'} borderRad={'0.8rem'} fw={'500'} fs={'1.2rem'} background={'theme.colorGreenDark'}/>
        </div>
    </CreateContentStyled>
  )
}

const CreateContentStyled = styled.form`
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        @media screen and (max-width: 450px) {
        margin: 1rem 0;
        }

        label {
        margin-bottom: 0.5rem;
        display: inline-block;
        font-size: clamp(0.9rem, 5vw, 1.2rem);

        span {
            color: ${(props) => props.theme.colorGrey3};
        }
        }

        input,
        textarea {
        width: 100%;
        padding: 1rem;
        resize: none;
        background-color: ${(props) => props.theme.colorGreyDark};
        color: ${(props) => props.theme.colorGrey2};
        border-radius: 0.5rem;
        }
    }

    .submit-btn button {
        transition: all 0.35s ease-in-out;

        @media screen and (max-width: 500px) {
        font-size: 0.9rem !important;
        padding: 0.6rem 1rem !important;

        i {
            font-size: 1.2rem !important;
            margin-right: 0.5rem !important;
        }
        }

        i {
        color: ${(props) => props.theme.colorGrey0};
        }

        &:hover {
        background: ${(props) => props.theme.colorPrimaryGreen} !important;
        color: ${(props) => props.theme.colorWhite} !important;
        }
    }

    .toggler {
        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;

        label {
        flex: 1;
        }

        input {
        width: initial;
        }
    }
`;

export default CreateContent