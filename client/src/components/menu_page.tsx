import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Router, useNavigate } from 'react-router-dom';

export default function MenuPage() {
    const navigate = useNavigate();

    //currently this does not do what we want. Will need to modify all of this based on how we setup the drink data.
    const [selectedIndex, _setSelectedIndex] = React.useState(1);

    //deletes the associated drink from the users menu
    const handleListItemClick = async (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        drinkId: string,
    ) => {
        await fetch(`/api/user/drinks/${drinkId}`, { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: localStorage.getItem("jwt") }) });
        window.location.reload();
    };

    //Prompts the user to enter a new name for their menu, sets that in their account, and then reloads
    const renameMenuOpen = async (
        _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
    }

    //deletes all the drinks from the user's menu and then reloads
    const deleteFullMenuButton = async () => {
        await fetch('/api/user/drinks/', { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: localStorage.getItem("jwt") }) });
        window.location.reload();
    }

    const toSearchByIngredients = () => {
        navigate("/search-ingredient");
    }

    const toSearchByName = () => {
        navigate("/search-name");
    }

    const [data, setData] = useState({ menuName: "", drinks: [{ _id: "", name: "", ingredients: [] }] });

    //pulls the user's drinks and menu name to be populated on the page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userToken = localStorage.getItem("jwt");
                const response = await fetch(`/api/user/${userToken}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Box>
                    <Button variant="contained" onClick={toSearchByName}>Add Drink By Name</Button>
                    <Button variant="contained" onClick={toSearchByIngredients}>Add Drink By Ingredients</Button>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    border: 10,
                }}
            >
                <Button variant="contained" onClick={(e) => renameMenuOpen(e)}>Rename menu</Button>
                <h2>{data.menuName}</h2>
                {data.drinks && data.drinks.map(drink => (
                    <List sx={{ width: "90%", height: "90%", textAlign: 'center' }}>
                        <ListItem>
                            <ListItemText sx={{ alignItems: "center" }}>{drink.name}</ListItemText>
                            <ListItemText>Ingredients: {drink.ingredients.join(", ")}</ListItemText>
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, drink._id)}
                            >Remove
                            </ListItemButton>
                        </ListItem>
                    </List>
                )
                )}
            </Box>
        </>
    )
}