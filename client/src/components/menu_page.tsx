import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';

export default function MenuPage() {

        //currently this does not do what we want. Will need to modify all of this based on how we setup the drink data.
        const [selectedIndex, _setSelectedIndex] = React.useState(1);

        // const handleListItemClick = (
        //     _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        //     index: number,
        // )  => {
        //     let path = `/details/${data[index].symbol}`;
        //     window.location.href = path;
        // };
    
        const [data, setData] = useState({menuName: "", drinks: [{_id: "", name: "", ingredients: []}] });
    
        useEffect(() => {
          const fetchData = async () => {
            try {
                const userToken = localStorage.getItem("jwt");
                const response = await fetch(`/api/user/${userToken}`);
                const jsonData = await response.json();
              //console.log("fetched data or sumthin", jsonData);
              setData(jsonData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    border: 10,
                }}
            >
            <h2>access the menu name here and display</h2>
                {data.drinks && data.drinks.map(drink => (
                    <List sx={{ width: "90%", height: "90%", textAlign: 'center' }}>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText>{drink.name}</ListItemText>
                            <ListItemText>Ingredients: {drink.ingredients.join(", ")}</ListItemText>
                        </ListItemButton>
                    </List>
                )
                )}
            </Box>
        </>
    )
}