import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  Button, TextField,
} from '@material-ui/core';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import { createItem } from './graphql/mutations';
import { listItems } from './graphql/queries';

import './App.css';

Amplify.configure(awsExports);

const initialState = { id: '', value: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const itemData = await API.graphql(graphqlOperation(listItems));
      const { itemList } = itemData.data.data.listItems;
      setItems(itemList);
      console.log(itemList);
    } catch (error) {
      console.log('error fetching items', error);
    }
  }

  async function addItem() {
    try {
    //   if (!formState.value) {
      const item = { ...formState };
      setItems([...items, item]);
      setFormState(initialState);
      console.log(item);
      await API.graphql(graphqlOperation(createItem, { input: item }));
    //   }
    } catch (error) {
      console.log('error creating item', error);
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Card>
          <CardContent>
            <Typography> */}
        <p>

          {/* The sum is
          {' '}
          {items.map((item) => )} */}
          .

        </p>
        {/* </Typography>

          </CardContent>
        </Card> */}
        <form noValidate autoComplete="off">
          <TextField
            error
            id="input-one"
            label="Input One"
            onChange={(event) => setInput('id', event.target.value)}
            required
            value={formState.id}
          />
          <TextField
            error
            id="input-two"
            label="Input Two"
            onChange={(event) => setInput('value', event.target.value)}
            required
            value={formState.value}
          />
        </form>
        <Button
          onClick={addItem}
          type="submit"
          variant="outlined"
        >
          Add Item
        </Button>
        {/* <Button
          onClick={getSum}
          type="submit"
          variant="outlined"
        >
          Add Item
        </Button> */}
      </header>
    </div>
  );
};

export default withAuthenticator(App);
