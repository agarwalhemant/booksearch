import React, { useState } from 'react';
import wretch from "wretch"
import { useRecoilState } from "recoil";
import { TextInput, Button } from '@carbon/react';
import { Grid, Column } from '@carbon/react';
import { appPageData, appPageError, searchIsLoading } from '../Components/appPageAtoms';
import "../Styles/App.scss";
import ListItems from '../Components/ListItems.js';
import Output from '../Components/Output.js';

export default function App() {
  const [bookname, setBookname] = useState("");
  const [data, setData] = useRecoilState(appPageData);
  const [loading, setLoading] = useRecoilState(searchIsLoading);
  const [error, setError] = useRecoilState(appPageError);

  let listItems;

  function handleChange(e) {
    setBookname(e.target.value);
  }

  async function handleClick() {
    let encodedBookName = encodeURIComponent(bookname);
    console.log(encodedBookName, bookname);
  
    setLoading(true);
  
    try {
      let jsonObject = await wretch(`https://openlibrary.org/search.json?q=${encodedBookName}&limit=15`).get().json();
      setData(jsonObject);
    } catch (error) {
      setError(`This is an HTTP error: The status is ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
  


  if (data) {
    if (data.docs.length !== 0) {
      listItems = data.docs.map(item => <ListItems key={`book-${item.key}`} item = {item}/>)
    }
    else {
      listItems = <span>No data found! Please enter a valid Search Input.</span>;
    }
  }

  return (
    <Grid className="App" fullWidth>
      <Column lg={12} md={8} sm={4} className="WelcomeMsg">
        <h3> Search a Book 📖</h3>
      </Column>
      <Column lg={10} md={8} sm={4} className="search-container">
        <Grid>
          <Column lg={8} md={6} sm={4} className="text-input">
          <TextInput id="search-input" labelText="" size="md" placeholder='Enter book name' value={bookname} onChange={handleChange} />
          </Column>
          <Column lg={2} md={2} sm={4}>
          <Button size="md" id="search-button" onClick={handleClick}> Search </Button>
          </Column>
        </Grid>  
      </Column>
      <Column lg={8} md={6} sm={4} className="Output">
        <Output loading={loading} error={error} listItems={listItems}/>
      </Column>
    </Grid>
  );
}
