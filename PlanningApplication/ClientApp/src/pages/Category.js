import React, { useEffect, useState} from 'react';
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { FilterSidebar } from '../components/FilterSidebar';
import { useParams } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import axios from 'axios';

//const categoryEvents = [
//    { title: 'ADVENTUR 2024', location: 'Vilnius', date: '2024-01-24', image: 'https://www.litexpo.lt/wp-content/uploads/2023/05/2023-06-13-ADVENTUR_2146x1240-EN.png' },
//    { title: 'Tai kada vaikai?', location: 'Kaunas', date: '2024-03-15', image: 'https://pickvibe-media.s3.eu-north-1.amazonaws.com/161096/conversions/6bad4066e33bd7b99cb760236811abc5-large.jpg' },
//    { title: 'Muziejų naktis', location: 'Vilnius', date: '2024-05-18', image: 'https://www.muziejunaktis.lt/wp-content/uploads/2024/04/3-e1713943454136.jpg' },
//    { title: 'Voro vestuvės', location: 'Vilnius', date: '2024-05-24', image: 'https://www.teatraslele.lt/uploads/Products/product_14/voro-vestuves-1_1623492195.jpg' },
//    { title: 'Vasaros desertas 2024', location: 'Palanga', date: '2024-06-20', image: 'https://www.bilietai.lt/imageGenerator/concertShort/1f8dcbde276dce51b5456c6026316946.webp' },
//    { title: 'Narcizų žydėjimo šventė', location: 'Vijūnėlės parkas', date: '2024-04-12', image: 'https://renginiai.druskininkai.lt/img/full/2488-narcizai-event-cover-lt-new-2.jpg' },
//    { title: 'Kamado Bono grilio festivalis', location: 'Vilnius', date: '2024-05-18', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpbJfRHkCOvRMBv7A4gY1rvyxQtFg9RdXB868FuoHmA&s.jpg' },
//    { title: 'Piešimas gyvai', location: 'Klaipėda', date: '2024-04-26', image: 'https://renginiai.kasvyksta.lt/uploads/events/127196/medthumb/piesimas_gyvai_fb.jpg' },
//];



export const Category = () => {
    const { categoryName } = useParams();
    const [categoryEvents, setCategoryEvents] = useState([]);   
    const [filter, setFilter] = useState('');

    const fetchEventsByCategory = async (parameters = "") => {
        try {
            const response = await axios.get(`Event/search?categories=${categoryName}` + parameters, {
                headers: {
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {
                setCategoryEvents(response.data);
                console.log("success");
            } else {
                console.log('Failed to fetch events for category:', response.data);
            }
        } catch (error) {
            console.error('Error fetching events for category:', error);
        }
    };
    const handleDateFilterChange = (value) => {
        let newFilter = filter;
        switch (value) {
            case "all": {
                newFilter = newFilter.replace(/&startDate=[^&]*/g, "").replace(/&endDate=[^&]*/g, "");
                break;
            }
            case "today": {
                let today = new Date();
                let date = today.toISOString().split("T")[0];
                let start = date + "T00:00:00";
                let end = date + "T23:59:59";
                newFilter = newFilter.replace(/&startDate=[^&]*/g, "").replace(/&endDate=[^&]*/g, "");
                newFilter += `&startDate=${start}&endDate=${end}`;
                break;
            }
            case "tomorrow": {
                let today = new Date();
                today.setDate(today.getDate() + 1);
                let date = today.toISOString().split("T")[0];
                let start = date + "T00:00:00";
                let end = date + "T23:59:59";
                newFilter = newFilter.replace(/&startDate=[^&]*/g, "").replace(/&endDate=[^&]*/g, "");
                newFilter += `&startDate=${start}&endDate=${end}`;
                break;
            }
            case "this_week": {
                let today = new Date();
                let endDay = new Date(today);
                let day = today.getDay(); // 0-6
                endDay.setDate(endDay.getDate() + (day === 0 ? 0 : 7 - day));
                let date = today.toISOString().split("T")[0];
                let endDate = endDay.toISOString().split("T")[0];
                let start = date + "T00:00:00";
                let end = endDate + "T23:59:59";
                newFilter = newFilter.replace(/&startDate=[^&]*/g, "").replace(/&endDate=[^&]*/g, "");
                newFilter += `&startDate=${start}&endDate=${end}`;
                break;
            }
            default: {
                break;
            }
        }
        setFilter(newFilter);
        fetchEventsByCategory(newFilter);
    };

    const handlePriceFilterChange = (value) => {
        let newFilter = filter;
        switch (value) {
            case "all": {
                newFilter = newFilter.replace(/&maxTicketPrice=[^&]*/g, "").replace(/&minTicketPrice=[^&]*/g, "");
                break;
            }
            case "paid": {
                let max = 400000000000000;
                let min = 0.01;
                newFilter = newFilter.replace(/&maxTicketPrice=[^&]*/g, "").replace(/&minTicketPrice=[^&]*/g, "");
                newFilter += `&maxTicketPrice=${max}&minTicketPrice=${min}`;
                break;
            }
            case "free": {
                newFilter = newFilter.replace(/&maxTicketPrice=[^&]*/g, "").replace(/&minTicketPrice=[^&]*/g, "");
                newFilter += `&maxTicketPrice=0`;
                break;
            }
            default: {
                break;
            }
        }
        setFilter(newFilter);
        fetchEventsByCategory(newFilter);
    };

    //const handleCategoryChange = (categories) => {
    //    setSelectedCategories(categories);
    //    console.log("Categories changed to:", categories);
    //};

    //const handleLocationChange = (locations) => {
    //    setSelectedLocations(locations);
    //    console.log("Locations changed to:", locations);
    //};

    useEffect(() => {
        if (categoryName) {
            fetchEventsByCategory();
        }
    }, [categoryName]);

    console.log(categoryEvents)

    const convertDate = (date) => {
        if (date) {
            let splitDate = date.split("T")[0];
            return splitDate;
        }
        return "";
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                   <FilterSidebar onDateFilterChange={handleDateFilterChange} onPriceFilterChange={handlePriceFilterChange}/>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ mb: 5}}>
                        <Typography variant="h4" gutterBottom>{ categoryName}</Typography>
                        <Grid container spacing={2}>
                            {categoryEvents.map((event) => (
                                <Grid item xs={12} key={event.name}>
                                    <Card sx={{
                                        display: 'flex', alignItems: 'center', pl: 2
                                 
                                    }}>
                                        <CardMedia
                                            sx={{flex:1} }
                                            component="img"
                                            height="140"
                                            width="140"
                                            image={`data:image/jpeg;base64,${event.photo}`}
                                            alt={event.name}
                                        />
                                        <CardContent sx={{ flex: 2 }}>
                                            <Typography variant="h6">{event.name}</Typography>
                                            <Typography>{event.location}</Typography>
                                            <Typography>{convertDate(event.date)}</Typography>
                                            <Button
                                                type="submit"
                                                width='100%'

                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    backgroundColor: '#7F1425', // Maroon color
                                                    '&:hover': {
                                                        backgroundColor: '#63101C' // Darker maroon on hover
                                                    },
                                                    ml: 45
                                                }}
                                            >
                                                Book now
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

}
