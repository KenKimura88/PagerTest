import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default class Home extends Component {
  render () {
    return (
      <Card className="mt-10">
        <CardContent>
          <Typography variant="title" color="inherit" className="flex-grow">
            Welcome to Pubnub demo
          </Typography>
          <Typography variant="title" color="inherit" className="flex-grow">
            This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.
          </Typography>
        </CardContent>
      </Card>
    )
  }
}