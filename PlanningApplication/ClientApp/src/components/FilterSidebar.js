import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
    color: '#7F1425',
    fontWeight: 'bold',
    '&.Mui-focused': {
        color: '#7F1425',
    },
    '&.MuiFormLabel-root.Mui-disabled': {
        color: '#7F1425',
    },
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    '&.Mui-checked': {
        color: '#7F1425', 
    },
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
    '&.Mui-checked': {
        color: '#7F1425', 
    },
}));

export const FilterSidebar = () => {

    const [categories, setCategories] = useState({
        all: true,
        concert: false,
        exhibition: false,
        opening: false,
        course: false,
        jam: false,
    });

    const [locations, setLocations] = useState({
        all: true,
        vilnius: false,
        kaunas: false,
        klaipeda: false,
        siauliai: false,
        panevezys: false,
    });

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'all') {
            setCategories({
                all: checked,
                concert: false,
                exhibition: false,
                opening: false,
                course: false,
                jam: false,
            });
        } else {
            setCategories({
                ...categories,
                [name]: checked,
                all: false,
            });
        }
    };

    const handleLocationChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'all') {
            setLocations({
                all: checked,
                vilnius: false,
                kaunas: false,
                klaipeda: false,
                siauliai: false,
                panevezys: false,
            });
        } else {
            setLocations({
                ...locations,
                [name]: checked,
                all: false,
            });
        }
    };


    return (
        <Box sx={{ width: 250, padding: 2, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>

            {/* Date Filter */}
            <FormControl component="fieldset">
                <CustomFormLabel component="legend">Date</CustomFormLabel>
                <RadioGroup name="date" defaultValue="all">
                    <FormControlLabel value="all" control={<CustomRadio />} label="All" />
                    <FormControlLabel value="today" control={<CustomRadio />} label="Today" />
                    <FormControlLabel value="tomorrow" control={<CustomRadio />} label="Tomorrow" />
                    <FormControlLabel value="this_week" control={<CustomRadio />} label="This week" />
                    <FormControlLabel value="custom" control={<CustomRadio />} label="Custom" />
                </RadioGroup>
            </FormControl>

            {/* Price Filter */}
            <FormControl component="fieldset">
                <CustomFormLabel component="legend">Price</CustomFormLabel>
                <RadioGroup name="price" defaultValue="all">
                    <FormControlLabel value="all" control={<CustomRadio />} label="All" />
                    <FormControlLabel value="paid" control={<CustomRadio />} label="Paid" />
                    <FormControlLabel value="free" control={<CustomRadio />} label="Free" />
                </RadioGroup>
            </FormControl>

            {/* Discounts Filter */}
            <FormControl component="fieldset">
                <CustomFormLabel component="legend">Discounts</CustomFormLabel>
                <FormGroup>
                    <FormControlLabel control={<CustomCheckbox name="none" />} label="None" />
                    <FormControlLabel control={<CustomCheckbox name="students" />} label="Students" />
                    <FormControlLabel control={<CustomCheckbox name="seniors" />} label="Seniors" />
                </FormGroup>
            </FormControl>

            {/* Categories Filter */}
            <FormControl component="fieldset">
                <CustomFormLabel component="legend">Categories</CustomFormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.all} onChange={handleCategoryChange} name="all" />}
                        label="All"
                    />
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.concert} onChange={handleCategoryChange} name="concert" />}
                        label="Concert"
                    />
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.exhibition} onChange={handleCategoryChange} name="exhibition" />}
                        label="Exhibition"
                    />
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.opening} onChange={handleCategoryChange} name="opening" />}
                        label="Opening"
                    />
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.course} onChange={handleCategoryChange} name="course" />}
                        label="Course"
                    />
                    <FormControlLabel
                        control={<CustomCheckbox checked={categories.jam} onChange={handleCategoryChange} name="jam" />}
                        label="Jam"
                    />
                </FormGroup>
            </FormControl>

            {/* Organizers Filter */}
            {/*<FormControl component="fieldset">*/}
            {/*    <CustomFormLabel component="legend">Organizers</CustomFormLabel>*/}
            {/*    <FormGroup>*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="all" />} label="All" />*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="km" />} label="KM" />*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="kk" />} label="KK" />*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="sk" />} label="SK" />*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="sss" />} label="SSS" />*/}
            {/*        <FormControlLabel control={<CustomCheckbox name="kask" />} label="KASK" />*/}
            {/*    </FormGroup>*/}
            {/*</FormControl>*/}

            {/* Location Filter */}
            <FormControl component="fieldset">
                <CustomFormLabel component="legend">Location</CustomFormLabel>
                <FormGroup>
                    <FormControlLabel control={<CustomCheckbox checked={locations.all} onChange={handleLocationChange} name="all" defaultChecked />} label="All" />
                    <FormControlLabel control={<CustomCheckbox checked={locations.vilnius} onChange={handleLocationChange} name="vilnius" />} label="Vilnius" />
                    <FormControlLabel control={<CustomCheckbox checked={locations.kaunas} onChange={handleLocationChange} name="kaunas" />} label="Kaunas" />
                    <FormControlLabel control={<CustomCheckbox checked={locations.klaipeda} onChange={handleLocationChange} name="klaipeda" />} label="Klaipėda" />
                    <FormControlLabel control={<CustomCheckbox checked={locations.siauliai} onChange={handleLocationChange} name="siauliai" />} label="Šiauliai" />
                    <FormControlLabel control={<CustomCheckbox checked={locations.panevezys} onChange={handleLocationChange} name="panevezys" />} label="Panevėžys" />
                </FormGroup>
            </FormControl>
        </Box>
    );
};

