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
        const [selectedIndex, setSelectedIndex] = React.useState(1);

        const handleListItemClick = (
            _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
            index: number,
        )  => {
            //use data[index] for symbol?
            console.log(data[index].symbol)
            let path = `/details/${data[index].symbol}`;
            window.location.href = path;
        };
    
        const [data, setData] = useState([{symbol: "", low: 0, high: 0}]);
    
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch("/topStocks");
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
                {data && data.map(stock => (
                    <List sx={{ width: "90%", height: "90%", textAlign: 'center' }}>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText>Drink Name Goes Here</ListItemText>
                            <ListItemText>Drink ingredients will go here</ListItemText>
                        </ListItemButton>
                    </List>
                )
                )}
            </Box>
        </>
    )
}