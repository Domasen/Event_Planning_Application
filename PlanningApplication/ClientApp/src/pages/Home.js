import React, {useContext, useEffect} from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Chip, Avatar  } from '@mui/material';
import Footer from '../components/Footer';
import axios from "axios";
import { UserContext } from '../context/UserContext.js'; // Import UserContext
import { Link } from "react-router-dom";


/// category turi tureti id
const categories = [
    { title: 'Music', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvT5DGdAzPf4lu-oYWicLMXD4-C3z4Atwylzgdw_9UGw&s.jpg' },
    { title: 'Business', image: 'https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630.jpg' },
    { title: 'Nightlife', image: 'https://file.visittallinn.ee/5zkas9/clubstudio.jpg' },
    { title: 'Holidays', image: 'https://www.socialtalent.com/wp-content/uploads/2017/04/shutterstock_302683349.jpg' },
    { title: 'Food & Drink', image: 'https://www.dunsgolfclub.com/wp-content/uploads/2024/01/Food-.jpg' },
    { title: 'Education', image: 'https://www.euroschoolindia.com/wp-content/uploads/2023/08/role-of-education.jpg' },
    { title: 'Gaming', image: 'https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_2400,h_1600,c_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg.jpg' },
    { title: 'Politics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnaE197wLEsJWTlVwuAq2VbEgO_8YuGnamSNMAIH3pQ&s.jpg' },
    { title: 'Health', image: 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg' }
];

const events = [
    { title: 'ADVENTUR 2024', location: 'Vilnius', date: '2024-01-24', image: 'https://www.litexpo.lt/wp-content/uploads/2023/05/2023-06-13-ADVENTUR_2146x1240-EN.png' },
    { title: 'Tai kada vaikai?', location: 'Kaunas', date: '2024-03-15', image: 'https://pickvibe-media.s3.eu-north-1.amazonaws.com/161096/conversions/6bad4066e33bd7b99cb760236811abc5-large.jpg' },
    { title: 'Muziejų naktis', location: 'Vilnius', date: '2024-05-18', image: 'https://www.muziejunaktis.lt/wp-content/uploads/2024/04/3-e1713943454136.jpg' },
    { title: 'Voro vestuvės', location: 'Vilnius', date: '2024-05-24', image: 'https://www.teatraslele.lt/uploads/Products/product_14/voro-vestuves-1_1623492195.jpg' },
    { title: 'Vasaros desertas 2024', location: 'Palanga', date: '2024-06-20', image: 'https://www.bilietai.lt/imageGenerator/concertShort/1f8dcbde276dce51b5456c6026316946.webp' },
    { title: 'Narcizų žydėjimo šventė', location: 'Vijūnėlės parkas', date: '2024-04-12', image: 'https://renginiai.druskininkai.lt/img/full/2488-narcizai-event-cover-lt-new-2.jpg' },
    { title: 'Kamado Bono grilio festivalis', location: 'Vilnius', date: '2024-05-18', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpbJfRHkCOvRMBv7A4gY1rvyxQtFg9RdXB868FuoHmA&s.jpg' },
    { title: 'Piešimas gyvai', location: 'Klaipėda', date: '2024-04-26', image: 'https://renginiai.kasvyksta.lt/uploads/events/127196/medthumb/piesimas_gyvai_fb.jpg' },
];

const eventsMore = [
    { title: 'Lietuvos dizaino savaitė', location: 'Anykščiai', date: 'Biržėlio 3-9', image: 'https://kultura.kaunas.lt/upload/files/2024/04/15/t815x425.png' },
    { title: 'Purpurinis vakaras', location: 'Anykščiai', date: 'Penktadienis, Rupjūčio 9', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WNAG90EvrsEDpwGzV4keIvGFEgLhTwGBZuMbFjAgfA&s.jpg' },
    { title: 'Jessica Shy Kaunas', location: 'Dariaus ir Girėno stadionas', date: 'Penktadienis, Rupjūčio 30', image: 'https://www.bilietai.lt/imageGenerator/eventDetails/db3ed572d38d4dd3d2785039f8c535c1.webp' },
    { title: 'Begaliniai horizontai', location: 'Varėna', date: 'Ketvirtadienis, Balandžio 18', image: 'https://www.bilietai.lt/imageGenerator/eventDetails/0b10c65bf5a05fe5c1d69e55bf95015a.webp' },
    { title: 'Šiek tiek siaubinga', location: 'Telšiai', date: 'Ketvirtadienis, Balandžio 18', image: 'https://www.bilietai.lt/imageGenerator/concertShort/d62db4f11c1b9b8837a848ca4e66a62b.webp' },
    { title: 'Žalgiris - Dainava', location: 'Vilnius, LFF stadionas', date: 'Trečiadienis, Balandžio 24', image: 'https://i.ytimg.com/vi/xP7aVIl7_HU/sddefault.jpg?v=65e480e7.jpg' },
    { title: 'Pagulbio šeimų festivalis', location: 'Molėtai', date: 'Šeštadienis, Gegužės 18', image: 'https://www.bilietai.lt/imageGenerator/eventDetails/bd49f8d0d28f79fd8bb525d2bd3bf252.webp' },
    { title: 'Naujasis Baltijos šokis', location: 'Vilnius', date: 'Šeštadienis, Balandžio 27', image: 'https://www.bilietai.lt/imageGenerator/eventDetails/682c062fa95ceac93bc3a618a5651a56.webp' },
];

const organizers = [
    { name: 'Vardenis Pavardenis', followers: '78.5k', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Vardenis Pavardenis', followers: '34.9k', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Vardenis Pavardenis', followers: '63.9k', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Vardenis Pavardenis', followers: '98.9k', image: 'https://randomuser.me/api/portraits/men/4.jpg' }
];

const destinations = [
    { title: 'Vilnius', image: 'https://cdn.elebase.io/173fe953-8a63-4a8a-8ca3-1bacb56d78a5/00e553cd-bc9d-4d33-8a33-56f799353694-72_gediminas-tower_www.vilnius-tourism.lt_laimonas-ciunys.jpg?q=75.jpg' },
    { title: 'Kaunas', image: 'https://www.hanse.org/uploads/media/card/09/1199-Kaunas%20Castle%20%28A.%20Aleksandravi%C4%8Dius%29.jpg?v=1-0.jpg' },
    { title: 'Klaipėda', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlImCwkWSDMvsjdu36jwekOXwFwko91ZF6YR3V97MqNQ&s.jpg' }
];

const testimonials = [
    { name: 'Kamilė Samusiovaitė', text: 'Musų mylimas Vilniaus jaunimas skubėk registruotis į festivalį. Puikiai praleistas laikas ir daug renginių dalyvių!', rating: '4.5', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Matas Samšonas', text: 'Ačiū renginio organizatoriams. Šventė buvo nuostabi!', rating: '4.8', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Domas Nemanius', text: 'Puikus festivalis, labai linksma praleisti laiką. Renginys buvo puikiai organizuotas. Didelis ačiū organizatoriams!', rating: '4.7', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { name: 'Rokas Sirvydas', text: 'Dėkingas organizatoriams, viskas buvo puiku! Sekantį kartą bus dar geriau.', rating: '4.6', image: 'https://randomuser.me/api/portraits/men/7.jpg' }
];
const interests = [
    'Badminton', 'Cricket', 'Music', 'Cooking', 'Travelling', 'Dancing', 'Art', 'Designing', 'Political Science', 'Party', 'Singing', 'EDM', 'Fashion', 'Athletics', 'Basketball', 'Sports', 'Gaming', 'Drama', 'Social Work', 'Business', 'Charity'
];

const trendingHashtags = [
    '#Music', '#Concert', '#Party', '#Gaming', '#Art', '#Food', '#Health', '#Education', '#Travel', '#Politics'
];

const popularInterests = [
    'Business', 'Cricket', 'Music', 'Cooking', 'Travelling', 'Dancing', 'Art', 'Painting', 'Social Work', 'Fashion', 'Charity'
];

export const Home = () => {

    const { setUser } = useContext(UserContext); // Use UserContext


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/User/currentUser', {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                });
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        fetchUser();
    }, [setUser]);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            {/* Header Section with Background Image */}
            <Box
                sx={{
                    width: '100%',
                    height: '400px', // Adjust the height as needed
                    backgroundImage: 'url(https://aktyvuspoilsis.lt/wp-content/uploads/2024/01/f43lFbhrdlNylJwnRvr2zHoRH8CWvf7luR1D0plm-scaled.jpg)', // Update the path to your image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                    mb: 5,
                }}
            >
                {/* Add any overlay text if needed */}
            </Box>

            {/* Categories Section */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>Categories</Typography>
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={category.title}>
                            {/*<Link to={`/category/${category.id}`}>*/}
                            <Card component={Link} to='/category' sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    textDecoration: 'none',
                                    color: 'inherit'
                                } }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={category.image}
                                        alt={category.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{category.title}</Typography>
                                    </CardContent>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Browsing Section */}
            {/*<Box sx={{ mb: 5 }}>*/}
            {/*    <Typography variant="h4" gutterBottom>Browsing events in <Link href="#">Lithuania</Link></Typography>*/}
            {/*</Box>*/}

            {/* Events Section */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>Based on your interests</Typography>
                <Grid container spacing={2}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={event.title}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={event.image}
                                    alt={event.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{event.title}</Typography>
                                    <Typography>{event.location}</Typography>
                                    <Typography>{event.date}</Typography>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            backgroundColor: '#7F1425', // Maroon color
                                            '&:hover': {
                                                backgroundColor: '#63101C' // Darker maroon on hover
                                            }
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

            {/* Trending Hashtags Section */}
            <Box sx={{ mb: 5, p: 2, backgroundColor: '#7F1425', color: 'white' }}>
                <Typography variant="h4" gutterBottom>Trending #Hashtags</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {trendingHashtags.map((hashtag) => (
                        <Chip key={hashtag} label={hashtag} sx={{ backgroundColor: 'white', color: '#7F1425' }} />
                    ))}
                </Box>
            </Box>

            {/* More Events Section */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>All</Typography>
                <Grid container spacing={2}>
                    {eventsMore.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={event.title}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={event.image}
                                    alt={event.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{event.title}</Typography>
                                    <Typography>{event.location}</Typography>
                                    <Typography>{event.date}</Typography>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            backgroundColor: '#7F1425', // Maroon color
                                            '&:hover': {
                                                backgroundColor: '#63101C' // Darker maroon on hover
                                            }
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

            {/* Favorites Section */}
            <Box sx={{ mb: 5, p: 2, backgroundColor: '#7F1425', color: 'white' }}>
                <Typography variant="h4" gutterBottom>Add More to your Favorites!</Typography>
                <Typography>Select your interests to get event suggestions based on what you love</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {popularInterests.map((interest) => (
                        <Chip key={interest} label={interest} sx={{ backgroundColor: 'white', color: '#7F1425' }} />
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>

                {/* Popular Organizers Section */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom>Popular Organizers</Typography>
                    <Grid container spacing={2}>
                        {organizers.map((organizer) => (
                            <Grid item xs={12} sm={6} md={3} key={organizer.name}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={organizer.image}
                                        alt={organizer.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{organizer.name}</Typography>
                                        <Typography>{organizer.followers} Followers</Typography>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                mt: 1,
                                                backgroundColor: '#7F1425',
                                                '&:hover': {
                                                    backgroundColor: '#63101C'
                                                }
                                            }}
                                        >
                                            Follow
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Top Destinations Section */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom>Top Destinations in Lithuania</Typography>
                    <Grid container spacing={2}>
                        {destinations.map((destination) => (
                            <Grid item xs={12} sm={6} md={4} key={destination.title}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={destination.image}
                                        alt={destination.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{destination.title}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Testimonials Section */}
                <Box sx={{ mb: 5 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" gutterBottom>What people said...</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {testimonials.map((testimonial) => (
                            <Grid item xs={12} sm={6} md={3} key={testimonial.name}>
                                <Card sx={{
                                    backgroundColor: '#7F1425',
                                    color: 'white',
                                    textAlign: 'center',
                                    position: 'relative',
                                    paddingTop: '50px',
                                    height: '250px', // Set a fixed height for the cards
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start', // Align content at the start
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '20px', // Adjust position to bring avatar down
                                        left: '50%',
                                        transform: 'translateX(-50%)'
                                    }}>
                                        <Avatar
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                border: '3px solid white'
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ marginTop: '40px' }}> {/* Adjusted marginTop for content */}
                                        <Typography variant="h6" gutterBottom>{testimonial.name}</Typography>
                                        <Typography variant="body2">{testimonial.rating} <span style={{ color: '#FFD700' }}>★</span></Typography>
                                        <Typography variant="body2">{testimonial.text}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>


            </Box>
            
        </Box>
    );
};
