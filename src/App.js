import React, { useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  Button, Card, CardContent, TextField, Typography,
} from '@material-ui/core';
import awsconfig from './aws-exports';

import './App.css';

// Amplify.configure(awsconfig);

function App() {
  const [one, setInputOne] = useState(0);
  const [two, setInputTwo] = useState(0);
  const [sum, setSum] = useState(0);

  const updateOne = (event) => {
    setInputOne(event.target.value);
  };

  const updateTwo = (event) => {
    setInputTwo(event.target.value);
  };

  const updateSum = () => {
    setSum(one + two);
    console.log(sum);
    // send sum to store to update
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <CardContent>
            <Typography>
              The sum is
              {' '}
              {sum}
              .
            </Typography>
          </CardContent>
        </Card>
        <form noValidate autoComplete="off">
          <TextField
            error
            id="input-one"
            label="Input One"
            onChange={updateOne}
            required
            value={one}
          />
          <TextField
            error
            id="input-two"
            label="Input Two"
            onChange={updateTwo}
            required
            value={two}
          />
        </form>
        <Button
          onClick={updateSum}
          type="submit"
          variant="outlined"
        >
          Get Sum
        </Button>
      </header>
    </div>
  );
}

export default App;
