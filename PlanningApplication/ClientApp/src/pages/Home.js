import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Link, Chip, Paper } from '@mui/material';
import Footer from '../components/Footer';

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

const trendingHashtags = [
    '#Music', '#Concert', '#Party', '#Gaming', '#Art', '#Food', '#Health', '#Education', '#Travel', '#Politics'
];

const popularInterests = [
    'Business', 'Cricket', 'Music', 'Cooking', 'Travelling', 'Dancing', 'Art', 'Painting', 'Social Work', 'Fashion', 'Charity'
];

export const Home = () => {
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
                            <Card>
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
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>Browsing events in <Link href="#">Lithuania</Link></Typography>
            </Box>

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

            <Footer />
        </Box>
    );
};
