import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const EventCategoriesMultiSelect = ({ categories, setCategories }) => {
    const [availableCategories, setAvailableCategories] = useState([]);


    useEffect(() => {
        axios.get('EventCategory/getEventCategories')
            .then(response => {
                setAvailableCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    const handleChange = (event) => {
        console.log(event.target.value)
        setCategories(event.target.value);
    };

    return (
        <FormControl fullWidth margin="normal" required>
            <InputLabel id="demo-multiple-name-label" style={{ color: 'white' }}>Categories</InputLabel>
                <Select
                    labelId="multiple-event-categories-label"
                    id="multiple-event-categoriese-name"
                    multiple
                    value={categories}
                    onChange={handleChange}
                    renderValue={(selected) =>selected.map((cat)=>cat.name).join(', ')  }

                    style={{ color: 'white', borderRadius: '4px' }}
                    sx={{ '& fieldset': { borderColor: 'white' } }}
                    label="Event Categories"
                >
                {availableCategories.map((cat) => (
                        <MenuItem
                            key={cat.key }
                            value={cat}
                        >
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
};

export default EventCategoriesMultiSelect;
