import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  Button, Card, CardContent, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-config';
import { createItem } from './graphql/mutations';
import { listItems } from './graphql/queries';

import './App.css';

Amplify.configure(awsExports);

const initialState = { id: '', value: '' };

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const App = () => {
  const classes = useStyles();
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
      const item = { ...formState };
      setItems([...items, item]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createItem, { input: item }));
    } catch (error) {
      console.log('error creating item', error);
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const mapItems = () => (
    items.map((item) => (
      <p key={item.id}>
        {item.value}
      </p>
    ))
  );

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div className={classes.root}>
          <Card>
            <CardContent>
              <Typography>
                {items.length ? mapItems : 'No items in list yet'}
              </Typography>
            </CardContent>
          </Card>
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
          {/* <Button
          onClick={getSum}
          type="submit"
          variant="outlined"
        >
          Add Item
        </Button> */}
        </div>
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
          Get Sum
        </Button> */}
      </div>
    </div>
  );
};

export default withAuthenticator(App);
